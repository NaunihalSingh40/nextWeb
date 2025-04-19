import { User } from "models/user";
import { connectDb } from "helper/dB";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface UserLoginBody {
  email: string;
  password: string;
}

interface TokenParams {
  _id: string;
  email: string;
  role: string;
}

// Helper function to generate tokens
const generateTokens = (user: TokenParams) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "30d" }
  );

  return { accessToken, refreshToken };
};

// Named exports for HTTP methods
export const POST = async (req: Request): Promise<Response> => {
  try {
    await connectDb();

    const { email, password }: UserLoginBody = await req.json();

    if (!email || !password) {
      return new NextResponse("Email and password are required", {
        status: 400,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new NextResponse("User does not exist!", {
        status: 401,
      });
    }

    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch) {
      return new NextResponse("Invalid password", {
        status: 401,
      });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;

    await user.save();

    return new NextResponse(
      JSON.stringify({
        status: 200,
        message: "Login successful",
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Server error", { status: 500 });
  }
};

import { connectDb } from "helper/dB";
import { User } from "models/user";

export interface UserRequestBody {
  username: string;
  email: string;
  password: string;
  role: string;
}

export const POST = async (request: Request): Promise<Response> => {
  await connectDb();

  try {
    const { username, email, password, role }: UserRequestBody =
      await request.json();

    // Validate the input data
    if (!username || !email || !password || !role) {
      return new Response("All fields are required!", { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response("User with this email already exists!", {
        status: 409,
      });
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
      role,
    });

    // Save the new user to the database
    await newUser.save();

    // Return a success response
    return new Response(
      JSON.stringify({ message: "User registered successfully!" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Catch any errors and return an error response
    return new Response("Server Error: " + error, { status: 500 });
  }
};

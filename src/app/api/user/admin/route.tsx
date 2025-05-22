import { connectDb } from "helper/dB";
import { User } from "models/user";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDb();

  try {
    const admins = await User.find({ role: "admin" }).select("username email role");
    return NextResponse.json(admins, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Server Error: " + error },
      { status: 500 }
    );
  }
}

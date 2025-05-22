import { connectDb } from "helper/dB";
import { User } from "models/user";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDb();

  try {
    const customers = await User.find({ role: "customer" }).select("username email role");
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Server Error: " + error },
      { status: 500 }
    );
  }
}

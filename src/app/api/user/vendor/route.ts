// app/api/users/vendors/route.ts
import { connectDb } from "helper/dB";
import { User } from "models/user";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDb();

  try {
    // find all users with role "seller"
    const vendors = await User.find({ role: "seller" }).select(
      "username email role"
    );
    return NextResponse.json(vendors, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Server Error: " + error },
      { status: 500 }
    );
  }
}

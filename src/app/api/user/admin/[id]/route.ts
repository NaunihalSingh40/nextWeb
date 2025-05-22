// app/api/users/admins/[id]/route.ts

import { connectDb } from "helper/dB";
import { User } from "models/user";
import { NextResponse } from "next/server";

// Correct handler for DELETE /api/users/admins/[id]
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // params is Promise here
) {
  await connectDb();

  const awaitedParams = await params; // await the params first
  const id = awaitedParams.id;

  try {
    const result = await User.deleteOne({ _id: id, role: "admin" });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Admin deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Server Error: " + error },
      { status: 500 }
    );
  }
}

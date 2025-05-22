// app/api/users/vendors/[id]/route.ts
import { connectDb } from "helper/dB";
import { User } from "models/user";
import { NextResponse } from "next/server";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> } // params is Promise here
) {
  await connectDb();
  const awaitedParams = await params; // await the params first
  const id = awaitedParams.id;

  try {
    const result = await User.deleteOne({ _id: id, role: "seller" });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Vendor deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Server Error: " + error },
      { status: 500 }
    );
  }
}

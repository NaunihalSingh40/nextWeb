/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDb } from "helper/dB";
import { CartItem } from "models/cart";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const getUserIdFromToken = (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return (decoded as any).id;
  } catch {
    return null;
  }
};

export const GET = async (req: NextRequest) => {
  await connectDb();
  const userId = getUserIdFromToken(req);

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const items = await CartItem.find({ userId });
    return NextResponse.json(items, { status: 200 });
  } catch (err) {
    return new NextResponse("Server Error: " + err, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  await connectDb();
  const userId = getUserIdFromToken(req);

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  try {
    const existingItem = await CartItem.findOne({
      userId,
      productId: body.productId,
    });

    if (existingItem) {
      existingItem.quantity += body.quantity || 1;
      await existingItem.save();
      return NextResponse.json(existingItem, { status: 200 });
    } else {
      const newItem = await CartItem.create({
        ...body,
        userId,
      });
      return NextResponse.json(newItem, { status: 201 });
    }
  } catch (err) {
    return new NextResponse("Server Error: " + err, { status: 500 });
  }
};

import { getUserIdFromToken } from "helper";
import { connectDb } from "helper/dB";
import { CartItem } from "models/cart";
import { NextRequest, NextResponse } from "next/server";

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
      if (existingItem.quantity >= 5) {
        return new NextResponse("Maximum quantity reached", { status: 400 });
      }
      existingItem.quantity += body.quantity || 1;
      if (existingItem.quantity > 5) existingItem.quantity = 5;
      await existingItem.save();
      return NextResponse.json(existingItem, { status: 200 });
    } else {
      const newItem = await CartItem.create({
        ...body,
        quantity: Math.min(body.quantity || 1, 5),
        userId,
      });
      return NextResponse.json(newItem, { status: 201 });
    }
  } catch (err) {
    return new NextResponse("Server Error: " + err, { status: 500 });
  }
};

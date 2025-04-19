import { connectDb } from "helper/dB";
import { CartItem } from "models/cart";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromToken } from "../route";

export const PUT = async (req: NextRequest) => {
  await connectDb();
  const userId = getUserIdFromToken(req);

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { productId, quantity } = body;

  if (!productId || quantity === undefined) {
    return new NextResponse("Missing productId or quantity", { status: 400 });
  }

  try {
    const item = await CartItem.findOne({ userId, productId });

    if (!item) {
      return new NextResponse("Item not found", { status: 404 });
    }

    if (quantity < 1 || quantity > 5) {
      return new NextResponse("Quantity must be between 1 and 5", {
        status: 400,
      });
    }

    item.quantity = quantity;
    await item.save();
    return NextResponse.json(item, { status: 200 });
  } catch (err) {
    return new NextResponse("Server Error: " + err, { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  await connectDb();
  const userId = getUserIdFromToken(req);

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { productId } = params;

  if (!productId) {
    return new NextResponse("Missing productId", { status: 400 });
  }

  try {
    await CartItem.deleteOne({ userId, productId });
    return new NextResponse("Item deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Server Error: " + err, { status: 500 });
  }
};

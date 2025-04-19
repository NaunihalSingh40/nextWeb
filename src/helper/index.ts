/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

interface DecodedToken {
  id: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export const getUserFromToken = (): DecodedToken | null => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

export const getUserIdFromToken = (req: NextRequest) => {
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

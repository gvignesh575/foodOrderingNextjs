import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const users = await User.find();
  return NextResponse.json(users);
}

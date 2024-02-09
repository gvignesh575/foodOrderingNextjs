import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  console.log("called the user");
  const email = request.nextUrl.searchParams.get("email");
  mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({ email });
  return NextResponse.json(user);
};

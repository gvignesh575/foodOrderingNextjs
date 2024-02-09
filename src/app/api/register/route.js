import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export const POST = async (request) => {
  const body = await request.json();
  mongoose.connect(process.env.MONGO_URL);

  const pass = body.password;

  if (!pass?.length || pass.length < 5) {
    new Error("password must be at least 5 characters");
    return false;
  }

  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  const createdUser = await User.create(body);

  return NextResponse.json(createdUser);
};

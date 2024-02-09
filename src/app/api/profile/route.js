import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { UserInfo } from "@/app/models/UserInfo";

export async function PUT(request) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await request.json();
  const { name, image, ...otherUserInfo } = data;
  console.log(otherUserInfo);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  await User.updateOne({ email }, { name, image });
  await UserInfo.findOneAndUpdate({ email }, otherUserInfo, {
    upsert: true,
  });
  return NextResponse.json({
    message: "success",
  });
}

export async function GET(request) {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({});
  }
  const user = await User.findOne({ email }).lean();
  const userInfo = await UserInfo.findOne({ email }).lean();
  return NextResponse.json({ ...user, ...userInfo });
}

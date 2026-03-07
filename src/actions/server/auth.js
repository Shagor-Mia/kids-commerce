"use server";
import bcrypt from "bcryptjs";
import { collections, dbConnect } from "@/lib/dbConnect";

export const postUser = async (payload) => {
  const { name, email, password } = payload;
  // check paylaod
  if (!email || !password) return null;
  // check user
  const isExist = await dbConnect(collections.USERS).findOne({ email });
  if (isExist) return null;
  // create user
  const newUser = {
    provider: "credentials",
    name,
    email,
    password: await bcrypt.hash(password, 12),
    role: "user",
  };

  // inset user
  const result = await dbConnect(collections.USERS).insertOne(newUser);
  //
  if (result.acknowledged)
    return {
      ...result,
      insertedId: result.insertedId.toString(),
    };
};

export const loginUser = async (payload) => {
  const { email, password } = payload;

  // check payload
  if (!email || !password) return null;

  // find user
  const user = await dbConnect(collections.USERS).findOne({ email });

  // if user not found
  if (!user) return null;

  // compare password
  const isMatched = await bcrypt.compare(password, user.password);

  // if password incorrect
  if (!isMatched) return null;

  // success login
  return {
    ...user,
    _id: user._id.toString(),
  };
};

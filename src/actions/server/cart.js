"use server";

import { authOptions } from "@/lib/authOption";
import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

const cartCollection = await dbConnect(collections.CART);

export const handleCart = async ({ cart, inc = true }) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };
  //   get cart item,using email, pro.id
  const query = { email: user?.email, productId: products?._id };
  //   if exist update cart

  //   if not exist insert cart

  return { success: true };
  //   console.log(user);
};

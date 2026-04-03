"use server";

import { authOptions } from "@/lib/authOption";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";

const cartCollection = await dbConnect(collections.CART);

export const handleCart = async ({ product, inc = true }) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };
  //   get cart item,using email, pro.id
  const query = { email: user?.email, productId: product?._id };
  const isAdded = await cartCollection.findOne(query);
  if (isAdded) {
    //   if exist update cart
    const updateData = {
      $inc: {
        quantity: inc ? 1 : -1,
      },
    };
    const result = await cartCollection.updateOne(query, updateData);
    return { success: Boolean(result.modifiedCount) };
  } else {
    //   if not exist insert cart
    const newProduct = {
      productId: product?._id,
      email: user?.email,
      title: product.title,
      quantity: 1,
      image: product.image,
      price: product.price - (product.price * product.discount) / 100,
      username: user?.name,
    };
    const result = await cartCollection.insertOne(newProduct);
    return { success: result.acknowledged };
  }

  //   console.log(user);
};

export const getCart = cache(async () => {
  try {
    const user = (await getServerSession(authOptions)) || {};
    if (!user) {
      return [];
    }
    const query = { email: user?.email };
    const result = await cartCollection.find(query).toArray();
    const safeData = result.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    return safeData;
  } catch (error) {
    console.log(error);
    return [];
  }
});

export const deleteItemsFromCart = async (id) => {
  try {
    const user = (await getServerSession(authOptions)) || {};
    if (!user) {
      return { success: false };
    }
    if (id?.length != 24) {
      return { success: false };
    }
    const query = { _id: new ObjectId(id) };
    const result = await cartCollection.deleteOne(query);

    // if (Boolean(result.deletedCount)) {
    //   revalidatePath("/cart");
    // }
    return { success: Boolean(result.deletedCount) };
  } catch (error) {
    console.log(error);
  }
};

export const increaseItemDB = async (id, quantity) => {
  try {
    const user = (await getServerSession(authOptions)) || {};
    if (!user) {
      return { success: false };
    }
    if (quantity > 10) {
      return { success: false, message: "you cant buy 10 product at a time." };
    }
    const query = { _id: new ObjectId(id) };

    const updatedData = {
      $inc: {
        quantity: 1,
      },
    };
    const result = await cartCollection.updateOne(query, updatedData);

    return { success: Boolean(result.modifiedCount) };
  } catch (error) {
    console.log(error);
  }
};

export const decreaseItemDB = async (id, quantity) => {
  try {
    const user = (await getServerSession(authOptions)) || {};
    if (!user) {
      return { success: false };
    }
    if (quantity <= 1) {
      return { success: false, message: "you cant buy 10 product at a time." };
    }
    const query = { _id: new ObjectId(id) };

    const updatedData = {
      $inc: {
        quantity: -1,
      },
    };
    const result = await cartCollection.updateOne(query, updatedData);

    return { success: Boolean(result.modifiedCount) };
  } catch (error) {
    console.log(error);
  }
};

"use server";

import { authOptions } from "@/lib/authOption";
import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";
import { sendEmail } from "@/lib/sendEmail";
import { orderInvoiceTemplate } from "@/lib/emailTemplates";

export const createOrder = async (payload) => {
  try {
    const orderCollection = await dbConnect(collections.ORDER);

    const { user } = (await getServerSession(authOptions)) || {};
    if (!user) return { success: false };

    const cart = await getCart();
    if (cart.length === 0) {
      return { success: false };
    }

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const newOrder = {
      createdAt: new Date().toISOString(),
      email: user.email,
      items: cart,
      total,
      ...payload,
    };

    // ✅ FIRST: create order
    const result = await orderCollection.insertOne(newOrder);

    if (!result.insertedId) {
      return { success: false };
    }

    const orderId = result.insertedId.toString();

    // ✅ THEN: send email (now orderId exists)
    try {
      await sendEmail({
        to: user.email,
        subject: "🧾 Order Invoice from hero-kidz",
        html: orderInvoiceTemplate({
          user,
          orderId,
          items: cart,
          total,
        }),
      });
    } catch (emailError) {
      console.log("Email failed:", emailError);
    }

    await clearCart();

    return {
      success: true,
      orderId,
    };
  } catch (error) {
    console.log("Order Error:", error);
    return { success: false };
  }
};

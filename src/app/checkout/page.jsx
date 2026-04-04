import { getCart } from "@/actions/server/cart";
import CheckOut from "@/components/Home/CheckOut";
import React from "react";

const CheckOutPage = async () => {
  const cartItems = await getCart();

  const formattedItems = cartItems.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));
  return (
    <div>
      <CheckOut cartItems={formattedItems} />
    </div>
  );
};

export default CheckOutPage;

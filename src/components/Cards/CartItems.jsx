"use client";

import {
  decreaseItemDB,
  deleteItemsFromCart,
  increaseItemDB,
} from "@/actions/server/cart";
import React, { useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const CartItems = ({ item, removeItem, updateQuantity }) => {
  const { _id, title, image, price, quantity } = item;
  const [loading, setLoading] = useState(false);

  // define subtotal
  const subtotal = price * quantity;

  const handleDeleteCart = async () => {
    setLoading(true);
    Swal.fire({
      title: "Remove item?",
      text: "This item will be removed from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(false);
        const res = await deleteItemsFromCart(_id);
        removeItem(_id);
        if (res?.success) {
          Swal.fire("Removed!", "Item removed successfully.", "success");
        } else {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
      setLoading(false);
    });
  };

  const onIncrease = async () => {
    setLoading(true);
    const result = await increaseItemDB(_id, quantity);
    if (result?.success) {
      Swal.fire("success", "Quantity Increased.", "success");
      updateQuantity(_id, quantity + 1);
    } else {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
    setLoading(false);
  };
  const onDecrease = async () => {
    setLoading(true);
    const result = await decreaseItemDB(_id, quantity);
    if (result?.success) {
      Swal.fire("success", "Quantity Decreased.", "success");
      updateQuantity(_id, quantity - 1);
    } else {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-base-100 border border-base-200 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex-1 w-full">
        {/* Title */}
        <h2 className="text-lg font-semibold leading-tight line-clamp-2">
          {title}
        </h2>

        {/* Price + Subtotal */}
        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
          <p className="text-gray-500">
            Price: <span className="font-medium text-primary">৳ {price}</span>
          </p>

          <p>
            Subtotal:{" "}
            <span className="font-semibold text-success">
              ৳ {subtotal.toFixed(2)}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-4">
          {/* Quantity Control */}
          <div className="flex items-center gap-2 bg-base-200 px-3 py-1 rounded-full shadow-inner">
            <button
              onClick={onDecrease}
              disabled={quantity === 1 || loading}
              className="btn btn-xs btn-circle btn-outline btn-error disabled:opacity-40"
            >
              <FaMinus />
            </button>

            <span className="min-w-[24px] text-center font-semibold">
              {quantity}
            </span>

            <button
              onClick={onIncrease}
              disabled={quantity === 10 || loading}
              className="btn btn-xs btn-circle btn-outline btn-success"
            >
              <FaPlus />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleDeleteCart}
            className="btn btn-sm btn-outline btn-error gap-2 hover:scale-105 transition"
          >
            <FaTrash />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;

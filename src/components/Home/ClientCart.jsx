"use client";

import React, { useMemo, useState } from "react";
import CartItems from "../Cards/CartItems";

const ClientCart = ({ cartItem = [] }) => {
  const [items, setItem] = useState(cartItem);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [items],
  );

  const removeItem = (id) => {
    setItem((prevItems) => prevItems.filter((item) => item._id != id));
  };
  const updateQuantity = (id, q) => {
    setItem((prevItems) =>
      prevItems.map((item) =>
        item._id == id ? { ...item, quantity: q } : item,
      ),
    );
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6">
        Shopping Cart{" "}
        <span className="text-red-500 text-lg">({items.length} items)</span>
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT: Cart Items */}
        <div className="lg:w-2/3 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              Your cart is empty 🛒
            </div>
          ) : (
            items.map((item) => (
              <CartItems
                key={item._id.toString()}
                item={{ ...item, _id: item._id.toString() }}
                removeItem={removeItem}
                updateQuantity={updateQuantity}
              />
            ))
          )}
        </div>

        {/* RIGHT: Summary Card */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6 border">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            {/* Product List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm border-b pb-2"
                >
                  <div>
                    <p className="font-medium line-clamp-1">{item.title}</p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t my-4"></div>

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between font-semibold text-lg">
                <span>Total Price</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Button */}
            <button
              className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
              disabled={items.length === 0}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCart;

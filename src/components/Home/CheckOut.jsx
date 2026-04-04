"use client";

import { createOrder } from "@/actions/server/order";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import Swal from "sweetalert2";

const CheckOut = ({ cartItems = [] }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const payload = {
      name: form.name.value,
      email: form.email.value,
      contact: form.contact.value,
      address: form.address.value,
      instruction: form.instruction.value,
      city: form.city.value,
      zip: form.zip.value,
      payment: form.payment.value,
      //   items: cartItems,
      //   total,
    };

    console.log(" CLIENT PAYLOAD:", payload);

    try {
      const result = await createOrder(payload);
      if (result?.success) {
        Swal.fire("Success!", "Order Placed Successfully.", "success");
        router.push("/");
      } else {
        Swal.fire("Error!", "Something went wrong.", "error");
        router.push("/cart");
      }
    } catch (error) {
      console.error(" ERROR:", error);
    }
  };

  //  loading state
  if (status === "loading") {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* LEFT: FORM */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 card bg-base-100 shadow-xl p-6 space-y-6"
        >
          <h2 className="text-2xl font-bold">Checkout</h2>

          {/* Personal Info */}
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              value={session?.user?.name || ""}
              readOnly
              className="input input-bordered w-full"
              required
            />

            <input
              type="email"
              name="email"
              value={session?.user?.email || ""}
              readOnly
              className="input input-bordered w-full"
              required
            />
            <input
              type="contact"
              name="contact"
              placeholder="contact"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="flex gap-4">
            {/* Address */}
            <textarea
              name="address"
              placeholder="Street Address"
              className="textarea textarea-bordered w-full"
              required
            />
            {/* delivery instruction */}
            <textarea
              name="instruction"
              placeholder="Delivery Instruction"
              className="textarea textarea-bordered w-full"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="input input-bordered w-full"
              required
            />

            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Payment */}
          <div>
            <h3 className="font-semibold mb-2">Payment Method</h3>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  defaultChecked
                  className="radio"
                />
                Card
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  className="radio"
                />
                Cash
              </label>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-full">
            Place Order
          </button>
        </form>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="card bg-base-100 shadow-xl p-6 h-fit">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-sm border-b pb-2"
              >
                <div>
                  <p className="font-medium line-clamp-1">{item.title}</p>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>

                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="divider"></div>

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

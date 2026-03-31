"use client";
import { handleCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const CartBUtton = ({ product }) => {
  const router = useRouter();
  const path = usePathname();
  const session = useSession();

  // const isLogin = true;
  const isLogin = session?.status === "authenticated";

  const addToCart = async () => {
    if (isLogin) {
      const result = await handleCart({ cart: product, inc: true });
      if (result.success) {
        Swal.fire("Added to Cart", product?.title, "success");
      } else {
        Swal.fire("Added to Cart", "Something Wrong Happened", "error");
      }
    } else router.push(`/login?callbackUrl=${path}`);
  };
  return (
    <div>
      <button onClick={addToCart} className="btn btn-primary w-full mb-6">
        Add to Cart <FaCartPlus />
      </button>
    </div>
  );
};

export default CartBUtton;

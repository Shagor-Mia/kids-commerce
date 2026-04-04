"use client";
import { handleCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const CartBUtton = ({ product }) => {
  const router = useRouter();
  const path = usePathname();
  const session = useSession();
  const [loading, setLoading] = useState(false);

  // const isLogin = true;
  const isLogin = session?.status === "authenticated";

  const addToCart = async () => {
    setLoading(true);
    if (isLogin) {
      const result = await handleCart(product._id);
      if (result.success) {
        Swal.fire("Added to Cart", product?.title, "success");
      } else {
        Swal.fire("Added to Cart", "Something Wrong Happened", "error");
      }
      setLoading(false);
    } else {
      router.push(`/login?callbackUrl=${path}`, setLoading(false));
    }
  };
  return (
    <div>
      <button
        disabled={session.status == "loading" || loading}
        onClick={addToCart}
        className="btn btn-primary w-full mb-6"
      >
        Add to Cart <FaCartPlus />
      </button>
    </div>
  );
};

export default CartBUtton;

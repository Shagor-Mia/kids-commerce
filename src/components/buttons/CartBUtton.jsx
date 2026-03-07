"use client";
import { usePathname, useRouter } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";

const CartBUtton = ({ product }) => {
  const router = useRouter();
  const path = usePathname();

  // const isLogin = true;
  const isLogin = false;

  const addToCart = () => {
    if (isLogin) alert(product._id);
    else router.push(`/login?callbackUrl=${path}`);
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

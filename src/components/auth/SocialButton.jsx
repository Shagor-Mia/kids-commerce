import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FaGoogle } from "react-icons/fa";

const SocialButton = () => {
  const params = useSearchParams();
  console.log(params);

  const handleSignIn = async () => {
    const result = await signIn("google", {
      redirect: "false",
      callbackUrl: params.get("callbackUrl") || "/",
    });
    console.log(result);
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleSignIn}
        className="btn btn-outline w-full btn-error mb-6"
      >
        <FaGoogle className="text-lg" /> Google
      </button>
    </div>
  );
};

export default SocialButton;

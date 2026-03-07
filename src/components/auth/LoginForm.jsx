"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    console.log(result);
    if (result?.ok) {
      Swal.fire("success", " login successful", "success");
      router.push("/");
    } else {
      Swal.fire("error", "email,password not matched.", "error");
    }
    // console.log(form);
  };

  const handleGoogleLogin = () => {
    window.location.href = "/api/google";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <form
        onSubmit={handleSubmit}
        className="bg-base-200 p-8 rounded-xl w-96 space-y-4"
      >
        <h2 className="text-3xl font-bold mb-5 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={form.password}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-full">Login</button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full"
        >
          Login with Google
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary underline">
            Please Register
          </Link>
        </p>
      </form>
    </div>
  );
}

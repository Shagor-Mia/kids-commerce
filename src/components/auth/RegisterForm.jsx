"use client";

import { useState } from "react";
import Link from "next/link";
import { postUser } from "@/actions/server/auth";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await postUser(form);
    // console.log(data);
    if (result.acknowledged) {
      alert("successful, please login.");
      router.push("/login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <form
        className="bg-base-200 p-8 rounded-xl w-96 space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-5 text-center">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input input-bordered w-full"
          value={form.name}
          onChange={handleChange}
        />

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

        <button className="btn btn-primary w-full">Register</button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-primary underline">
            Please Login
          </Link>
        </p>
      </form>
    </div>
  );
}

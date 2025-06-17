"use client";
import React, { useState } from "react";
import CustomInput from "../ui/CustomInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const adminCredentials = {
    email: "admin@example.com",
    password: "admin123",
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (formData.email !== adminCredentials.email) {
      newErrors.email =
        "The email you entered is not registered, please check again";
    }
    if (formData.password !== adminCredentials.password) {
      newErrors.password =
        " The password you provided is incorrect. Please try again.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-[80%] mx-auto p-6 justify-center items-center ">
      <h2 className="text-[30px] font-medium text-[#2A0856]  text-center">
        Welcome back!
      </h2>
      <p className="text-[#44444A] text-[14px] mb-6 text-center">
        Sign in to your allmyai account to access all allmyai products.
      </p>
      <form onSubmit={handleSubmit}>
        <CustomInput
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <CustomInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        <div className="flex items-center justify-between mb-6">
          <div>
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="mr-2 accent-[#C209C1]"
            />
            <label htmlFor="remember" className="text-[#44444A] text-[12px]">
              Remember me
            </label>
          </div>
          <Link
            href="/auth/forget-password"
            className="text-[#2A0856] font-medium text-[12px] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-[#BDFF00] cursor-pointer text-black text-[16px] font-medium p-3 rounded-full mb-4"
          disabled={!formData.email || !formData.password}
        >
          Login
        </button>
        <div className="text-center mb-4">or</div>
        <div className="flex justify-between gap-2">
          <button
            type="button"
            className="w-full bg-white border text-[16px] border-gray-300 p-2 font-semibold rounded-full flex items-center justify-center"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-8 h-8 mr-2"
            />
            Google
          </button>

          <button
            type="button"
            className="w-full bg-white border text-[16px] border-gray-300 font-semibold p-2 rounded-full flex items-center justify-center"
          >
            <img
              src="https://www.apple.com/favicon.ico"
              alt="Apple"
              className="w-8 h-8 mr-2"
            />
            Apple
          </button>
        </div>
        <p className="text-center text-[14px] mt-4 text-[#6C7278]">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="hover:underline font-semibold text-[#C209C1]">
            Create
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

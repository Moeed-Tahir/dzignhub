"use client";
import React, { useState } from "react";
import CustomInput from "../ui/CustomInput";
import Link from "next/link";

const LoginForm = () => {
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
      alert("Login successful!");
      // You can redirect or do something here.
    }
  };

  return (
    <div className="w-[80%] mx-auto p-6 justify-center items-center bg-white">
      <h2 className="text-3xl font-medium text-[#2A0856] mb-4 text-center">
        Welcome back!
      </h2>
      <p className="text-gray-600 mb-6 text-center">
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
            <label htmlFor="remember" className="text-[#44444A] text-sm">
              Remember me
            </label>
          </div>
          <Link
            href="/auth/forgot-password"
            className="text-[#2A0856] font-medium text-sm hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-[#BDFF00] cursor-pointer text-black font-medium p-3 rounded-full mb-4"
          disabled={!formData.email || !formData.password}
        >
          Login
        </button>
        <div className="text-center mb-4">or</div>
        <div className="flex justify-between gap-2">
          <button className="w-full bg-white border border-gray-300 p-2 font-bold rounded-full flex items-center justify-center">
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-8 h-8 mr-2"
            />{" "}
            Google
          </button>
          <button className="w-full bg-white border border-gray-300 font-bold p-2 rounded-full flex items-center justify-center">
            <img
              src="https://www.apple.com/favicon.ico"
              alt="Apple"
              className="w-8 h-8 mr-2"
            />{" "}
            Apple
          </button>
        </div>
        <p className="text-center mt-4 text-[#6C7278]">
          Don't have an account?{" "}
          <a href="#" className="hover:underline text-[#C209C1]">
            Create
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

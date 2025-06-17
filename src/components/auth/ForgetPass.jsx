"use client";
import React, { useState } from "react";
import CustomInput from "../ui/CustomInput";
import { useRouter } from "next/navigation";

const ForgetPass = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});

  const adminCredentials = {
    email: "admin@example.com",
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

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // alert("Password reset link sent!");
      router.push("/auth/password-reset");
    }
  };

  return (
    <div className="w-[80%] mx-auto p-6 justify-center items-center ">
      <h2 className="text-[30px] font-medium text-[#2A0856] text-center">
        Forgot Password?
      </h2>
      <p className="text-[#44444A] text-[14px] mb-6 text-center">
        Just follow the steps to get back into your Koajo account!
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

        <button
          type="submit"
          className="w-full bg-[#BDFF00] text-[16px] cursor-pointer text-black font-semibold p-3 rounded-full mb-4"
          disabled={!formData.email}
        >
          Reset Password
        </button>

        <button
          type="button"
          onClick={() => router.push("/auth/login")}
          className="w-full border border-gray-200 text-[16px] cursor-pointer text-black font-semibold p-3 rounded-full mb-4"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default ForgetPass;

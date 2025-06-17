"use client";
import React, { useState } from "react";
import CustomInput from "../ui/CustomInput";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Basic form validation
    if (!formData.email) newErrors.email = "Please enter a valid email address.";
    if (!formData.phone) newErrors.phone = "Please enter a valid phone number.";
    if (!formData.password) newErrors.password = "Minimum 8 characters";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      router.push("/auth/confirm-otp");
    }
  };

  return (
    <div className="w-[80%] mx-auto p-6 justify-center items-center ">
      <h2 className="text-[30px] font-medium text-[#2A0856]  text-center">
        Let's Create Your Account
      </h2>
      <p className="text-[#44444A] text-[14px] mb-6 text-center">
        Get started with allmyai and start using our AI assistance
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
          label="Mobile Phone"
          type="text"
          placeholder="Enter your mobile phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <p className="text-[#6C7278] text-[12px] -mt-3 mb-6 text-start">
          This helps secure and verify your account.
        </p>

        <CustomInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <CustomInput
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          className="w-full bg-[#BDFF00] cursor-pointer text-black font-medium p-3 rounded-full mb-4"
          disabled={
            !formData.email ||
            !formData.phone ||
            !formData.password ||
            !formData.confirmPassword
          }
        >
          Create account
        </button>

        <p className="text-[#44444A] mb-6 text-center text-sm">
          By clicking the Create Account button, you acknowledge that you have
          read and agree to our Terms of Use
          and Privacy Policy.
        </p>

        <p className="text-center  mt-4 text-[#6C7278]">
          Already have an account?{" "}
          <Link href="/auth/login" className="hover:underline font-semibold text-[#C209C1]">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

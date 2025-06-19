"use client";
import React, { useState } from "react";
import CustomInput from "../ui/CustomInput";
import { useRouter } from "next/navigation";

const ForgetPass = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const adminCredentials = {
    email: "admin@example.com",
  };


  const sendResetOtp = async (email) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: email}),
      });
  
      const data = await response.json();
      console.log(data)
      if (data.type === "success") {
        router.push(`/auth/password-reset?email=${encodeURIComponent(formData.email)}`);
      } else {
        setErrors({ email: data.message || "Failed to send reset link" });
      }
    }
    catch(error) {
      setErrors({ email: "Failed to send reset link" });
    }
    finally {
      setIsLoading(false);
    }
  }



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

    if (formData.email == "" || formData.email == null) {
      newErrors.email =
        "Email is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // alert("Password reset link sent!");
      sendResetOtp(formData.email);
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
           className="w-full bg-[#BDFF00] cursor-pointer text-black text-[16px] font-semibold p-3 rounded-full mb-4 flex justify-center items-center"
          disabled={!formData.email || isLoading}
        >
           {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
          ) : (
            "Reset Password"
          )}
          
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

"use client";
import React, { useState } from "react";
import OtpInput from "../ui/OtpInput";
import { useRouter,useSearchParams } from "next/navigation";

const PassReset = ({ isPassReset }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email'); // Get email from URL params
  
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const correctOtp = "123456";

  const handleOtpChange = (value) => {
    setOtp(value);
    if (error) setError(""); // clear error when typing again
  };

  const confirmOtp = async (otp) => {
    let Email = decodeURIComponent(email);
    let apiEndpoint = isPassReset ? "verify-reset-otp" : "confirm-otp";
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${apiEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({otp, email:Email}),
    });

    const data = await response.json();
    if (data.type === "success") {
      isPassReset
      ? router.push(`/auth/new-password?token=${data.resetSessionToken}&email=${encodeURIComponent(email)}`)
      : router.push("/profile/onboarding");
    }
    else {
      setError("Invalid OTP. Please try again.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    confirmOtp(otp, email)
  };


  const handleResendOtp = async () => {
    let Email = decodeURIComponent(email);
    let apiEndpoint = isPassReset ? "forgot-password" : "resend-otp";
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${apiEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: Email }),
    });

    const data = await response.json();
    if (data.type === "success") {
      setError(""); // Clear any previous error
      alert("OTP resent successfully!");
    } else {
      setError("Failed to resend OTP. Please try again.");
    }
  }

  return (
    <div className="w-[80%] mx-auto py-6 justify-center items-center">
      <h2 className="text-[30px] font-medium text-[#2A0856]  text-center">
        {isPassReset ? " Password reset" : "Check you inbox"}{" "}
      </h2>
      <p className="text-[#44444A] text-[14px] text-sm mb-6 text-center">
        {isPassReset
          ? "        We sent a recovery code to user@example.com"
          : "Secure your account by verifying your email. Enter the 6-digit verification code we sent to example@mail.com"}
      </p>

      <form onSubmit={handleSubmit}>
        <OtpInput length={6} onChange={handleOtpChange} isError={!!error} />

        {error && (
          <p className="text-red-500 text-sm mt-2 ml-3 text-start">{error}</p>
        )}
        <p className="text-[#44444A] mt-6 text-sm text-center">
          Didn't get a code?
          <button onClick={handleResendOtp} className="ml-1" type="button">
            Click to resend
          </button>
        </p>
        <button
          type="submit"
          className="w-full mt-6 bg-[#BDFF00] cursor-pointer text-black font-semibold p-3 rounded-full mb-4"
          disabled={otp.length !== 6}
        >
          Verify
        </button>

        <button
          type="button"
          onClick={() => router.push("/auth/forget-password")}
          className="w-full border border-gray-200 cursor-pointer text-black font-semibold p-3 rounded-full mb-4"
        >
          Change email address
        </button>
      </form>
    </div>
  );
};

export default PassReset;

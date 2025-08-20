"use client";
import React, { useState } from "react";
import OtpInput from "../ui/OtpInput";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/store";

const PassReset = ({ isPassReset }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // Get email from URL params
  const { SetIsLogin, SetEmail, SetUserId } = useUserStore();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const correctOtp = "123456";

  const handleOtpChange = (value) => {
    setOtp(value);
    if (error) setError(""); // clear error when typing again
  };

  const confirmOtp = async (otp) => {
    setIsLoading(true);
    let Email = decodeURIComponent(email);
    let apiEndpoint = isPassReset ? "verify-reset-otp" : "confirm-otp";
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${apiEndpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, email: Email }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.type === "success") {
        if (isPassReset) {
          router.push(
            `/auth/new-password?token=${
              data.resetSessionToken
            }&email=${encodeURIComponent(email)}`
          );
        } else {
          console.log(data);
          localStorage.setItem("token", data.token);
          console.log("Token: ", data.token);
          console.log("User ID:", data.user._id);
          SetIsLogin(true);
          SetEmail(data.user.email);
          SetUserId(data.user._id);
          localStorage.setItem("isLogin", true);
          router.push("/profile/onboarding");
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    confirmOtp(otp, email);
  };

  const handleResendOtp = async () => {
    setIsOtpSent(true);
    let Email = decodeURIComponent(email);
    let apiEndpoint = isPassReset ? "forgot-password" : "resend-otp";
    console.log(apiEndpoint);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${apiEndpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: Email, isPasswordReset: isPassReset }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.type === "success") {
        setError(""); // Clear any previous error
        setSuccess("OTP resent Successfully");
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsOtpSent(false);
    }
  };

  return (
    <div className="lg:w-[80%] mx-auto py-6 justify-center items-center">
      <h2 className="text-[30px] font-medium text-[#2A0856]  text-center">
        {isPassReset ? " Password reset" : "Check you inbox"}{" "}
      </h2>
      <p className="text-[#44444A] text-[14px] text-sm mb-6 text-center">
        {isPassReset
          ? `We sent a recovery code to ${decodeURIComponent(email)}`
          : `Secure your account by verifying your email. Enter the 6-digit verification code we sent to ${decodeURIComponent(
              email
            )}`}
      </p>

      <form onSubmit={handleSubmit}>
        <OtpInput length={6} onChange={handleOtpChange} isError={!!error} />

        {error && (
          <p className="text-red-500 text-sm mt-2 ml-3 text-start">{error}</p>
        )}
        {success && (
          <p className="text-black text-sm mt-2 ml-3 text-start">{success}</p>
        )}
        <p className="text-[#44444A] mt-6 mb-3 text-sm text-center">
          Didn't get a code?
          <button
            onClick={handleResendOtp}
            className="ml-1 underline cursor-pointer"
            type="button"
          >
            {isOtpSent ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
            ) : (
              "Click to resend"
            )}
          </button>
        </p>

        <button
          type="submit"
          className="w-full bg-[#BDFF00] cursor-pointer text-black text-[16px] font-semibold p-3 rounded-full mb-4 flex justify-center items-center"
          disabled={otp.length !== 6 || isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
          ) : (
            "Verify"
          )}
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

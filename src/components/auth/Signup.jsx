"use client";
import React, { useState, useEffect } from "react";
import CustomInput from "../ui/CustomInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { fetchSignupPageData } from "@/utils/strapi";

const Signup = () => {
  // Hardcoded processed signup data
  const processedSignupData = {
    pageTitle: "Let's Create Your Account",
    pageDescription:
      "Get started with allmyai and start using our AI assistance",
    submitButton: {
      text: "Create Account",
      loadingText: "Creating...",
    },
    termsText:
      "By clicking the Create Account button, you acknowledge that you have read and agree to our Terms of Use and Privacy Policy.",
    loginLink: {
      preText: "Already have an account?",
      linkText: "Login",
      url: "/auth/login",
    },
  };
  const router = useRouter();
  // const [signupData, setSignupData] = useState(null);
  // const [dataLoading, setDataLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Fetch signup page data
  // useEffect(() => {
  //   const loadSignupData = async () => {
  //     try {
  //       setDataLoading(true);
  //       const data = await fetchSignupPageData();
  //       console.log('Signup data received:', data);
  //       setSignupData(data);
  //     } catch (error) {
  //       console.error('Error loading signup page data:', error);
  //     } finally {
  //       setDataLoading(false);
  //     }
  //   };
  //
  //   loadSignupData();
  // }, []);

  // Get field configuration by label
  // const getFieldConfig = (fieldType) => {
  //   if (!signupData) return null;
  //
  //   switch (fieldType) {
  //     case 'email':
  //       return signupData.emailField;
  //     case 'mobile':
  //       return signupData.mobileField;
  //     case 'password':
  //       return signupData.passwordField;
  //     case 'confirmPassword':
  //       return signupData.confirmPasswordField;
  //     default:
  //       return null;
  //   }
  // };

  // Get processed signup data with fallbacks
  // const processedSignupData = {
  //   pageTitle: signupData?.pageTitle || "Let's Create Your Account",
  //   pageDescription: signupData?.pageDescription || "Get started with allmyai and start using our AI assistance",
  //   submitButton: {
  //     text: signupData?.submitButton?.text || "Create Account",
  //     loadingText: signupData?.submitButton?.loadingText || "Creating..."
  //   },
  //   termsText: signupData?.termsText || "By clicking the Create Account button, you acknowledge that you have read and agree to our Terms of Use and Privacy Policy.",
  //   loginLink: {
  //     preText: signupData?.loginLink?.preText || "Already have an account?",
  //     linkText: signupData?.loginLink?.linkText || "Login",
  //     url: signupData?.loginLink?.url || "/auth/login"
  //   }
  // };

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

  const createAccount = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.type === "success") {
        router.push(
          `/auth/confirm-otp?email=${encodeURIComponent(formData.email)}`
        );
      } else {
        if (data.field == "email") {
          setErrors({ email: data.message });
        }
      }
    } catch (error) {
      console.error("Error creating account:", error);
      setErrors({
        general:
          "An error occurred while creating your account. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Basic form validation with better error messages
    if (!formData.email)
      newErrors.email = "Please enter a valid email address.";
    if (!formData.phone) newErrors.phone = "Please enter a valid phone number.";
    if (!formData.password) newErrors.password = "Minimum 8 characters";
    if (
      formData.password !== formData.confirmPassword ||
      formData.confirmPassword === ""
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully", formData);
      createAccount(formData);
    }
  };
  // console.log("Signup data received:", signupData);

  return (
    <div className="lg:w-[80%] mx-auto p-6 justify-center items-center ">
      <h2 className="text-[30px] font-medium text-[#2A0856] text-center">
        {processedSignupData.pageTitle}
      </h2>
      <h1>{process.env.NEXT_PUBLIC_STRAPI_URL}</h1>
      <p className="text-[#44444A] text-[14px] mb-6 text-center">
        {processedSignupData.pageDescription}
      </p>

      <form onSubmit={handleSubmit}>
        <CustomInput
          label={"Email Address"}
          type={"email"}
          placeholder={"Enter your email"}
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <CustomInput
          label={"Mobile Phone"}
          type={"text"}
          placeholder={"Enter your mobile phone"}
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <p className="text-[#6C7278] text-[12px] -mt-3 mb-6 text-start">
          This helps secure and verify your account.
        </p>

        <CustomInput
          label={"Password"}
          type={"password"}
          placeholder={"Enter your password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <CustomInput
          label={"Confirm Password"}
          type={"password"}
          placeholder={"Confirm your password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          className="w-full bg-[#BDFF00] cursor-pointer text-black text-[16px] font-semibold p-3 rounded-full mb-4 flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
          ) : (
            processedSignupData.submitButton.text
          )}
        </button>

        <p className="text-[#44444A] mb-6 text-center text-sm">
          {processedSignupData.termsText}
        </p>

        <p className="text-center text-[14px] mt-4 text-[#6C7278]">
          {processedSignupData.loginLink.preText}{" "}
          <Link
            href={processedSignupData.loginLink.url}
            className="hover:underline font-semibold text-[#C209C1]"
          >
            {processedSignupData.loginLink.linkText}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

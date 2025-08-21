"use client";
import React, { useState, useEffect } from "react";
import CustomInput from "../ui/CustomInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { useUserStore } from "@/store/store";
import { fetchLoginPageData, getStrapiImageUrl } from "@/utils/strapi";

const LoginForm = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginPageData, setLoginPageData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  const { SetIsLogin, SetEmail, SetUserId, SetAvatar } = useUserStore();

  useEffect(() => {
    const loadLoginPageData = async () => {
      try {
        setDataLoading(true);
        const data = await fetchLoginPageData();
        setLoginPageData(data);
      } catch (error) {
        console.error("Error loading login page data:", error);
      } finally {
        setDataLoading(false);
      }
    };

    loadLoginPageData();
  }, []);

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

  const loginToAccount = async (formData) => {
    setIsLoading(true);

    const newErrors = {};

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      if (data.type === "success") {
        localStorage.setItem("token", data.token);
        SetAvatar(data.user.avatar);
        SetIsLogin(true);
        SetEmail(data.user.email);
        SetUserId(data.user.userId);
        let route = localStorage.getItem("route");
        localStorage.setItem("isLogin", true);
        console.log("Route from localStorage:", route);
        if (route !== null && route !== undefined) {
          localStorage.removeItem("route");
          router.push(route);
        } else {
          router.push(`/dashboard`);
        }
      } else {
        if (data.field === "email") {
          newErrors.email =
            "The email you entered is not registered, please check again";
        }
        if (data.field === "password") {
          newErrors.password =
            "The password you provided is incorrect. Please try again.";
        }

        setErrors(newErrors);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ ...newErrors, form: "An unexpected error occurred." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      loginToAccount(formData);
    }
  };

  return (
    <div className="lg:w-[80%] mx-auto p-6 justify-center items-center ">
      <h2 className="text-[30px] font-medium text-[#2A0856]  text-center">
        {dataLoading
          ? "Welcome back!"
          : loginPageData?.heading || "Welcome back!"}
      </h2>
      <p className="text-[#44444A] text-[14px] mb-6 text-center">
        {dataLoading
          ? "Sign in to your allmyai account to access all allmyai products."
          : loginPageData?.subheading ||
            "Sign in to your allmyai account to access all allmyai products."}
      </p>
      <form onSubmit={handleSubmit}>
        <CustomInput
          label={
            dataLoading
              ? "Email Address"
              : loginPageData?.emailLabel || "Email Address"
          }
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <CustomInput
          label={
            dataLoading
              ? "Password"
              : loginPageData?.passwordLabel || "Password"
          }
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
              {dataLoading
                ? "Remember me"
                : loginPageData?.rememberMeLabel || "Remember me"}
            </label>
          </div>
          <Link
            href="/auth/forget-password"
            className="text-[#2A0856] font-medium text-[12px] hover:underline"
          >
            {dataLoading
              ? "Forgot password?"
              : loginPageData?.forgotPasswordText || "Forgot password?"}
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-[#BDFF00] cursor-pointer text-black text-[16px] font-semibold p-3 rounded-full mb-4 flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
          ) : dataLoading ? (
            "Login"
          ) : (
            loginPageData?.loginButtonText || "Login"
          )}
        </button>
        <div className="text-center mb-4">
          {dataLoading ? "or" : loginPageData?.orText || "or"}
        </div>
        <div className="flex justify-between gap-2">
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            type="button"
            className="w-full bg-white border text-[16px] border-gray-300 p-2 font-semibold rounded-full flex items-center justify-center"
          >
            <img
              src={
                !dataLoading && loginPageData?.googleIcon
                  ? getStrapiImageUrl(loginPageData.googleIcon)
                  : "https://www.google.com/favicon.ico"
              }
              alt="Google"
              className="w-8 h-8 mr-2"
            />
            {dataLoading
              ? "Google"
              : loginPageData?.googleButtonText || "Google"}
          </button>

          <button
            type="button"
            className="w-full bg-white border text-[16px] border-gray-300 font-semibold p-2 rounded-full flex items-center justify-center"
          >
            <img
              src={
                !dataLoading && loginPageData?.appleIcon
                  ? getStrapiImageUrl(loginPageData.appleIcon)
                  : "https://www.apple.com/favicon.ico"
              }
              alt="Apple"
              className="w-8 h-8 mr-2"
            />
            {dataLoading ? "Apple" : loginPageData?.appleButtonText || "Apple"}
          </button>
        </div>
        <p className="text-center text-[14px] mt-4 text-[#6C7278]">
          {dataLoading
            ? "Don't have an account? "
            : loginPageData?.signupText
            ? loginPageData.signupText.split("Create")[0]
            : "Don't have an account? "}
          <Link
            href="/auth/sign-up"
            className="hover:underline font-semibold text-[#C209C1]"
          >
            Create
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

"use client";
import React, { useState } from "react";
import CustomInput from "../ui/CustomInput";
import { useRouter, useSearchParams } from "next/navigation";

const NewPass = () => {
  const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email'); // Get email from URL params
    const token = searchParams.get('token'); // Get email from URL params

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [strength, setStrength] = useState(0);

  const resetPassword = async (password, email, token) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword:password, email, resetToken:token }),
    });

    const data = await response.json();
    if (data.type === "success") {
      router.push("/auth/login");
    } else {
      setErrors({ password: data.message || "Failed to reset password" });
    }
  }


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    if (name === "password") {
      evaluateStrength(value);
    }
  };

  const evaluateStrength = (password) => {
    let score = 0;
    if (password.length > 5) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    setStrength(score);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Password reset complete
      resetPassword(formData.password, email, token);
    }
  };

  const strengthLabels = ["Very Weak", "Weak", "Strong", "Very Strong"];
  const strengthColors = ["#ff4d4d", "#ff944d", "#33cc33", "#C209C1"];

  return (
    <div className="w-[80%] mx-auto p-6 justify-center items-center ">
      <h2 className="text-[30px] font-medium text-[#111113] mb-4 text-center">
Set new password      </h2>
      <p className="text-[#44444A] mb-6 text-center">
Enter a new password for your account. Make sure it’s strong and secure.      </p>

      <form onSubmit={handleSubmit}>
        <CustomInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        {/* Password strength bar */}
        <div className="mt-2 mb-4">
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-all duration-300`}
                style={{
                  backgroundColor:
                    i < strength ? strengthColors[strength - 1] : "#e0e0e0",
                }}
              />
            ))}
          </div>
          {formData.password && (
            <p
              className="text-sm mt-1 text-gray-700 text-end"
              style={{ color: strengthColors[strength - 1] }}
            >
              {strengthLabels[strength - 1]}
            </p>
          )}
        </div>

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
          className="w-full bg-[#BDFF00] cursor-pointer text-black font-semibold p-3 rounded-full mb-4"
          disabled={!formData.password || !formData.confirmPassword}
        >
          Set Password
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

export default NewPass;

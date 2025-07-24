import React, { useState } from "react";

import { Syne, Inter } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});
const intee = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you can call EmailJS, Axios, etc.
  };

  return (
    <div className="lg:py-[64px] lg:px-[80px] py-[40px] px-[20px] flex lg:flex-row flex-col items-center justify-center">
      <div className="relative md:w-[600px] md:h-[616px] w-[98%]">
        <img
          src="/contact/contactForm.jpg"
          className="w-full h-full object-cover lg:rounded-tl-[40px] lg:rounded-bl-[40px] rounded-tr-[20px] rounded-tl-[20px] lg:rounded-tr-[0px]"
        />
        <div
          className="absolute top-0 right-0 h-full w-[35%] pointer-events-none hidden lg:block"
          style={{
            background:
              "linear-gradient(to left, rgba(0,0,0,0.9), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-[70%] pointer-events-none block lg:hidden"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,1), transparent)",
          }}
        />
      </div>

      <div className="bg-[#272c51] lg:rounded-tr-[40px] lg:rounded-br-[40px] rounded-br-[20px] rounded-bl-[20px] lg:rounded-bl-[0px] md:max-h-[616px] md:max-w-[600px] w-[98%] md:w-full">
        <form onSubmit={handleSubmit} className="flex flex-col md:gap-[40px] gap-[16px] md:p-[40px] p-[10px] text-white ">
          <h2 className="md:font-semibold font-medium md:text-[34px] text-[30px] text-center">
            Need to contact us?
          </h2>
          <div className="rounded-[16px] md:p-[32px] p-[15px]  bg-[#2b3874]">
            <div className="flex flex-col gap-[24px]">
              <div className="flex md:flex-row flex-col gap-[16px] text-[14px]">
                <div className="md:w-[48%]">
                  <h3 className={`${syne.className} font-medium`}>
                    First name
                  </h3>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-[#2f4290] rounded-[10px] w-full h-[40px] mt-3 p-3"
                  />
                </div>
                <div className="md:w-[48%]">
                  <h3 className={`${syne.className} font-medium`}>Last name</h3>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-[#2f4290] rounded-[10px] w-full h-[40px] mt-3 p-3"
                  />
                </div>
              </div>
              <div>
                <h3 className={`${syne.className} font-medium`}>Email</h3>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#2f4290] w-full rounded-[10px] h-[40px] mt-3 p-3"
                />
              </div>
              <div>
                <h3 className={`${syne.className} font-medium`}>Message</h3>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-[#2f4290] w-full rounded-[10px]  h-[100px] mt-3 p-3 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-[999px] h-[56px] flex items-center justify-center bg-[#BDFF00] font-medium text-black"
              >
                {" "}
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;

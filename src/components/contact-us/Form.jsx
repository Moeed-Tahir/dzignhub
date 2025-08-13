import React, { useState } from "react";
import { motion } from "framer-motion";
import { Syne, Inter } from "next/font/google";
import { getStrapiImageUrl } from "@/utils/strapi";

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

// Default form configuration for fallback
const defaultFormConfig = {
  formTitle: "Need to contact us?",
  contactImage: null,
  firstNameLabel: "First name",
  lastNameLabel: "Last name", 
  emailLabel: "Email",
  messageLabel: "Message",
  firstNamePlaceholder: "",
  lastNamePlaceholder: "",
  emailPlaceholder: "",
  messagePlaceholder: "",
  submitButtonLabel: "Submit",
  successMessage: "Submitted Successfully",
  failureMessage: "Error Submitting"
};

function Form({ formData }) {
  console.log('Form component received data:', formData);
  
  // Use Strapi form data if available, otherwise use default
  const formConfig = formData || defaultFormConfig;
  
  // Initialize form state for the four main fields
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    // Here you can add logic to send data to Strapi or your backend
    // You can use formConfig.successMessage and formConfig.failureMessage for user feedback
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, x: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="lg:py-[64px] lg:px-[80px] py-[40px] px-[20px]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex lg:flex-row flex-col items-center justify-center">
        <motion.div 
          className="relative md:w-[600px] md:h-[616px] w-[98%]"
          variants={imageVariants}
        >
          <img
            src={formConfig.contactImage ? getStrapiImageUrl(formConfig.contactImage) : "/contact/contactForm.jpg"}
            className="w-full h-full object-cover lg:rounded-tl-[40px] lg:rounded-bl-[40px] rounded-tr-[20px] rounded-tl-[20px] lg:rounded-tr-[0px]"
            alt="Contact form"
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
        </motion.div>

        <motion.div 
          className="bg-[#272c51] lg:rounded-tr-[40px] lg:rounded-br-[40px] rounded-br-[20px] rounded-bl-[20px] lg:rounded-bl-[0px] md:max-h-[616px] md:max-w-[600px] w-[98%] md:w-full"
          variants={formVariants}
        >
          <form onSubmit={handleSubmit} className="flex flex-col md:gap-[40px] gap-[16px] md:p-[40px] p-[10px] text-white">
            <motion.h2 
              className="md:font-semibold font-medium md:text-[34px] text-[30px] text-center"
              variants={itemVariants}
            >
              {formConfig.formTitle || "Need to contact us?"}
            </motion.h2>
            <motion.div 
              className="rounded-[16px] md:p-[32px] p-[15px] bg-[#2b3874]"
              variants={itemVariants}
            >
              <div className="flex flex-col gap-[24px]">
                <motion.div 
                  className="flex md:flex-row flex-col gap-[16px] text-[14px]"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="md:w-[48%]"
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                  >
                    <h3 className={`${syne.className} font-medium`}>
                      {formConfig.firstNameLabel || "First name"}
                    </h3>
                    <motion.input
                      style={{ boxShadow: "0px 0px 0px 1px #FFFFFF1A inset" }}
                      type="text"
                      name="firstName"
                      value={formState.firstName}
                      onChange={handleChange}
                      placeholder={formConfig.firstNamePlaceholder || ""}
                      className="bg-[#2f4290] rounded-[10px] w-full h-[40px] mt-3 p-3"
                      whileFocus={{ 
                        boxShadow: "0px 0px 0px 2px #BDFF00 inset",
                        transition: { duration: 0.2 }
                      }}
                    />
                  </motion.div>
                  <motion.div 
                    className="md:w-[48%]"
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                  >
                    <h3 className={`${syne.className} font-medium`}>
                      {formConfig.lastNameLabel || "Last name"}
                    </h3>
                    <motion.input
                      style={{ boxShadow: "0px 0px 0px 1px #FFFFFF1A inset" }}
                      type="text"
                      name="lastName"
                      value={formState.lastName}
                      onChange={handleChange}
                      placeholder={formConfig.lastNamePlaceholder || ""}
                      className="bg-[#2f4290] rounded-[10px] w-full h-[40px] mt-3 p-3"
                      whileFocus={{ 
                        boxShadow: "0px 0px 0px 2px #BDFF00 inset",
                        transition: { duration: 0.2 }
                      }}
                    />
                  </motion.div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <h3 className={`${syne.className} font-medium`}>
                    {formConfig.emailLabel || "Email"}
                  </h3>
                  <motion.input
                    style={{ boxShadow: "0px 0px 0px 1px #FFFFFF1A inset" }}
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder={formConfig.emailPlaceholder || ""}
                    className="bg-[#2f4290] w-full rounded-[10px] h-[40px] mt-3 p-3"
                    whileFocus={{ 
                      boxShadow: "0px 0px 0px 2px #BDFF00 inset",
                      transition: { duration: 0.2 }
                    }}
                    whileHover={{ scale: 1.01 }}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <h3 className={`${syne.className} font-medium`}>
                    {formConfig.messageLabel || "Message"}
                  </h3>
                  <motion.textarea
                    style={{ boxShadow: "0px 0px 0px 1px #FFFFFF1A inset" }}
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder={formConfig.messagePlaceholder || ""}
                    className="bg-[#2f4290] w-full rounded-[10px] h-[100px] mt-3 p-3 resize-none"
                    whileFocus={{ 
                      boxShadow: "0px 0px 0px 2px #BDFF00 inset",
                      transition: { duration: 0.2 }
                    }}
                    whileHover={{ scale: 1.01 }}
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  className="w-full rounded-[999px] h-[56px] flex items-center justify-center bg-[#BDFF00] font-medium text-black"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0px 0px 20px rgba(189, 255, 0, 0.3)",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {formConfig.submitButtonLabel || "Submit"}
                </motion.button>
              </div>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Form;

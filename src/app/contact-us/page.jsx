"use client";
import React, { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/common/Footer";
import Form from "@/components/contact-us/Form";
import Sidebar from "@/components/landing/Sidebar";
function page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <div className="w-full  lg:bg-[url('/contact/bg2.png')]  h-fit bg-[url('/contact/bg-mobile2.png')] object-cover "
      >
       
          <Sidebar onClose={() => setSidebarOpen(false)} open={sidebarOpen} />
          <div className="max-w-[1440px] mx-auto">
            <Navbar
              showSidebarBtn={!sidebarOpen}
              onOpenSidebar={() => setSidebarOpen(true)}
            />
            <Form />
          </div>
        
      </div>
      <FAQ />
      <Footer />
    </div>
  );
}

export default page;

"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/common/Footer";
import Form from "@/components/contact-us/Form";
import Sidebar from "@/components/landing/Sidebar";
import { fetchContactPageData } from "@/utils/strapi";

function page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contactData, setContactData] = useState({
    form: null
  });

  useEffect(() => {
    const loadContactData = async () => {
      try {
        const data = await fetchContactPageData();
        console.log('Contact page data loaded:', data);
        setContactData(data);
      } catch (error) {
        console.error('Error loading contact data:', error);
        // Keep the default null form data if there's an error
      }
    };

    loadContactData();
  }, []);
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
            <Form formData={contactData.form} />
          </div>
        
      </div>
      <FAQ 
        faqData={contactData.faqSection?.faqs} 
        title={contactData.faqSection?.title}
        subtitle={contactData.faqSection?.subtitle}
      />
      <Footer />
    </div>
  );
}

export default page;

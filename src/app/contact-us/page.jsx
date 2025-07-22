'use client';
import React from 'react'
import Navbar from '@/components/landing/Navbar'
import FAQ from '@/components/landing/FAQ'
import Footer from '@/components/common/Footer'
function page() {
  return (
    <div>
        <div className='w-full  bg-[#1B1F3B]'>
        <div className='max-w-[1440px] mx-auto'>
            <Navbar />
        </div>
        </div>
      <FAQ/>
      <Footer/>
    </div>
  )
}

export default page

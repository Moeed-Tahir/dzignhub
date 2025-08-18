import Image from "next/image";
import React from "react";
import { getStrapiImageUrl } from "@/utils/strapi";

const DownloadSection = ({ isImage, mediaData, loading }) => {
  // Get the appropriate key based on isImage prop
  const currentKey = isImage ? 'imageCreation' : 'videoCreation';
  
  // Get Strapi data for download section
  const strapiDownloadSection = mediaData?.[currentKey]?.download;

  // Prepare data with fallbacks
  const getTitle = () => {
    return strapiDownloadSection?.title || "Download Your One & Only App Now";
  };

  const getSubtitle = () => {
    return strapiDownloadSection?.subtitle || "Chose from a selection of high-quality AI models and experiment a selection of settings and presets.";
  };

  const getCtaLabel = () => {
    return strapiDownloadSection?.ctaLabel || "Download App";
  };

  const getCtaLink = () => {
    return strapiDownloadSection?.ctaLink || "#";
  };

  const getBackgroundImage = () => {
    return getStrapiImageUrl(strapiDownloadSection?.backgroundImage) || "/video-creation/bg.png";
  };

  const getArrowImage = () => {
    return getStrapiImageUrl(strapiDownloadSection?.arrowImage) || "/video-creation/arrow.png";
  };

  const getHeroImage = () => {
    return getStrapiImageUrl(strapiDownloadSection?.heroImage) || "/Black-Titanium.svg";
  };

  const title = getTitle();
  const subtitle = getSubtitle();
  const ctaLabel = getCtaLabel();
  const ctaLink = getCtaLink();
  const backgroundImage = getBackgroundImage();
  const arrowImage = getArrowImage();
  const heroImage = getHeroImage();
  return (
    <div className="bg-[#1B1F3B] w-full flex justify-center items-center py-20">
      <div
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className=" max-w-[1280px] w-[90%]  md:w-full relative h-auto overflow-hidden  md:h-[432px] rounded-[40px] mx-auto py-5  md:py-14 px-5  md:px-10"
      >
        <div className="flex  flex-col w-full md:w-1/2 items-start  justify-between text-white text-start ">
          <p className="text-[18px] md:text-[34px] w-full md:w-[350px] font-medium md:font-semibold mb-4">
            {title}
          </p>

          <p className="text-[14px] md:text-[16px] font-normal mb-6">
            {subtitle}
          </p>
          <a 
            href={ctaLink}
            className="w-[186px] mt-[90px]  md:mt-[30px]  h-[56px]  rounded-[999px] text-black cursor-pointer bg-[#BDFF00] font-medium text-[18px] flex items-center justify-center no-underline"
          >
            {ctaLabel}
          </a>
          <Image
            src={arrowImage}
            alt="Arrow"
            layout="responsive"
            width={375}
            height={812}
            className=" !w-[350px] mt-2"
          />
        </div>

        <Image
          src={heroImage}
          alt="Hero Image"
          layout="responsive"
          width={375}
          height={812}
          className="md:!w-full h-auto !w-[170px] md:max-w-[475px] absolute bottom-0 right-[-20px] md:right-20 mx-auto mt-8"
        />
      </div>
    </div>
  );
};

export default DownloadSection;

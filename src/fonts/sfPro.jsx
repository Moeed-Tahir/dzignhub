import localFont from "next/font/local";

export const sfPro = localFont({
  src: [
    {
      path: "./SFPRODISPLAYREGULAR.otf", // ✅ correct relative path
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-sfpro",
});

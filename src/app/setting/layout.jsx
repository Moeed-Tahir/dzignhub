import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/setting/SettingSidebar";

export const metadata = {
  title: "Settings",
  description: "Manage your profile settings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">


        <Navbar />
        <div className="flex  max-w-[1440px] overflow-hidden rounded-[20px] mx-5 lg:mx-auto">
          <Sidebar />
          <main className="flex-1  overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}

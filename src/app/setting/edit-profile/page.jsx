"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

const page = () => {
  const fileInputRef = useRef(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null); // Store the actual file
  const [avatar, setAvatar] = React.useState("");
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [bio, setBio] = React.useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      // Check file size (2MB limit)
      // Reset previous avatar URL if any
      setSelectedFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl);
    } else {
      toast.error("File size exceeds 2MB. Please select a smaller file.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const updateProfileData = async () => {
    setIsLoading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Append file if selected
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      // Append other data
      formData.append("name", name);
      formData.append("location", location);
      formData.append("bio", bio);

      // Debug FormData contents - Use this instead of console.log(formData)
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Send to backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/edit-profile`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData, // Don't set Content-Type header, let browser set it
        }
      );

      const result = await response.json();
      if (result.type === "success") {
        toast.success("Profile updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(result.message || "Failed to update profile", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("An error occurred while updating profile", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProfileData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/get-profile-data`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();

    if (data.type == "success") {
      setAvatar(data.data.avatar);
      setName(data.data.name || "");
      setLocation(data.data.location || "");
      setBio(data.data.bio || "");
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div className="flex flex-1 flex-col items-start justify-center py-[40px] xl:py-[80px] bg-white px-[40px] xl:px-[160px]">
      <div>
        <p className="text-[#1B1F3B] text-[34px] font-semibold ">
          Edit profile
        </p>
      </div>
      <div className="mt-[48px] w-full  flex flex-col gap-8">
        <div className="flex items-center lg:flex-row flex-col  gap-8">
          <div className="!w-[120px] !h-[120px] rounded-full overflow-hidden  flex items-center justify-center">
            {avatar ? (
              <Image src={avatar} alt="avatar" width={120} height={120} />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center items-center lg:items-start gap-2">
            <button
              type="button"
              className="border border-[#E3E9EE] w-[200px] rounded-full px-6 py-[12px] flex items-center text-[14px]  gap-2 font-medium text-[#1B1F3B] bg-white hover:bg-[#F6F6F6] transition"
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
            >
              Upload new image
              <Image
                src={"/setting/upload.svg"}
                alt="upload icon"
                width={20}
                height={20}
              />
            </button>
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <span className="text-[#68686B] font-medium text-center lg:text-start text-[14px] mt-1">
              800x800 PNG, JPG is recommended. Maximum file size: 2Mb
            </span>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-[#68686B] text-[14px] font-semibold">
              Name
            </label>
            <span className="text-[#B0B0B0] text-[14px]">Optional</span>
          </div>
          <div className="relative">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full border border-[#E3E9EE] rounded-[12px] py-[12px] pr-[16px] pl-[36px] text-[#1B1F3B] text-[16px] font-medium focus:outline-none focus:border-[#C209C1] transition"
              placeholder="Enter your name"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B0B0]">
              <Image
                src={"/setting/user.svg"}
                alt="location icon"
                width={20}
                height={20}
              />
            </span>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-[#68686B] text-[14px] font-semibold">
              Location
            </label>
            <span className="text-[#B0B0B0] text-[14px]">Optional</span>
          </div>
          <div className="relative">
            <input
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              className="w-full border border-[#E3E9EE] rounded-[12px] py-[12px] pr-[16px] pl-[36px] text-[#1B1F3B] text-[16px] font-medium focus:outline-none focus:border-[#C209C1] transition"
              placeholder="Enter your location"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B0B0]">
              <Image
                src={"/setting/map.svg"}
                alt="location icon"
                width={20}
                height={20}
              />
              {/* <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 18s6-5.686 6-10A6 6 0 1 0 4 8c0 4.314 6 10 6 10z" stroke="#B0B0B0" strokeWidth="1.5"/><circle cx="10" cy="8" r="2" stroke="#B0B0B0" strokeWidth="1.5"/></svg> */}
            </span>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-[#68686B] text-[14px] font-semibold">
              Bio
            </label>
          </div>
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="w-full border border-[#E3E9EE] rounded-[12px] py-4 px-4 text-[#1B1F3B] text-[16px] font-medium focus:outline-none focus:border-[#C209C1] transition resize-none"
            placeholder="Write something here"
          />
          <span className="text-[#B0B0B0] text-[14px] mt-1 block">
            Enter each message in a new line.
          </span>
        </div>
        <div className="flex gap-4 mt-2">
          <button
            onClick={updateProfileData}
            type="submit"
            className="bg-[#D0FF00] hover:bg-[#b8e600] text-[#1B1F3B] font-medium rounded-full text-[14px] w-[130px] h-[44px] transition flex justify-center items-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
            ) : (
              "Save Changes"
            )}
          </button>
          <button
            type="button"
            className="border border-[#E3E9EE] text-[#1B1F3B] font-medium rounded-full text-[14px] w-[130px] h-[44px] bg-white hover:bg-[#F6F6F6] transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;

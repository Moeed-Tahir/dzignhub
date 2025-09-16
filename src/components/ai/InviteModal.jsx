"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { IoLinkSharp } from "react-icons/io5";

export default function InviteModal({ open, onClose }) {
  const [permission, setPermission] = useState("can view");
  const [email, setEmail] = useState("");

  if (!open) return null;

  return (
    <div className="absolute top-10 right-10 z-50 flex items-center justify-center !w-[420px] bg-opacity-40">
      <div className="bg-white rounded-[28px] shadow-lg border border-[#ECECEC] w-full overflow-hidden relative flex flex-col items-center justify-center py-10 px-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Coming Soon
        </h2>
        <p className="text-[#7b7b7b] text-[16px] font-medium text-center">
          This feature will be available soon 🚀
        </p>
        <div className="flex justify-end items-center pt-6">
          <button
            onClick={onClose}
            className="bg-[#C209C1] text-white px-6 py-2 rounded-xl font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// <div className="absolute top-10 right-10 z-50 flex items-center justify-center !w-[420px]  bg-opacity-40">
//   <div className="bg-white rounded-[28px] shadow-lg border border-[#ECECEC] w-full  overflow-hidden relative">
//     <div className="flex items-center justify-between p-6 pb-4">
//       <h2 className="text-xl font-semibold text-gray-900">Share</h2>
//     </div>

//     <div className="px-6 relative pb-20">
//       <div className="flex gap-2 mb-6">
//         <div className="flex-1 relative">
//           <input
//             type="text"
//             placeholder="Email, name..."
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className={`w-full pl-[20px] pr-[16px] py-[12px] border rounded-lg text-[14px]  focus:outline-none transition duration-200 border-gray-300 focus:ring-2 focus:ring-[#C209C1] }`}
//           />

//           <select
//             value={permission}
//             onChange={(e) => setPermission(e.target.value)}
//             className="appearance-none bg-gray-50 border-0 absolute right-2 rounded-xl px-2 py-2 top-1/2 translate-y-[-50%] pr-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C209C1] cursor-pointer"
//           >
//             <option value="can view">can view</option>
//             <option value="can edit">can edit</option>
//             <option value="can comment">can comment</option>
//           </select>
//           <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//         </div>
//         <button className="bg-[#C209C1]  text-white px-6 py-3 rounded-xl font-medium transition-colors">
//           Invite
//         </button>
//       </div>

//       <div className="mb-6">
//         <h3 className="text-[12px] font-medium text-[#7B7B7B] mb-3">
//           General access
//         </h3>

//         <div className="space-y-3">
//           <div className="flex items-center justify-between  rounded-lg cursor-pointer">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-[#F8F7F7] rounded-lg shadow-2xl flex items-center justify-center">
//                 <Image src={"/Ai/user.svg"} alt="" height={16} width={16} />
//               </div>
//               <div>
//                 <div className="font-medium text-[12px] text-[#121212]">
//                   Only those invited
//                 </div>
//                 <div className="text-[12px] font-medium text-[#7B7B7B]">
//                   4 people
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-between  rounded-lg cursor-pointer">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-[#F8F7F7] rounded-lg shadow-2xl flex items-center justify-center">
//                 <IoLinkSharp className="w-4 h-4 -rotate-45 text-gray-600" />
//               </div>
//               <div>
//                 <div className="font-medium text-[12px] text-[#121212]">
//                   Link Access
//                 </div>
//                 <div className="text-[12px] font-medium text-[#7B7B7B]">
//                   Only users have shared the link
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mb-6">
//         <h3 className="text-[12px] font-medium text-[#7B7B7B] mb-3">
//           People with access
//         </h3>

//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <Image
//                 src="/Ai/ai-dp.png"
//                 alt="Sam Dy"
//                 height={40}
//                 width={40}
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//               <div>
//                 <div className="font-medium text-[#121212] text-[12px]">
//                   Sam Dy
//                 </div>
//                 <div className="text-[12px] font-medium text-[#7B7B7B]">
//                   samual@gmail.com
//                 </div>
//               </div>
//             </div>
//             <div className="relative">
//               <select className="appearance-none bg-transparent border-0 text-sm text-gray-600 pr-2 cursor-pointer focus:outline-none">
//                 <option>can edit</option>
//                 <option>can view</option>
//                 <option>can comment</option>
//               </select>
//               <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <Image
//                 src="/Ai/ai-dp.png"
//                 alt="Sam Dy"
//                 height={40}
//                 width={40}
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//               <div>
//                 <div className="font-medium text-[#121212] text-[12px]">
//                   Sam Dy
//                 </div>
//                 <div className="text-[12px] font-medium text-[#7B7B7B]">
//                   samual@gmail.com
//                 </div>
//               </div>
//             </div>
//             <div className="relative">
//               <select className="appearance-none bg-transparent border-0 text-sm text-gray-600 pr-2 cursor-pointer focus:outline-none">
//                 <option>can edit</option>
//                 <option>can view</option>
//                 <option>can comment</option>
//               </select>
//               <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <Image
//                 src="/Ai/ai-dp.png"
//                 alt="Sam Dy"
//                 height={40}
//                 width={40}
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//               <div>
//                 <div className="font-medium text-[#121212] text-[12px]">
//                   Sam Dy
//                 </div>
//                 <div className="text-[12px] font-medium text-[#7B7B7B]">
//                   samual@gmail.com
//                 </div>
//               </div>
//             </div>
//             <div className="relative">
//               <select className="appearance-none bg-transparent border-0 text-sm text-gray-600 pr-2 cursor-pointer focus:outline-none">
//                 <option>can edit</option>
//                 <option>can view</option>
//                 <option>can comment</option>
//               </select>
//               <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-[#F8F7F7] bottom-0 absolute w-full left-0  p-4 flex items-center justify-between">
//         <span className="text-sm text-gray-600 truncate ">
//           https://Allmyai.com/file/k373nH
//         </span>
//         <button className="flex items-center w-[123px] h-[38px] bg-[#E5E5E5]  rounded-[12px] justify-center  gap-2 text-[#C209C1] hover:text-purple-700 font-medium text-sm transition-colors">
//           <IoLinkSharp className="w-4 h-4 -rotate-45 text-gray-600" />
//           <p className="text-[#121212] text-[14px] font-semibold">
//             Copy Link
//           </p>{" "}
//         </button>
//       </div>
//     </div>
//   </div>
// </div>

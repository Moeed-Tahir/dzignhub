import React from "react";

export default function InviteModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="absolute top-10 right-10 z-50 flex items-center justify-center  bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Invite</h2>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Email, name..."
            className="w-full border rounded-lg px-3 py-2 mb-2"
          />
          <select className="border rounded-lg px-2 py-1 mr-2">
            <option>can view</option>
            <option>can edit</option>
          </select>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">Invite</button>
        </div>
        <div className="mb-4">
          <div className="font-medium mb-2">General access</div>
          <div className="flex items-center mb-2">
            <span className="bg-gray-100 rounded-full p-2 mr-2">🔒</span>
            <span>Only those invited</span>
            <span className="ml-auto text-gray-500">4 people</span>
          </div>
          <div className="flex items-center">
            <span className="bg-gray-100 rounded-full p-2 mr-2">🔗</span>
            <span>Link access</span>
            <span className="ml-auto text-gray-500">Only users have shared the link</span>
          </div>
        </div>
        <div className="mb-4">
          <div className="font-medium mb-2">People with access</div>
          <div className="flex items-center mb-2">
            <img src="/public/avatar.png" alt="avatar" className="w-8 h-8 rounded-full mr-2" />
            <span>Sam Dy</span>
            <span className="ml-auto text-gray-500">can edit</span>
          </div>
          <div className="flex items-center mb-2">
            <img src="/public/Ai/ellie.png" alt="avatar" className="w-8 h-8 rounded-full mr-2" />
            <span>Ellie Joy</span>
            <span className="ml-auto text-gray-500">can edit</span>
          </div>
          <div className="flex items-center mb-2">
            <img src="/public/Ai/sana.png" alt="avatar" className="w-8 h-8 rounded-full mr-2" />
            <span>Hellen</span>
            <span className="ml-auto text-gray-500">Owner</span>
            <span className="ml-2 text-green-500">✔️</span>
          </div>
        </div>
        <div className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2">
          <span className="truncate">https://Allmyai.com/file/k373nH</span>
          <button className="text-purple-600 font-medium">Copy link</button>
        </div>
      </div>
    </div>
  );
}

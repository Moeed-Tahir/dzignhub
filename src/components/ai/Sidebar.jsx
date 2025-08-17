import React, { useState } from "react";
import {
  MessageSquare,
  Plus,
  Search,
  Settings,
  User,
  Menu,
  Trash2,
  Edit3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { format } from 'timeago.js';
import { useRouter } from "next/navigation";

const ChatbotSidebar = ({ aiName, img, isOpen, setIsOpen, conversations,activeChat, setActiveChat, onConversationSelect, setShowIntro, setMessages  }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );




  const deleteConversation = (id, e) => {
    e.stopPropagation();
    setConversations(conversations.filter((conv) => conv.id !== id));
    if (activeChat === id) {
      setActiveChat(conversations[0]?._id || null);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setShowIntro(true);
    router.push(`/dashboard/Ai-Agent/${aiName.toLowerCase()}`);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 h-screen bg-black/50 bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="flex h-screen absolute z-50 top-0 left-0 bg-gray-50">
        <div
          className={`bg-white h-screen border-r border-gray-200 transition-all duration-300 flex flex-col overflow-hidden
            ${isOpen ? "w-80" : "w-16"}
            md:relative md:translate-x-0
            ${
              isOpen
                ? "fixed translate-x-0"
                : "fixed -translate-x-full md:translate-x-0"
            }
          `}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center h-[40px] space-x-3">
              <div
                className={`${
                  isOpen ? "flex" : "hidden"
                } transition-all duration-300 ease-in-out items-end mr-2`}
              >
                <Image
                  src={img}
                  alt="AI"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              {isOpen && (
                <h1 className="font-semibold text-gray-900">{aiName}</h1>
              )}
            </div>
            {isOpen && (
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                title="Collapse sidebar"
              >
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>

          <div className="p-4">
            <button
              onClick={startNewChat}
              className={`flex items-center justify-center space-x-3 px-4 py-3 bg-[#c209c1] hover:bg-[#a50b8e] text-white rounded-full transition-colors ${
                isOpen ? "w-full" : "w-8 h-8 !p-0"
              }`}
              // title={!isOpen ? "New Chat" : ""}
            >
              <Plus className="w-5 h-5" />
              {isOpen && <span>New Chat</span>}
            </button>
          </div>

          {/* Search */}
          <div className="px-4 pb-4">
            {isOpen ? (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c209c1] focus:border-transparent"
                />
              </div>
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors mx-auto"
                title="Search conversations"
              >
                <Search className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            {isOpen ? (
              <div className="px-2">
                {filteredConversations.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No conversations found</p>
                  </div>
                ) : (
                  filteredConversations.map((conversation) => (
                    <div
                      key={conversation._id}
                      onClick={() => {
                        setActiveChat(conversation._id);
                        setShowIntro(false);
                        onConversationSelect && onConversationSelect(conversation._id);
                        router.push(`/dashboard/Ai-Agent/${aiName.toLowerCase()}?conversationId=${conversation._id}`);
                      }}
                      className={`group relative p-3 mx-2 my-1 rounded-lg cursor-pointer transition-all ${
                        activeChat === conversation._id
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`text-sm font-medium truncate ${
                              activeChat === conversation._id
                                ? "text-blue-900"
                                : "text-gray-900"
                            }`}
                          >
                            {conversation.title}
                          </h3>
                        
                        
                          <span className="text-xs text-gray-400 mt-2 block">
                            {format(conversation.createdAt)}
                          </span>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 ml-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) =>
                              deleteConversation(conversation._id, e)
                            }
                            className="p-1 hover:bg-red-100 rounded text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="px-2 space-y-1">
                {conversations.slice(0, 8).map((conversation) => (
                  <div
                    key={conversation._id}
                    onClick={() => setActiveChat(conversation._id)}
                    className={`w-8 h-8 mx-auto rounded-lg cursor-pointer transition-all flex items-center justify-center ${
                      activeChat === conversation.id
                        ? "bg-blue-100 border border-blue-200"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    title={conversation.title}
                  >
                    <MessageSquare
                      className={`w-4 h-4 ${
                        activeChat === conversation._id
                          ? "text-blue-600"
                          : "text-gray-600"
                      }`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:block">
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="fixed top-4 left-3 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              title="Expand sidebar"
            >
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-10 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow md:hidden"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )} */}
    </>
  );
};

export default ChatbotSidebar;

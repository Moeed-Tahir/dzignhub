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
import { useUserStore } from "@/store/store";

const ChatbotSidebar = ({ aiName, img, isOpen, setIsOpen, conversations, activeChat, setActiveChat, onConversationSelect, setShowIntro, setMessages, setConversations }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const { UserId } = useUserStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // states for handelling update title feature
  const [editingConversationId, setEditingConversationId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [isUpdatingTitle, setIsUpdatingTitle] = useState(false);

  // ADD THIS FUNCTION TO START EDITING
  const startEditingTitle = (conversationId, currentTitle, e) => {
    e.stopPropagation();
    setEditingConversationId(conversationId);
    setEditingTitle(currentTitle);
  };

  // ADD THIS FUNCTION TO CANCEL EDITING
  const cancelEditingTitle = () => {
    setEditingConversationId(null);
    setEditingTitle("");
  };

  // ADD THIS FUNCTION TO SAVE TITLE
  const saveConversationTitle = async (conversationId) => {
    if (!editingTitle.trim()) {
      alert("Title cannot be empty");
      return;
    }

    setIsUpdatingTitle(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/agents/conversations/${conversationId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: editingTitle.trim()
          })
        }
      );
      const data = await response.json();

      if (data.success) {
        console.log('[DEBUG] Title updated successfully');

        // Update local state
        const updatedConversations = conversations.map(conv =>
          conv._id === conversationId
            ? { ...conv, title: editingTitle.trim() }
            : conv
        );
        setConversations(updatedConversations);

        // Clear editing state
        setEditingConversationId(null);
        setEditingTitle("");

      } else {
        console.error('Title update failed:', data.error);
        alert('Failed to update title. Please try again.');
      }
    } catch (error) {
      console.error('Error updating title:', error);
      alert('Failed to update title. Please check your connection and try again.');
    } finally {
      setIsUpdatingTitle(false);
    }
  };

  // ADD THIS FUNCTION TO HANDLE ENTER KEY
  const handleTitleKeyPress = (e, conversationId) => {
    if (e.key === 'Enter') {
      saveConversationTitle(conversationId);
    } else if (e.key === 'Escape') {
      cancelEditingTitle();
    }
  };




  const searchConversations = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

   
    const agents = {
      "zara": "brand-designer",
      "sana": "content-creator",
      "novi": "seo-specialist"
    }

    setIsSearching(true);
    try {
      const userId = UserId;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/agents/conversations/search?query=${encodeURIComponent(query)}&user_id=${userId}&agent=${agents[aiName.toLowerCase()]}&limit=10`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setSearchResults(data.results);
        console.log(`Found ${data.count} conversation matches`);
      } else {
        console.error('Search failed:', data.error);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };






  const filteredConversations = conversations.filter(
    (conv) =>
      conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );




  const deleteConversation = async (id, e) => {
    e.stopPropagation();

    try {
      // Show confirmation dialog
      if (!window.confirm('Are you sure you want to delete this conversation? This action cannot be undone.')) {
        return;
      }

      console.log(`[DEBUG] Deleting conversation: ${id}`);

      // Call backend API to delete conversation
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/agents/conversations/${id}?user_id=${UserId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log('[DEBUG] Conversation deleted successfully');

        // Remove from local state
        const updatedConversations = conversations.filter((conv) => conv._id !== id);
        setConversations(updatedConversations);

        // Handle active chat logic
        if (activeChat === id) {
          if (updatedConversations.length > 0) {
            // Set to first remaining conversation
            setActiveChat(updatedConversations[0]._id);
            // Navigate to the new conversation
            router.push(`/dashboard/Ai-Agent/${aiName.toLowerCase()}?conversationId=${updatedConversations[0]._id}`);
          } else {
            // No conversations left, go to new chat
            setActiveChat(null);
            setShowIntro(true);
            setMessages([]);
            router.push(`/dashboard/Ai-Agent/${aiName.toLowerCase()}`);
          }
        }

      } else {
        console.error('Delete failed:', data.error);
        alert('Failed to delete conversation. Please try again.');
      }

    } catch (error) {
      console.error('Error deleting conversation:', error);
      alert('Failed to delete conversation. Please check your connection and try again.');
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
            ${isOpen
              ? "fixed translate-x-0"
              : "fixed -translate-x-full md:translate-x-0"
            }
          `}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center h-[40px] space-x-3">
              <div
                className={`${isOpen ? "flex" : "hidden"
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
              className={`flex items-center justify-center space-x-3 px-4 py-3 bg-[#c209c1] hover:bg-[#a50b8e] text-white rounded-full transition-colors ${isOpen ? "w-full" : "w-8 h-8 !p-0"
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
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    searchConversations(e.target.value); // Real-time search
                  }}
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
                {/* Show search results when searching */}
                {searchQuery && searchResults.length > 0 ? (
                  <>
                    <div className="px-2 py-2 border-b border-gray-200 mb-2">
                      <h4 className="text-xs font-medium text-gray-500">
                        Search Results ({searchResults.length})
                      </h4>
                    </div>
                    {searchResults.map((result) => (
                      <div
                        key={result._id}
                        onClick={() => {
                          setActiveChat(result._id);
                          setShowIntro(false);
                          onConversationSelect && onConversationSelect(result._id);
                          router.push(`/dashboard/Ai-Agent/${aiName.toLowerCase()}?conversationId=${result._id}`);
                          setSearchQuery(""); // Clear search
                          setSearchResults([]);
                        }}
                        className="group relative p-3 mx-2 my-1 rounded-lg cursor-pointer transition-all bg-blue-50 border border-blue-200 hover:bg-blue-100"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium truncate text-blue-900">
                              {result.title}
                            </h3>
                            <p className="text-xs text-blue-600 mt-1">
                              {(result.similarity_score * 100).toFixed(1)}% match
                            </p>
                            <span className="text-xs text-gray-400 mt-1 block">
                              {format(result.createdAt)}
                            </span>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 ml-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="p-1 hover:bg-blue-200 rounded text-blue-400 hover:text-blue-600"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) =>
                                deleteConversation(result._id, e)
                              }
                              className="p-1 hover:bg-red-100 rounded text-blue-400 hover:text-red-600"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : searchQuery && searchResults.length === 0 && !isSearching ? (
                  // Show no results found
                  <div className="text-center py-8 text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No conversations found for "{searchQuery}"</p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 mt-2"
                    >
                      Clear search
                    </button>
                  </div>
                ) : searchQuery && isSearching ? (
                  // Show loading state
                  <div className="text-center py-8 text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                    <p>Searching...</p>
                  </div>
                ) : (
                  // Show regular conversations when not searching
                  <>
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
                            // Don't navigate if we're editing the title
                            if (editingConversationId === conversation._id) return;
                            
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
                              {/* UPDATED TITLE SECTION WITH EDITING CAPABILITY */}
                              {editingConversationId === conversation._id ? (
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="text"
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                    onKeyPress={(e) => handleTitleKeyPress(e, conversation._id)}
                                    onBlur={() => saveConversationTitle(conversation._id)}
                                    className="text-sm font-medium bg-white border border-blue-300 rounded px-2 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    autoFocus
                                    disabled={isUpdatingTitle}
                                  />
                                  {isUpdatingTitle && (
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                                  )}
                                </div>
                              ) : (
                                <h3
                                  className={`text-sm font-medium truncate ${
                                    activeChat === conversation._id
                                      ? "text-blue-900"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {conversation.title}
                                </h3>
                              )}
                              
                              <span className="text-xs text-gray-400 mt-2 block">
                                {format(conversation.createdAt)}
                              </span>
                            </div>
                            
                            {/* UPDATED ACTION BUTTONS */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 ml-2">
                              {editingConversationId === conversation._id ? (
                                // Show save/cancel buttons when editing
                                <>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      saveConversationTitle(conversation._id);
                                    }}
                                    disabled={isUpdatingTitle}
                                    className="p-1 hover:bg-green-100 rounded text-gray-400 hover:text-green-600"
                                    title="Save title"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      cancelEditingTitle();
                                    }}
                                    disabled={isUpdatingTitle}
                                    className="p-1 hover:bg-red-100 rounded text-gray-400 hover:text-red-600"
                                    title="Cancel"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </>
                              ) : (
                                // Show edit/delete buttons when not editing
                                <>
                                  <button
                                    onClick={(e) => startEditingTitle(conversation._id, conversation.title, e)}
                                    className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600"
                                    title="Edit title"
                                  >
                                    <Edit3 className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={(e) => deleteConversation(conversation._id, e)}
                                    className="p-1 hover:bg-red-100 rounded text-gray-400 hover:text-red-600"
                                    title="Delete conversation"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </>
                )}
              </div>
            ) : (
              // Collapsed sidebar view
              <div className="px-2 space-y-1">
                {conversations.slice(0, 8).map((conversation) => (
                  <div
                    key={conversation._id}
                    onClick={() => setActiveChat(conversation._id)}
                    className={`w-8 h-8 mx-auto rounded-lg cursor-pointer transition-all flex items-center justify-center ${activeChat === conversation._id
                      ? "bg-blue-100 border border-blue-200"
                      : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    title={conversation.title}
                  >
                    <MessageSquare
                      className={`w-4 h-4 ${activeChat === conversation._id
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

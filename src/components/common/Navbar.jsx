'use client'
import { useState } from 'react'
import Image from 'next/image'
import { LogOut, Settings, Settings2, Settings2Icon, SettingsIcon, ChevronDown, Plus, MoreHorizontal, Bell, CheckCircle, AlertCircle, MessageSquare, MoreVertical } from 'lucide-react'

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState('Home')
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false)
  const [isAssistantsDropdownOpen, setIsAssistantsDropdownOpen] = useState(false)
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false)

  const menuItems = [
    { name: 'Home', href: '/', type: 'link' },
    { name: 'Manual workspace', href: '/workspace', type: 'dropdown', key: 'workspace' },
    { name: 'Assistants', href: '/assistants', badge: 'PRO', type: 'dropdown', key: 'assistants' }
  ]

  const assistants = [
    { name: 'Zara', role: '(Brand Design)', isPro: false },
    { name: 'Sana', role: '(Content Creator)', isPro: false },
    { name: 'Mira', role: '(Strategy Specialist)', isPro: false },
  ]

  const notifications = [
    {
      id: 1,
      icon: <CheckCircle className="w-10 h-10 text-custom-blue bg-custom-grey p-2" />,
      title: 'Task Completed',
      time: '2 min ago',
      description: 'Your design project has been successfully completed',
      isRead: false
    },
    {
      id: 2,
      icon: <MessageSquare className="w-10 h-10 text-custom-blue bg-custom-grey p-2" />,
      title: 'New Message',
      time: '5 min ago',
      description: 'You have received a new message from your team',
      isRead: false
    },
    {
      id: 3,
      icon: <AlertCircle className="w-10 h-10 text-custom-blue bg-custom-grey p-2" />,
      title: 'System Update',
      time: '1 hour ago',
      description: 'New features have been added to your workspace',
      isRead: true
    },
    {
      id: 4,
      icon: <Bell className="w-10 h-10 text-custom-blue bg-custom-grey p-2" />,
      title: 'Reminder',
      time: '2 hours ago',
      description: 'Don\'t forget to review your pending tasks',
      isRead: true
    }
  ]

  const handleMenuClick = (item) => {
    if (item.type === 'dropdown') {
      if (item.key === 'workspace') {
        setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)
        setIsAssistantsDropdownOpen(false)
        setIsNotificationDropdownOpen(false)
      } else if (item.key === 'assistants') {
        setIsAssistantsDropdownOpen(!isAssistantsDropdownOpen)
        setIsWorkspaceDropdownOpen(false)
        setIsNotificationDropdownOpen(false)
      }
    } else {
      setActiveMenu(item.name)
      setIsWorkspaceDropdownOpen(false)
      setIsAssistantsDropdownOpen(false)
      setIsNotificationDropdownOpen(false)
    }
  }

  const handleNotificationClick = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen)
    setIsWorkspaceDropdownOpen(false)
    setIsAssistantsDropdownOpen(false)
    setIsProfileDropdownOpen(false)
  }

  return (
    <nav className="m-8 bg-white border-b border-gray-200 px-4 py-2 rounded-full shadow-md">
      <div className="flex items-center justify-between">
        
        {/* Left - Logo */}
        <div className="flex items-center space-x-3">
          <Image
            src="/logo-icon.png"
            alt="Logo"
            width={32}
            height={32}
            className="w-6 h-6"
          />
          <span className="text-xl font-bold text-gray-900">
          allmyai
          </span>
        </div>

        {/* Center - Navigation Menu */}
        <div className="p-3 flex items-center bg-[#F7F8F8] rounded-full space-x-1">
          {menuItems.map((item) => (
            <div key={item.name} className="relative">
              <button
                onClick={() => handleMenuClick(item)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeMenu === item.name
                    ? 'text-black px-10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                style={{
                  backgroundColor: activeMenu === item.name ? 'var(--color-green)' : 'transparent'
                }}
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="bg-[#C209C11A] text-[#C209C1] text-xs px-2 py-0.5 rounded-full font-semibold">
                    {item.badge}
                  </span>
                )}
                {item.key === 'workspace' && (
                  <Plus className="w-3 h-3 ml-1" />
                )}
                
              </button>

              {/* Workspace Dropdown */}
              {item.key === 'workspace' && isWorkspaceDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Image Creation
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Video Creation
                  </a>
                </div>
              )}

              {/* Assistants Dropdown */}
              {item.key === 'assistants' && isAssistantsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {assistants.map((assistant, index) => (
                    <div key={assistant.name}>
                      <a href="#" className="flex items-center px-4 py-3 text-sm hover:bg-gray-50">
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                          <Image 
                            src="/avatar.png" 
                            width={32} 
                            height={32} 
                            alt={assistant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex justify-center items-center flex-row min-w-0">
                            <p className="text-black font-medium truncate">{assistant.name}</p>
                            <p className="mx-2 text-gray-500 text-xs truncate">{assistant.role}</p>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right - Notifications & Profile */}
        <div className="flex items-center space-x-4">
          
          {/* Notification Icon */}
          <div className="relative">
            <button 
              onClick={handleNotificationClick}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </button>

            {/* Notification Dropdown */}
            {isNotificationDropdownOpen && (
              <div className="absolute right-0 mt-2 w-100 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`px-4 py-3 hover:bg-gray-50`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="flex-shrink-0">
                            {notification.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-space-between">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {notification.title}
                              </p>
                             
                                <span className="mx-2 text-xs text-gray-500">{notification.time}</span>
                                {!notification.isRead && (
                                  <div className="w-2 h-2 bg-[#1B1F3B] rounded-full"></div>
                                )}
                            
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {notification.description}
                            </p>
                          </div>
                        </div>
                        <button className="ml-2 p-1 text-custom-blue hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 py-3 border-t border-gray-200 flex space-x-2">
                  
                  <button className="flex-1 px-4 py-2 bg-[#C209C11A] text-[#C209C1] text-sm font-medium rounded-full hover:bg-[#C209C122] transition-colors">
                    Mark all as read
                  </button>

                  <button 
                    className="flex-1 px-4 py-2 text-sm font-medium text-black rounded-full transition-colors"
                    style={{ backgroundColor: 'var(--color-green)' }}
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <Image src="/avatar.png" width={32} height={32} alt="Profile" className="rounded-full" />
              </div> 
              <ChevronDown className="w-5 h-5 ml-1" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                 <SettingsIcon className="w-4 h-4 inline-block mr-2" /> Settings
                </a>
                
                <hr className="my-1 border-gray-200" />
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <LogOut className="w-4 h-4 inline-block mr-2" /> Log out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
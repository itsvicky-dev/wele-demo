import {
  MessageSquarePlus,
  MoreVertical,
  Home,
  LayoutDashboard,
  BookOpen,
  Compass,
  Video,
  Users,
  GraduationCap,
  Calendar,
  UserCircle,
  Trophy,
  History,
  HelpCircle,
  MessageSquare,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.svg";

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  path: string;
}

interface ChatItem {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
}

export function Sidebar() {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    "chat-history": true,
  });

  // Dummy chat data
  const dummyChats: ChatItem[] = [
    {
      id: "1",
      title: "How to learn React effectively?",
      timestamp: "2 hours ago",
      preview: "I want to start learning React from scratch...",
    },
    {
      id: "2",
      title: "Career advice for software development",
      timestamp: "Yesterday",
      preview: "What skills should I focus on to become...",
    },
    {
      id: "3",
      title: "Best practices for coding interviews",
      timestamp: "2 days ago",
      preview: "Can you help me prepare for technical interviews...",
    },
    {
      id: "4",
      title: "Understanding JavaScript closures",
      timestamp: "3 days ago",
      preview: "I am having trouble understanding closures...",
    },
    {
      id: "5",
      title: "Database design principles",
      timestamp: "1 week ago",
      preview: "What are the key principles for good database...",
    }
  ];

  const set1Menus: MenuItem[] = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/dashboard",
    },
    {
      id: "learning-hub",
      title: "Learning Hub",
      icon: <BookOpen size={18} />,
      path: "/learning-hub",
    },
    {
      id: "career-compass",
      title: "Career Compass",
      icon: <Compass size={18} />,
      path: "/career-compass",
    },
    {
      id: "mock-interviews",
      title: "Mock Interviews",
      icon: <Video size={18} />,
      path: "/mock-interviews",
    },
    {
      id: "learning-community",
      title: "Learning Community",
      icon: <Users size={18} />,
      path: "/learning-community",
    },
  ];

  const set2Menus: MenuItem[] = [
    {
      id: "courses",
      title: "Courses",
      icon: <GraduationCap size={18} />,
      path: "/courses",
    },
    {
      id: "webinars",
      title: "Webinars",
      icon: <Calendar size={18} />,
      path: "/webinars",
    },
    {
      id: "mentors",
      title: "Mentors",
      icon: <UserCircle size={18} />,
      path: "/mentors",
    },
    {
      id: "skill-showcase",
      title: "Skill Showcase",
      icon: <Trophy size={18} />,
      path: "/skill-showcase",
    },
    {
      id: "chat-history",
      title: "Chat History",
      icon: <History size={18} />,
      path: "/chat-history",
    },
  ];

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-64 bg-[#f9fafb] flex flex-col h-screen border-r border-[#0d0d0d0d]">
      <div className="p-4">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <img src={Logo} alt="" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        <div className="space-y-1">
          <Link
            to="/chat"
            className="flex items-center gap-2 text-gray-600 px-3 py-2.5 rounded-lg transition-all hover:bg-white hover:text-[#00BF53]"
          >
            <MessageSquarePlus size={18} />
            <span className="text-sm font-medium">New Chat</span>
          </Link>
          
          <div className="px-3 py-2 mt-4">
            <span className="text-xs font-medium text-gray-500 tracking-wide">Menus</span>
          </div>
          
          {set1Menus.map((menu) => (
            <Link
              key={menu.id}
              to={menu.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                location.pathname === menu.path
                  ? "text-[#00BF53] font-medium"
                  : "text-gray-600 hover:bg-white hover:text-[#00BF53]"
              }`}
            >
              {menu.icon}
              <span>{menu.title}</span>
            </Link>
          ))}
        </div>

        {/* <div className="border-t border-gray-200 my-4"></div> */}

        <div className="space-y-1">
          {set2Menus
            .filter((menu) => menu.id !== "chat-history")
            .map((menu) => (
              <Link
                key={menu.id}
                to={menu.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                  location.pathname === menu.path
                    ? "text-[#00BF53] font-medium"
                    : "text-gray-600 hover:bg-white hover:text-[#00BF53]"
                }`}
              >
                {menu.icon}
                <span>{menu.title}</span>
              </Link>
            ))}
        </div>

        {/* Chat History Section */}
        <div className="mt-4">
          <div className="px-3 py-2 mb-2">
            <span className="text-xs font-medium text-gray-500 tracking-wide">Your Chats</span>
          </div>
          
          <button
            onClick={() => toggleSection("chat-history")}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:text-[#00BF53] rounded-lg transition-all"
          >
            <div className="flex items-center gap-2">
              <History size={16} />
              <span>Chat History</span>
            </div>
            {expandedSections["chat-history"] ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>

          {expandedSections["chat-history"] && (
            <div className="mt-2 space-y-1">
              {dummyChats.map((chat) => (
                <Link
                  key={chat.id}
                  to={`/chat?id=${chat.id}`}
                  className="block px-3 py-2 rounded-lg hover:bg-white transition-all group"
                >
                  <div className="flex items-start gap-2">
                    <MessageSquare
                      size={14}
                      className="text-gray-400 mt-0.5 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-800 truncate group-hover:text-[#00BF53]">
                        {chat.title}
                      </div>
                      <div className="text-xs text-gray-500 truncate mt-0.5">
                        {chat.preview}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {chat.timestamp}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
              alt="User"
              className="w-full h-full"
            />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-800">
              Naveen Kumar B
            </div>
            <div className="text-xs text-gray-500">Learner</div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import { chatService } from "../services/chatService";
import type { Conversation } from "../lib/database.types";

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  path: string;
}

export function Sidebar() {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    "chat-history": true,
  });
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    setLoading(true);
    const data = await chatService.getConversations();
    setConversations(data.slice(0, 5)); // Show only recent 5 chats
    setLoading(false);
  };

  const set1Menus: MenuItem[] = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: <LayoutDashboard size={16} />,
      path: "/dashboard",
    },
    {
      id: "learning-hub",
      title: "Learning Hub",
      icon: <BookOpen size={16} />,
      path: "/learning-hub",
    },
    {
      id: "career-compass",
      title: "Career Compass",
      icon: <Compass size={16} />,
      path: "/career-compass",
    },
    {
      id: "mock-interviews",
      title: "Mock Interviews",
      icon: <Video size={16} />,
      path: "/mock-interviews",
    },
    {
      id: "learning-community",
      title: "Learning Community",
      icon: <Users size={16} />,
      path: "/learning-community",
    },
  ];

  const set2Menus: MenuItem[] = [
    {
      id: "courses",
      title: "Courses",
      icon: <GraduationCap size={16} />,
      path: "/courses",
    },
    {
      id: "webinars",
      title: "Webinars",
      icon: <Calendar size={16} />,
      path: "/webinars",
    },
    {
      id: "mentors",
      title: "Mentors",
      icon: <UserCircle size={16} />,
      path: "/mentors",
    },
    {
      id: "skill-showcase",
      title: "Skill Showcase",
      icon: <Trophy size={16} />,
      path: "/skill-showcase",
    },
    {
      id: "chat-history",
      title: "Chat History",
      icon: <History size={16} />,
      path: "/chat-history",
    },
  ];

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-60 bg-[#f9fafb] flex flex-col h-screen border-r border-[#0d0d0d0d]">
      <div className="p-3.5">
        <Link to="/" className="flex items-center gap-2 mb-1">
          <img src={Logo} alt="" />
        </Link>
      </div>

      <div className="flex-1 overflow-hidden hover:overflow-y-auto px-3">
        <div className="">
          <Link
            to="/chat"
            className="flex items-center gap-2 text-gray-600 px-3 py-2.5 rounded-lg transition-all hover:bg-white hover:text-[#00BF53]"
          >
            <MessageSquarePlus size={16} />
            <span className="text-sm font-medium">New Chat</span>
          </Link>
          
          <div className="px-3 py-2">
            <span className="text-xs font-medium text-gray-500 tracking-wide">For me</span>
          </div>
          
          {set1Menus.map((menu) => (
            <Link
              key={menu.id}
              to={menu.path}
              className={`flex items-center gap-3 px-3 py-[5px] rounded-lg transition-all text-sm ${
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

        <div className="">
          <div className="px-3 py-2">
            <span className="text-xs font-medium text-gray-500 tracking-wide">Menus</span>
          </div>
          {set2Menus
            .filter((menu) => menu.id !== "chat-history")
            .map((menu) => (
              <Link
                key={menu.id}
                to={menu.path}
                className={`flex items-center gap-3 px-3 py-[5px] rounded-lg transition-all text-sm ${
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
        <div className="">
          <div className="px-3 py-2 mb-1">
            <span className="text-xs font-medium text-gray-500 tracking-wide">Your Chats</span>
          </div>
          
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <History size={16} />
              <span>Chat History</span>
            </div>
            <Link
              to="/chat-history"
              className="text-xs text-[#00BF53] hover:underline font-medium"
            >
              Show All
            </Link>
          </div>

          {expandedSections["chat-history"] && (
            <div className="mt-2 space-y-1">
              {loading ? (
                <div className="px-3 py-2 text-xs text-gray-500">Loading...</div>
              ) : conversations.length === 0 ? (
                <div className="px-3 py-2 text-xs text-gray-500">No chats yet</div>
              ) : (
                conversations.map((conversation) => (
                  <Link
                    key={conversation.id}
                    to={`/chat?id=${conversation.id}`}
                    className="block px-3 py-2 rounded-lg hover:bg-white transition-all group"
                  >
                    <div className="flex items-start gap-2">
                      <MessageSquare
                        size={14}
                        className="text-gray-400 mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-gray-800 truncate group-hover:text-[#00BF53]">
                          {conversation.title}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {chatService.formatTimestamp(conversation.updated_at)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 p-2 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <img
              src="https://api.dicebear.com/9.x/notionists/svg?seed=varient5"
              alt="User"
              className="w-full h-full"
            />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-800">
              Vicky S
            </div>
            <div className="text-xs text-gray-500">Learner</div>
          </div>
        </div>
      </div>
    </div>
  );
}

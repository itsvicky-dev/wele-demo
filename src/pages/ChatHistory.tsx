import { Search, SlidersHorizontal, Clock, MoreHorizontal, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface ChatItem {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
}

export function ChatHistory() {
  const chats: ChatItem[] = [
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

  return (
    <div className="flex-1 flex flex-col h-screen bg-white max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Library</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search your Threads..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BF53] focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            Select
          </button>
          <button className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-1">
            Type
            <span className="text-gray-400 flex"><ChevronDown size={14} /></span>
          </button>
          <button className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-1">
            Temporary Threads: Show
            <span className="text-gray-400"><ChevronDown size={14} /></span>
          </button>
          <div className="ml-auto">
            <button className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-1">
              Sort: Newest
              <span className="text-gray-400"><ChevronDown size={14} /></span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-8 py-4 scrollbar-hide">
        <div className="space-y-4">
          {chats.map((chat) => (
            <Link
              key={chat.id}
              to={`/chat?id=${chat.id}`}
              className="block border-b border-gray-200 pb-4 hover:bg-gray-50 -mx-4 px-4 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-medium text-gray-800 flex-1 pr-4">
                  {chat.title}
                </h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {chat.preview}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock size={14} />
                <span>{chat.timestamp}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

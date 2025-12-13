import React, { useState } from "react";
import {
  ArrowLeft,
  MoreHorizontal,
  Send,
  Smile,
  Mic,
  Plus,
  MessageSquare,
  Users,
  BookOpen,
  Compass,
  Award,
  History,
  User,
  ChevronRight,
  SendHorizonal,
  SendHorizonalIcon,
  Search,
} from "lucide-react";

interface Community {
  id: string;
  name: string;
  description: string;
  icon: string;
  members: number;
  avatars: string[];
}

interface Message {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  isCurrentUser?: boolean;
  reactions?: { [emoji: string]: number };
  replyTo?: {
    userName: string;
    content: string;
  };
}

interface ChatHistory {
  id: string;
  title: string;
  timestamp: string;
}

const communities: Community[] = [
  {
    id: "1",
    name: "Modern HTML & CSS",
    description:
      "Master responsive design, CSS Grid, Flexbox, and modern styling techniques",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    members: 237,
    avatars: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    ],
  },
  {
    id: "2",
    name: "React.js",
    description:
      "Learn hooks, state management, component lifecycle, and modern React patterns",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    members: 328,
    avatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face",
    ],
  },
  {
    id: "3",
    name: "JavaScript",
    description:
      "Deep dive into ES6+, async programming, DOM manipulation, and core concepts",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    members: 178,
    avatars: [
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=32&h=32&fit=crop&crop=face",
    ],
  },
  {
    id: "4",
    name: "PHP",
    description:
      "Server-side development, databases, security, and building dynamic web applications",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    members: 254,
    avatars: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    ],
  },
];

const chatHistory: ChatHistory[] = [
  { id: "1", title: "What WeLe is about", timestamp: "2 hours ago" },
  {
    id: "2",
    title: "What are the Features we h...",
    timestamp: "20 hours ago",
  },
  { id: "3", title: "Is python better than Java?", timestamp: "Yesterday" },
  { id: "4", title: "Explain me about Java", timestamp: "" },
];

const communityMessages: { [key: string]: Message[] } = {
  "1": [
    // HTML & CSS
    {
      id: "1",
      userName: "Sharan",
      userAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      content:
        "Hey everyone! Just finished the CSS Grid tutorial. The layout possibilities are amazing!",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      userName: "Priya",
      userAvatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=32&h=32&fit=crop&crop=face",
      content:
        "@Sharan That's great! I'm still struggling with flexbox vs grid. When should I use which?",
      timestamp: "10:45 AM",
    },
    {
      id: "3",
      userName: "You",
      userAvatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
      content:
        "I found this great resource that explains it well. Grid is better for 2D layouts like entire page structures, while Flexbox works great for 1D layouts like navigation bars or card layouts.",
      timestamp: "10:50 AM",
      isCurrentUser: true,
      replyTo: {
        userName: "Priya",
        content: "I'm still struggling with flexbox vs grid. When should I use which?"
      }
    },
    {
      id: "4",
      userName: "CSS Mentor",
      userAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      content:
        "Perfect explanation! Use Flexbox for 1D layouts (rows or columns) and Grid for 2D layouts (rows AND columns). Grid is perfect for page layouts!",
      timestamp: "11:00 AM",
    },
    {
      id: "5",
      userName: "Rahul",
      userAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      content:
        "I just learned about CSS custom properties (variables). They're game-changers for theming!",
      timestamp: "11:15 AM",
    },
    {
      id: "6",
      userName: "You",
      userAvatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
      content:
        "CSS variables are amazing! I'm using them in my current project for dark/light theme switching. So much cleaner than SASS variables.",
      timestamp: "11:20 AM",
      isCurrentUser: true,
    },
    {
      id: "7",
      userName: "Anita",
      userAvatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face",
      content:
        "Has anyone tried the new CSS container queries? They seem perfect for responsive components.",
      timestamp: "11:30 AM",
    },
    {
      id: "8",
      userName: "CSS Mentor",
      userAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      content:
        "@Anita Container queries are still experimental but very promising! For now, stick to media queries for production.",
      timestamp: "11:45 AM",
    },
  ],
  "2": [
    // React.js
    {
      id: "1",
      userName: "Abi",
      userAvatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
      content:
        "Just learned about useEffect! Finally understanding how to handle side effects properly.",
      timestamp: "2:15 PM",
    },
    {
      id: "2",
      userName: "You",
      userAvatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
      content:
        "That's awesome! useEffect was a game-changer for me too. The cleanup function is really important for preventing memory leaks.",
      timestamp: "2:20 PM",
      isCurrentUser: true,
      replyTo: {
        userName: "Abi",
        content: "Just learned about useEffect! Finally understanding how to handle side effects properly."
      }
    },
    {
      id: "3",
      userName: "Kavya",
      userAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
      content:
        "useEffect was confusing at first, but once you get the dependency array concept, it clicks!",
      timestamp: "2:30 PM",
    },
    {
      id: "4",
      userName: "React Mentor",
      userAvatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face",
      content:
        "Great progress! Next, try building a small project with useState and useEffect together. Maybe a weather app?",
      timestamp: "2:45 PM",
    },
    {
      id: "5",
      userName: "You",
      userAvatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
      content:
        "I'm actually working on a todo app right now! It's helping me understand how state updates trigger re-renders.",
      timestamp: "2:50 PM",
      isCurrentUser: true,
    },
    {
      id: "6",
      userName: "Deepak",
      userAvatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face",
      content:
        "I'm struggling with prop drilling. Should I use Context API or Redux for state management?",
      timestamp: "3:00 PM",
    },
    {
      id: "7",
      userName: "Sneha",
      userAvatar:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=32&h=32&fit=crop&crop=face",
      content:
        "@Deepak For small to medium apps, Context API is perfect. Redux is overkill unless you have complex state logic.",
      timestamp: "3:15 PM",
    },
    {
      id: "8",
      userName: "React Mentor",
      userAvatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face",
      content:
        "Also consider Zustand or Jotai for simpler state management solutions. They're lighter than Redux!",
      timestamp: "3:30 PM",
    },
  ],
  "3": [
    // JavaScript
    {
      id: "1",
      userName: "Sathish",
      userAvatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=32&h=32&fit=crop&crop=face",
      content:
        "Can someone explain async/await vs Promises? I keep getting confused between them.",
      timestamp: "4:20 PM",
    },
    {
      id: "2",
      userName: "You",
      userAvatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
      content:
        "I struggled with this too! Think of async/await as a cleaner way to write Promise chains. Instead of .then().then(), you can write code that looks synchronous.",
      timestamp: "4:25 PM",
      isCurrentUser: true,
      replyTo: {
        userName: "Sathish",
        content: "Can someone explain async/await vs Promises? I keep getting confused between them."
      }
    },
    {
      id: "3",
      userName: "Arjun",
      userAvatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=32&h=32&fit=crop&crop=face",
      content:
        "async/await is just syntactic sugar for Promises! It makes the code look more synchronous and easier to read.",
      timestamp: "4:35 PM",
    },
    {
      id: "4",
      userName: "JS Mentor",
      userAvatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=32&h=32&fit=crop&crop=face",
      content:
        "Exactly! Both handle asynchronous operations. Promises use .then() chains, while async/await uses try/catch blocks.",
      timestamp: "4:50 PM",
    },
    {
      id: "5",
      userName: "Meera",
      userAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      content:
        "I'm working with APIs and getting CORS errors. Any tips on handling this?",
      timestamp: "5:05 PM",
    },
    {
      id: "6",
      userName: "You",
      userAvatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
      content:
        "I faced this issue last week! For development, you can use a browser extension to disable CORS or set up a proxy in your dev server.",
      timestamp: "5:10 PM",
      isCurrentUser: true,
      replyTo: {
        userName: "Meera",
        content: "I'm working with APIs and getting CORS errors. Any tips on handling this?"
      }
    },
    {
      id: "7",
      userName: "Vikram",
      userAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      content:
        "@Meera CORS is a browser security feature. You need to configure your server to allow cross-origin requests or use a proxy.",
      timestamp: "5:20 PM",
    },
    {
      id: "8",
      userName: "JS Mentor",
      userAvatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=32&h=32&fit=crop&crop=face",
      content:
        "For development, you can use a CORS proxy or configure your dev server. In production, set proper CORS headers on your API.",
      timestamp: "5:35 PM",
    },
  ],
  "4": [
    // PHP
    {
      id: "1",
      userName: "Vennila",
      userAvatar:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=32&h=32&fit=crop&crop=face",
      content:
        "Working on my first PHP project! Building a simple contact form with validation.",
      timestamp: "6:10 PM",
    },
    {
      id: "2",
      userName: "You",
      userAvatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
      content:
        "That's exciting! Make sure to use filter_var() for email validation and htmlspecialchars() to prevent XSS attacks.",
      timestamp: "6:15 PM",
      isCurrentUser: true,
      replyTo: {
        userName: "Vennila",
        content: "Working on my first PHP project! Building a simple contact form with validation."
      }
    },
    {
      id: "3",
      userName: "Karthik",
      userAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      content:
        "That's awesome! Don't forget to sanitize your inputs to prevent SQL injection attacks.",
      timestamp: "6:25 PM",
    },
    {
      id: "4",
      userName: "PHP Mentor",
      userAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      content:
        "Great advice! Always use prepared statements and validate data on both client and server side.",
      timestamp: "6:40 PM",
    },
    {
      id: "5",
      userName: "Ravi",
      userAvatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
      content:
        "I'm learning Laravel. The Eloquent ORM is so much easier than writing raw SQL queries!",
      timestamp: "6:55 PM",
    },
    {
      id: "6",
      userName: "You",
      userAvatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
      content:
        "Laravel is amazing! I'm using it for my current project. The migration system and Blade templating make development so much faster.",
      timestamp: "7:00 PM",
      isCurrentUser: true,
      replyTo: {
        userName: "Ravi",
        content: "I'm learning Laravel. The Eloquent ORM is so much easier than writing raw SQL queries!"
      }
    },
    {
      id: "7",
      userName: "Pooja",
      userAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
      content:
        "@Ravi Laravel is great! Have you tried the Artisan commands yet? They're real time-savers.",
      timestamp: "7:10 PM",
    },
    {
      id: "8",
      userName: "PHP Mentor",
      userAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      content:
        "Laravel is excellent for rapid development. Make sure to understand the MVC pattern and dependency injection concepts.",
      timestamp: "7:25 PM",
    },
  ],
};

export function LearningCommunity() {
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null);

  const reactionEmojis = ["👍", "❤️", "😂", "😮", "😢", "😡"];

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedCommunity) {
      const message: Message = {
        id: Date.now().toString(),
        userName: "You",
        userAvatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isCurrentUser: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const loadCommunityMessages = (community: Community) => {
    setSelectedCommunity(community);
    setMessages(communityMessages[community.id] || []);
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === messageId) {
          const reactions = { ...msg.reactions };
          reactions[emoji] = (reactions[emoji] || 0) + 1;
          return { ...msg, reactions };
        }
        return msg;
      })
    );
  };

  return (
    <div className="flex-1 h-screen bg-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedCommunity ? (
          <>
            {/* Chat Header */}
            <div className="bg-white">
              <div className="flex items-center justify-between border-b border-gray-200 py-4 px-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSelectedCommunity(null)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div className="flex items-center space-x-3">
                    <Users size={20} className="text-gray-600" />
                    <span className="text-lg font-medium">
                      Learning Community
                    </span>
                    <ChevronRight size={16} className="text-gray-400" />
                    <span className="text-lg font-medium">
                      {selectedCommunity.name}
                    </span>
                  </div>
                </div>
                <button className="text-gray-600 hover:text-gray-800">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* Group Tabs */}
              <div className="flex items-center space-x-4 mt-4 max-w-5xl mx-auto">
                <span className="text-sm text-gray-600">All Groups:</span>
                <div className="flex space-x-2">
                  {communities.map((community) => (
                    <button
                      key={community.id}
                      onClick={() => loadCommunityMessages(community)}
                      className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                        selectedCommunity.id === community.id
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <img
                        src={community.icon}
                        alt={community.name}
                        className="w-5 h-5"
                      />
                      <span>{community.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-[#FBFBFB] border border-[#0000001A] max-w-5xl mx-auto w-full px-4 mt-4 rounded-[14px]">
              {/* Community Info */}
              <div className="mt-4 p-[10px] mb-2 bg-[#eaeaea] rounded-[14px] max-w-5xl mx-auto w-full">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="bg-gray-100 rounded-full p-2">
                        <img
                          src={selectedCommunity.icon}
                          alt={selectedCommunity.name}
                          className="w-6 h-6"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">
                          {selectedCommunity.name}
                        </span>
                        <span className="text-sm text-gray-600">
                          Abilash, Ashika, Ashwin...
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="flex space-x-2 text-gray-600 hover:text-gray-800">
                    <Search size={20} />
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-20 max-h-[calc(100vh-235px)] scrollbar-hide">
                <div className="max-w-5xl mx-auto">
                  <div className="text-center">
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      Yesterday
                    </span>
                  </div>

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex space-x-3 ${
                        message.isCurrentUser ? "justify-end" : ""
                      }`}
                      onMouseEnter={() => setHoveredMessage(message.id)}
                      onMouseLeave={() => setHoveredMessage(null)}
                    >
                      {!message.isCurrentUser && (
                        <img
                          src={message.userAvatar}
                          alt={message.userName}
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <div
                        className={`max-w-2xl mb-4 relative ${
                          message.isCurrentUser ? "text-right" : ""
                        }`}
                      >
                        <div
                          className={`flex items-center ${
                            message.isCurrentUser && "justify-end"
                          }  space-x-2 mb-1`}
                        >
                          <span className="text-sm font-medium text-gray-800">
                            {message.userName}
                          </span>
                        </div>
                        <div
                          className={`p-3 rounded-lg text-sm text-left relative ${
                            message.isCurrentUser
                              ? "bg-[#f1fdf054] text-black"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {message.replyTo && (
                            <div className="mb-2 p-2 bg-white bg-opacity-50 rounded border-l-4 border-green-500">
                              <div className="text-xs font-medium text-green-600 mb-1">
                                {message.replyTo.userName}
                              </div>
                              <div className="text-xs text-gray-600 truncate">
                                {message.replyTo.content.length > 50 
                                  ? message.replyTo.content.substring(0, 50) + "..."
                                  : message.replyTo.content
                                }
                              </div>
                            </div>
                          )}
                          {message.content}

                          {/* Emoji Reactions Popup */}
                          {hoveredMessage === message.id && (
                            <div
                              className={`absolute -top-12 ${
                                message.isCurrentUser ? "right-0" : "left-0"
                              } bg-white border border-gray-200 rounded-full px-2 py-1 shadow-lg flex space-x-1 z-20`}
                            >
                              {reactionEmojis.map((emoji) => (
                                <button
                                  key={emoji}
                                  onClick={() =>
                                    handleReaction(message.id, emoji)
                                  }
                                  className="hover:bg-gray-100 p-1 rounded text-lg"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Display Reactions */}
                        {message.reactions &&
                          Object.keys(message.reactions).length > 0 && (
                            <div
                              className={`flex space-x-1 mt-1 ${
                                message.isCurrentUser
                                  ? "justify-end"
                                  : "justify-start"
                              }`}
                            >
                              {Object.entries(message.reactions).map(
                                ([emoji, count]) => (
                                  <span
                                    key={emoji}
                                    className="bg-gray-200 rounded-full px-2 py-1 text-xs flex items-center space-x-1"
                                  >
                                    <span>{emoji}</span>
                                    <span>{count}</span>
                                  </span>
                                )
                              )}
                            </div>
                          )}

                        <div className="text-[10px] text-gray-500 mt-1">
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Message Input - Fixed at bottom center */}
            <div
              className="fixed bottom-[25px] bg-white rounded-[16px] border border-gray-200 px-4 z-10 my-4"
              style={{
                left: "calc(50% + 500px - 50vw)",
                width: "calc(100vw - 760px)",
              }}
            >
              <div className="flex items-center space-x-3">
                <button className="text-gray-600 hover:text-gray-800">
                  <Plus size={20} />
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <Smile size={20} />
                </button>
                <div className="flex-1">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="w-full border-0 px-4 py-4 focus:outline-none"
                  />
                </div>
                {newMessage.trim() === "" ? (
                  <button className="text-gray-600 hover:text-[#00BF53] p-2">
                    <Mic size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleSendMessage}
                    className="text-white p-2 rounded-lg bg-[#00BF531A]"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_1681_5071)">
                        <path
                          d="M2.78169 8.66539H16.001L2.80035 15.7827C2.50836 15.9234 2.20636 15.9907 1.91235 15.9907C1.44835 15.9907 1.00435 15.8207 0.654355 15.5014C0.0943549 14.9881 -0.0889784 14.2314 0.175022 13.5241L0.212355 13.4421L2.78169 8.66539ZM2.68902 0.186727C1.98702 -0.14794 1.16502 -0.0259401 0.595022 0.49806C0.0356883 1.01273 -0.146978 1.77006 0.119688 2.47673L2.77235 7.33206H15.9997L2.73969 0.213393L2.68902 0.186727Z"
                          fill="#00BF53"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1681_5071">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Header */}
            <div className="bg-white px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Users size={20} className="text-gray-600" />
                <span className="text-lg font-medium">Learning Community</span>
              </div>
            </div>

            {/* Communities List */}
            <div className="flex-1 p-6 max-w-5xl mx-auto w-full">
              <div className="space-y-4">
                {communities.map((community) => (
                  <div
                    key={community.id}
                    onClick={() => loadCommunityMessages(community)}
                    className="bg-white rounded-[16px] p-4 border border-gray-200 bg-[#F9F9F9] hover:border-gray-400 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <img
                            src={community.icon}
                            alt={community.name}
                            className="w-8 h-8"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 mb-1">
                            {community.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {community.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          {community.avatars
                            .slice(0, 4)
                            .map((avatar, index) => (
                              <img
                                key={index}
                                src={avatar}
                                alt=""
                                className="w-6 h-6 rounded-full border border-white"
                                style={{ marginLeft: index > 0 ? "-8px" : "0" }}
                              />
                            ))}
                          <span className="text-sm text-gray-600 ml-2">
                            +{community.members} more...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

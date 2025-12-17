import {
  Play,
  Pause,
  Volume2,
  Settings,
  Maximize,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  FileText,
  Sparkles,
  Bot,
  Send,
  ThumbsUp,
  Calendar,
  Globe,
  Clock,
  Star,
  FileSpreadsheet,
  Lock,
  ThumbsUpIcon,
  ThumbsDown,
  ThumbsDownIcon,
  StarIcon,
  X,
  ClipboardList,
  BookOpen,
  ArrowUpRight,
  ArrowUpLeft,
  Users,
  Trophy,
  Medal,
  Crown,
  Mic,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { VideoPlayer } from "./VideoPlayer";
import { ChatTextArea } from "./ChatTextArea";
import { MCQAssessment } from "./MCQAssessment";
import { ResizableMiniPlayer } from "./ResizableMiniPlayer";

interface Comment {
  id: number;
  user: string;
  text: string;
  time: string;
  likes: number;
  pinned?: boolean;
}

interface Note {
  id: number;
  title: string;
  content: string;
  timestamp: string;
}

interface Trainer {
  name: string;
  title: string;
  company: string;
  rating: number;
  reviews: number;
  avatar: string;
}

interface Session {
  id: number;
  title: string;
  courseName: string;
  videoUrl: string;
  description?: string;
  duration: number;
}

interface Course {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  languages: string[];
  totalSessions: number;
  completedSessions: number;
  progress: number;
  tags: string[];
  trainer: Trainer;
}

interface SessionDetailsProps {
  course: Course;
  session: Session;
  trainer: Trainer;
  comments: Comment[];
  notes: Note[];
  sessions: {
    id: number;
    title: string;
    status: "completed" | "current" | "locked";
  }[];
  onCourseDetailsClick: () => void;
  onSessionChange: (sessionId: number) => void;
}

export function SessionDetailsPage({
  course,
  session,
  trainer,
  comments,
  notes,
  sessions,
  onCourseDetailsClick,
  onSessionChange,
}: SessionDetailsProps) {
  const [activeTab, setActiveTab] = useState<
    | "test"
    | "comments"
    | "notes"
    | "mentors"
    | "trainer-chat"
    | "co-learners"
    | "ai-history"
  >("test");
  const [showSummary, setShowSummary] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showMCQDrawer, setShowMCQDrawer] = useState(false);

  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [miniPlayerManuallyClosed, setMiniPlayerManuallyClosed] =
    useState(false);
  const [hasScrolledToTop, setHasScrolledToTop] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isTabsSticky, setIsTabsSticky] = useState(false);
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);
  const [miniPlayerPosition, setMiniPlayerPosition] = useState({
    x: 24,
    y: 24,
  });
  const [miniPlayerSize, setMiniPlayerSize] = useState({
    width: 320,
    height: 192,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState("");
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const testSectionRef = useRef<HTMLDivElement>(null);
  const commentsSectionRef = useRef<HTMLDivElement>(null);
  const notesSectionRef = useRef<HTMLDivElement>(null);
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const miniPlayerRef = useRef<HTMLDivElement>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);

  const mentors = [
    {
      id: 1,
      name: "Sarah Johnson",
      domain: "MERN Development",
      avatar: "mentor1",
    },
    {
      id: 2,
      name: "Mike Chen",
      domain: "Full Stack Engineering",
      avatar: "mentor2",
    },
    { id: 3, name: "Emily Davis", domain: "UI/UX Design", avatar: "mentor3" },
    {
      id: 4,
      name: "Alex Rodriguez",
      domain: "DevOps & Cloud",
      avatar: "mentor4",
    },
  ];

  const testCards = [
    {
      id: 1,
      name: "",
      description: "Introduction to JavaScript",
      completed: false,
      score: null,
    },
    {
      id: 2,
      name: "Attempt 1",
      description: "Introduction to JavaScript",
      completed: true,
      score: 85,
    },
    {
      id: 3,
      name: "Attempt 2",
      description: "Introduction to JavaScript",
      completed: true,
      score: 92,
    },
  ];

  const trainerMessages = [
    {
      id: 1,
      sender: "trainer",
      name: trainer.name,
      avatar: trainer.avatar,
      message: "Welcome to today's session! Feel free to ask any questions.",
      time: "2 hours ago",
    },
    {
      id: 2,
      sender: "student",
      name: "You",
      avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=current-user",
      message: "Thank you! Looking forward to learning more about JavaScript.",
      time: "2 hours ago",
    },
    {
      id: 3,
      sender: "trainer",
      name: trainer.name,
      avatar: trainer.avatar,
      message:
        "Great! We'll cover variables, functions, and scope today. Make sure to practice the examples.",
      time: "1 hour ago",
    },
  ];

  const chatHistories = [
    {
      id: 1,
      name: "JavaScript Variables Discussion",
      date: "Yesterday, 3:45 PM",
      messages: [
        {
          id: 1,
          sender: "user",
          message: "Can you explain the difference between let, const, and var?",
          time: "Yesterday, 3:45 PM",
        },
        {
          id: 2,
          sender: "ai",
          message:
            "Great question! Here are the key differences:\n\n• **var**: Function-scoped, can be redeclared, hoisted\n• **let**: Block-scoped, cannot be redeclared, temporal dead zone\n• **const**: Block-scoped, cannot be reassigned or redeclared\n\nUse const by default, let when you need to reassign, avoid var in modern JavaScript.",
          time: "Yesterday, 3:45 PM",
        },
      ],
    },
    {
      id: 2,
      name: "Session Summary",
      date: "Today, 10:30 AM",
      messages: [
        {
          id: 3,
          sender: "user",
          message: "Summarize this session.",
          time: "Today, 10:30 AM",
        },
        {
          id: 4,
          sender: "ai",
          message:
            "This session covered JavaScript fundamentals including:\n\n• Variable declarations (let, const, var)\n• Function syntax and arrow functions\n• Scope and closures\n• Basic data types and operations\n\nKey takeaway: Understanding scope is crucial for writing clean, bug-free JavaScript code.",
          time: "Today, 10:30 AM",
        },
      ],
    },
    {
      id: 3,
      name: "Closures Explanation",
      date: "Today, 2:15 PM",
      messages: [
        {
          id: 5,
          sender: "user",
          message: "What are closures in JavaScript?",
          time: "Today, 2:15 PM",
        },
        {
          id: 6,
          sender: "ai",
          message:
            "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.\n\nExample:\n```javascript\nfunction outer(x) {\n  return function inner(y) {\n    return x + y; // inner has access to x\n  };\n}\n```\n\nClosures are useful for data privacy, callbacks, and creating function factories.",
          time: "Today, 2:15 PM",
        },
      ],
    },
  ];

  const coLearners = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=alex",
      rank: 2,
      score: 2450,
      progress: 85,
      isCurrentUser: false,
    },
    {
      id: 2,
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=sarah",
      rank: 1,
      score: 2680,
      progress: 92,
      isCurrentUser: false,
    },
    {
      id: 3,
      name: "Vicky S",
      avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=varient5",
      rank: 5,
      score: 1890,
      progress: 78,
      isCurrentUser: true,
    },
    {
      id: 4,
      name: "Mike Rodriguez",
      avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=mike",
      rank: 3,
      score: 2200,
      progress: 80,
      isCurrentUser: false,
    },
    {
      id: 5,
      name: "Emma Davis",
      avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=emma",
      rank: 4,
      score: 2050,
      progress: 75,
      isCurrentUser: false,
    },
    {
      id: 6,
      name: "James Wilson",
      avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=james",
      rank: 6,
      score: 1750,
      progress: 72,
      isCurrentUser: false,
    },
    {
      id: 7,
      name: "Lisa Park",
      avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=lisa",
      rank: 7,
      score: 1680,
      progress: 68,
      isCurrentUser: false,
    },
    {
      id: 8,
      name: "David Kim",
      avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=david",
      rank: 8,
      score: 1620,
      progress: 65,
      isCurrentUser: false,
    },
    {
      id: 9,
      name: "Anna Thompson",
      avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=anna",
      rank: 9,
      score: 1580,
      progress: 63,
      isCurrentUser: false,
    },
    {
      id: 10,
      name: "Ryan Lee",
      avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=ryan",
      rank: 10,
      score: 1520,
      progress: 60,
      isCurrentUser: false,
    },
    {
      id: 11,
      name: "Sophie Brown",
      avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=sophie",
      rank: 11,
      score: 1480,
      progress: 58,
      isCurrentUser: false,
    },
    {
      id: 12,
      name: "Tom Garcia",
      avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=tom",
      rank: 12,
      score: 1420,
      progress: 55,
      isCurrentUser: false,
    },
    {
      id: 13,
      name: "Maya Patel",
      avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=maya",
      rank: 13,
      score: 1380,
      progress: 52,
      isCurrentUser: false,
    },
    {
      id: 14,
      name: "Chris Anderson",
      avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=chris",
      rank: 14,
      score: 1340,
      progress: 50,
      isCurrentUser: false,
    },
    {
      id: 15,
      name: "Zoe Martinez",
      avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=zoe",
      rank: 15,
      score: 1300,
      progress: 48,
      isCurrentUser: false,
    },
  ];

  const currentUser = coLearners.find((learner) => learner.isCurrentUser);
  const topLearners = coLearners
    .filter((learner) => !learner.isCurrentUser)
    .sort((a, b) => a.rank - b.rank);
  const [showSessionDropdown, setShowSessionDropdown] = useState(false);
  const [showAllLearners, setShowAllLearners] = useState(false);
  const [selectedChatHistory, setSelectedChatHistory] = useState<number | null>(null);
  const [showChatHistoryModal, setShowChatHistoryModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Shared video state for synchronization between main and mini player
  const [sharedVideoState, setSharedVideoState] = useState({
    currentTime: 0,
    isPlaying: false,
    duration: 0
  });
  
  const handleVideoStateChange = (state: { currentTime: number; isPlaying: boolean; duration: number }) => {
    setSharedVideoState(state);
  };
  
  const chapters = [
    { id: 1, title: "Introduction to JavaScript", startTime: 0, duration: 25 },
    { id: 2, title: "Variables and Data Types", startTime: 25, duration: 30 },
    { id: 3, title: "Functions and Scope", startTime: 55, duration: 27 },
    { id: 4, title: "Objects and Arrays", startTime: 82, duration: 22 },
    { id: 5, title: "DOM Manipulation", startTime: 104, duration: 18 }
  ];
  
  // AI Chat Modal state
  const [showAIChatModal, setShowAIChatModal] = useState(false);
  const [aiChatContext, setAIChatContext] = useState<{ type: string; chapter: string } | null>(null);
  const [showVoiceBubble, setShowVoiceBubble] = useState(false);
  const [voiceBubbleText, setVoiceBubbleText] = useState('');
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  
  const handleAIRequest = (type: 'summarize' | 'voice-summarize', chapterTitle: string) => {
    setAIChatContext({ type, chapter: chapterTitle });
    setShowAIChatModal(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSessionDropdown(false);
      }
    };

    if (showSessionDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSessionDropdown]);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      const videoSection = videoSectionRef.current;
      const tabsSection = tabsRef.current;
      if (!container || !videoSection) return;

      setShowScrollTop(container.scrollTop > 300);

      // Show mini player when video section is scrolled out of view
      const videoRect = videoSection.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const shouldShowMiniPlayer = videoRect.bottom < containerRect.top + 100;

      // Track scroll positions
      const isAtTop = container.scrollTop === 0;
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
      
      // State machine for tracking scroll sequence
      if (miniPlayerManuallyClosed) {
        if (isAtTop && !hasScrolledToTop) {
          setHasScrolledToTop(true);
          setHasScrolledToBottom(false);
        } else if (hasScrolledToTop && isAtBottom && !hasScrolledToBottom) {
          setHasScrolledToBottom(true);
        } else if (hasScrolledToTop && hasScrolledToBottom) {
          setMiniPlayerManuallyClosed(false);
          setHasScrolledToTop(false);
          setHasScrolledToBottom(false);
        }
      }

      // Only show mini player if not manually closed
      setShowMiniPlayer(shouldShowMiniPlayer && !miniPlayerManuallyClosed);

      // Check if tabs are sticky (only if not programmatic scroll)
      if (tabsSection && !isProgrammaticScroll) {
        const tabsRect = tabsSection.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setIsTabsSticky(tabsRect.top <= containerRect.top);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [miniPlayerManuallyClosed, hasScrolledToTop, hasScrolledToBottom]);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToVideo = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setShowMiniPlayer(false);
  };

  const scrollTabs = (direction: "left" | "right") => {
    const container = tabsScrollRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const suggestions = [
    {
      id: "1",
      text: "Summarize this session.",
    },
    {
      id: "2",
      text: "Can you explain the difference between let, const, and var?",
    },
    // {
    //   id: "3",
    //   text: "How does lexical scoping work in JavaScript?"
    // }
  ];

  const handleCourseDetailsToggle = () => {
    setShowCourseDetails(!showCourseDetails);
  };

  // Mini player drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      !target.classList.contains("resize-handle") &&
      !target.closest("button")
    ) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - miniPlayerPosition.x,
        y: e.clientY - miniPlayerPosition.y,
      });
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: miniPlayerSize.width,
      height: miniPlayerSize.height,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = Math.max(
          0,
          Math.min(
            window.innerWidth - miniPlayerSize.width,
            e.clientX - dragStart.x
          )
        );
        const newY = Math.max(
          0,
          Math.min(
            window.innerHeight - miniPlayerSize.height,
            e.clientY - dragStart.y
          )
        );
        setMiniPlayerPosition({ x: newX, y: newY });
      }

      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = miniPlayerPosition.x;
        let newY = miniPlayerPosition.y;

        switch (resizeDirection) {
          case "se":
            newWidth = Math.max(240, Math.min(600, resizeStart.width + deltaX));
            newHeight = Math.max(
              135,
              Math.min(400, resizeStart.height + deltaY)
            );
            break;
          case "sw":
            newWidth = Math.max(240, Math.min(600, resizeStart.width - deltaX));
            newHeight = Math.max(
              135,
              Math.min(400, resizeStart.height + deltaY)
            );
            newX = miniPlayerPosition.x + (resizeStart.width - newWidth);
            break;
          case "ne":
            newWidth = Math.max(240, Math.min(600, resizeStart.width + deltaX));
            newHeight = Math.max(
              135,
              Math.min(400, resizeStart.height - deltaY)
            );
            newY = miniPlayerPosition.y + (resizeStart.height - newHeight);
            break;
          case "nw":
            newWidth = Math.max(240, Math.min(600, resizeStart.width - deltaX));
            newHeight = Math.max(
              135,
              Math.min(400, resizeStart.height - deltaY)
            );
            newX = miniPlayerPosition.x + (resizeStart.width - newWidth);
            newY = miniPlayerPosition.y + (resizeStart.height - newHeight);
            break;
          case "n":
            newHeight = Math.max(
              135,
              Math.min(400, resizeStart.height - deltaY)
            );
            newY = miniPlayerPosition.y + (resizeStart.height - newHeight);
            break;
          case "s":
            newHeight = Math.max(
              135,
              Math.min(400, resizeStart.height + deltaY)
            );
            break;
          case "e":
            newWidth = Math.max(240, Math.min(600, resizeStart.width + deltaX));
            break;
          case "w":
            newWidth = Math.max(240, Math.min(600, resizeStart.width - deltaX));
            newX = miniPlayerPosition.x + (resizeStart.width - newWidth);
            break;
        }

        // Ensure the resized player stays within screen bounds
        newX = Math.max(0, Math.min(window.innerWidth - newWidth, newX));
        newY = Math.max(0, Math.min(window.innerHeight - newHeight, newY));

        setMiniPlayerSize({ width: newWidth, height: newHeight });
        setMiniPlayerPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection("");
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart, miniPlayerSize]);

  return (
    <div className="flex-1 bg-white flex flex-col h-screen relative">
      {/* Header with Breadcrumb - Fixed */}
      <div className="bg-white border-b px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span
            className="flex items-center"
            // onClick={onCourseDetailsClick}
            // className="hover:text-[#00BF53] cursor-pointer"
          >
            <BookOpen size={16} className="mr-2" /> {session.courseName}
          </span>

          <ChevronRight className="w-4 h-4" />
          <div className="relative" ref={dropdownRef}>
            <span
              className="text-gray-900 font-medium flex items-center gap-1 cursor-pointer"
              onClick={() => setShowSessionDropdown(!showSessionDropdown)}
            >
              {session.title}
              <ChevronDown className="w-3 h-3" />
            </span>
            {/* <button className="flex items-center border border-gray-300 gap-1 px-3 py-1 text-sm rounded-full backdrop-blur-sm transition-colors">
            {session.title}
          </button> */}
            {showSessionDropdown && (
              <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-lg shadow-lg border min-w-64 max-h-64 overflow-y-auto">
                {sessions.map((sess) => (
                  <button
                    key={sess.id}
                    onClick={() => {
                      onSessionChange(sess.id);
                      setShowSessionDropdown(false);
                    }}
                    disabled={sess.status === "locked"}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      sess.id === session.id
                        ? "bg-green-50 text-[#00BF53]"
                        : "text-gray-900"
                    } ${
                      sess.status === "locked"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{sess.title}</span>
                      {sess.status === "completed" && (
                        <span className="text-green-600 text-xs">✓</span>
                      )}
                      {sess.status === "locked" && (
                        <span className="text-gray-400 text-xs">
                          <Lock size={16} />
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-6">
          {/* Centered Video Section */}
          <div ref={videoSectionRef} className="mb-6">
            {/* Video Player */}
            <div className="relative max-h-[455px]">
              <VideoPlayer
                videoSrc={session.videoUrl}
                onCourseDetailsClick={handleCourseDetailsToggle}
                sharedVideoState={sharedVideoState}
                onVideoStateChange={handleVideoStateChange}
                chapters={chapters}
                courseName={course.title}
                sessionName={session.title}
                onAIRequest={handleAIRequest}
              />

              {/* Course Details Overlay */}
              {showCourseDetails && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-[39] max-h-[400px]">
                  <div className="bg-[#1E2433] rounded-xl px-8 py-4 text-white w-full h-full max-h-[400px] overflow-y-auto flex flex-col">
                    <div className="bg-[#1E2433] mb-4 border-white/10 flex justify-start">
                      <div className="flex bg-black/40 backdrop-blur-sm rounded-full p-1">
                        <button
                          onClick={handleCourseDetailsToggle}
                          disabled={showCourseDetails}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            showCourseDetails
                              ? "bg-white text-black cursor-default"
                              : "text-white hover:bg-white/10"
                          }`}
                        >
                          Course Details
                        </button>
                        <button
                          onClick={handleCourseDetailsToggle}
                          disabled={!showCourseDetails}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            !showCourseDetails
                              ? "bg-white text-black cursor-default"
                              : "text-white hover:bg-white/10"
                          }`}
                        >
                          Recording Video
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <h1 className="text-lg font-bold mb-4">
                            {course.title}
                          </h1>
                          <p className="text-blue-100 mb-4 text-md">
                            {course.description}
                          </p>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-start gap-2">
                              <Calendar className="w-6 h-5" />
                              <span>
                                Course start & end date: {course.startDate} -{" "}
                                {course.endDate}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4" />
                              <span>{course.languages.join(", ")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>
                                {course.totalSessions} Sessions - Totally
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Course Card */}
                        <div className="p-4 ml-8">
                          <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                              <span className="text-2xl font-bold text-black">
                                JS
                              </span>
                            </div>
                            <h3 className="font-semibold">JavaScript</h3>
                          </div>

                          <div className="text-sm">
                            <div>
                              <span className="text-blue-200">
                                Trainer Name:
                              </span>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="font-medium">
                                  {course.trainer.name}
                                </span>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < Math.floor(course.trainer.rating)
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-400"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div>
                              <span className="text-blue-200">
                                Next Session:
                              </span>
                              <p className="font-medium">
                                Variables & Data Types
                              </p>
                              <p className="text-xs text-blue-200">
                                Tuesday 22th July, 2025 & 6 PM - GST
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>{course.progress}% Completed</span>
                          <span>
                            {course.totalSessions - course.completedSessions}{" "}
                            Session remaining
                          </span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-green-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* What you'll learn */}
                      <div>
                        <h3 className="font-semibold mb-3">
                          What you'll learn
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {course.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-white/20 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Trainer Details */}
            <div className="bg-white py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={trainer.avatar}
                    alt="Trainer"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">
                      {trainer.name}
                    </h3>
                    <p className="text-sm text-gray-600 flex">
                      {trainer.title}
                      <br />
                      <div className="flex items-center ml-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />{" "}
                        {trainer.rating} ({trainer.reviews.toLocaleString()}{" "}
                        reviews)
                      </div>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex bg-gray-100 rounded-full transition-colors p-2">
                    <button className="flex items-center gap-2 px-2 text-sm font-medium">
                      <ThumbsUpIcon size={16} className="text-gray-600" /> 120
                    </button>
                    <button className="flex items-center gap-2 border-l border-gray-300 px-2">
                      <ThumbsDownIcon size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Tabs */}
          <div ref={tabsRef} className={`${isTabsSticky ? 'sticky top-0' : ''} z-[1] pb-8`}>
            <div className="flex shadow-[0_0px_0px_-1px_rgba(0,0,0,0.1)] bg-white">
              {isTabsSticky && (
                <div className="absolute bottom-[16px] left-0 right-0 h-4 bg-gradient-to-b from-[#0000001d] to-transparent pointer-events-none"></div>
              )}
              <button
                onClick={() => {
                  setActiveTab("test");
                  if (tabContentRef.current) {
                    setIsProgrammaticScroll(true);
                    const offsetTop = tabContentRef.current.offsetTop - 130;
                    scrollContainerRef.current?.scrollTo({ top: offsetTop, behavior: "smooth" });
                    setTimeout(() => setIsProgrammaticScroll(false), 1000);
                  }
                }}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors bg-white ${
                  activeTab === "test"
                    ? "border-black text-black"
                    : "border-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" />
                  Test
                </div>
              </button>
              <button
                onClick={() => {
                  setActiveTab("notes");
                  if (tabContentRef.current) {
                    setIsProgrammaticScroll(true);
                    const offsetTop = tabContentRef.current.offsetTop - 130;
                    scrollContainerRef.current?.scrollTo({ top: offsetTop, behavior: "smooth" });
                    setTimeout(() => setIsProgrammaticScroll(false), 1000);
                  }
                }}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors bg-white ${
                  activeTab === "notes"
                    ? "border-black text-black"
                    : "border-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Notes
                </div>
              </button>
              <button
                onClick={() => {
                  setActiveTab("comments");
                  if (tabContentRef.current) {
                    setIsProgrammaticScroll(true);
                    const offsetTop = tabContentRef.current.offsetTop - 130;
                    scrollContainerRef.current?.scrollTo({ top: offsetTop, behavior: "smooth" });
                    setTimeout(() => setIsProgrammaticScroll(false), 1000);
                  }
                }}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors bg-white ${
                  activeTab === "comments"
                    ? "border-black text-black"
                    : "border-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Comments ({comments.length})
                </div>
              </button>
              <button
                onClick={() => {
                  setActiveTab("trainer-chat");
                  if (tabContentRef.current) {
                    setIsProgrammaticScroll(true);
                    const offsetTop = tabContentRef.current.offsetTop - 130;
                    scrollContainerRef.current?.scrollTo({ top: offsetTop, behavior: "smooth" });
                    setTimeout(() => setIsProgrammaticScroll(false), 1000);
                  }
                }}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors bg-white ${
                  activeTab === "trainer-chat"
                    ? "border-black text-black"
                    : "border-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Trainer Chat
                </div>
              </button>
              <button
                onClick={() => {
                  setActiveTab("mentors");
                  if (tabContentRef.current) {
                    setIsProgrammaticScroll(true);
                    const offsetTop = tabContentRef.current.offsetTop - 130;
                    scrollContainerRef.current?.scrollTo({ top: offsetTop, behavior: "smooth" });
                    setTimeout(() => setIsProgrammaticScroll(false), 1000);
                  }
                }}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors bg-white ${
                  activeTab === "mentors"
                    ? "border-black text-black"
                    : "border-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  Mentors
                </div>
              </button>
              <button
                onClick={() => {
                  setActiveTab("co-learners");
                  if (tabContentRef.current) {
                    setIsProgrammaticScroll(true);
                    const offsetTop = tabContentRef.current.offsetTop - 130;
                    scrollContainerRef.current?.scrollTo({ top: offsetTop, behavior: "smooth" });
                    setTimeout(() => setIsProgrammaticScroll(false), 1000);
                  }
                }}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors bg-white ${
                  activeTab === "co-learners"
                    ? "border-black text-black"
                    : "border-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Co-learners ({coLearners.length})
                </div>
              </button>
              <button
                onClick={() => {
                  setActiveTab("ai-history");
                  if (tabContentRef.current) {
                    setIsProgrammaticScroll(true);
                    const offsetTop = tabContentRef.current.offsetTop - 130;
                    scrollContainerRef.current?.scrollTo({ top: offsetTop, behavior: "smooth" });
                    setTimeout(() => setIsProgrammaticScroll(false), 1000);
                  }
                }}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors bg-white ${
                  activeTab === "ai-history"
                    ? "border-black text-black"
                    : "border-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  History
                </div>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div ref={tabContentRef} className="pb-[30rem]">
            {activeTab === "test" && (
              <div className="">
                {/* Header */}
                <div className="mb-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    See how you are doing in this session.
                  </h2>
                  <p className="text-gray-600 mb-2">
                    Each test you take shows how much you’ve learned so far.
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Use your results to understand your strengths and improve
                    step by step.
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="flex gap-4 mb-2">
                  <div className="space-x-2">
                    <span className="text-xl font-bold text-gray-900">2</span>
                    <span className="text-sm text-gray-600">
                      Tests Completed
                    </span>
                  </div>
                  <div className="space-x-2">
                    <span className="text-xl font-bold text-green-600">
                      88.5%
                    </span>
                    <span className="text-sm text-gray-600">Average Score</span>
                  </div>
                </div>

                {/* Motivational Message */}
                <div className="mb-8">
                  <p className="text-gray-600 text-sm">
                    Keep going — you’re learning well and moving in the right
                    direction.
                  </p>
                </div>

                {/* Test List */}
                <div className="space-y-3">
                  {testCards.map((test) => (
                    <div
                      key={test.id}
                      className="bg-white border border-gray-200 rounded-lg px-4 py-2 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                              <ClipboardList className="w-4 h-4 text-gray-600" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-md font-medium text-gray-900">
                                {test.name || "New Assessment"}
                              </span>
                              <p className="text-sm text-gray-600">
                                {test.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="ml-6">
                          {!test.completed ? (
                            <button
                              onClick={() => setShowMCQDrawer(true)}
                              className="px-4 py-2 text-green-600 rounded-full border border-[#00BF53] transition-colors text-sm font-medium"
                            >
                              Start Test
                            </button>
                          ) : (
                            <div className="text-right">
                              <div className="text-lg font-semibold text-green-600">
                                {test.score}%
                              </div>
                              <div className="text-xs text-gray-500">
                                Completed
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-6">
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    This is your personal space for session notes and materials.
                  </h2>
                  <p className="text-gray-600">
                    Everything shared for this session is saved here, so you can
                    revisit and revise anytime.
                  </p>
                </div>

                {/* Session Card */}
                <div className="bg-white border border-gray-200 rounded-lg py-3 px-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-2">
                        {session.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">July 08, 2025</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[1, 2, 3].map((noteNum) => (
                      <button
                        key={noteNum}
                        className="flex items-center gap-3 transition-colors text-left group"
                      >
                        <FileSpreadsheet className="w-4 h-4 text-gray-600" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 group-hover:underline">
                            Notes {noteNum}
                          </div>
                          {/* <div className="text-sm text-gray-500">
                            Study material
                          </div> */}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "comments" && (
              <div>
                {/* Add Comment */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <img
                      src="https://api.dicebear.com/9.x/notionists/svg?seed=varient5"
                      alt="User"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-1 px-3 py-2 text-sm border-b border-gray-300 focus:outline-none focus:border-[#00BF53]"
                      />
                      <button className="px-3 bg-[#00BF53] text-white rounded-full hover:bg-green-600 transition-colors">
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4 mb-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <img
                        src="https://api.dicebear.com/9.x/notionists/svg?seed=varient8"
                        alt={comment.user}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-gray-900">
                            {comment.user}
                          </span>
                          {comment.pinned && (
                            <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">
                              Pinned
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {comment.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2 leading-relaxed">
                          {comment.text}
                        </p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#00BF53] transition-colors">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{comment.likes}</span>
                          </button>
                          <button className="text-xs text-gray-600 hover:text-[#00BF53] transition-colors">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "mentors" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    You’ve unlocked Mentor Connect 🎉
                  </h2>
                  <p className="text-gray-600">
                    Based on your learning progress, goals, and career
                    direction, we’ve handpicked mentors just for you.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mentors.slice(0, 3).map((mentor) => (
                    <div key={mentor.id} className="bg-gray-50 rounded-lg p-4">
                      {/* Profile Section */}
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={`https://api.dicebear.com/9.x/notionists/svg?seed=${mentor.avatar}`}
                          alt={mentor.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h6 className="font-semibold text-gray-900 text-sm">
                            {mentor.name}
                          </h6>
                          <p className="text-xs text-gray-600 mb-1">
                            {mentor.domain}
                          </p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-green-500 text-green-500"
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Best Works Section */}
                      <div className="mb-3">
                        <h4 className="font-semibold text-gray-900 text-sm mb-2">
                          Best Works
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          You show strong consistency in your learning. Your
                          problem-solving approach, clean coding style, and
                          ability to break tasks into smaller steps stand out.
                          Your pace is steady, and you clearly understand core
                          concepts better than most learners in your batch.
                        </p>
                      </div>

                      {/* Book a Slot Button */}
                      <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:text-[#00BF53] hover:border-[#00BF53] transition-colors text-sm">
                        Book a Slot
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "trainer-chat" && (
              <div>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    This space is just for you and your Trainer
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Ask questions, get clarity, and learn with personal
                    guidance.
                  </p>
                </div>

                {/* Add Message */}
                <div className="mb-6">
                  <div className="flex gap-3">
                    <img
                      src="https://api.dicebear.com/9.x/notionists/svg?seed=current-user"
                      alt="You"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Ask a question or share your thoughts..."
                        className="w-full py-2 border-0 border-b border-gray-300 focus:outline-none focus:border-[#00BF53] text-sm bg-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Thread-style Chat */}
                <div className="space-y-6">
                  {trainerMessages.map((msg) => (
                    <div key={msg.id} className="flex items-start gap-3">
                      <img
                        src={msg.avatar}
                        alt={msg.name}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-gray-900">
                            {msg.name}
                          </span>
                          {msg.sender === "trainer" && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                              Trainer
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {msg.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          {msg.message}
                        </p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#00BF53]">
                            <ThumbsUp className="w-3 h-3" /> Like
                          </button>
                          <button className="text-xs text-gray-600 hover:text-[#00BF53]">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "ai-history" && (
              <div>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    AI Chat History
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Review your previous conversations with AI assistant
                  </p>
                </div>

                {/* Chat History List */}
                <div className="space-y-3">
                  {chatHistories.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => {
                        setSelectedChatHistory(chat.id);
                        setShowChatHistoryModal(true);
                      }}
                      className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-[#00BF53] hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">
                            {chat.name}
                          </h3>
                          <p className="text-sm text-gray-500">{chat.date}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "co-learners" && (
              <div>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Learning Network
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Connect with fellow students and track progress
                  </p>
                </div>

                {/* Cards with Top Learners and Other Learners */}
                <div className="max-w-lg">
                  {/* Current User Rank */}
                  {currentUser && (
                    <div className="border border-[#00BF56] rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="w-12 h-12 rounded-full border border-[#00BF53]"
                          />
                          <div className="absolute -top-1 -right-1 bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            #{currentUser.rank}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold">Your Rank</h3>
                          <p className="text-gray-600 text-sm">
                            {currentUser.score} points • {currentUser.progress}%
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="border rounded-lg">
                    {/* Top Learners Card */}
                    <div className="rounded-lg p-3">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm mb-3">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        Top Learners
                      </h3>
                      <div className="divide-y">
                        {topLearners.slice(0, 3).map((learner) => (
                          <div
                            key={learner.id}
                            className="py-2 flex items-center gap-3"
                          >
                            <div className="relative">
                              {learner.rank === 1 && (
                                <Crown className="absolute -top-1 -left-1 w-4 h-4 text-yellow-500" />
                              )}
                              <img
                                src={learner.avatar}
                                alt={learner.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <div
                                className={`absolute -bottom-1 -right-1 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ${
                                  learner.rank === 1
                                    ? "bg-yellow-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                              >
                                {learner.rank <= 3 ? (
                                  <Medal className="w-2 h-2" />
                                ) : (
                                  learner.rank
                                )}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 text-sm">
                                {learner.name}
                              </h4>
                              <div className="text-xs text-gray-600">
                                {learner.score} points
                              </div>
                            </div>
                            <div
                              className={`text-sm font-bold ${
                                learner.rank === 1
                                  ? "text-yellow-600"
                                  : "text-gray-900"
                              }`}
                            >
                              #{learner.rank}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Other Learners Card */}
                    <div className="rounded-lg p-3">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm mb-3">
                        <Users className="w-4 h-4 text-gray-500" />
                        Other Learners
                      </h3>
                      <div className="relative">
                        <div className="divide-y">
                          {coLearners
                            .filter(
                              (learner) =>
                                !topLearners
                                  .slice(0, 3)
                                  .some((top) => top.id === learner.id)
                            )
                            .slice(0, showAllLearners ? undefined : 3)
                            .map((learner, index, filteredArray) => {
                              const isLastItem =
                                !showAllLearners &&
                                index === filteredArray.length - 1 &&
                                filteredArray.length >= 3;
                              return (
                                <div
                                  key={learner.id}
                                  className={`py-2 flex items-center gap-3 relative ${
                                    learner.isCurrentUser
                                      ? "bg-green-50 -mx-3 px-3 rounded"
                                      : ""
                                  } ${isLastItem ? "overflow-hidden" : ""}`}
                                >
                                  <div className="relative">
                                    <img
                                      src={learner.avatar}
                                      alt={learner.name}
                                      className={`w-8 h-8 rounded-full ${
                                        learner.isCurrentUser
                                          ? "border border-[#00BF53]"
                                          : ""
                                      }`}
                                    />
                                    <div
                                      className={`absolute -bottom-1 -right-1 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ${
                                        learner.rank === 1
                                          ? "bg-yellow-500 text-white"
                                          : learner.rank === 2
                                          ? "bg-gray-400 text-white"
                                          : learner.rank === 3
                                          ? "bg-orange-500 text-white"
                                          : "bg-gray-200 text-gray-700"
                                      }`}
                                    >
                                      {learner.rank <= 3 ? (
                                        <Medal className="w-2 h-2" />
                                      ) : (
                                        learner.rank
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <h4
                                      className={`font-medium text-sm ${
                                        learner.isCurrentUser
                                          ? "text-[#00BF53]"
                                          : "text-gray-900"
                                      }`}
                                    >
                                      {learner.name}{" "}
                                      {learner.isCurrentUser && "(You)"}
                                    </h4>
                                    <div className="text-xs text-gray-600">
                                      {learner.score} points •{" "}
                                      {learner.progress}%
                                    </div>
                                  </div>
                                  <div
                                    className={`text-sm font-bold ${
                                      learner.rank === 1
                                        ? "text-yellow-600"
                                        : learner.rank === 2
                                        ? "text-gray-600"
                                        : learner.rank === 3
                                        ? "text-orange-600"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    #{learner.rank}
                                  </div>
                                  {isLastItem && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                                  )}
                                </div>
                              );
                            })}
                        </div>
                        {coLearners.filter(
                          (learner) =>
                            !topLearners
                              .slice(0, 3)
                              .some((top) => top.id === learner.id)
                        ).length > 3 && (
                          <div className="relative">
                            <button
                              onClick={() =>
                                setShowAllLearners(!showAllLearners)
                              }
                              className="absolute inset-0 w-full h-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-sm text-gray-600 hover:text-[#00BF53] transition-colors z-10 rounded"
                            >
                              {showAllLearners ? "Show Less" : "Show More"}
                            </button>
                            <div className="h-12 w-full" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Text Area at Bottom */}
          <div
            className="fixed bottom-[20px] z-50 w-full max-w-4xl px-6"
            style={{
              left: "calc(50% + 500px - 50vw)",
              width: "calc(-760px + 100vw)",
            }}
          >
            <ChatTextArea
              placeholder="Ask AI about this session..."
              suggestions={suggestions}
              sessionContext={{
                title: session.title,
                courseName: session.courseName,
                description: session.description,
                duration: session.duration,
              }}
              onSendMessage={(message) => console.log("Chat message:", message)}
            />
          </div>

          {/* MCQ Test Drawer Overlay */}
          {showMCQDrawer && (
            <div className="fixed inset-y-0 z-50 right-0 w-[calc(100vw-240px)] bg-white shadow-xl border-l z-50 flex flex-col">
              <div className="w-full h-screen bg-white shadow-2xl rounded-lg transform transition-transform duration-300 ease-out">
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Career Assessment
                  </h2>
                  <button
                    onClick={() => setShowMCQDrawer(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* MCQ Content */}
                <div className="overflow-y-auto">
                  <MCQAssessment
                    title={`${session.courseName} Assessment`}
                    description={`Test your knowledge on ${session.title}`}
                    questions={[
                      {
                        id: 1,
                        question: "What is the primary focus of this session?",
                        options: [
                          {
                            text: "Understanding core concepts",
                            value: "concepts",
                          },
                          {
                            text: "Practical implementation",
                            value: "implementation",
                          },
                          {
                            text: "Advanced techniques",
                            value: "advanced",
                          },
                          { text: "Best practices", value: "practices" },
                        ],
                      },
                      {
                        id: 2,
                        question:
                          "Which skill level is this session designed for?",
                        options: [
                          { text: "Beginner", value: "beginner" },
                          { text: "Intermediate", value: "intermediate" },
                          { text: "Advanced", value: "advanced" },
                          { text: "Expert", value: "expert" },
                        ],
                      },
                      {
                        id: 3,
                        question:
                          "What is the expected outcome after completing this session?",
                        options: [
                          { text: "Basic understanding", value: "basic" },
                          { text: "Practical skills", value: "practical" },
                          { text: "Expert knowledge", value: "expert" },
                          {
                            text: "Certification readiness",
                            value: "certification",
                          },
                        ],
                      },
                    ]}
                    onComplete={(answers) => {
                      console.log("Assessment completed:", answers);
                      setShowMCQDrawer(false);
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Scroll to Top Button */}
          {showScrollTop && isTabsSticky && (
            <button
              onClick={scrollToTop}
              className="fixed right-6 z-40 w-10 h-10 border border-[#00BF53] text-[#00BF53] rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
              style={{
                bottom: showMiniPlayer
                  ? `${miniPlayerPosition.y + miniPlayerSize.height + 24}px`
                  : "1.5rem",
              }}
            >
              <ChevronUp className="w-6 h-6" />
            </button>
          )}

          {/* Mini Player */}
          {showMiniPlayer && (
            <ResizableMiniPlayer
              videoSrc={session.videoUrl}
              onCourseDetailsClick={() => console.log("Course details clicked")}
              isVisible={showMiniPlayer}
              onClose={() => {
                setShowMiniPlayer(false);
                setMiniPlayerManuallyClosed(true);
              }}
              onScrollToVideo={scrollToVideo}
              sharedVideoState={sharedVideoState}
              onVideoStateChange={handleVideoStateChange}
            />
          )}

          {/* Chat History Modal */}
          {showChatHistoryModal && selectedChatHistory && (
            <div className="fixed inset-y-0 z-[9999] right-0 w-[calc(100vw-240px)] bg-white shadow-xl border-l flex flex-col">
              {/* Header */}
              <div className="border-b border-gray-200 bg-white px-4 py-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg text-gray-900">
                    {chatHistories.find((chat) => chat.id === selectedChatHistory)?.name}
                  </h2>
                  <button
                    onClick={() => {
                      setShowChatHistoryModal(false);
                      setSelectedChatHistory(null);
                    }}
                    className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4 max-w-3xl min-w-[48rem] mx-auto">
                {chatHistories
                  .find((chat) => chat.id === selectedChatHistory)
                  ?.messages.map((msg) => (
                    <div key={msg.id}>
                      {msg.sender === "ai" ? (
                        /* AI Message - Left aligned */
                        <div className="flex items-start space-x-3">
                          <div className="flex-1">
                            <div className="text-gray-800 px-3 py-2 rounded-2xl rounded-tl-md max-w-[80%]">
                              <p className="whitespace-pre-line text-sm leading-relaxed">
                                {msg.message}
                              </p>
                            </div>
                            {/* <div className="flex items-center gap-4 mt-2">
                              <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#00BF53]">
                                <ThumbsUp className="w-3 h-3" /> Helpful
                              </button>
                              <button className="text-xs text-gray-600 hover:text-[#00BF53]">
                                Copy
                              </button>
                            </div> */}
                          </div>
                        </div>
                      ) : (
                        /* User Message - Right aligned */
                        <div className="text-right">
                          <div className="inline-block bg-gray-100 text-gray-800 px-3 py-2 rounded-2xl rounded-tr-md max-w-[80%]">
                            <p className="whitespace-pre-wrap text-sm">
                              {msg.message}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
          


          {/* AI Chat Modal for Chapter Requests */}
          {showAIChatModal && aiChatContext && (
            <div className="fixed inset-y-0 z-[9999] right-0 w-[calc(100vw-240px)] bg-white shadow-xl border-l flex flex-col">
              {/* Header */}
              <div className="border-b border-gray-200 bg-white px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg text-gray-900">
                      {aiChatContext.type === 'voice-summarize' ? 'Voice Summary' : 'Chapter Summary'}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {aiChatContext.chapter} - {course.title}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowAIChatModal(false);
                      setAIChatContext(null);
                    }}
                    className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4 max-w-3xl min-w-[48rem] mx-auto">
                {/* Initial AI Response */}
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    {aiChatContext.type === 'voice-summarize' ? (
                      /* Voice Message Bubble */
                      <div className="p-4 max-w-md">
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-900 mb-1">
                            Here's the transcription for {aiChatContext.chapter}
                          </p>
                          <p className="text-sm text-gray-600">
                            {aiChatContext.chapter}: Introduction
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <button 
                            onClick={() => {
                              setIsVoicePlaying(!isVoicePlaying);
                              if (!isVoicePlaying) {
                                setTimeout(() => setIsVoicePlaying(false), 3000);
                              }
                            }}
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                          >
                            {isVoicePlaying ? (
                              <Pause className="w-4 h-4 text-gray-700" />
                            ) : (
                              <Play className="w-4 h-4 text-gray-700" />
                            )}
                          </button>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-center gap-2 text-xs text-gray-600 mb-1">
                              <span>00:00</span>
                              <span>45:00 mins</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <div 
                                className="bg-green-500 h-1 rounded-full transition-all duration-300"
                                style={{ width: isVoicePlaying ? '25%' : '0%' }}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button className="px-3 py-1 border border-gray-200 text-gray-700 text-xs rounded-full">
                            Transcription
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Regular Text Message */
                      <div className="text-gray-800 px-3 py-2 rounded-2xl rounded-tl-md max-w-[80%]">
                        <p className="whitespace-pre-line text-sm leading-relaxed">
                          📝 Here's a summary of "{aiChatContext.chapter}" from {session.title}:<br />

                            • **What is JavaScript**: A high-level, interpreted programming language that runs in browsers and servers<br />
                            • **Key Features**: Dynamic typing, first-class functions, prototype-based inheritance, and event-driven programming<br />
                            • **JavaScript Engine**: How browsers execute JavaScript code using V8, SpiderMonkey, and other engines<br />
                            • **Basic Syntax**: Variables (let, const, var), data types (string, number, boolean, object, array)<br />
                            • **DOM Interaction**: How JavaScript manipulates HTML elements and responds to user events<br />
                            • **Modern JavaScript**: ES6+ features like arrow functions, template literals, and destructuring<br />
                            • **Development Setup**: Browser console, code editors, and debugging tools<br />

                            Would you like me to dive deeper into any specific topic?
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Chat Input */}
              <div className="p-4 max-w-3xl min-w-[48rem] mx-auto">
                <ChatTextArea
                  placeholder={`Ask about "${aiChatContext.chapter}"...`}
                  // suggestions={[
                  //   { id: '1', text: 'Explain the key concepts in detail' },
                  //   { id: '2', text: 'Provide practical examples' },
                  // ]}
                  sessionContext={{
                    title: session.title,
                    courseName: session.courseName,
                    description: `Chapter: ${aiChatContext.chapter}`,
                    duration: session.duration,
                  }}
                  onSendMessage={(message) => console.log('AI Chat message:', message)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

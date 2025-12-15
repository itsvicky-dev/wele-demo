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
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { VideoPlayer } from "./VideoPlayer";
import { ChatTextArea } from "./ChatTextArea";
import { MCQAssessment } from "./MCQAssessment";

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
    "test" | "comments" | "notes" | "mentors"
  >("test");
  const [showSummary, setShowSummary] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showMCQDrawer, setShowMCQDrawer] = useState(false);

  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const testSectionRef = useRef<HTMLDivElement>(null);
  const commentsSectionRef = useRef<HTMLDivElement>(null);
  const notesSectionRef = useRef<HTMLDivElement>(null);
  const tabsScrollRef = useRef<HTMLDivElement>(null);

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
  const [showSessionDropdown, setShowSessionDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      if (!container || !videoSection) return;

      setShowScrollTop(container.scrollTop > 300);

      // Show mini player when video section is scrolled out of view
      const videoRect = videoSection.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setShowMiniPlayer(videoRect.bottom < containerRect.top + 100);
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
  }, []);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToVideo = () => {
    videoSectionRef.current?.scrollIntoView({ behavior: "smooth" });
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
                      <ThumbsUpIcon size={16} className="text-gray-600" /> 120K
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
          <div className="sticky top-0 z-30 bg-white">
            <div className="flex">
              <button
                onClick={() => setActiveTab("test")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "test"
                    ? "border-black text-black"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" />
                  Test
                </div>
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "notes"
                    ? "border-black text-black"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Notes
                </div>
              </button>
              <button
                onClick={() => setActiveTab("comments")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "comments"
                    ? "border-black text-black"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Comments ({comments.length})
                </div>
              </button>
              <button
                onClick={() => setActiveTab("mentors")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "mentors"
                    ? "border-black text-black"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  Mentors
                </div>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="py-6 pb-32">
            {activeTab === "test" && (
              <div className="">
                {/* Header */}
                <div className="mb-2">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Assessments
                  </h2>
                  <p className="text-gray-600 mb-2">
                    Test your knowledge and track your progress
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    You're making excellent progress in your learning journey.
                    Testing your knowledge helps reinforce what you've learned
                    and builds confidence. Keep up the momentum!
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
                    Challenge yourself and see how much you've learned. Every
                    test brings you closer to mastery!
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
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Session Notes
                  </h2>
                  <p className="text-gray-600">
                    Access your study materials and resources
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
                    Connect with Expert Mentors
                  </h2>
                  <p className="text-gray-600">
                    Get personalized guidance from industry professionals
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {mentors.map((mentor) => (
                    <div
                      key={mentor.id}
                      className="bg-white rounded-lg border p-6"
                    >
                      <div className="flex gap-4 mb-4">
                        {/* Profile Image with Green Border */}
                        <div className="w-12 h-12 rounded-full border-4 border-green-500 p-1 flex-shrink-0">
                          <img
                            src={`https://api.dicebear.com/9.x/notionists/svg?seed=${mentor.avatar}`}
                            alt={mentor.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>

                        {/* Name and Rating on Right */}
                        <div className="flex-1">
                          <h6 className="font-semibold text-gray-900 mb-1">
                            {mentor.name}
                          </h6>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Domain */}
                      <p className="text-sm text-gray-600 mb-3">
                        {mentor.domain}
                      </p>

                      {/* Book a Slot Button */}
                      <button className="w-full px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:text-[#00BF53] transition-colors text-sm">
                        Book a Slot
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chat Text Area at Bottom */}
          <div
            className="fixed bottom-[20px] w-full max-w-4xl px-6"
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
            <div className="fixed inset-0 bg-black/20 z-[70] flex justify-center items-center">
              <div className="w-full max-w-2xl bg-white shadow-2xl rounded-lg transform transition-transform duration-300 ease-out mx-4">
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
                <div className="max-h-[70vh] overflow-y-auto">
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
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed right-6 z-40 w-10 h-10 border border-[#00BF53] text-[#00BF53] rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
              style={{ bottom: showMiniPlayer ? "14rem" : "1.5rem" }}
            >
              <ChevronUp className="w-6 h-6" />
            </button>
          )}

          {/* Mini Player */}
          {showMiniPlayer && (
            <div className="fixed bottom-6 right-6 z-50 w-80 h-48 bg-black rounded-lg shadow-2xl transition-all duration-300 transform">
              <div className="relative w-full h-full">
                <VideoPlayer
                  videoSrc={session.videoUrl}
                  onCourseDetailsClick={handleCourseDetailsToggle}
                  isMiniPlayer={true}
                />
                <button
                  onClick={scrollToVideo}
                  className="absolute top-2 left-2 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
                  title="Go to main player"
                >
                  <ArrowUpLeft className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setShowMiniPlayer(false)}
                  className="absolute top-2 right-2 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
                  title="Close mini player"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

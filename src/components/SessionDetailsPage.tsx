import {
  Play,
  Pause,
  Volume2,
  Settings,
  Maximize,
  ChevronRight,
  ChevronDown,
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
} from "lucide-react";
import { useState, useRef } from "react";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(session.duration);
  const [activeTab, setActiveTab] = useState<"comments" | "notes">("comments");
  const [showSummary, setShowSummary] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [aiChatInput, setAiChatInput] = useState("");
  const [aiMessages, setAiMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [showSessionDropdown, setShowSessionDropdown] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSummarize = () => {
    setShowSummary(true);
    setIsTyping(true);
    const summary =
      "This JavaScript session covers fundamental concepts including variables, functions, and scope. Key topics include: 1) Variable declarations with let, const, and var 2) Function expressions vs declarations 3) Lexical scoping and closures 4) Hoisting behavior 5) Best practices for modern JavaScript development.";

    let index = 0;
    const typeText = () => {
      if (index < summary.length) {
        setSummaryText(summary.slice(0, index + 1));
        index++;
        setTimeout(typeText, 30);
      } else {
        setIsTyping(false);
      }
    };
    setSummaryText("");
    typeText();
  };

  const handleAiChat = () => {
    if (!aiChatInput.trim()) return;

    const userMessage = aiChatInput;
    setAiMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setAiChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse =
        "I understand your question about JavaScript. Based on the current session content, here's what I can help you with: JavaScript fundamentals, variable scoping, function declarations, and best practices.";

      let index = 0;
      let currentResponse = "";
      const typeResponse = () => {
        if (index < aiResponse.length) {
          currentResponse += aiResponse[index];
          setAiMessages((prev) => {
            const newMessages = [...prev];
            if (newMessages[newMessages.length - 1]?.role === "ai") {
              newMessages[newMessages.length - 1].content = currentResponse;
            } else {
              newMessages.push({ role: "ai", content: currentResponse });
            }
            return newMessages;
          });
          index++;
          setTimeout(typeResponse, 20);
        } else {
          setIsTyping(false);
        }
      };

      setAiMessages((prev) => [...prev, { role: "ai", content: "" }]);
      typeResponse();
    }, 1000);
  };

  const handleCourseDetailsToggle = () => {
    setShowCourseDetails(!showCourseDetails);
    if (!showCourseDetails && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setVideoPaused(true);
      setIsPlaying(false);
    }
  };

  const closeCourseDetails = () => {
    setShowCourseDetails(false);
    if (videoPaused && videoRef.current) {
      setVideoPaused(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex-1 bg-white">
      {/* Header with Breadcrumb */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span
            // onClick={onCourseDetailsClick}
            // className="hover:text-[#00BF53] cursor-pointer"
          >
            {session.courseName}
          </span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{session.title}</span>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        {/* Course and Session Badges */}
        <div className="flex gap-2 my-4">
          <span className="pr-3 py-1 text-sm rounded-full">
            {course.title.split(":")[0]}
          </span>
          <div className="relative">
            <button
              onClick={() => setShowSessionDropdown(!showSessionDropdown)}
              className="flex items-center border border-gray-300 gap-1 px-3 py-1 text-sm rounded-full backdrop-blur-sm transition-colors"
            >
              {session.title}
              <ChevronDown className="w-3 h-3" />
            </button>
            {showSessionDropdown && (
              <div className="absolute top-full left-0 mt-1 z-10 bg-white rounded-lg shadow-lg border min-w-64 max-h-64 overflow-y-auto">
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
                        <span className="text-gray-400 text-xs">🔒</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-6">
          {/* Left Video Section */}
          <div className="flex-1 flex flex-col relative">
            {/* Video Player */}
            <div className="relative flex-1 bg-black group max-h-[455px]">
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                src={session.videoUrl}
                onTimeUpdate={(e) =>
                  setCurrentTime(e.currentTarget.currentTime)
                }
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              />

              {/* Video Controls */}
              <div className="absolute inset-0 max-h-[455px] bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white fill-white" />
                      )}
                    </button>
                    <div className="flex-1">
                      <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={(e) => {
                          const time = parseFloat(e.target.value);
                          setCurrentTime(time);
                          if (videoRef.current)
                            videoRef.current.currentTime = time;
                        }}
                        className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                      />
                    </div>
                    <span className="text-white text-sm font-medium">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                    <Volume2 className="w-5 h-5 text-white cursor-pointer hover:text-gray-300" />
                    <Settings className="w-5 h-5 text-white cursor-pointer hover:text-gray-300" />
                    <Maximize className="w-5 h-5 text-white cursor-pointer hover:text-gray-300" />
                  </div>
                </div>

                {/* Course Details Button */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={handleCourseDetailsToggle}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-colors"
                  >
                    Course Details
                  </button>
                </div>
              </div>
            </div>

            {/* Course Details Overlay */}
            {showCourseDetails && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
                <div className="bg-[#1E2433] rounded-xl p-8 text-white mb-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold mb-4">
                        {course.title}
                      </h1>
                      <p className="text-blue-100 mb-4">{course.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
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
                          <span>{course.totalSessions} Sessions - Totally</span>
                        </div>
                      </div>
                    </div>

                    {/* Course Card */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 ml-8">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl font-bold text-black">
                            JS
                          </span>
                        </div>
                        <h3 className="font-semibold">JavaScript</h3>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-blue-200">Trainer Name:</span>
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
                          <span className="text-blue-200">Next Session:</span>
                          <p className="font-medium">Variables & Data Types</p>
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
                    <h3 className="font-semibold mb-3">What you'll learn</h3>
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
            )}

            {/* Trainer Details */}
            <div className="bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={trainer.avatar}
                    alt="Trainer"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {trainer.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {trainer.title}, {trainer.company} • ⭐ {trainer.rating} (
                      {trainer.reviews.toLocaleString()} reviews)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSummarize}
                    className="flex items-center gap-2 px-4 py-2 bg-green-50 text-[#00BF53] rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    Summarize
                  </button>
                </div>
              </div>
            </div>

            {/* AI Summary */}
            {showSummary && (
              <div className="bg-green-50 border-t p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#00BF53]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">
                      AI Summary
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {summaryText}
                      {isTyping && <span className="animate-pulse">|</span>}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* AI Chat Interface */}
            {aiMessages.length > 0 && (
              <div className="bg-white border-t max-h-64 overflow-y-auto">
                <div className="p-4 space-y-3">
                  {aiMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.role === "ai" && (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-[#00BF53]" />
                        </div>
                      )}
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                          message.role === "user"
                            ? "bg-[#00BF53] text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {message.content}
                        {message.role === "ai" &&
                          index === aiMessages.length - 1 &&
                          isTyping && <span className="animate-pulse">|</span>}
                      </div>
                      {message.role === "user" && (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-[#00BF53] text-xs font-medium">
                            You
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Chat Input */}
            {/* <div className="bg-white border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiChatInput}
                  onChange={(e) => setAiChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAiChat()}
                  placeholder="Ask AI about this session..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                />
                <button
                  onClick={handleAiChat}
                  disabled={!aiChatInput.trim() || isTyping}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div> */}
          </div>

          {/* Right Sidebar */}
          <div className="w-80 bg-white flex flex-col">
            {/* Tab Headers */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab("comments")}
                className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "comments"
                    ? "border-[#00BF53] text-[#00BF53]"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Comments
                </div>
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "notes"
                    ? "border-[#00BF53] text-[#00BF53]"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  Notes
                </div>
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === "comments" ? (
                <div className="h-full flex flex-col">
                  {/* Comments Header */}
                  <div className="p-4 border-b">
                    <div className="flex items-center mb-3">
                      <h3 className="font-medium text-gray-900">Comments</h3>
                      <span className="text-sm text-gray-500 ml-2">
                        {comments.length}
                      </span>
                    </div>

                    {/* Add Comment */}
                    <div className="flex gap-2">
                      <img
                        src="https://via.placeholder.com/32"
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
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <img
                          src="https://via.placeholder.com/32"
                          alt={comment.user}
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-gray-900">
                              {comment.user}
                            </span>
                            {comment.pinned && (
                              <span className="px-2 py-0.5 bg-green-100 text-[#00BF53] text-xs rounded-full">
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
              ) : (
                <div className="h-full flex flex-col">
                  {/* Notes Header */}
                  <div className="p-2">
                    <h3 className="font-medium text-gray-900">
                      {course.title}
                    </h3>
                  </div>

                  {/* Notes Content */}
                  <div className="flex-1 overflow-y-auto space-y-6">
                    {sessions.map((sess) => (
                      <div key={sess.id} className="space-y-2 border rounded-lg p-3">
                        <h4 className="font-medium text-sm text-[#00000080]">
                          {sess.title}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                          <Calendar className="w-3 h-3" />
                          <span>July 08, 2025</span>
                        </div>
                        <div className="flex flex-wrap gap-5">
                          <button className="flex items-center gap-1 py-1 text-[#808080] font-medium text-xs transition-colors border-b ">
                            <FileSpreadsheet size={12} /> Notes 1
                          </button>
                          <button className="flex items-center gap-1 py-1 text-[#808080] font-medium text-xs transition-colors border-b ">
                            <FileSpreadsheet size={12} /> Notes 2
                          </button>
                          <button className="flex items-center gap-1 py-1 text-[#808080] font-medium text-xs transition-colors border-b ">
                            <FileSpreadsheet size={12} /> Notes 3
                          </button>
                        </div>
                        {sess.id === 5 && (
                          <p className="text-xs text-gray-500 mt-2">
                            Session Not yet started
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

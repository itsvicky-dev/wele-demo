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
  Lock,
  ThumbsUpIcon,
  ThumbsDown,
  ThumbsDownIcon,
  StarIcon,
  X,
  ClipboardList,
} from "lucide-react";
import { useState, useRef } from "react";
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
  const [activeTab, setActiveTab] = useState<"comments" | "notes">("comments");
  const [showSummary, setShowSummary] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showMCQDrawer, setShowMCQDrawer] = useState(false);

  const [showCourseDetails, setShowCourseDetails] = useState(false);

  const testCards = [
    {
      id: 1,
      name: "JavaScript Fundamentals Test",
      description: "Test your understanding of basic JavaScript concepts",
      completed: false,
      score: null,
    },
    {
      id: 2,
      name: "Variables & Data Types Quiz",
      description: "Assessment on JavaScript variables and data types",
      completed: true,
      score: 85,
    },
    {
      id: 3,
      name: "Functions & Scope Assessment",
      description: "Evaluate your knowledge of functions and scope",
      completed: true,
      score: 92,
    },
  ];
  const [showSessionDropdown, setShowSessionDropdown] = useState(false);

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
          // onClick={onCourseDetailsClick}
          // className="hover:text-[#00BF53] cursor-pointer"
          >
            {session.courseName}
          </span>

          <ChevronRight className="w-4 h-4" />
          <div className="relative">
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
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[calc(100vw-450px)] mx-auto px-6 space-y-6 py-6">
          {/* Course and Session Badges */}
          {/* <div className="flex gap-2">
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
                <div className="absolute top-full left-0 mt-1 z-[60] bg-white rounded-lg shadow-lg border min-w-64 max-h-64 overflow-y-auto">
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
                          <span className="text-gray-400 text-xs"><Lock size={16} /></span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div> */}

          <div className="grid grid-cols-[1fr_320px] gap-6">
            {/* Left Video Section */}
            <div className="relative">
              <div className="flex flex-col h-full">
                {/* Video Player */}
                <div className="max-h-[455px] relative">
                  <VideoPlayer
                    videoSrc={session.videoUrl}
                    onCourseDetailsClick={handleCourseDetailsToggle}
                  />
                  {/* Toggle Buttons */}
                  {/* <div className="absolute top-4 left-4">
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
                  </div> */}
                </div>

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

                            <div className="space-y-2 text-sm">
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
                          {/* , {trainer.company} */}
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
                          <ThumbsUpIcon size={16} className="text-gray-600" />{" "}
                          120K
                        </button>
                        <button className="flex items-center gap-2 border-l border-gray-300 px-2">
                          <ThumbsDownIcon size={16} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Summary */}
                {showSummary && (
                  <div className="border-t p-4 mb-8">
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

                {/* Test Cards */}
                <div className="bg-white py-4 text-xs mb-[160px]">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Available Tests
                  </h3>
                  <div className="border border-gray-200 rounded-[10px]">
                    {testCards.map((test) => (
                      <div
                        key={test.id}
                        className="border-b border-gray-200 p-2 last:border-b-0 "
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center">
                              <ClipboardList className="w-3 h-3" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">
                                {test.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {test.description}
                              </p>
                            </div>
                          </div>
                          <div className="ml-4">
                            {!test.completed ? (
                              <button
                                onClick={() => setShowMCQDrawer(true)}
                                className="flex items-center text-xs gap-2 px-3 py-2 border border-[#00BF53] text-[#00BF53] rounded-full hover:bg-[#00A047] hover:text-white transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
                              >
                                <Sparkles className="w-4 h-4" />
                                Take a Test
                              </button>
                            ) : (
                              <div className="text-center">
                                <div className="text-sm text-[#00BF53]">
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
              </div>
            </div>

            {/* Chat Text Area at Bottom */}
            <div
              className="fixed bottom-[20px] z-[60]"
              style={{
                left: "calc(50% + 364px - 50vw)",
                width: "calc(100vw - 450px - 320px - 48px - 24px)",
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
                onSendMessage={(message) =>
                  console.log("Chat message:", message)
                }
              />
            </div>

            {/* Right Sidebar */}
            <div className="bg-white flex flex-col h-full">
              {/* MCQ Test Drawer Overlay */}
              {showMCQDrawer && (
                <div className="absolute inset-0 bg-black/20 z-[70] flex justify-end">
                  <div className="w-full bg-white shadow-2xl transform transition-transform duration-300 ease-out">
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
                    <div className="h-[calc(100vh-80px)] overflow-y-auto">
                      <MCQAssessment
                        title={`${session.courseName} Assessment`}
                        description={`Test your knowledge on ${session.title}`}
                        questions={[
                          {
                            id: 1,
                            question:
                              "What is the primary focus of this session?",
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
              {/* Tab Headers */}
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab("comments")}
                  className={`flex-1 px-4 py-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "comments"
                      ? "border-black text-black"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Comments
                    <span className="text-sm">{comments.length}</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("notes")}
                  className={`flex-1 px-4 py-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "notes"
                      ? "border-black text-black"
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
                    <div className="p-4">
                      {/* Add Comment */}
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
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                ) : (
                  <div className="h-full flex flex-col">
                    {/* Notes Content */}
                    <div className="flex-1 overflow-y-auto space-y-6 mt-2">
                      {/* {sessions.map((sess) => ( */}
                      <div
                        key={session.id}
                        className="space-y-2 border rounded-lg p-3"
                      >
                        <h4 className="font-medium text-sm text-[#00000080]">
                          {session.title}
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
                      </div>
                      {/* ))} */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

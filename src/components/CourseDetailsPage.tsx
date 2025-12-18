import {
  Play,
  Calendar,
  Globe,
  Clock,
  BookOpen,
  ChevronRight,
  Star,
  Users,
  Sparkles,
  Lock,
  ThumbsUp,
  Send,
} from "lucide-react";
import { useState } from "react";

interface Session {
  id: number;
  title: string;
  date: string;
  duration?: string;
  status?: "completed" | "current" | "locked";
}

interface Trainer {
  name: string;
  title: string;
  company: string;
  rating: number;
  reviews: number;
  avatar: string;
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

interface CourseDetailsProps {
  course: Course;
  sessions: Session[];
  onSessionClick: (sessionId: number) => void;
  onBackClick?: () => void;
}

export function CourseDetailsPage({
  course,
  sessions,
  onSessionClick,
  onBackClick,
}: CourseDetailsProps) {
  const [showSummary, setShowSummary] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("sessions");
  const [newComment, setNewComment] = useState("");

  const comments = [
    {
      id: 1,
      author: "Amaranth",
      time: "1 year ago",
      text: "I really understand how colours works - My lessons broke it down so well! 🔥 The career guidance session gave me real clarity on what to learn next🔥",
      likes: 340,
      replies: 2
    },
    {
      id: 2,
      author: "Praveena Kumar",
      time: "1 year ago",
      text: "The colour theory module really opened my eyes to design details I used to ignore🔥 The career guidance session gave me real clarity on what to learn next🔥",
      likes: 340,
      replies: 0
    },
    {
      id: 3,
      author: "Balaji",
      time: "1 year ago",
      text: "The career guidance session gave me real clarity on what to learn next🔥",
      likes: 340,
      replies: 2
    },
    {
      id: 4,
      author: "Prem",
      time: "1 year ago",
      text: "Never thought online learning could feel this personal and motivating🔥 The career guidance session gave me real clarity on what to learn next🔥",
      likes: 340,
      replies: 2
    },
    {
      id: 5,
      author: "Abishek",
      time: "1 year ago",
      text: "Every class is so value-loaded more confident about my career path🔥 The career guidance session gave me real clarity on what to learn next🔥",
      likes: 340,
      replies: 2
    }
  ];

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
  return (
    <div className="bg-white overflow-y-auto w-full min-h-screen">
      {/* Header with Breadcrumb */}
      <div className="sticky top-0 z-20 border-b border-[#0d0d0d0d] bg-white px-4 py-3">
        <div className="flex items-center gap-2 text-md text-gray-600">
          <button
            onClick={onBackClick}
            className="hover:text-[#00BF53] cursor-pointer"
          >
            Learning Hub
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{course.title}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Main Content */}
        <div className="flex flex-col">
          {/* Course Header */}
          <div className="flex justify-between">
            <h1 className="text-xl font-bold mb-4 text-gray-900">
              {course.title}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                Popular Choices
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                Industry Best
              </span>
            </div>
          </div>
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <p className="text-gray-600 mb-6">{course.description}</p>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Course start date & end date : {course.startDate} -{" "}
                    {course.endDate}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>
                    {course.languages.join(", ")},{" "}
                    <span className="text-green-600 cursor-pointer hover:underline">
                      4 more languages
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{course.totalSessions} Sessions - Totally</span>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">
                    {course.progress}% Completed
                  </span>
                  <span className="text-gray-600">
                    {course.totalSessions - course.completedSessions} Session
                    remaining
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Course Card */}
            <div className="rounded-lg ml-8 w-80">
              <div className="mb-4 bg-gray-100 p-2 rounded-xl">
                  <span className="text-xs text-gray-600 mb-2 rounded-full bg-white py-1 px-2">
                    Main Course
                  </span>
                <div className="flex items-center rounded-lg p-4 mb-4 gap-2 justify-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center items-center">
                    <span className="text-2xl font-bold text-black">JS</span>
                  </div>
                  <h3 className="font-bold text-lg">JavaScript</h3>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Trainer Name : </span>
                  <span className="font-semibold">{course.trainer.name}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(course.trainer.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-gray-600">Next Session : </span>
                  <span className="font-semibold">Variables & Data Types</span>
                </div>

                <div className="flex items-center gap-2 text-green-600">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">
                    Tuesday 22th July, 2025 & 6 PM - GST
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Statistics */}
          <div className="mb-8 border p-4 rounded-xl">
            <h2 className="text-md font-bold mb-6">On this Course:</h2>

            <div className="grid grid-cols-5 gap-8">
              <div className="text-center border p-4 rounded-xl">
                <div className="text-gray-600 text-sm mb-2">Total members</div>
                <div className="text-lg font-bold">249</div>
              </div>

              <div className="text-center border p-4 rounded-xl">
                <div className="text-gray-600 text-sm mb-2">
                  Available Mentors
                </div>
                <div className="text-lg font-bold">23</div>
              </div>

              <div className="text-center border p-4 rounded-xl">
                <div className="text-gray-600 text-sm mb-2">
                  Enrolled Members
                </div>
                <div className="text-lg font-bold">3579</div>
              </div>

              <div className="text-center border p-4 rounded-xl">
                <div className="text-gray-600 text-sm mb-2">Course Rating</div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-green-500 text-green-500"
                    />
                  ))}
                </div>
              </div>

              <div className="text-center border p-4 rounded-xl">
                <div className="text-gray-600 text-sm mb-2">Course Value</div>
                <div className="text-lg font-bold">100%</div>
              </div>
            </div>
          </div>

          {/* What you'll learn */}
          <div className="mb-8">
            <h2 className="text-md font-bold mb-6">What you'll learn</h2>
            <div className="flex flex-wrap gap-3">
              {[
                "Foundational Concepts",
                "Control Structures",
                "Functions & Scope",
                "Objects & Arrays",
                "DOM Manipulation",
                "Advanced JavaScript (Introductory)",
                "Intro to APIs & JSON",
                "Mini Projects & Practice",
              ].map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border border-gray-200 text-gray-500 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="space-y-6">
          <div className="">
            <div className="border-b">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("sessions")}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "sessions"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Course Sessions
                </button>
                <button
                  onClick={() => setActiveTab("comments")}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "comments"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Comments
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeTab === "sessions" && (
                <div className="divide-y">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => onSessionClick(session.id)}
                      className="p-2 hover:bg-gray-50 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              session.status === "completed"
                                ? "bg-green-100 text-green-600"
                                : session.status === "current"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {session.status === "completed" ? (
                              "✓"
                            ) : session.status === "current" ? (
                              <Play className="w-4 h-4" />
                            ) : (
                              <Lock className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                              {session.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {session.date}
                              </span>
                              {session.duration && (
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {session.duration}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "comments" && (
                <div className="space-y-6">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      U
                    </div>
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add your comment..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium">
                          {comment.author.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <span className="text-xs text-gray-500">{comment.time}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{comment.text}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <button className="flex items-center gap-1 hover:text-blue-600">
                              <ThumbsUp className="w-3 h-3" />
                              {comment.likes}
                            </button>
                            <button className="hover:text-blue-600">Reply</button>
                            {comment.replies > 0 && (
                              <span className="text-blue-600">{comment.replies} Replies</span>
                            )}
                          </div>
                        </div>
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

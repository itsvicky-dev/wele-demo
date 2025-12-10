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
}

export function CourseDetailsPage({
  course,
  sessions,
  onSessionClick,
}: CourseDetailsProps) {
  const [showSummary, setShowSummary] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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
    <div className="min-h-screen bg-white">
      {/* Header with Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Learning Hub</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{course.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Course Hero */}
            <div className="bg-[#1E2433] rounded-xl p-8 text-white">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
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
                      <span className="text-2xl font-bold text-black">JS</span>
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
                    {course.totalSessions - course.completedSessions} Session
                    remaining
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
            <div>
              {/* Trainer Details */}
              <div className="bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={course.trainer.avatar}
                      alt="Trainer"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {course.trainer.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {course.trainer.title}, {course.trainer.company} • ⭐{" "}
                        {course.trainer.rating} (
                        {course.trainer.reviews.toLocaleString()} reviews)
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
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sessions List */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="pb-6 border-b">
                <h2 className="text-md font-semibold text-gray-900">
                  Course Sessions
                </h2>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

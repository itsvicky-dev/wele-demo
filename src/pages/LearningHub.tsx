import { useState } from "react";
import { CourseDetailsPage } from "../components/CourseDetailsPage";
import { SessionDetailsPage } from "../components/SessionDetailsPage";
import {
  GraduationCap,
  Coffee,
  Smartphone,
  Server,
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { MyCourseCard } from "../components/course/MyCourseCard";
import { ActionCard } from "../components/ActionCard";
import sessionVideo from "../assets/videos/session.mp4";
import { ChatTextArea } from "../components/ChatTextArea";

export function LearningHub() {
  const [currentView, setCurrentView] = useState<
    "courses" | "courseDetails" | "session"
  >("courses");
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedSession, setSelectedSession] = useState<any>(null);

  const courses = [
    {
      id: 1,
      type: "Main Course",
      title: "Java Developer",
      price: 1299,
      sessions: 12,
      progress: 65,
      currentSession: "Session 8: Spring Boot Fundamentals",
      bgColor: "",
      icon: (
        <div className="w-12 h-12 rounded-full flex items-center justify-center">
          <Coffee className="w-6 h-6 text-gray-800" />
        </div>
      ),
    },
    {
      id: 2,
      type: "Main Course",
      title: "Flutter & Dart",
      price: 1299,
      sessions: 12,
      progress: 30,
      currentSession: "Session 4: Widget Fundamentals",
      bgColor: "",
      icon: (
        <div className="w-12 h-12 rounded-lg flex items-center justify-center">
          <Smartphone className="w-6 h-6 text-blue-600" />
        </div>
      ),
    },
    {
      id: 3,
      type: "Main Course",
      title: "Master Laravel & PHP",
      price: 1299,
      sessions: 12,
      progress: 80,
      currentSession: "Session 10: Advanced Eloquent",
      bgColor: "",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <Server className="w-6 h-6 text-green-700" />
        </div>
      ),
    },
  ];

  const courseDetails = {
    id: 1,
    title: "Modern JavaScript From The Beginning Course",
    description:
      "Complete JavaScript course covering fundamentals to advanced concepts",
    startDate: "22nd July, 2025",
    endDate: "30th August, 2025",
    languages: ["English", "Hindi"],
    totalSessions: 12,
    completedSessions: 4,
    progress: 40,
    tags: [
      "Variables",
      "Functions",
      "DOM Manipulation",
      "ES6+",
      "Async Programming",
    ],
    trainer: {
      name: "John Smith",
      title: "Senior JavaScript Developer",
      company: "Tech Corp",
      rating: 4.8,
      reviews: 1250,
      avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=trainer1",
    },
  };

  const sessions = [
    {
      id: 1,
      title: "Introduction to JavaScript",
      date: "July 22, 2025",
      duration: "1h 30m",
      status: "completed" as const,
    },
    {
      id: 2,
      title: "Variables & Data Types",
      date: "July 24, 2025",
      duration: "1h 45m",
      status: "current" as const,
    },
    {
      id: 3,
      title: "Functions and Scope",
      date: "July 26, 2025",
      duration: "2h 00m",
      status: "locked" as const,
    },
    {
      id: 4,
      title: "DOM Manipulation",
      date: "July 28, 2025",
      duration: "1h 50m",
      status: "locked" as const,
    },
  ];

  const sessionDetails = {
    id: 2,
    title: "Variables & Data Types",
    courseName: "Modern JavaScript From The Beginning Course",
    videoUrl: sessionVideo,
    description:
      "Learn about JavaScript variables, data types, and type conversion",
    duration: 105,
  };

  const comments = [
    {
      id: 1,
      user: "Alice Johnson",
      text: "Great explanation of variable hoisting!",
      time: "2 hours ago",
      likes: 5,
    },
    {
      id: 2,
      user: "Bob Smith",
      text: "Could you explain more about const vs let?",
      time: "1 hour ago",
      likes: 3,
      pinned: true,
    },
  ];

  const notes = [
    {
      id: 1,
      title: "Variable Declaration",
      content: "let, const, var differences",
      timestamp: "10:30",
    },
    {
      id: 2,
      title: "Data Types",
      content: "Primitive vs Reference types",
      timestamp: "25:45",
    },
  ];

  const handleCourseClick = (course: any) => {
    setSelectedCourse(course);
    setCurrentView("courseDetails");
  };

  const handleSessionClick = (sessionId: number) => {
    setSelectedSession(sessionId);
    setCurrentView("session");
  };

  const handleJoinSession = (courseId: number) => {
    const course = courses.find((c) => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setCurrentView("session");
    }
  };

  const handleBackToCourses = () => {
    setCurrentView("courses");
    setSelectedCourse(null);
  };

  const handleBackToCourseDetails = () => {
    setCurrentView("courseDetails");
    setSelectedSession(null);
  };

  if (currentView === "session") {
    return (
      <SessionDetailsPage
        course={courseDetails}
        session={sessionDetails}
        trainer={courseDetails.trainer}
        comments={comments}
        notes={notes}
        sessions={sessions}
        onCourseDetailsClick={handleBackToCourseDetails}
        onBackClick={handleBackToCourseDetails}
        onSessionChange={handleSessionClick}
      />
    );
  }

  if (currentView === "courseDetails") {
    return (
      <>
        <CourseDetailsPage
          course={courseDetails}
          sessions={sessions}
          onSessionClick={handleSessionClick}
          onBackClick={handleBackToCourses}
        />
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
            // suggestions={suggestions}
            onSendMessage={(message) => console.log("Chat message:", message)}
          />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-y-auto w-full flex-1 flex flex-col">
      <div className="sticky top-0 z-20 border-b border-[#0d0d0d0d] bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap size={16} className="text-gray-700" />
            <h1 className="text-md text-gray-700 font-medium">Learning Hub</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-6 pb-[6rem]">
        {/* Welcome Section */}
        <div className="mb-2">
          <div className="mb-5">
            <h1 className="text-xl font-bold text-gray-900 mb-3">
              Welcome to Your Learning Journey! 🎓
            </h1>
            <p className="text-sm text-gray-700 mb-2 max-w-3xl">
              Discover, learn, and master new skills with our comprehensive
              courses. Track your progress, join live sessions, and achieve your
              learning goals.
            </p>
          </div>
        </div>

        {/* Action Cards Section */}
        <div className="mb-2">
          <h2 className="flex items-center gap-x-1 text-lg font-bold text-gray-900 mb-3">
            Quick Actions <Sparkles className="text-gray-900 h-4 w-4" />
          </h2>
          <div className="flex flex-col items-center md:flex-row gap-6 mb-4">
            <div className="flex-1">
              <ActionCard
                type="current"
                title="Java Spring Boot Session"
                date="December 15, 2024"
                time="2:00 PM - 3:30 PM"
                onAction={() => handleJoinSession(1)}
              />
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="w-[0.5px] h-[70px] bg-gray-200"></div>
            </div>
            <div className="flex-1">
              <ActionCard
                type="past"
                title="Flutter Widget Basics"
                date="December 12, 2024"
                time="10:00 AM - 11:30 AM"
                onAction={() => console.log("View recording")}
              />
            </div>
          </div>
        </div>

        {/* My Courses Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="cursor-pointer">
                <MyCourseCard
                  {...course}
                  onCourseClick={() => handleCourseClick(course)}
                  onJoinSession={() => handleJoinSession(course.id)}
                />
              </div>
            ))}
          </div>
        </div>
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
          // suggestions={suggestions}
          onSendMessage={(message) => console.log("Chat message:", message)}
        />
      </div>
    </div>
  );
}

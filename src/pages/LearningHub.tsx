import { useState } from "react";
import { CourseDetailsPage } from "../components/CourseDetailsPage";
import { SessionDetailsPage } from "../components/SessionDetailsPage";
import sessionVideo from "../assets/videos/session.mp4";

export function LearningHub() {
  const [currentView, setCurrentView] = useState<"course" | "session">(
    "course"
  );
  const [selectedSession, setSelectedSession] = useState<number | null>(1);

  const course = {
    id: 1,
    title: "The Complete JavaScript Course 2025: From Zero to Expert!",
    description:
      "The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one!",
    startDate: "July 08, 2025",
    endDate: "August 30, 2025",
    languages: ["English", "Tamil"],
    totalSessions: 8,
    completedSessions: 3,
    progress: 37,
    tags: [
      "Foundational Concepts",
      "Control Structures",
      "Functions & Scope",
      "Objects & Arrays",
      "DOM Manipulation",
      "Advanced JavaScript",
    ],
    trainer: {
      name: "Scarlett Johnson",
      title: "Head of Design",
      company: "Zoho",
      rating: 4.9,
      reviews: 2100,
      avatar: "https://via.placeholder.com/48",
    },
  };

  const sessions = [
    {
      id: 1,
      title: "Session 1: Introduction to JavaScript",
      date: "July 08, 2025",
      duration: "45 min",
      status: "completed" as const,
    },
    {
      id: 2,
      title: "Session 2: Variables and Data Types",
      date: "July 10, 2025",
      duration: "50 min",
      status: "completed" as const,
    },
    {
      id: 3,
      title: "Session 3: Functions and Scope",
      date: "July 12, 2025",
      duration: "55 min",
      status: "current" as const,
    },
    {
      id: 4,
      title: "Session 4: Objects and Arrays",
      date: "July 15, 2025",
      duration: "60 min",
      status: "locked" as const,
    },
    {
      id: 5,
      title: "Session 5: DOM Manipulation",
      date: "July 17, 2025",
      duration: "65 min",
      status: "locked" as const,
    },
  ];

  const comments = [
    {
      id: 1,
      user: "Trainer",
      text: "After completing this session, you'll be ready to perform well in the mini test.",
      time: "2h ago",
      likes: 640,
      pinned: true,
    },
    {
      id: 2,
      user: "Amarnath",
      text: "I finally understand how closures works - the lessons broke it down so well!🔥",
      time: "40min ago",
      likes: 640,
    },
    {
      id: 3,
      user: "Parveen Kumar",
      text: "I never thought online learning could feel this personal and motivating🔥",
      time: "30min ago",
      likes: 640,
    },
    {
      id: 4,
      user: "Balaji",
      text: "I took the web development class and already built my first portfolio site💕",
      time: "30min ago",
      likes: 320,
    },
  ];

  const notes = [
    {
      id: 1,
      title: "Introduction to JavaScript",
      content:
        "JavaScript is a programming language that adds interactivity to your website.",
      timestamp: "10:30",
    },
    {
      id: 2,
      title: "Variables and Data Types",
      content:
        "Variables are containers for storing data values. JavaScript has several data types.",
      timestamp: "15:45",
    },
    {
      id: 3,
      title: "Functions",
      content:
        "Functions are blocks of code designed to perform a particular task.",
      timestamp: "22:10",
    },
  ];

  const handleSessionClick = (sessionId: number) => {
    setSelectedSession(sessionId);
    setCurrentView("session");
  };

  const handleBackToCourse = () => {
    setCurrentView("course");
    setSelectedSession(null);
  };

  const handleSessionChange = (sessionId: number) => {
    setSelectedSession(sessionId);
  };

  const currentSession = selectedSession
    ? {
        id: selectedSession,
        title: sessions.find((s) => s.id === selectedSession)?.title || "",
        courseName: course.title,
        videoUrl: sessionVideo,
        duration: 300,
      }
    : null;

  if (currentView === "session" && currentSession) {
    return (
      <SessionDetailsPage
        course={course}
        session={currentSession}
        trainer={course.trainer}
        comments={comments}
        notes={notes}
        sessions={sessions}
        onCourseDetailsClick={handleBackToCourse}
        onSessionChange={handleSessionChange}
      />
    );
  }

  return (
    // <CourseDetailsPage
    //   course={course}
    //   sessions={sessions}
    //   onSessionClick={handleSessionClick}
    // />
    <SessionDetailsPage
      course={course}
      session={currentSession}
      trainer={course.trainer}
      comments={comments}
      notes={notes}
      sessions={sessions}
      onCourseDetailsClick={handleBackToCourse}
      onSessionChange={handleSessionChange}
    />
  );
}

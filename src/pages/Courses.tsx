import {
  Atom,
  Coffee,
  Smartphone,
  Server,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  GraduationCap,
  Palette,
  Settings,
  Brain,
  BarChart3,
  Cog,
  TrendingUp,
} from "lucide-react";
import { EnrolledCourseCard } from "../components/EnrolledCourseCard";
import { CourseCard } from "../components/CourseCard";
import { ChatTextArea } from "../components/ChatTextArea";
import { useState } from "react";

export function Courses() {
  const [selectedBadge, setSelectedBadge] = useState("Development");

  const badges = [
    "Development",
    "Design",
    "DevOps",
    "AI/ML",
    "Product Management",
    "Operations",
    "Marketing",
  ];

  const courseData = {
    Development: {
      myCourses: [
        {
          type: "Main Course",
          icon: (
            <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center text-xs font-bold">
              JS
            </div>
          ),
          title: "JavaScript",
          courseName: "Modern JavaScript From The Beginning Course",
          price: 199,
          duration: "02:20 hrs",
          progress: 40,
          nextSession: "Next Session",
          nextTopic: "Variables & Data Types",
          sessionDate: "22th July, 2025 & 6 PM - GST",
          trainer: "Trainer",
          tags: ["Must learning class for Javascript!", "Value added Class"],
          buttonText: "Join Session",
          buttonType: "primary",
        },
        {
          type: "Skill-Up Add-on: 1",
          icon: (
            <div className="w-8 h-8 flex items-center gap-1">
              <span className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center text-[8px] font-bold text-white">
                5
              </span>
              <span className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center text-[8px] font-bold text-white">
                3
              </span>
            </div>
          ),
          title: "HTML & CSS",
          courseName: "Modern HTML & CSS From The Beginning 2.0",
          price: 199,
          duration: "01:00 hrs",
          progress: 0,
          nextSession: "Next Session",
          nextTopic: "Introduction",
          sessionDate: "23rd July, 2025 & 6 PM",
          trainer: "Trainer",
          tags: ["Must learning class for Javascript!", "Value added Class"],
          buttonText: "Start Now",
          status: "Ongoing",
        },
        {
          type: "Skill-Up Add-on: 2",
          icon: (
            <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
              <Atom className="w-5 h-5 text-white" />
            </div>
          ),
          title: "React.js",
          courseName: "Javascript Tutorial and Projects - Full Course",
          price: 99,
          duration: "01:30 hrs",
          progress: 0,
          nextSession: "Next Session",
          nextTopic: "Getting Started",
          sessionDate: "24th July, 2025 & 7 PM",
          trainer: "Trainer",
          tags: ["Must learning class for Javascript!", "Value added Class"],
          buttonText: "Start Now",
        },
      ],
      topPicks: [
        {
          type: "Main Course",
          title: "Java Developer",
          description: "Full Stack Java Dev: Masterclass for Beginners",
          price: 1299,
          sessions: 12,
          enrolledMembers: 1289,
          bgColor: "",
          icon: (
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <Coffee className="w-6 h-6 text-gray-800" />
            </div>
          ),
        },
        {
          type: "Main Course",
          title: "Flutter & Dart",
          description: "Flutter & Dart - The Complete Guide [2025 Edition]",
          price: 1299,
          sessions: 12,
          enrolledMembers: 2639,
          bgColor: "",
          icon: (
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-blue-600" />
            </div>
          ),
        },
        {
          type: "Main Course",
          title: "Master Laravel & PHP",
          description: "Master Laravel & PHP: From Beginner to Advanced",
          price: 1299,
          sessions: 12,
          enrolledMembers: 1689,
          bgColor: "",
          icon: (
            <div className="w-12 h-12 flex items-center justify-center">
              <Server className="w-6 h-6 text-green-700" />
            </div>
          ),
        },
      ],
    },
    Design: {
      myCourses: [
        {
          type: "Main Course",
          icon: (
            <div className="w-8 h-8 bg-pink-400 rounded flex items-center justify-center text-xs font-bold">
              UI
            </div>
          ),
          title: "UI/UX Design",
          courseName: "Complete UI/UX Design Bootcamp 2025",
          price: 299,
          duration: "03:15 hrs",
          progress: 25,
          nextSession: "Next Session",
          nextTopic: "Design Principles",
          sessionDate: "25th July, 2025 & 7 PM - GST",
          trainer: "Trainer",
          tags: ["Creative Design Course", "Industry Standard"],
          buttonText: "Continue",
          buttonType: "primary",
        },
      ],
      topPicks: [
        {
          type: "Main Course",
          title: "Figma Mastery",
          description: "Complete Figma Design Course for Beginners",
          price: 899,
          sessions: 8,
          enrolledMembers: 2156,
          bgColor: "",
          icon: (
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <Palette className="w-6 h-6 text-purple-600" />
            </div>
          ),
        },
        {
          type: "Main Course",
          title: "Adobe Creative Suite",
          description: "Master Photoshop, Illustrator & InDesign",
          price: 1199,
          sessions: 15,
          enrolledMembers: 1834,
          bgColor: "",
          icon: (
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <Palette className="w-6 h-6 text-orange-600" />
            </div>
          ),
        },
      ],
    },
    DevOps: {
      myCourses: [
        {
          type: "Main Course",
          icon: (
            <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center text-xs font-bold">
              DO
            </div>
          ),
          title: "Docker & Kubernetes",
          courseName: "Complete DevOps with Docker & Kubernetes",
          price: 399,
          duration: "04:30 hrs",
          progress: 15,
          nextSession: "Next Session",
          nextTopic: "Container Basics",
          sessionDate: "26th July, 2025 & 8 PM - GST",
          trainer: "Trainer",
          tags: ["DevOps Essential", "Cloud Native"],
          buttonText: "Resume",
          buttonType: "primary",
        },
      ],
      topPicks: [
        {
          type: "Main Course",
          title: "AWS DevOps",
          description: "Complete AWS DevOps Engineer Certification",
          price: 1599,
          sessions: 20,
          enrolledMembers: 987,
          bgColor: "",
          icon: (
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <Settings className="w-6 h-6 text-orange-500" />
            </div>
          ),
        },
        {
          type: "Main Course",
          title: "CI/CD Pipeline",
          description: "Master Jenkins, GitLab CI & GitHub Actions",
          price: 1299,
          sessions: 16,
          enrolledMembers: 1456,
          bgColor: "",
          icon: (
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <Cog className="w-6 h-6 text-gray-700" />
            </div>
          ),
        },
      ],
    },
    "AI/ML": {
      myCourses: [
        {
          type: "Main Course",
          icon: (
            <div className="w-8 h-8 bg-purple-400 rounded flex items-center justify-center text-xs font-bold">
              AI
            </div>
          ),
          title: "Machine Learning",
          courseName: "Complete Machine Learning A-Z Course",
          price: 499,
          duration: "05:45 hrs",
          progress: 30,
          nextSession: "Next Session",
          nextTopic: "Neural Networks",
          sessionDate: "27th July, 2025 & 9 PM - GST",
          trainer: "Trainer",
          tags: ["AI/ML Fundamentals", "Data Science"],
          buttonText: "Continue Learning",
          buttonType: "primary",
        },
      ],
      topPicks: [
        {
          type: "Main Course",
          title: "Deep Learning",
          description: "Complete Deep Learning Specialization",
          price: 1899,
          sessions: 25,
          enrolledMembers: 756,
          bgColor: "",
          icon: (
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
          ),
        },
        {
          type: "Main Course",
          title: "Python for AI",
          description: "Python Programming for Artificial Intelligence",
          price: 1399,
          sessions: 18,
          enrolledMembers: 2134,
          bgColor: "",
          icon: (
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-green-600" />
            </div>
          ),
        },
      ],
    },
    "Product Management": {
      myCourses: [
        {
          type: "Main Course",
          icon: (
            <div className="w-8 h-8 bg-green-400 rounded flex items-center justify-center text-xs font-bold">
              PM
            </div>
          ),
          title: "Product Strategy",
          courseName: "Complete Product Management Masterclass",
          price: 599,
          duration: "06:20 hrs",
          progress: 50,
          nextSession: "Next Session",
          nextTopic: "Market Research",
          sessionDate: "28th July, 2025 & 6 PM - GST",
          trainer: "Trainer",
          tags: ["Product Leadership", "Strategy Planning"],
          buttonText: "Join Session",
          buttonType: "primary",
        },
      ],
      topPicks: [
        {
          type: "Main Course",
          title: "Agile Product Management",
          description: "Scrum & Agile Methodologies for PMs",
          price: 1199,
          sessions: 14,
          enrolledMembers: 1678,
          bgColor: "",
          icon: (
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          ),
        },
        {
          type: "Main Course",
          title: "Data-Driven PM",
          description: "Analytics & Metrics for Product Managers",
          price: 999,
          sessions: 12,
          enrolledMembers: 934,
          bgColor: "",
          icon: (
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          ),
        },
      ],
    },
    Operations: {
      myCourses: [],
      topPicks: [
        {
          type: "Main Course",
          title: "Operations Management",
          description: "Complete Operations & Supply Chain Management",
          price: 1099,
          sessions: 16,
          enrolledMembers: 567,
          bgColor: "",
          icon: (
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <Cog className="w-6 h-6 text-gray-600" />
            </div>
          ),
        },
      ],
    },
    Marketing: {
      myCourses: [],
      topPicks: [
        {
          type: "Main Course",
          title: "Digital Marketing",
          description: "Complete Digital Marketing Bootcamp 2025",
          price: 899,
          sessions: 12,
          enrolledMembers: 2345,
          bgColor: "",
          icon: (
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-pink-600" />
            </div>
          ),
        },
      ],
    },
  };
  const suggestions = [
    {
      id: "1",
      text: "Summarize my course.",
    },
    {
      id: "2",
      text: "Which course suits me best?",
    },
  ];
  return (
    <div className="min-h-screen bg-white overflow-y-auto w-full flex-1 flex flex-col relative">
      <div className="sticky top-0 z-20 border-b border-[#0d0d0d0d] bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap size={16} className="text-gray-700" />
            <h1 className=" text-md text-gray-700 font-medium">Courses</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-6 pb-[6rem]">
        {/* Personalized Course Recommendation Section */}
        <div className="mb-8">
          <div className="flex justify-center space-x-3">
            <div className="flex flex-col text-center">
              <h3 className="text-lg flex items-center text-center font-semibold text-gray-900 mb-3">
                The courses listed below are smartly matched for you
                <div className="text-2xl ml-1">👀</div>
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  They're selected based on your interests, domain focus, and
                  learning style.
                </p>
                <p>Your progress and goals helped shape this list. </p>
                <p>
                  {" "}
                  Each course fits where you are right now in your journey.
                </p>
                <p className="font-medium">
                  Jump in with confidence and keep moving forward at your own
                  pace.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Badge Tabs */}
        <div className="flex gap-3 mb-4">
          {badges.map((badge) => (
            <div
              key={badge}
              onClick={() => setSelectedBadge(badge)}
              className={`px-4 py-2 rounded-full text-xs font-medium border cursor-pointer transition-colors ${
                selectedBadge === badge
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "text-gray-500 border-gray-200 hover:bg-green-100 hover:text-green-800 hover:border-green-200"
              }`}
            >
              {badge}
            </div>
          ))}
        </div>

        <div className="flex gap-5">
          <div className="flex-1 relative">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold text-gray-900">My Course</h1>
              {/* <button className="text-sm text-green-600 font-medium hover:text-green-700">
                See all
              </button> */}
            </div>

            <div className="pb-4 mb-8 grid grid-cols-3 gap-4">
              {courseData[selectedBadge]?.myCourses.length > 0
                ? courseData[selectedBadge].myCourses.map((course, index) => (
                    <EnrolledCourseCard key={index} {...course} />
                  ))
                : null}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Our top pick courses for you:
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {courseData[selectedBadge]?.topPicks.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Trending skills
              </h2>

              {/* Trending Skills Badges with Scroll */}
              <div className="relative mb-8">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const container =
                        document.getElementById("skills-scroll");
                      container?.scrollBy({ left: -200, behavior: "smooth" });
                    }}
                    className="p-2 flex-shrink-0"
                  >
                    <ChevronLeft className="text-gray-300" />
                  </button>

                  <div
                    id="skills-scroll"
                    className="flex gap-3 overflow-x-auto scrollbar-hide"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                      width: "750px",
                    }}
                  >
                    <div className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-xs font-medium border border-green-200 whitespace-nowrap">
                      Leadership and Management
                    </div>
                    <div className="text-gray-700 px-4 py-1 rounded-full text-xs font-medium border border-gray-200 hover:bg-green-100 hover:text-green-700 hover:border-green-200 cursor-pointer whitespace-nowrap">
                      Responsible AI
                    </div>
                    <div className="text-gray-700 px-4 py-1 rounded-full text-xs font-medium border border-gray-200 hover:bg-green-100 hover:text-green-700 hover:border-green-200 cursor-pointer whitespace-nowrap">
                      Machine Learning
                    </div>
                    <div className="text-gray-700 px-4 py-1 rounded-full text-xs font-medium border border-gray-200 hover:bg-green-100 hover:text-green-700 hover:border-green-200 cursor-pointer whitespace-nowrap">
                      Python Programming
                    </div>
                    <div className="text-gray-700 px-4 py-1 rounded-full text-xs font-medium border border-gray-200 hover:bg-green-100 hover:text-green-700 hover:border-green-200 cursor-pointer whitespace-nowrap">
                      Computer Programming
                    </div>
                    <div className="text-gray-700 px-4 py-1 rounded-full text-xs font-medium border border-gray-200 hover:bg-green-100 hover:text-green-700 hover:border-green-200 cursor-pointer whitespace-nowrap">
                      Microsoft Excel
                    </div>
                    <div className="text-gray-700 px-4 py-1 rounded-full text-xs font-medium border border-gray-200 hover:bg-green-100 hover:text-green-700 hover:border-green-200 cursor-pointer whitespace-nowrap">
                      Data Science
                    </div>
                    <div className="text-gray-700 px-4 py-1 rounded-full text-xs font-medium border border-gray-200 hover:bg-green-100 hover:text-green-700 hover:border-green-200 cursor-pointer whitespace-nowrap">
                      Cloud Computing
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const container =
                        document.getElementById("skills-scroll");
                      container?.scrollBy({ left: 200, behavior: "smooth" });
                    }}
                    className="p-2 flex-shrink-0"
                  >
                    <ChevronRight className="text-gray-300" />
                  </button>
                </div>
              </div>

              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Personalized Specializations for You
              </h2>

              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-[25px] border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=150&fit=crop"
                      alt="Google Project Management"
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-medium">
                        Free Trial
                      </span>
                      <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                        <span>⭐</span> AI skills
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                      Project Management
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span>Build toward a degree</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Professional Certificate
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-[25px] border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=150&fit=crop"
                      alt="IBM Product Manager"
                      className="w-full h-32 object-cover bg-blue-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-medium">
                        Free Trial
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                      Product Manager
                    </h3>
                    <p className="text-xs text-gray-600">
                      Professional Certificate
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-[25px] border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=150&fit=crop"
                      alt="Google People Management"
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-medium">
                        Free Trial
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                      People Management Essentials
                    </h3>
                    <p className="text-xs text-gray-600">Specialization</p>
                  </div>
                </div>

                <div className="bg-white rounded-[25px] border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=150&fit=crop"
                      alt="IBM Business Analyst"
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-medium">
                        Free Trial
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                      Business Analyst
                    </h3>
                    <p className="text-xs text-gray-600">
                      Professional Certificate
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Chat Text Area - Centered within course section */}
      <div
        className="fixed bottom-[20px] z-[60]"
        style={{
          left: "calc(50% + 500px - 50vw)",
          width: "calc(100vw - 760px)",
        }}
      >
        <ChatTextArea
          placeholder="Ask AI about this session..."
          suggestions={suggestions}
          onSendMessage={(message) => console.log("Chat message:", message)}
        />
      </div>
    </div>
  );
}

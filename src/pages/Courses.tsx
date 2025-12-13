import {
  Atom,
  Coffee,
  Smartphone,
  Server,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  GraduationCap,
} from "lucide-react";
import { EnrolledCourseCard } from "../components/EnrolledCourseCard";
import { CourseCard } from "../components/CourseCard";
import { ChatTextArea } from "../components/ChatTextArea";

export function Courses() {
  const suggestions = [
    {
      id: "1",
      text: "Summarize this session.",
    },
    {
      id: "2",
      text: "Can you explain the difference between let, const, and var?",
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
        {/* Badge Tabs */}
        <div className="flex gap-3 mb-4">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-xs font-medium border border-green-200">
            Course
          </div>
          <div className="text-gray-500 px-4 py-2 rounded-full text-xs font-medium border border-gray-200 hover:bg-green-100 cursor-pointer">
            Events
          </div>
          <div className="text-gray-500 px-4 py-2 rounded-full text-xs font-medium border border-gary-200 hover:bg-green-100 cursor-pointer">
            Progress
          </div>
        </div>

        <div className="flex gap-5">
          <div className="flex-1 relative">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold text-gray-900">My Course</h1>
              {/* <button className="text-sm text-green-600 font-medium hover:text-green-700">
                See all
              </button> */}
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
              <EnrolledCourseCard
                type="Main Course"
                icon={
                  <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center text-xs font-bold">
                    JS
                  </div>
                }
                title="JavaScript"
                courseName="Modern JavaScript From The Beginning Course 2.0 (2025)"
                price={199}
                duration="02:20 hrs"
                progress={40}
                nextSession="Next Session"
                nextTopic="Variables & Data Types"
                sessionDate="22th July, 2025 & 6 PM - GST"
                trainer="Trainer"
                tags={[
                  "Must learning class for Javascript!",
                  "Value added Class",
                ]}
                buttonText="Join Session"
                buttonType="primary"
              />

              <EnrolledCourseCard
                type="Skill-Up Add-on: 1"
                icon={
                  <div className="w-8 h-8 flex items-center gap-1">
                    <span className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center text-[8px] font-bold text-white">
                      5
                    </span>
                    <span className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center text-[8px] font-bold text-white">
                      3
                    </span>
                  </div>
                }
                title="HTML & CSS"
                courseName="Modern HTML & CSS From The Beginning 2.0"
                price={199}
                duration="01:00 hrs"
                progress={0}
                nextSession="Next Session"
                nextTopic="Introduction"
                sessionDate="23rd July, 2025 & 6 PM"
                trainer="Trainer"
                tags={[
                  "Must learning class for Javascript!",
                  "Value added Class",
                ]}
                buttonText="Start Now"
                status="Ongoing"
              />

              <EnrolledCourseCard
                type="Skill-Up Add-on: 2"
                icon={
                  <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                    <Atom className="w-5 h-5 text-white" />
                  </div>
                }
                title="React.js"
                courseName="Javascript Tutorial and Projects - Full Course"
                price={99}
                duration="01:30 hrs"
                progress={0}
                nextSession="Next Session"
                nextTopic="Getting Started"
                sessionDate="24th July, 2025 & 7 PM"
                trainer="Trainer"
                tags={[
                  "Must learning class for Javascript!",
                  "Value added Class",
                ]}
                buttonText="Start Now"
              />
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Our top pick courses for you:
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <CourseCard
                  type="Main Course"
                  title="Java Developer"
                  description="Full Stack Java Dev: Masterclass for Beginners"
                  price={1299}
                  sessions={12}
                  enrolledMembers={1289}
                  bgColor=""
                  icon={
                    <div className="w-12 h-12 rounded-full flex items-center justify-center">
                      <Coffee className="w-6 h-6 text-gray-800" />
                    </div>
                  }
                />

                <CourseCard
                  type="Main Course"
                  title="Flutter & Dart"
                  description="Flutter & Dart - The Complete Guide [2025 Edition]"
                  price={1299}
                  sessions={12}
                  enrolledMembers={2639}
                  bgColor=""
                  icon={
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-blue-600" />
                    </div>
                  }
                />

                <CourseCard
                  type="Main Course"
                  title="Master Laravel & PHP"
                  description="Master Laravel & PHP: From Beginner to Advanced"
                  price={1299}
                  sessions={12}
                  enrolledMembers={1689}
                  bgColor=""
                  icon={
                    <div className="w-12 h-12 flex items-center justify-center">
                      <Server className="w-6 h-6 text-green-700" />
                    </div>
                  }
                />
              </div>
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

          <div className="w-80">
            <h2 className="text-xl font-bold text-gray-900 mb-6">My Events</h2>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="text-center text-gray-600 text-sm mb-4">
                <h3 className="font-bold text-gray-900 mb-2">Free Webinar</h3>
                <p className="text-xs">Join our upcoming webinar sessions</p>
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

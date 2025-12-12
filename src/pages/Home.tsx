import { ArrowRight, ArrowRightIcon, ChevronDown, Paperclip, Users, TrendingUp, Target } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatTextArea } from "../components/ChatTextArea";
import Student from "../assets/images/student.png";

export function Home() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [showSessionDropdown, setShowSessionDropdown] = useState(false);

  const courses = ["React Basics", "Advanced TypeScript", "Node.js", "Python"];
  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);
    setShowCourseDropdown(false);
  };

  const handleSessionSelect = (session: string) => {
    setSelectedSession(session);
    setShowSessionDropdown(false);
  };

  const removeTag = (type: "course" | "session") => {
    if (type === "course") setSelectedCourse("");
    else setSelectedSession("");
  };
    const suggestions = [
    {
      id: "1",
      text: "Show my tasks for today",
    },
    {
      id: "2",
      text: "Generate a study plan for today",
    },
  ];
  return (
    <div className="flex-1 flex flex-col items-center mt-24 p-8 overflow-y-auto">
      <div className="">
        <p className="text-3xl font-bold text-gray-900 text-center mb-4">
          Hi Vicky S, I'm personalized AI from WeLe
        </p>
        <p className="text-gray-600 text-center text-md">
          Let’s boost your skills, prepare for interviews, and grow smarter
          today!
        </p>
        <p className="text-gray-600 text-center text-md mb-12">
          Ask anything - Learn, Apply & Excel.
        </p>
        {/* INPUT AREA */}
        <div
          className="bg-white rounded-2xl shadow-lg border border-[#00bf53] p-3 px-4 max-w-3xl mx-auto"
          style={{
            boxShadow:
              "0 0 20px rgba(0, 191, 83, 0.17), 0 0 40px rgba(0, 191, 83, 0.07)",
          }}
        >
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedCourse && (
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                Course: {selectedCourse}
                <button
                  onClick={() => removeTag("course")}
                  className="hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            )}
            {/* {selectedSession && (
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                Session: {selectedSession}
                <button onClick={() => removeTag("session")} className="hover:text-green-900">
                  ×
                </button>
              </span>
            )} */}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell AI what you want to design..."
            className="w-full h-16 resize-none border-none outline-none text-gray-700 placeholder-gray-400"
          />

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-4 relative">
              <button className="text-gray-400 hover:text-gray-600">
                 <Paperclip size={20} />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-100"
                >
                  <p className="self-center">Course</p>{" "}
                  <ChevronDown size={14} className="ml-1 self-end" />
                </button>
                {showCourseDropdown && (
                  <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 min-w-[150px]">
                    {courses.map((course) => (
                      <button
                        key={course}
                        onClick={() => handleCourseSelect(course)}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        {course}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* <div className="relative">
                <button
                  onClick={() => setShowSessionDropdown(!showSessionDropdown)}
                  className="text-sm text-gray-600 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-100"
                >
                  Session ▾
                </button>
                {showSessionDropdown && (
                  <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 min-w-[150px]">
                    {sessions.map((session) => (
                      <button
                        key={session}
                        onClick={() => handleSessionSelect(session)}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        {session}
                      </button>
                    ))}
                  </div>
                )}
              </div> */}
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-[#00BF53] hover:bg-green-600 disabled:bg-gray-300"
                disabled={!input.trim()}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-[calc(100vw-450px)] mx-auto px-6 space-y-6 py-6 relative">
        {/* AI Student Feedback Card */}
        <div className="mt-4 mb-8 relative">
          <div className="bg-white rounded-xl px-8 pt-8 border border-gray-200 mx-auto shadow-lg">
            <div className="flex items-start gap-8">
              <div className="flex-shrink-0">
                <img 
                  src={Student}
                  alt="Student" 
                  className=" w-40 rounded-xl object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-[#00bf53]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900 text-xl">AI Generated Feedback</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Alex Johnson</h4>
                    <p className="text-sm text-gray-500 block mb-2">Full Stack Development Course</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500 block">Class Ranking</span>
                      <p className="font-semibold text-black text-lg">#12 of 45</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block ">Weekly Rank</span>
                      <p className="font-semibold text-black text-lg">#8</p>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-sm text-gray-900 block mb-2">Best Work
</span>
                    <p className="font-medium text-gray-500 text-sm">You show strong consistency in your learning. Your problem-solving approach, clean coding style, and ability to break tasks into smaller steps stand out. Your pace is steady, and you clearly understand core concepts better than most learners in your batch.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="w-2 h-2 bg-green-400 rounded-full absolute animate-float-up" style={{right: '10%', animationDelay: '0s'}}></div>
                    <div className="w-1.5 h-1.5 bg-green-300 rounded-full absolute animate-float-up" style={{right: '20%', animationDelay: '0.8s'}}></div>
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full absolute animate-float-up" style={{right: '15%', animationDelay: '1.6s'}}></div>
                    <div className="w-1 h-1 bg-green-200 rounded-full absolute animate-float-up" style={{right: '25%', animationDelay: '2.4s'}}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full absolute animate-float-up" style={{right: '8%', animationDelay: '3.2s'}}></div>
                    <div className="w-1.5 h-1.5 bg-green-300 rounded-full absolute animate-float-up" style={{right: '30%', animationDelay: '4s'}}></div>
                  </div>
        </div>

        {/* Three Cards Section */}
        <div className="grid grid-cols-3 gap-6 mt-8 mb-8">
          {/* Top Role Matches Card */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-[#00bf53]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5" />
              </svg>
              <h3 className="font-semibold text-gray-900 text-sm">Top Role Matches</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-900">Frontend Developer</p>
                <p className="text-xs text-green-600">92% match</p>
                <p className="text-xs text-gray-500">$85k - $120k</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900">React Developer</p>
                <p className="text-xs text-green-600">88% match</p>
                <p className="text-xs text-gray-500">$90k - $130k</p>
              </div>
            </div>
            <button className="text-xs text-gray-500 font-medium hover:text-green-600 flex items-center gap-1 group mt-2">
              View More
              <ArrowRight size={12} className="group-hover:text-green-600" />
            </button>
          </div>

          {/* Today Schedule Card */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#00bf53]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="font-semibold text-gray-900 text-sm">Today Schedule</h3>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-900">React Advanced</p>
                  <p className="text-xs text-gray-500">10:00 AM</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-900">Node.js Basics</p>
                  <p className="text-xs text-gray-500">2:00 PM</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-900">UI/UX Workshop</p>
                  <p className="text-xs text-gray-500">4:30 PM</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </div>
            <button className="text-xs text-gray-500 font-medium hover:text-green-600 flex items-center gap-1 group mt-2">
              Show More
              <ArrowRight size={12} className="group-hover:text-green-600" />
            </button>
          </div>

          {/* Skill Gap Analysis Card */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#00bf53]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="font-semibold text-gray-900 text-sm">Skill Gap Analysis</h3>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-900">React</span>
                  <span className="text-xs text-gray-600">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-[#00bf53] h-1 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-900">Python</span>
                  <span className="text-xs text-gray-600">72%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-[#00bf53] h-1 rounded-full" style={{width: '72%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-900">UI/UX Design</span>
                  <span className="text-xs text-gray-600">58%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-[#00bf53] h-1 rounded-full" style={{width: '58%'}}></div>
                </div>
              </div>
            </div>
            <button className="text-xs text-gray-500 mt-2 font-medium hover:text-green-600 flex items-center gap-1 group mt-8">
              View Full Analysis
              <ArrowRight size={12} className="group-hover:text-green-600" />
            </button>
          </div>
        </div>

        {/* Banner Card */}

                  <div className="relative mb-5">
                            <div className="bg-white rounded-2xl p-6 border border-gray-200 relative overflow-hidden">
          <div className="absolute top-4 left-4 text-xs font-medium opacity-80 text-gray-900">Future-Ready Skill Spotlight</div>
          <div className="absolute top-4 right-4 bg-gray-200 text-gray-900 px-2 py-1 rounded-2xl text-xs font-medium">🔥 Top Pick</div>
          <h1 className="text-xl font-bold mt-6 mb-2 text-gray-900">Top 1% Careers: Machine Learning Specialist</h1>
          <div className="space-y-1 mb-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Users size={14} className="text-gray-600" />
              <span>4.2× Hiring Growth (Global)</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-gray-600" />
              <span>Average Salary: ₹28–₹52L</span>
            </div>
            <div className="flex items-center gap-2">
              <Target size={14} className="text-gray-600" />
              <span>Demand across FinTech, EdTech, HealthTech, SaaS</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-4">ML Specialists are leading AI automation, predictive analytics, and next-gen product intelligence.</p>

          
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="w-2 h-2 bg-green-400 rounded-full absolute animate-float-up" style={{right: '10%', animationDelay: '0s'}}></div>
            <div className="w-1.5 h-1.5 bg-green-300 rounded-full absolute animate-float-up" style={{right: '20%', animationDelay: '0.8s'}}></div>
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full absolute animate-float-up" style={{right: '15%', animationDelay: '1.6s'}}></div>
            <div className="w-1 h-1 bg-green-200 rounded-full absolute animate-float-up" style={{right: '25%', animationDelay: '2.4s'}}></div>
            <div className="w-2 h-2 bg-green-400 rounded-full absolute animate-float-up" style={{right: '8%', animationDelay: '3.2s'}}></div>
            <div className="w-1.5 h-1.5 bg-green-300 rounded-full absolute animate-float-up" style={{right: '30%', animationDelay: '4s'}}></div>
          </div>
        </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white pointer-events-none" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex text-[#00BF53] text-sm bg-white border border-[#00BF53] px-6 py-2 rounded-full transition-colors shadow-lg"
              >
                View More <ArrowRightIcon size={14} className="self-center ml-2"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

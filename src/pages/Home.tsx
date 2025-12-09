import { ArrowRight, ArrowRightIcon, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [showSessionDropdown, setShowSessionDropdown] = useState(false);

  const courses = ["React Basics", "Advanced TypeScript", "Node.js", "Python"];
  const sessions = ["Session 1", "Session 2", "Session 3", "Session 4"];

  const cards = [
    { id: 1, title: "Indian farmers burn crops at night to evade satellite tracking", desc: "Research reveals farmers in Punjab and Haryana deliberately shifted crop burning to evening hours", sources: 50, img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400" },
    { id: 2, title: "Trump signals tariffs on Indian rice, Canadian fertilizer", sources: 59, img: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=400" },
    { id: 3, title: "Indian banks write off Rs 6.15 lakh crore in loans", sources: 61, img: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=400" },
    { id: 4, title: "Two-month-old AI startup raises $475M at $4.5B valuation", sources: 72, img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400" },
    { id: 5, title: "AI tools reshape holiday shopping as ChatGPT adds checkout", desc: "Major retailers integrate AI assistants", sources: 45, img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400" },
    { id: 6, title: "New climate report warns of accelerating global warming", sources: 38, img: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400" },
    { id: 7, title: "Tech giants announce breakthrough in quantum computing", sources: 82, img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400" },
    { id: 8, title: "Global markets rally on positive economic indicators", sources: 54, img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400" },
    { id: 9, title: "Renewable energy adoption reaches record highs", sources: 67, img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400" },
    { id: 10, title: "Major breakthrough in cancer treatment announced", sources: 91, img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400" },
    { id: 11, title: "Space exploration enters new era", sources: 43, img: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400" },
  ];

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

  return (
    <div className="flex-1 flex flex-col items-center mt-24 p-8 overflow-y-auto">
      <div className="max-w-4xl w-full">
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
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

        {/* GRID SECTIONS */}
        <div className="mt-12 space-y-6">
          {/* 12 grid - image right, text left */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="flex">
              <div className="flex-1 p-6">
                <h3 className="font-semibold text-xl mb-2">{cards[0].title}</h3>
                <p className="text-sm text-gray-600 mb-3">{cards[0].desc}</p>
                <span className="text-xs text-gray-500">{cards[0].sources} sources</span>
              </div>
              <img src={cards[0].img} alt="" className="w-[30rem] h-[16rem] object-cover" />
            </div>
          </div>

          {/* 4-4-4 grid set 1 */}
          <div className="grid grid-cols-3 gap-4">
            {cards.slice(1, 4).map((card) => (
              <div key={card.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <img src={card.img} alt="" className="w-full h-[14rem] object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2">{card.title}</h3>
                  <span className="text-xs text-gray-500">{card.sources} sources</span>
                </div>
              </div>
            ))}
          </div>

          {/* 12 grid - image right, text left */}
          <div className="relative mb-5">
            <div className="flex">
              <div className="flex-1 p-6">
                <h3 className="font-semibold text-xl mb-2">{cards[4].title}</h3>
                <p className="text-sm text-gray-600 mb-3">{cards[4].desc}</p>
                <span className="text-xs text-gray-500">{cards[4].sources} sources</span>
              </div>
              <img src={cards[4].img} alt="" className="w-[30rem] h-[16rem] object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none" />
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

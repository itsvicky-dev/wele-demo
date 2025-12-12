import {
  ArrowUp,
  BookOpen,
  Paperclip,
  Pin,
  Send,
  Users,
  X,
} from "lucide-react";
import Interview from "../assets/videos/interview.mp4";
import WelePdf from "../assets/document/wele.pdf";
import { useState, useEffect, useRef } from "react";

export function MockInterviews() {
  const [mode, setMode] = useState<"initial" | "chat" | "interview">("initial");
  const [selectedType, setSelectedType] = useState<
    "course" | "roleplay" | null
  >(null);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [messages, setMessages] = useState<
    Array<{
      text: string;
      sender: "user" | "ai";
      type?: "dropdown" | "button" | "text";
    }>
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showDropdowns, setShowDropdowns] = useState(false);
  const [showRoleInput, setShowRoleInput] = useState(false);
  const [roleInput, setRoleInput] = useState("");
  const [waitingForRole, setWaitingForRole] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [videoTranscript, setVideoTranscript] = useState<
    Array<{
      timestamp: number;
      speaker: "user" | "ai";
      text: string;
      name: string;
    }>
  >([]);
  const [loadingMessages, setLoadingMessages] = useState<Set<number>>(
    new Set()
  );
  const [showEndConfirmation, setShowEndConfirmation] = useState(false);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const courses = ["UI/UX Designing", "Node.js Backend", "Python Programming"];

  // Mock video transcript data with timestamps
  const mockTranscript = [
    {
      timestamp: 12,
      speaker: "ai" as const,
      text: " Hi Abilash, when you hear the terms UI and UX, what comes to your mind? And if you had to explain the difference between them to a friend who isn’t from a design background, how would you put it?",
      name: "AI Interviewer",
    },
    {
      timestamp: 38,
      speaker: "user" as const,
      text: "Uh… okay, so… UI is like, you know, the look of the app — the buttons, the colors, fonts, all that. And UX, ahh it’s more like how it feels when we actually use it. I mean, UI is what you see, and UX is kinda like the experience behind it, na. If I tell my friend, I’ll just say… UI is looks, UX is the feel.",
      name: "Abilash",
    },
    {
      timestamp: 50,
      speaker: "ai" as const,
      text: "Okay, since you said UX is about smoothness — imagine you’re designing a food delivery app. What 2–3 things would you improve first to make the user’s journey easy and stress-free?” Yeah… okay, so first thing, I’ll see how fast someone can place the order, like without too many clicks, you know?",
      name: "AI Interviewer",
    },
    {
      timestamp: 79,
      speaker: "user" as const,
      text: "Then maybe, uh… the tracking part — people always keep checking where the food is, so that should be very clear. And also, aah … the navigation — like it should be simple, not confusing, otherwise the user will get irritated fast.",
      name: "Abilash",
    },
  ];

  const handleRoleplayClick = () => {
    setMode("chat");
    setMessages((prev) => [
      ...prev,
      { text: "Roleplay Interview", sender: "user" },
    ]);
    setWaitingForRole(true);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          text: "Great! Please enter the role you'd like to practice for (e.g., Frontend Developer, Data Scientist, etc.)",
          sender: "ai",
        },
      ]);
    }, 1000);
  };

  const handleRoleSubmit = () => {
    if (!roleInput.trim()) return;
    setSelectedDomain(roleInput);
    setSelectedType("roleplay");
    setMode("chat");
    setMessages([{ text: roleInput, sender: "user" }]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          text:
            "Excellent choice! I'll conduct a roleplay interview for " +
            roleInput +
            " position. Shall we begin?",
          sender: "ai",
          type: "button",
        },
      ]);
    }, 1000);
    setShowRoleInput(false);
    setRoleInput("");
  };

  const handleCourseSelection = (course: string) => {
    setSelectedCourse(course);
    setSelectedType("course");
    setWaitingForRole(false);
    setMode("chat");
    setMessages((prev) => [...prev, { text: course, sender: "user" }]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          text:
            "Perfect! I'll help you practice interview questions for " +
            course +
            ". Ready to start your interview?",
          sender: "ai",
          type: "button",
        },
      ]);
    }, 1000);
  };

  const handleDomainSelection = (domain: string) => {
    setSelectedDomain(domain);
    setSelectedType("roleplay");
    setShowDropdowns(false);
    setMessages((prev) => [...prev, { text: domain, sender: "user" }]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          text:
            "Excellent choice! I'll conduct a roleplay interview for " +
            domain +
            " position. Shall we begin?",
          sender: "ai",
          type: "button",
        },
      ]);
    }, 1000);
  };

  const handleStartInterview = () => {
    setMode("interview");
    setVideoTranscript([]);
    setCurrentVideoTime(0);
    setInterviewEnded(false);
    // Show skeleton for first message only
    setLoadingMessages(new Set([0]));
    const interviewType =
      selectedType === "course" ? selectedCourse : selectedDomain;
  };

  // Handle video time updates and sync with transcript
  useEffect(() => {
    if (mode === "interview" && videoRef.current) {
      const video = videoRef.current;

      const handleTimeUpdate = () => {
        const currentTime = video.currentTime;
        setCurrentVideoTime(currentTime);

        // Find next message to show
        const nextMessageIndex = mockTranscript.findIndex(
          (msg) => msg.timestamp > currentTime
        );
        const visibleMessages = mockTranscript.filter(
          (msg) => msg.timestamp <= currentTime
        );

        // Show skeleton for next upcoming message only
        if (nextMessageIndex !== -1) {
          setLoadingMessages(new Set([nextMessageIndex]));
        } else {
          setLoadingMessages(new Set());
        }

        // Update visible messages
        if (visibleMessages.length !== videoTranscript.length) {
          setVideoTranscript(visibleMessages);
        }
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => video.removeEventListener("timeupdate", handleTimeUpdate);
    }
  }, [mode, videoTranscript.length]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [videoTranscript, loadingMessages]);

  const handleTextSubmit = () => {
    if (!inputValue.trim()) return;

    if (waitingForRole) {
      setSelectedDomain(inputValue);
      setSelectedType("roleplay");
      setMessages((prev) => [...prev, { text: inputValue, sender: "user" }]);
      setWaitingForRole(false);

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            text:
              "Excellent choice! I'll conduct a roleplay interview for " +
              inputValue +
              " position. Shall we begin?",
            sender: "ai",
            type: "button",
          },
        ]);
      }, 1000);
    } else {
      setMessages((prev) => [...prev, { text: inputValue, sender: "user" }]);

      setTimeout(() => {
        const responses = [
          "That's interesting. Can you elaborate on that?",
          "Good point. How would you handle a challenging situation in this area?",
          "Tell me about a project where you applied these skills.",
          "What do you think are the key challenges in this field?",
        ];
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        setMessages((prev) => [
          ...prev,
          { text: randomResponse, sender: "ai" },
        ]);
      }, 1000);
    }

    setInputValue("");
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [...prev, { text: inputValue, sender: "user" }]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's interesting. Can you elaborate on that?",
        "Good point. How would you handle a challenging situation in this area?",
        "Tell me about a project where you applied these skills.",
        "What do you think are the key challenges in this field?",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { text: randomResponse, sender: "ai" }]);
    }, 1000);

    setInputValue("");
  };

  const handleEndInterview = () => {
    setShowEndConfirmation(true);
  };

  const confirmEndInterview = () => {
    setInterviewEnded(true);
    setMode("chat");
    setShowEndConfirmation(false);
    // Don't clear messages, just add end message
    setMessages((prev) => [
      ...prev,
      {
        text: "Your interview has ended. Thank you for participating!",
        sender: "ai",
      },
    ]);
  };

  const cancelEndInterview = () => {
    setShowEndConfirmation(false);
  };

  const downloadReport = () => {
    const link = document.createElement("a");
    link.href = WelePdf;
    link.download = "interview-report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetInterview = () => {
    setMode("initial");
    setSelectedType(null);
    setSelectedCourse("");
    setSelectedDomain("");
    // Don't clear messages to preserve chat data
    // setMessages([]);
    setInputValue("");
    setIsTyping(false);
    setShowDropdowns(false);
    setShowRoleInput(false);
    setRoleInput("");
    setWaitingForRole(false);
    setVideoTranscript([]);
    setCurrentVideoTime(0);
    setLoadingMessages(new Set());
    setInterviewEnded(false);
    setShowEndConfirmation(false);
  };

  return (
    <>
      {/* Fullscreen Interview Overlay */}
      {mode === "interview" && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          {/* Interview Header */}
          <div className="p-2 px-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">
                Mock Interview Session
              </h1>
              <button
                onClick={resetInterview}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                <X />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-[90vw] mx-auto">
            <div className="flex gap-6 w-full h-[65vh]">
              {/* Video Section */}
              <div className="w-2/3">
                <div className="rounded-[20px] overflow-hidden relative">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                  >
                    <source src={Interview} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Time Display */}
                  {/* <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                  {Math.floor(currentVideoTime / 60)}:
                  {String(Math.floor(currentVideoTime % 60)).padStart(2, "0")}
                </div> */}
                </div>
              </div>

              {/* Chat Section */}
              <div className="flex-1 bg-white rounded-[20px] shadow-sm border border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">
                    Interview Transcript
                  </h3>
                </div>

                <div
                  ref={chatContainerRef}
                  className="flex-1 p-4 overflow-y-auto"
                >
                  {videoTranscript.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${
                        message.speaker === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {/* <div className="text-xs text-gray-500 mb-1">
                      <span className="font-medium">{message.name}</span>
                    </div> */}
                      <div
                        className={`inline-block max-w-[80%] p-3 rounded-[40px] text-sm ${
                          message.speaker === "user"
                            ? "bg-gray-100 text-gray-800 rounded-br-sm"
                            : "text-gray-800 rounded-bl-sm"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}

                  {/* Show skeleton for next upcoming message */}
                  {Array.from(loadingMessages).map((index) => {
                    const message = mockTranscript[index];
                    return (
                      <div
                        key={`skeleton-${index}`}
                        className={`mb-4 ${
                          message.speaker === "user"
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        <div className="text-xs text-gray-300 mb-1">
                          <div className="h-3 bg-gray-200 rounded w-16 animate-pulse inline-block"></div>
                        </div>
                        <div
                          className={`p-3 rounded-lg animate-pulse space-y-3 `}
                        >
                          <div className="h-2 bg-gray-300 rounded w-38"></div>
                          <div className="h-2 bg-gray-300 rounded w-38"></div>
                          <div className="h-2 bg-gray-300 rounded w-38"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* MIC Button*/}
                <div className="p-4 flex justify-center">
                  <button className="p-2 text-gray-400 hover:text-gray-600 border border-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)]">
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
                </div>
              </div>
            </div>
            {/* End Interview Button - Under Chat Section */}
            <div className="flex gap-6 w-full min-w-[90vw] mt-4">
              <div className="w-[190%]"></div>
              <div className="flex justify-center w-full">
                <button
                  onClick={handleEndInterview}
                  className="px-6 py-2 border border-gray-600 text-black rounded-full hover:bg-red-600 hover:text-white hover:border-0 transition-colors text-sm"
                >
                  End Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* End Interview Confirmation Modal */}
      {showEndConfirmation && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              End Interview?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to end the interview? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelEndInterview}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmEndInterview}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                End Interview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Hidden when in interview mode */}
      <div
        className={`flex-1 w-full h-screen bg-white flex flex-col relative ${
          mode === "interview" ? "hidden" : ""
        }`}
      >
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pt-8 pb-2">
          {(mode === "initial" || mode === "chat") && (
            <div className="max-w-4xl mx-auto">
              {/* Welcome Content */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Welcome to AI Mock Interview.
                </h2>
                <p className="text-md text-gray-600 mb-6">
                  This smart interview simulation helps you practice real
                  company-style questions across multiple difficulty levels.
                  Each level is designed to sharpen your thinking,
                  communication, and problem-solving skills — just like an
                  actual interview.
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    What You Get From This Mock Interview
                  </h3>
                  <div className="text-center space-y-2 m-auto flex flex-col max-w-lg">
                    <p className="text-gray-700 text-sm flex items-center">
                      Clear understanding of your communication style and how
                      confidently you present your thoughts.
                    </p>
                    <p className="text-gray-700 text-sm flex items-center">
                      Improved problem-solving and answer structuring, just like
                      real interviews expect.
                    </p>
                    <p className="text-gray-700 text-sm flex items-center">
                      Role-specific interview readiness with questions tailored
                      to your career path.
                    </p>
                    <p className="text-gray-700 text-sm flex items-center">
                      Experience handling real company-style scenarios, from
                      behavioural to technical.
                    </p>
                    <p className="text-gray-700 text-sm flex items-center">
                      Better decision-making under pressure through advanced,
                      situational questions.
                    </p>
                    <p className="text-gray-700 text-sm flex items-center">
                      Deep insight into your strengths and improvement areas to
                      help you prepare smarter.
                    </p>
                  </div>
                </div>

                <p className="text-md font-medium text-gray-800 mb-4">
                  Prepare to practice, improve, and build the confidence you
                  need to crack your next interview.
                </p>
                <p className="text-gray-700 text-sm mb-6">
                  Pick your style — course questions or role-specific mock
                  interviews
                </p>

                {/* Two Card Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {/* Course List Card */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <h3 className="text-md font-semibold text-gray-800">
                        Course
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Practice with structured course-based interview questions
                    </p>
                    <div className="space-y-2">
                      {courses.map((course) => (
                        <button
                          key={course}
                          onClick={() => handleCourseSelection(course)}
                          className="w-full text-left p-3 rounded-lg border border-gray-100 hover:border-[#00BF53] transition-all group"
                        >
                          <div className="font-medium text-gray-800 text-sm group-hover:text-[#00BF53]">
                            {course}
                          </div>
                          {/* <div className="text-xs text-gray-500 mt-1">
                          Structured questions & scenarios
                        </div> */}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Roleplay Card */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <Users className="w-5 h-5 mr-2" />
                      <h3 className="text-md font-semibold text-gray-800">
                        Roleplay Interview
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Simulate real interview scenarios for any role or position
                    </p>
                    <div className="space-y-4">
                      <button
                        onClick={handleRoleplayClick}
                        className="text-[#00BF53] py-3 px-4 rounded-lg font-medium text-sm border border-[#00BF53] rounded-lg"
                      >
                        Start Roleplay Interview
                      </button>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-xs font-medium text-gray-700 mb-1">
                          Perfect for:
                        </div>
                        <div className="flex justify-center mx-auto">
                          <ul className="text-xs text-gray-600 space-y-1 text-left">
                            <li>
                              • Experience interviews exactly like the role
                              you're preparing for.
                            </li>
                            <li>
                              • Learn what interviewers expect and sharpen your
                              responses.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Interface - Only show after Get Started is clicked */}
              {mode === "chat" && (
                <div className="flex-1 p-4 overflow-y-auto">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${
                        message.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`inline-block max-w-[80%] p-3 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-gray-100 text-gray-800 rounded-br-sm"
                            : "text-gray-800 rounded-bl-sm"
                        }`}
                      >
                        {message.text}
                        {message.type === "button" && (
                          <div className="mt-3">
                            <button
                              onClick={handleStartInterview}
                              disabled={index !== messages.length - 1 || (interviewEnded && index < messages.findIndex(msg => msg.text === "Your interview has ended. Thank you for participating!"))}
                              className={`px-4 py-2 border rounded-lg transition-colors text-sm ${
                                index === messages.length - 1 && !(interviewEnded && index < messages.findIndex(msg => msg.text === "Your interview has ended. Thank you for participating!"))
                                  ? "border-[#00BF53] text-[#00BF53] hover:bg-[#00BF53] hover:text-white"
                                  : "border-gray-300 text-gray-400 cursor-not-allowed"
                              }`}
                            >
                              Start Interview
                            </button>
                          </div>
                        )}
                        {message.text ===
                          "Your interview has ended. Thank you for participating!" && (
                          <div className="mt-3 space-y-2">
                            <button
                              onClick={downloadReport}
                              className="px-4 py-2 border border-[#00BF53] text-[#00BF53] rounded-lg hover:bg-[#00BF53]/90 hover:text-white transition-colors text-sm mr-2"
                            >
                              Download Report
                            </button>
                            <div className="text-xs text-gray-600 mt-2">
                              <a
                                href="#"
                                className="text-blue-500 hover:underline"
                              >
                                Session Recording Link
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="text-left mb-4">
                      <div className="inline-block text-gray-800 p-3 rounded-lg rounded-bl-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {/* TEXT INPUT AREA - Only show when not in interview mode */}
        <div className="left-8 right-8 bg-white p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-sm border border-gray-200 px-6 py-4 rounded-full">
              <div className="relative flex items-center">
                <button className="text-gray-400 hover:text-gray-600">
                  <Paperclip size={20} />
                </button>
                <textarea
                  className="w-full h-7 px-4 pr-20 rounded-lg resize-none focus:outline-none focus:border-transparent"
                  placeholder={
                    waitingForRole ? "Enter your role..." : "Ask anything..."
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleTextSubmit()}
                />

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
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
                      className={`p-2 rounded-full ${
                        inputValue.trim()
                          ? "bg-[#00BF53] text-white hover:bg-[#00BF53]/90"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      onClick={handleTextSubmit}
                      disabled={!inputValue.trim()}
                    >
                      <ArrowUp size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

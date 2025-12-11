import {
  ArrowUp,
  Compass,
  Mic,
  MoreHorizontal,
  Paperclip,
  Send,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { aiService } from "../services/aiService";
import type { AIMessage } from "../services/aiService";

interface MCQOption {
  id: string;
  text: string;
}

interface MCQQuestion {
  id: string;
  question: string;
  options: MCQOption[];
}

const careerQuestions: MCQQuestion[] = [
  {
    id: "1",
    question: "A home appliance stops working. What do you do?",
    options: [
      { id: "a", text: "Try a quick fix to see if it works." },
      { id: "b", text: "Think of another temporary solution." },
      { id: "c", text: "Look for what might be causing it." },
      { id: "d", text: "Organise what to do next with others." },
    ],
  },
  {
    id: "2",
    question:
      "You see a new product advertisement. What catches your attention first?",
    options: [
      { id: "a", text: "Whether the message feels neat and organised." },
      { id: "b", text: "How the product actually works." },
      { id: "c", text: "The visuals and how fresh the idea looks." },
      { id: "d", text: "Whether the message makes sense logically." },
    ],
  },
  {
    id: "3",
    question: "You're planning a family outing. What's the first thing you do?",
    options: [
      { id: "a", text: "Find what everyone should do and when." },
      { id: "b", text: "Compare different places carefully." },
      { id: "c", text: "Look at how you can reach there easily." },
      { id: "d", text: "Think of fun ideas to make it special." },
    ],
  },
  {
    id: "4",
    question:
      "You receive a long message with lots of details. How do you handle it?",
    options: [
      { id: "a", text: "Pick out the most important points." },
      { id: "b", text: "Rearrange the information so it flows better." },
      { id: "c", text: "Try a simple action to understand it quickly." },
      { id: "d", text: "Think of a clear example to relate it to." },
    ],
  },
  {
    id: "5",
    question: "You bump into a confusing situation. What's your instinct?",
    options: [
      { id: "a", text: "Try to solve it immediately with what you have." },
      { id: "b", text: "Think of an unusual but possible solution." },
      { id: "c", text: "Figure out where the confusion started." },
      { id: "d", text: "Set a small plan to move ahead." },
    ],
  },
  {
    id: "21",
    question:
      "Your mixie suddenly stops while running. What do you check first?",
    options: [
      { id: "a", text: "If the jar wasn't locked properly" },
      { id: "b", text: "If the mixie is old" },
      { id: "c", text: "If someone used it before" },
      { id: "d", text: "If changing the color would help" },
    ],
  },
  {
    id: "22",
    question:
      "Your laptop becomes slow only on some days. What seems most sensible to check?",
    options: [
      { id: "a", text: "What apps were open on those days" },
      { id: "b", text: "If the charger was plugged in" },
      { id: "c", text: "The weather outside" },
      { id: "d", text: "If it's because it's Monday" },
    ],
  },
  {
    id: "23",
    question: "You need to assemble a new table. What do you do first?",
    options: [
      { id: "a", text: "Sort the parts based on size" },
      { id: "b", text: "Start fixing pieces randomly" },
      { id: "c", text: "Read only half the instructions" },
      { id: "d", text: "Ask someone else to finish it" },
    ],
  },
  {
    id: "24",
    question: "Your phone storage is full. How will you solve it?",
    options: [
      { id: "a", text: "Check which type of files take the most space" },
      { id: "b", text: "Delete the first 5 photos you find" },
      { id: "c", text: "Restart the phone" },
      { id: "d", text: "Install another storage app" },
    ],
  },
  {
    id: "25",
    question: "You want to learn a new tool. How will you begin?",
    options: [
      { id: "a", text: "Start with basic features before trying complex ones" },
      { id: "b", text: "Try everything randomly to see what works" },
      { id: "c", text: "Watch one advanced tutorial first" },
      { id: "d", text: "Ask a friend to explain it fully" },
    ],
  },
  {
    id: "63",
    question: 'Which option best describes what a "loop" does in programming?',
    options: [
      { id: "a", text: "Repeats a set of steps until a condition is met" },
      { id: "b", text: "Stores data permanently" },
      { id: "c", text: "Stops the program from running" },
      { id: "d", text: "Displays information on the screen" },
    ],
  },
  {
    id: "64",
    question: 'When writing code, what is the purpose of a "variable"?',
    options: [
      {
        id: "a",
        text: "To store values that may change while the program runs",
      },
      { id: "b", text: "To draw shapes on the screen" },
      { id: "c", text: "To repeat lines of code forever" },
      { id: "d", text: "To stop errors from happening" },
    ],
  },
  {
    id: "65",
    question:
      "You write a program and it shows an error. What is the BEST first step?",
    options: [
      { id: "a", text: "Check which line the error message is pointing to" },
      { id: "b", text: "Rewrite the whole program from scratch" },
      { id: "c", text: "Ignore the error and continue" },
      { id: "d", text: "Ask someone else to fix it immediately" },
    ],
  },
  {
    id: "66",
    question: 'What does "if–else" help you do in a program?',
    options: [
      { id: "a", text: "Make decisions based on conditions" },
      { id: "b", text: "Save information on your computer" },
      { id: "c", text: "Turn the computer off" },
      { id: "d", text: "Draw tables or charts" },
    ],
  },
  {
    id: "67",
    question: "Why is indentation (spacing) important in coding?",
    options: [
      {
        id: "a",
        text: "It makes the code more readable and helps avoid mistakes",
      },
      { id: "b", text: "It makes the program run faster" },
      { id: "c", text: "It changes the color of the text" },
      { id: "d", text: "It is only used for decoration" },
    ],
  },
];

const questionSets = [
  { id: 1, title: "Level 1: Psychometric", start: 0, end: 5 },
  { id: 2, title: "Level 2: Mixed", start: 5, end: 10 },
  { id: 3, title: "Level 3: Technical", start: 10, end: 15 },
];

export function CareerCompass() {
  const [showAssessment, setShowAssessment] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [assessmentTerminated, setAssessmentTerminated] = useState(false);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSet, setActiveSet] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentQuestionRef = useRef<HTMLDivElement>(null);
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const fullContent = `👏Welcome to Career Compass.
  This quick mission reveals your strengths and shows you the career path that truly fits you.

Level 1: will have simple psychometric questions to understand your mindset, behaviour, and decision style.

Level 2: mixes psychometric + basic technical questions to see how you connect logic with skills.

Level 3: dives into pure technical questions to validate your real-world understanding. Ready ah? Let's find the career that actually fits you."`;

  useEffect(() => {
    let currentIndex = 0;
    
    const typeCharacter = () => {
      if (currentIndex < fullContent.length) {
        setDisplayedContent(fullContent.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeCharacter, 5);
      } else {
        setIsTyping(false);
      }
    };
    
    typeCharacter();
  }, []);

  useEffect(() => {
    if (!showAssessment) return;

    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const scrollPosition = container.scrollTop + 200;

      for (let i = questionSets.length - 1; i >= 0; i--) {
        const set = questionSets[i];
        const firstQuestionRef = questionRefs.current[set.start];
        if (firstQuestionRef && firstQuestionRef.offsetTop <= scrollPosition) {
          setActiveSet(set.id);
          break;
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [showAssessment]);

  const handleAnswerSelect = (questionId: string, optionText: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionText }));
    if (currentQuestionIndex < careerQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    }
  };

  useEffect(() => {
    if (currentQuestionRef.current && scrollContainerRef.current) {
      setTimeout(() => {
        currentQuestionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [currentQuestionIndex]);

  const scrollToSet = (setId: number) => {
    const set = questionSets.find((s) => s.id === setId);
    if (set && questionRefs.current[set.start]) {
      setActiveSet(setId);
      questionRefs.current[set.start]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const getSetCompletedCount = (setStart: number, setEnd: number) => {
    let count = 0;
    for (let i = setStart; i < setEnd && i < careerQuestions.length; i++) {
      if (userAnswers[careerQuestions[i]?.id]) count++;
    }
    return count;
  };

  const submitAssessment = () => {
    if (Object.keys(userAnswers).length === careerQuestions.length) {
      setShowResults(true);
    }
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    if (showAssessment && !showResults && !assessmentTerminated) {
      setShowWarningPopup(true);
      return;
    }

    const userMessage = chatInput.trim();
    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);
    setChatInput("");
    setIsLoading(true);

    const conversationMessages: AIMessage[] = [
      ...chatMessages.map((msg) => ({ role: msg.role, content: msg.content })),
      { role: "user", content: userMessage },
    ];

    let assistantContent = "";
    setChatMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      for await (const chunk of aiService.streamResponse(
        conversationMessages
      )) {
        if (!chunk.isComplete) {
          assistantContent += chunk.content;
          setChatMessages((prev) =>
            prev.map((msg, index) =>
              index === prev.length - 1 && msg.role === "assistant"
                ? { ...msg, content: assistantContent }
                : msg
            )
          );
        }
      }
    } catch (error) {
      console.error("Error generating response:", error);
      setChatMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 && msg.role === "assistant"
            ? {
                ...msg,
                content:
                  "Sorry, I'm having trouble generating a response. Please try again.",
              }
            : msg
        )
      );
    }

    setIsLoading(false);
  };

  const handleWarningConfirm = async () => {
    setUserAnswers({});
    setShowResults(false);
    setAssessmentTerminated(true);
    setShowWarningPopup(false);

    const userMessage = chatInput.trim();
    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);
    setChatInput("");
    setIsLoading(true);

    const conversationMessages: AIMessage[] = [
      ...chatMessages.map((msg) => ({ role: msg.role, content: msg.content })),
      { role: "user", content: userMessage },
    ];

    let assistantContent = "";
    setChatMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      for await (const chunk of aiService.streamResponse(
        conversationMessages
      )) {
        if (!chunk.isComplete) {
          assistantContent += chunk.content;
          setChatMessages((prev) =>
            prev.map((msg, index) =>
              index === prev.length - 1 && msg.role === "assistant"
                ? { ...msg, content: assistantContent }
                : msg
            )
          );
        }
      }
    } catch (error) {
      console.error("Error generating response:", error);
      setChatMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 && msg.role === "assistant"
            ? {
                ...msg,
                content:
                  "Sorry, I'm having trouble generating a response. Please try again.",
              }
            : msg
        )
      );
    }

    setIsLoading(false);
  };

  const generateRecommendation = (): string => {
    const values = Object.values(userAnswers);

    if (
      values.includes("Technical/Programming skills") &&
      values.includes("Learning new technologies and innovation")
    ) {
      return "🚀 Software Development Career Path - Based on your responses, you'd excel in software development roles. Consider specializing in web development, mobile apps, or emerging technologies like AI/ML.";
    }

    if (
      values.includes("Leadership and management") &&
      values.includes("High salary and financial growth")
    ) {
      return "💼 Management & Leadership Track - Your profile suggests strong potential in management roles. Consider pursuing project management, team leadership, or executive positions.";
    }

    if (
      values.includes("Creative and design skills") &&
      values.includes("Making a positive impact on society")
    ) {
      return "🎨 Creative Impact Career - You're well-suited for roles in UX/UI design, marketing, or social impact organizations where creativity meets purpose.";
    }

    if (values.includes("Work-life balance and flexibility")) {
      return "⚖️ Flexible Career Options - Consider remote-friendly roles, consulting, or companies with strong work-life balance policies. Freelancing might also be a good fit.";
    }

    return "🌟 Diverse Career Opportunities - Your responses show versatility! Consider exploring multiple career paths through internships, side projects, or informational interviews to find your perfect fit.";
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-gray-50">
      <div className="border-b border-[#0d0d0d0d] bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-lg text-gray-900 flex items-center">
              <Compass size={18} className="mr-2" />
              Career Compass
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div
          ref={scrollContainerRef}
          className={`flex-1 overflow-y-auto bg-white transition-all duration-300`}
        >
          <div
            className={`${
              showAssessment && !showResults ? "max-w-5xl" : "max-w-3xl"
            } mx-auto py-6 flex`}
          >
            <div className="">
              {isLoading && (
                <div className="flex items-start space-x-3 mb-6">
                  <div className="flex-1">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div className="">
                <div className="flex flex-col items-center space-x-3">
                  {/* WELCOME MESSAGE */}
                  <div className="flex flex-col items-start space-y-3" id="welcome-text">
                    <p className="text-gray-800 flex flex-col mb-3">
                      <span className="text-center flex">
                        {displayedContent.split('\n')[0]}
                        {displayedContent.length < fullContent.length && displayedContent.split('\n').length === 1 && (
                          <span className="inline-block w-4 h-4 bg-gray-400 rounded-full ml-1 animate-pulse self-center"></span>
                        )}
                      </span>
                    </p>
                    {displayedContent.split('\n').slice(1).map((line, index) => (
                      line && <p key={index + 1} className="text-gray-800 flex-1">
                        {line.includes('Level') ? (
                          <><b>{line.split(':')[0]}:</b>{line.split(':').slice(1).join(':')}</>
                        ) : (
                          line
                        )}
                        {index === displayedContent.split('\n').slice(1).length - 1 && displayedContent.length < fullContent.length && (
                          <span className="inline-block w-4 h-4 bg-gray-400 rounded-full ml-1 animate-pulse self-center"></span>
                        )}
                      </p>
                    ))}
                  </div>
                  {!showAssessment && displayedContent.length == fullContent.length && (
                    <button
                      onClick={() => setShowAssessment(true)}
                      className="px-4 py-2 mt-16 rounded-lg border border-[#00BF53] text-[#00BF53] mx-auto flex hover:bg-[#00BF53]/[0.1] transition-colors"
                    >
                      Start Career Assessment
                    </button>
                  )}
                </div>
              </div>
              {showAssessment && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg py-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-1">
                        <p className="text-gray-800 mb-4">
                          Please answer all questions to get your personalized
                          career recommendation:
                        </p>

                        <div className="space-y-8">
                          {careerQuestions
                            .slice(0, currentQuestionIndex + 1)
                            .map((question, globalIndex) => {
                              const set = questionSets.find(
                                (s) =>
                                  globalIndex >= s.start && globalIndex < s.end
                              );
                              const showSetTitle =
                                set &&
                                (globalIndex === set.start ||
                                  globalIndex === 0);

                              return (
                                <div key={question.id}>
                                  {showSetTitle && (
                                    <h2 className="text-xl font-semibold text-gray-900 bg-white py-2 z-10 mb-6">
                                      {set.title}
                                    </h2>
                                  )}
                                  <div
                                    ref={(el) => {
                                      questionRefs.current[globalIndex] = el;
                                      if (
                                        globalIndex === currentQuestionIndex
                                      ) {
                                        currentQuestionRef.current = el;
                                      }
                                    }}
                                    className={`border-l-4 border-[#00BF53]/[0.1] pl-4 transition-all duration-500 ${
                                      globalIndex === currentQuestionIndex
                                        ? "animate-slideIn opacity-100"
                                        : "opacity-60"
                                    }`}
                                    style={{
                                      animation:
                                        globalIndex === currentQuestionIndex
                                          ? "slideIn 0.5s ease-out"
                                          : "none",
                                    }}
                                  >
                                    <h3 className="font-medium text-gray-800 mb-3">
                                      {globalIndex + 1}. {question.question}
                                    </h3>
                                    <div className="space-y-2">
                                      {question.options.map((option) => (
                                        <label
                                          key={option.id}
                                          className="flex items-center space-x-3 cursor-pointer"
                                        >
                                          <input
                                            type="radio"
                                            name={question.id}
                                            value={option.text}
                                            checked={
                                              userAnswers[question.id] ===
                                              option.text
                                            }
                                            onChange={() =>
                                              handleAnswerSelect(
                                                question.id,
                                                option.text
                                              )
                                            }
                                            className="text-blue-500"
                                            disabled={
                                              globalIndex !==
                                                currentQuestionIndex &&
                                              !userAnswers[question.id]
                                            }
                                          />
                                          <span className="text-gray-700">
                                            {option.text}
                                          </span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                        {!showResults &&
                          currentQuestionIndex === careerQuestions.length - 1 &&
                          userAnswers[
                            careerQuestions[currentQuestionIndex].id
                          ] && (
                            <button
                              onClick={submitAssessment}
                              className="mt-6 border border-[#00BF53] text-[#00BF53] hover:bg-[#00BF53]/[0.1] px-6 py-2 rounded-lg transition-colors animate-slideIn"
                            >
                              Submit
                            </button>
                          )}
                      </div>
                    </div>
                  </div>

                  {showResults && (
                    <div className="bg-white rounded-lg py-6">
                      <div className="flex items-start space-x-3">
                        <div className="flex-1">
                          <p className="text-gray-800">
                            {generateRecommendation()}
                          </p>
                          <button
                            onClick={() => {
                              setShowAssessment(false);
                              setUserAnswers({});
                              setShowResults(false);
                              setAssessmentTerminated(false);
                              setCurrentQuestionIndex(0);
                            }}
                            className="mt-4 border border-black px-4 py-2 hover:border-[#00BF53] hover:text-[#00BF53] rounded-lg transition-colors"
                          >
                            Take Assessment Again
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {assessmentTerminated && (
                    <div className="rounded-lg my-4">
                      <p className="text-yellow-800 text-sm">
                        ⚠️ Assessment terminated. You can now chat normally.
                      </p>
                    </div>
                  )}
                </div>
              )}
              {chatMessages.map((message, index) => (
                <div key={index} className="mb-6">
                  {message.role === "assistant" ? (
                    <div className="flex items-start space-x-3">
                      <div className="flex-1 space-y-2">
                        <div className="prose max-w-none">
                          {message.content ? (
                            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                              {message.content}
                            </p>
                          ) : (
                            <div className="flex space-x-1">
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0ms" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "150ms" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "300ms" }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-right mb-4">
                      <div className="inline-block bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-tr-md max-w-[80%]">
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* SIDE TITLE NAVIGATION */}
            {showAssessment && !showResults && (
              <div className="min-w-16 bg-white ml-4 self-start sticky top-[25px]">
                <div className="space-y-3">
                  {questionSets.map((set) => {
                    const completed = getSetCompletedCount(set.start, set.end);
                    const total = set.end - set.start;
                    const isActive = activeSet === set.id;

                    return (
                      <button
                        key={set.id}
                        onClick={() => scrollToSet(set.id)}
                        className={`w-full border-l-2 text-left px-2 py-1 transition-all ${
                          isActive ? "border-[#00BF53]" : "border-transparent"
                        }`}
                      >
                        <div className="flex">
                          <span
                            className={`text-sm font-medium ${
                              isActive ? "text-[#00BF53]" : "text-gray-700"
                            }`}
                          >
                            {set.title}
                          </span>
                          <span
                            className={`text-xs ml-2 self-center ${
                              isActive ? "text-[#00BF53]" : "text-gray-500"
                            }`}
                          >
                            {completed}/{total}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div
          className={` ${
            showAssessment && !showResults ? "max-w-5xl" : "max-w-3xl"
          } mx-auto pb-6`}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleChatSubmit();
            }}
            className="relative"
          >
            <div className="flex items-center space-x-3 border border-gray-300 rounded-full p-3 max-w-3xl">
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Paperclip size={20} />
              </button>
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleChatSubmit();
                  }
                }}
                placeholder="Ask anything"
                className="flex-1 bg-transparent border-0 self-center outline-none resize-none text-gray-900 placeholder-gray-500 min-h-[24px] max-h-32"
                rows={1}
                disabled={isLoading}
              />
              <button
                type="button"
                className=" text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Mic size={24} />
              </button>
              <button
                type="submit"
                disabled={!chatInput.trim() || isLoading}
                className="w-8 h-8 bg-[#00BF53] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {showWarningPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl text-yellow-500 font-bold">!</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Warning</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Current assessment data will be cleared if you continue. Do you
                want to proceed?
              </p>
              <div className="flex space-x-3 justify-end">
                <button
                  onClick={() => setShowWarningPopup(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWarningConfirm}
                  className="px-4 py-2 bg-[#00BF53] text-white rounded-lg hover:bg-[#00a045] transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

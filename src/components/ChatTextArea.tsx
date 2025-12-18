import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, X, ArrowUp, Mic, ChevronLeft } from "lucide-react";
import { aiService, AIMessage } from "../services/aiService";
import { SuggestionList } from "./SuggestionList";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  id: string;
}

interface Suggestion {
  id: string;
  text: string;
}

interface ChatTextAreaProps {
  placeholder?: string;
  onSendMessage?: (message: string) => void;
  disabled?: boolean;
  className?: string;
  suggestions?: Suggestion[];
  sessionContext?: {
    title: string;
    courseName: string;
    description?: string;
    duration: number;
  };
}

export function ChatTextArea({
  placeholder = "Ask anything",
  onSendMessage,
  disabled = false,
  className = "",
  suggestions = [],
  sessionContext,
}: ChatTextAreaProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [input]);

  useEffect(() => {
    if (showDrawer && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, showDrawer]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = async (suggestionText: string) => {
    if (isLoading || disabled) return;
    setShowSuggestions(false);

    let messageContent = suggestionText;
    if (
      suggestionText.toLowerCase().includes("summarize this session") &&
      sessionContext
    ) {
      messageContent = `${suggestionText}\n\nSession Details:\nTitle: ${
        sessionContext.title
      }\nCourse: ${sessionContext.courseName}\nDuration: ${
        sessionContext.duration
      } minutes${
        sessionContext.description
          ? `\nDescription: ${sessionContext.description}`
          : ""
      }`;
    }

    const userMessage: ChatMessage = {
      role: "user",
      content: messageContent,
      id: Date.now().toString(),
    };

    const assistantMessage: ChatMessage = {
      role: "assistant",
      content: "",
      id: (Date.now() + 1).toString(),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setShowDrawer(true);
    setIsLoading(true);
    onSendMessage?.(userMessage.content);

    try {
      const aiMessages: AIMessage[] = [
        ...messages,
        { role: userMessage.role, content: userMessage.content },
      ].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      let assistantContent = "";

      for await (const chunk of aiService.streamResponse(aiMessages)) {
        console.log("Received chunk:", chunk);
        if (!chunk.isComplete) {
          assistantContent += chunk.content;
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === "assistant") {
              lastMessage.content = assistantContent;
            }
            console.log("Updated message:", lastMessage, newMessages);
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || disabled) return;
    setShowSuggestions(false);

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
      id: Date.now().toString(),
    };

    const assistantMessage: ChatMessage = {
      role: "assistant",
      content: "",
      id: (Date.now() + 1).toString(),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
    setShowDrawer(true);
    setIsLoading(true);
    onSendMessage?.(userMessage.content);

    try {
      const aiMessages: AIMessage[] = [
        ...messages,
        { role: userMessage.role, content: userMessage.content },
      ].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      let assistantContent = "";

      for await (const chunk of aiService.streamResponse(aiMessages)) {
        console.log("Received chunk:", chunk);
        if (!chunk.isComplete) {
          assistantContent += chunk.content;
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === "assistant") {
              lastMessage.content = assistantContent;
            }
            console.log("Updated message:", lastMessage, newMessages);
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${showSuggestions && suggestions.length > 0 ? "rounded-t-[20px]" : ""}`}
    >
      {/* Suggestions */}
      {showSuggestions && (
        <SuggestionList
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
        />
      )}

      {/* Chat Input */}
      <div className={`relative ${className}`}>
        <form onSubmit={handleSubmit} className="relative">
          <div
            className={`flex items-center space-x-3 backdrop-blur-[50px] bg-[#fff] border border-white/20 shadow-[0_0_100px_rgba(255,255,255,0.6),0_0_200px_rgba(255,255,255,0.4),0_0_300px_rgba(255,255,255,0.2),0_0_400px_rgba(255,255,255,0.1)] before:absolute before:inset-0 before:rounded-full before:p-[1px] before:bg-gradient-to-r before:from-white/30 before:via-white/10 before:to-white/30 before:-z-10 ${
              showSuggestions && suggestions.length > 0
                ? "rounded-b-[20px] rounded-t-none before:rounded-b-[20px] before:rounded-t-none"
                : "rounded-full before:rounded-full"
            } p-3 relative`}
          >
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Paperclip size={20} />
            </button>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onClick={() => setShowSuggestions(true)}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-0 self-center outline-none resize-none text-white placeholder-[#888] min-h-[24px] max-h-32"
              rows={1}
              disabled={disabled || isLoading}
            />
            <button
              type="button"
              className=" text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Mic size={24} />
            </button>
            <button
              type="submit"
              disabled={!input.trim() || isLoading || disabled}
              className="w-8 h-8 bg-[#00BF53] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </form>
      </div>

      {/* Right Drawer */}
      {showDrawer && (
        <div className="fixed inset-y-0 z-[9999] right-0 w-[calc(100vw-240px)] bg-white shadow-xl border-l flex flex-col">
          {/* Header */}
          <div className="border-b border-gray-200 bg-white px-4 py-3">
            <div className="flex items-center">
              <button
                onClick={() => setShowDrawer(false)}
                className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft size={25} />
              </button>
              <h2 className="text-lg text-gray-900">AI Chat</h2>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4 max-w-3xl min-w-[48rem] mx-auto">
            {messages.map((message) => (
              <div key={message.id}>
                {message.role === "assistant" ? (
                  <div className="flex items-start space-x-3">
                    <div className="flex-1">
                      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-right">
                    <div className="inline-block bg-gray-100 text-gray-800 px-3 py-2 rounded-2xl rounded-tr-md max-w-[80%]">
                      <p className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start space-x-3">
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
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={`relative mb-5 ${className}`}>
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center space-x-3 backdrop-blur-[30px] text-white bg-white/10 border border-white/20 shadow-[0_0_100px_rgba(255,255,255,0.6),0_0_200px_rgba(255,255,255,0.4),0_0_300px_rgba(255,255,255,0.2),0_0_400px_rgba(255,255,255,0.1)] before:absolute before:inset-0 before:rounded-full before:p-[1px] before:bg-gradient-to-r before:from-white/30 before:via-white/10 before:to-white/30 before:-z-10 rounded-full p-3 max-w-3xl mx-auto relative">
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Paperclip size={20} />
                </button>
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  className="flex-1 bg-transparent border-0 self-center outline-none resize-none text-white placeholder-[#888] min-h-[24px] max-h-32"
                  rows={1}
                  disabled={disabled || isLoading}
                />
                <button
                  type="button"
                  className=" text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Mic size={24} />
                </button>
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading || disabled}
                  className="w-8 h-8 bg-[#00BF53] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200"
                >
                  <ArrowUp size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

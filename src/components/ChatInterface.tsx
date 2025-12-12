import { useState, useRef, useEffect } from "react";
import {
  MoreHorizontal,
  Paperclip,
  ArrowUp,
  MessageSquarePlus,
  MessageSquare,
  Mic,
} from "lucide-react";
import { Message } from "../lib/database.types";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
  chatTitle?: string;
  isNewChat?: boolean;
}

export function ChatInterface({
  messages,
  onSendMessage,
  isLoading,
  chatTitle,
  isNewChat = false,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
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
      className={`flex-1 ${
        messages.length === 0 ? "" : "flex flex-col"
      } h-screen bg-white`}
    >
      {/* Header */}
      <div className="border-b border-[#0d0d0d0d] bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-lg text-gray-900 flex items-center">
              {isNewChat ? (
                <MessageSquarePlus size={18} className="mr-2" />
              ) : (
                <MessageSquare size={18} className="mr-2" />
              )}
              {isNewChat ? "New Chat" : chatTitle || "New Chat"}
            </h1>
          </div>
          {!isNewChat && (
            <div className="flex items-center space-x-2">
              {/* <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Share size={16} />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <UserPlus size={16} />
                <span>Add people</span>
              </button> */}
              <button className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col mt-[20vh]">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-6 max-w-2xl px-4">
                <h2 className="text-3xl font-normal text-gray-800">
                  Hey Learner, What can I help you with today?
                </h2>
                <p className="text-gray-500">
                  Ask anything from career guidance to learning support. I’m
                  here to make your journey easier.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto py-6 min-w-[768px]">
            {/* {!isNewChat && (
              <div className="text-right mb-6">
                <div className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl rounded-tr-md max-w-[80%]">
                  <p className="text-sm">{chatTitle}</p>
                </div>
              </div>
            )} */}
            {messages.map((message, index) => (
              <div key={message.id} className="mb-6">
                {message.role === "assistant" ? (
                  <div className="flex items-start space-x-3">
                    <div className="flex-1 space-y-2">
                      <div className="min-w-[768px]">
                        <MarkdownRenderer content={message.content} />
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
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white">
        <div className="max-w-3xl mx-auto py-6">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center space-x-3 border border-gray-300 rounded-full p-3">
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
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 bg-[#00BF53] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

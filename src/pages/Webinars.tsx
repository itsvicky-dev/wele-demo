import { Calendar, MoreHorizontal } from "lucide-react";
import courseBg from "../assets/images/course-bg.png";
import { ChatTextArea } from "../components/ChatTextArea";

export function Webinars() {
  const webinars = [
    {
      id: 1,
      title: "Mastering Figma Variables",
      speaker: "Sarah Jenkins",
      role: "Product Designer @ Stripe",
      date: "Today",
      time: "4:00 PM EST",
      duration: "45 MIN",
      level: "BEGINNER",
      tags: ["UI/UX", "DesignSystem"],
      isLive: true,
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      speaker: "David Chen",
      role: "Senior Engineer @ Vercel",
      date: "Oct 26",
      time: "2:00 PM EST",
      duration: "50 MIN",
      level: "ADVANCED",
      tags: ["React", "Frontend"],
      isLive: false,
    },
    {
      id: 3,
      title: "Product Strategy for 2025",
      speaker: "Elena Rodriguez",
      role: "VP Product @ Airbnb",
      date: "Oct 28",
      time: "11:00 AM EST",
      duration: "40 MIN",
      level: "INTERMEDIATE",
      tags: ["ProductMgmt", "Strategy"],
      isLive: false,
    },
    {
      id: 4,
      title: "Into to Web3 Development",
      speaker: "Marcus Johnson",
      role: "DevRel @ Polygon",
      date: "Nov 02",
      time: "1:00 PM EST",
      duration: "90 MIN",
      level: "BEGINNER",
      tags: ["Web3", "Blockchain"],
      isLive: false,
    },
    {
      id: 5,
      title: "Data Storytelling for Leaders",
      speaker: "Priya Patel",
      role: "Lead Data Scientist @ Spotify",
      date: "Nov 05",
      time: "3:30 PM EST",
      duration: "50 MIN",
      level: "ADVANCED",
      tags: ["Data", "Analytics"],
      isLive: false,
    },
    {
      id: 6,
      title: "Growth Hacking 101",
      speaker: "Alex Wong",
      role: "Growth @ TikTok",
      date: "Nov 08",
      time: "10:00 AM EST",
      duration: "35 MIN",
      level: "BEGINNER",
      tags: ["Marketing", "Growth"],
      isLive: false,
    },
  ];

  const suggestions = [
    {
      id: "2",
      text: "Can you explain the difference between let, const, and var?",
    },
    // {
    //   id: "3",
    //   text: "How does lexical scoping work in JavaScript?"
    // }
  ];

  return (
    <div className="flex-1 min-h-screen bg-white overflow-y-scroll">
      <div className="sticky top-0 z-20 border-b border-[#0d0d0d0d] bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar size={16} className="text-gray-700" />
            <h1 className=" text-md text-gray-700 font-medium">Webinars</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-center text-center space-y-2">
          <p className="text-lg font-medium text-black-600">
            Learning hits differently when it comes at the right time.
          </p>
          <p className="text-sm text-gray-600">
            The webinars you see here are picked based on what you’re learning,
            your domain interests, and what you want to explore next.
          </p>
          <p className="text-sm text-gray-600">
            We also look at where you are in your journey, so each session feels
            useful — not too much, not too random.
          </p>
          <p className="text-sm text-gray-600">
            These live sessions are meant to give you real insights, practical
            takeaways, and fresh clarity.
          </p>
          <p className="text-sm text-gray-600 font-medium">
            Join live, ask questions, and learn directly from experts when it
            matters most.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          {/* <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for topics, speakers, or keywords"
                className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BF56] focus:border-transparent"
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex gap-2">
              <button className="px-6 py-3 bg-[#00BF56] text-white rounded-lg font-medium hover:bg-[#00A84D] transition-colors">
                Upcoming
              </button>
              <button className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Past
              </button>
            </div>
          </div> */}

          {/* <divd */}
        </div>

        {/* Webinar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {webinars.map((webinar) => (
            <div
              key={webinar.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Card Header with Image */}
              <div
                className="h-32 rounded-xl relative p-4 mb-4 bg-cover bg-center"
                style={{ backgroundImage: `url(${courseBg})` }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        webinar.level === "BEGINNER"
                          ? "bg-green-100 text-green-800"
                          : webinar.level === "INTERMEDIATE"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {webinar.level}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-[#0000000f] rounded">
                      {webinar.duration}
                    </span>
                    {webinar.isLive && (
                      <span className="px-2 py-1 text-xs font-medium border border-red-500 text-red-500 rounded-full flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        LIVE
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium text-xs">{webinar.date}</span>
                  <span className="text-xs">• {webinar.time}</span>
                </div>

                <h3 className="text-md font-bold text-gray-900 mb-4 line-clamp-2">
                  {webinar.title}
                </h3>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {webinar.speaker
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {webinar.speaker}
                    </p>
                    <p className="text-sm text-gray-600">{webinar.role}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {webinar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium bg-[#00BF56]/10 text-[#00BF56] rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  className={`w-full py-2 px-4 rounded-full text-xs font-medium transition-colors ${
                    webinar.isLive
                      ? "bg-[#00BF56] text-white hover:bg-[#00A84D]"
                      : "border border-[#00BF56] text-[#00BF56] hover:bg-[#00BF56] hover:text-white"
                  }`}
                >
                  {webinar.isLive ? "Join Live Now" : "Register"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <button className="px-8 py-3 border border-[#00BF56] text-[#00BF56] rounded-full text-sm hover:bg-[#00BF56] hover:text-white transition-colors">
            LOAD MORE WEBINARS
          </button>
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
          placeholder="Ask AI..."
          suggestions={suggestions}
          onSendMessage={(message) => console.log("Chat message:", message)}
        />
      </div>
    </div>
  );
}

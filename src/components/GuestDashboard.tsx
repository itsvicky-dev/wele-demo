import {
  GraduationCap,
  Sparkles,
  Star,
  Play,
  ArrowRight,
  ChevronUp,
  ArrowUp,
  CheckCircle,
  Users,
  BookOpen, // Keep generic imports if potentially useful or just minimal
} from "lucide-react";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import SessionVideo from "../assets/videos/session.mp4";
import StudentImage from "../assets/images/learner.png";
import CareerImg from "../assets/images/career-img.png"; // Unused but kept avoiding file not found if I remove import and user wants it back
import ChartImg from "../assets/images/chart.png"; // Unused
import Arrow from "../assets/images/arrow.png";
import bgPattern from "../assets/images/bgpattern.png";

export function GuestDashboard() {
  const mentors = [
    {
      id: 1,
      name: "Suriya Prakash",
      title: "VP Engineering",
      subtitle: "Stanford CS, Ex-Facebook, Airbnb",
      rating: 5,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=varient1",
      experience: "8+ years experience",
    },
    {
      id: 2,
      name: "Rahul Mehta",
      title: "Principal Designer",
      subtitle: "NIFT Delhi, Ex-Adobe, Sketch",
      rating: 5,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=varient2",
      experience: "12+ years experience",
    },
    {
      id: 3,
      name: "Priya Agarwal",
      title: "Head of AI",
      subtitle: "MIT Boston, Ex-OpenAI, DeepMind",
      rating: 5,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=varient3",
      experience: "6+ years experience",
    },
  ];

  const learnerWins = [
    {
      name: "Ellie Evans",
      role: "Fresher",
      newRole: "Developer",
      description: "Turned into Java Developer",
      avatar: "👩",
    },
    {
      name: "MS Dhoni",
      role: "Medical Rep",
      newRole: "Business Analyst",
      description: "Turned Medical Rep into Business Analyst",
      avatar: "👨",
    },
    {
      name: "Sanju Samson",
      role: "BPO",
      newRole: "Product Designer",
      description: "Turned BPO into Product Designer",
      avatar: "👨‍💼", // Using placeholder avatar
    },
  ];

  const ChartComponent = ({
    barData,
    lineData,
    years,
  }: {
    barData: number[];
    lineData: number[];
    years: string[];
  }) => {
    const chartOptions = {
      chart: {
        type: "line" as const,
        height: 120,
        toolbar: { show: false },
        zoom: { enabled: false },
        parentHeightOffset: 0,
      },
      stroke: {
        width: [0, 2],
        curve: "smooth" as const,
        colors: ["transparent", "#10B981"], // Green line
      },
      plotOptions: {
        bar: {
          columnWidth: "30%",
          borderRadius: 2,
        },
      },
      colors: ["#F3F4F6", "#10B981"], // Light gray bars, Green line
      dataLabels: { enabled: false },
      legend: { show: false },
      grid: { show: false, padding: { top: 0, bottom: 0, left: 0, right: 0 } },
      xaxis: {
        categories: years,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: { colors: "#9CA3AF", fontSize: "8px" },
          offsetY: -5,
        },
      },
      yaxis: { show: false },
      fill: {
        opacity: [1, 1],
      },
      tooltip: { enabled: false },
    };

    const series = [
      { name: "Demand", type: "column", data: barData },
      { name: "Growth", type: "line", data: lineData },
    ];

    return (
      <div className="w-full h-32">
        <Chart
          options={chartOptions}
          series={series}
          type="line"
          height={120}
          width="100%"
        />
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Your Learning Journey! 🎓
        </h1>
        <p className="text-gray-600 max-w-4xl">
          Discover, learn, and master new skills with our comprehensive courses.
          Track your progress, join live sessions, and achieve your learning
          goals.
        </p>
      </div>
      {/* Top Section: Career Paths */}
      <div className="p-6 bg-white border border-gray-100 rounded-2xl mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex justify-between">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              What Can You Become?
            </h2>
            <div className="flex mr-3 items-center gap-1 bg-white border border-gray-100 shadow-sm rounded-full px-2 py-1 mb-2 z-10">
              <span className="text-[10px] font-bold text-green-600">
                11,890:
              </span>
              <span className="text-[10px] text-gray-400">
                High demand in 2026
              </span>
              <CheckCircle
                size={10}
                className="text-green-500"
                fill="currentColor"
                color="white"
              />
            </div>
          </div>
          <div className="flex justify-end mr-3">
            <div className="flex items-center gap-1 bg-white border border-gray-100 shadow-sm rounded-full px-2 py-1 mb-2 z-10">
              <span className="text-[10px] font-bold text-green-600">
                11,890:
              </span>
              <span className="text-[10px] text-gray-400">
                High demand in 2026
              </span>
              <CheckCircle
                size={10}
                className="text-green-500"
                fill="currentColor"
                color="white"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Java Developer */}
          <div className="relative">
            {/* Chart Background Overlay - Simplified approach to match look */}
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-900 text-sm font-medium">
                    Software Development -{" "}
                  </span>
                  <span className="text-green-500 text-sm font-bold">
                    Java Developer
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles
                    size={16}
                    className="text-green-500 mt-1 flex-shrink-0"
                  />
                  <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                    Based on current hiring trends, learners with interests like
                    yours are moving into clear career paths. This gives you an
                    idea of where your skills can actually take you.
                  </p>
                </div>
              </div>

              <div className="w-48 flex flex-col items-end">
                <ChartComponent
                  barData={[20, 30, 25, 40, 35, 50, 60]}
                  lineData={[25, 35, 30, 45, 40, 55, 65]}
                  years={[
                    "2020",
                    "2021",
                    "2022",
                    "2023",
                    "2024",
                    "2025",
                    "2026",
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Card 2: AI with Python */}
          <div className="relative">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="font-bold text-gray-900 mb-1 text-sm">
                    Software Development -{" "}
                  </h2>
                  <span className="text-green-500 text-sm font-bold">
                    AI with Python
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles
                    size={16}
                    className="text-green-500 mt-1 flex-shrink-0"
                  />
                  <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                    Based on current hiring trends, learners with interests like
                    yours are moving into clear career paths. This gives you an
                    idea of where your skills can actually take you.
                  </p>
                </div>
              </div>

              <div className="w-48 flex flex-col items-end">
                <ChartComponent
                  barData={[10, 20, 40, 30, 50, 60, 80]}
                  lineData={[15, 25, 45, 35, 55, 65, 85]}
                  years={[
                    "2020",
                    "2021",
                    "2022",
                    "2023",
                    "2024",
                    "2025",
                    "2026",
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Live Learning */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 border border-gray-100 rounded-2xl p-6 shadow-sm bg-white">
        {/* Left Side Info */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Live Learning, Not Recorded Noise
            </h2>
            <div className="flex items-start gap-3 mb-8">
              <Sparkles
                size={16}
                className="text-green-500 mt-1 flex-shrink-0"
              />
              <p className="text-sm text-gray-500 leading-relaxed">
                Here, learning happens live. You ask questions, get answers
                instantly, and learn alongside others instead of watching
                recordings alone.
              </p>
            </div>

            <div className="mb-2">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Domain based Mentor
              </h3>
              <div className="bg-green-50/50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-sm">
                    <div className="w-full h-full flex items-center justify-center bg-purple-100 text-xl">
                      👩‍🏫
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">
                      Sarah Johnson
                    </h4>
                    <p className="text-xs text-gray-500">React Development</p>
                    <div className="flex text-green-500 mt-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={10} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-gray-800 mb-1">
                  About Sarah Johnson
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  You show strong consistency in your learning. Your
                  problem-solving approach, clean coding style, and ability to
                  break tasks into smaller steps stand out.
                </p>

                <h4 className="text-xs font-bold text-gray-800 mb-2">
                  Top Works
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] bg-gray-200/50 text-gray-600 px-2 py-1 rounded-md">
                    Automating the entire workflow
                  </span>
                  <span className="text-[10px] bg-gray-200/50 text-gray-600 px-2 py-1 rounded-md">
                    Gamify Workflow
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Video */}
        <div className="lg:col-span-8">
          <div className="flex justify-end mb-2">
            <span className="text-xs text-blue-500 font-medium cursor-pointer hover:underline">
              View more Live session
            </span>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-video shadow-lg">
            <video
              src={SessionVideo}
              autoPlay
              loop
              muted={true}
              className="w-full h-full object-cover opacity-90"
            />

            {/* Overlay elements from the design to make it look like the class is active */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md flex items-center gap-2 shadow-sm">
              <Users size={14} className="text-gray-600" />
              <span className="text-xs font-bold text-gray-700">
                39 Learners Attended
              </span>
            </div>

            {/* Center Content Overlay - mimicking the slide content if video is generic */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              {/* We let the video play, but if we wanted to enforce the look:
                  <div className="bg-black/20 absolute inset-0"></div>
                   */}
            </div>

            {/* Video controls / pip (bottom left inset) */}
            <div className="absolute bottom-4 left-4 w-24 h-16 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg">
              <img
                src={StudentImage}
                className="w-full h-full object-cover"
                alt="Student"
              />
              <div className="absolute bottom-1 left-1 bg-black/60 px-1 rounded text-[8px] text-white">
                Abilash
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Success & Mentors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Learner Wins */}
        <div className="border border-gray-100 shadow-sm rounded-xl p-4">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Learner Wins</h2>
          <div className="flex items-start gap-3 mb-6">
            <Sparkles size={16} className="text-green-500 mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-500">
              Learners who started without clarity are now working in roles they
              planned for. This shows what's possible with the right direction.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {learnerWins.map((learner, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-xl p-4 grid grid-cols-12 items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="col-span-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center overflow-hidden border border-gray-100 flex-shrink-0">
                    <span className="text-xl">{learner.avatar}</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm">
                      {learner.name}
                    </h4>
                    <p className="text-xs text-gray-500">{learner.role}</p>
                  </div>
                </div>

                <div className="col-span-2 flex justify-center">
                  <img src={Arrow} alt="" className="text-green-500" />
                </div>

                <div className="col-span-5">
                  <h4 className="font-bold text-gray-900 text-sm">
                    {learner.newRole}
                  </h4>
                  <p className="text-[10px] text-gray-500">
                    {learner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mentors You'll Learn With */}
        <div className="border border-gray-100 shadow-sm rounded-xl p-4">
          <div className="flex justify-between items-baseline mb-2">
            <h2 className="text-lg font-bold text-gray-900">
              Mentors You'll Learn With
            </h2>
            <span className="text-xs text-blue-500 font-medium cursor-pointer hover:underline">
              View more Mentors
            </span>
          </div>

          <div className="flex items-start gap-3 mb-6">
            <Sparkles size={16} className="text-green-500 mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-500">
              You'll learn directly from professionals who work in the industry,
              not just trainers.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {mentors.map((mentor, index) => (
              <div
                key={mentor.id}
                className="bg-white rounded-xl border border-gray-200  hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="bg-white h-20 relative">
                  <div className="absolute top-0 left-0 h-[70px]">
                    <img
                      src={bgPattern}
                      alt="image"
                      className="opacity-90 h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-4 -mt-8">
                  <div className="flex justify-center mb-3 absolute z-9 top-8 right-0 m-auto left-0 w-16 h-16">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-16 h-16 rounded-full border-2 bg-white border-[#00BF53] object-cover"
                    />
                  </div>
                  <div className="text-center mt-12">
                    <h4 className="font-bold text-gray-900 text-sm mb-1">
                      {mentor.name}
                    </h4>
                    <p className="text-[10px] text-gray-500 mb-2 flex items-center justify-center text-center">
                      {mentor.title}
                    </p>
                    <div className="flex text-green-500 mb-3 justify-center">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={8} fill="currentColor" />
                      ))}
                    </div>

                    <div className="text-[10px] bg-gray-50 text-gray-600 px-2 py-1 rounded-full w-full border border-gray-100">
                      {mentor.experience}
                    </div>
                  </div>
                </div>
                <button className="text-[10px] text-green-600 font-medium border-t border-green-100 px-3 py-1.5 w-full hover:bg-green-50">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

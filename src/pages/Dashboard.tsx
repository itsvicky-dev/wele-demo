import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, FileText, Code, Trophy, Users, Calendar, Target, Clock, CheckCircle, XCircle, Circle, BookOpen, Zap, TrendingUp, Star, MessageCircle, Lightbulb, Gift, BarChart3, Heart, Share2, Bookmark, MoreHorizontal, Flame, Award, Crown, BookCheck, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";

export function Dashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('for-you');
  
  const tabs = [
    { id: 'for-you', name: 'For You' },
    { id: 'career-hub', name: 'Career Hub' },
    { id: 'community', name: 'Community' },
    { id: 'feedback', name: 'Feedback' },
    { id: 'weekly-challenge', name: 'Weekly Challenge' }
  ];
  
  const allActivities = [
    { name: "Mathi MS.", action: "reviewed", target: "5 code submissions", initials: "MR", icon: <Code size={16} className="text-[#00bf53]" /> },
    { name: "Sarah K.", action: "completed", target: "React Fundamentals", initials: "SK", icon: <BookOpen size={16} className="text-[#00bf53]" /> },
    { name: "Tom B.", action: "posted", target: "a helpful tip for Ai", initials: "TB", icon: <MessageCircle size={16} className="text-[#00bf53]" /> },
    { name: "Emma W.", action: "submitted", target: "Weekly Challenge", initials: "EW", icon: <Trophy size={16} className="text-[#00bf53]" /> },
    { name: "James L.", action: "completed", target: "TypeScript Basics", initials: "JL", icon: <BookOpen size={16} className="text-[#00bf53]" /> },
    { name: "Alex M.", action: "reviewed", target: "3 code submissions", initials: "AM", icon: <Code size={16} className="text-[#00bf53]" /> },
    { name: "Lisa P.", action: "posted", target: "a question from AI", initials: "LP", icon: <MessageCircle size={16} className="text-[#00bf53]" /> },
    { name: "David C.", action: "completed", target: "Node.js Course", initials: "DC", icon: <BookOpen size={16} className="text-[#00bf53]" /> }
  ];
  
  const [liveActivities, setLiveActivities] = useState(allActivities.slice(0, 3));
  const [newActivity, setNewActivity] = useState(null);
  const [sessionPage, setSessionPage] = useState(0);
  
  const allSessions = [
    { id: 'S1', status: 'present' },
    { id: 'S2', status: 'present' },
    { id: 'S3', status: 'absent' },
    { id: 'S4', status: 'present' },
    { id: 'S5', status: 'present' },
    { id: 'S6', status: 'present' },
    { id: 'S7', status: 'present' },
    { id: 'S8', status: 'pending' },
    { id: 'S9', status: 'pending' },
    { id: 'S10', status: 'pending' },
    { id: 'S11', status: 'pending' },
    { id: 'S12', status: 'pending' },
    { id: 'S13', status: 'pending' },
    { id: 'S14', status: 'pending' },
  ];
  
  const getSessionStyle = (status) => {
    switch(status) {
      case 'present': return 'bg-green-50 border-green-200 text-green-700';
      case 'absent': return 'bg-red-50 border-red-200 text-red-700';
      case 'pending': return 'bg-gray-50 border-gray-200 text-gray-500';
      default: return 'bg-gray-50 border-gray-200 text-gray-500';
    }
  };
  
  const currentSessions = allSessions.slice(sessionPage * 7, (sessionPage + 1) * 7);
  const totalPages = Math.ceil(allSessions.length / 7);
  const hasNextPage = sessionPage < totalPages - 1;
  
  const todayClasses = [
    { time: "10:00 AM", subject: "React Advanced", instructor: "John Doe", status: "live" },
    { time: "2:00 PM", subject: "Node.js Basics", instructor: "Jane Smith", status: "upcoming" },
    { time: "4:30 PM", subject: "UI/UX Workshop", instructor: "Mike Johnson", status: "upcoming" },
    { time: "6:00 PM", subject: "Python Fundamentals", instructor: "Sarah Wilson", status: "upcoming" }
  ];
  
  const skillGaps = [
    { skill: "React", percentage: 85, color: "bg-[#00bf53]" },
    { skill: "Python", percentage: 72, color: "bg-[#00bf53]" },
    { skill: "UI/UX Design", percentage: 58, color: "bg-[#00bf53]" },
    { skill: "Data Analysis", percentage: 45, color: "bg-[#00bf53]" },
    { skill: "Machine Learning", percentage: 38, color: "bg-[#00bf53]" }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      const randomActivity = allActivities[Math.floor(Math.random() * allActivities.length)];
      setNewActivity(randomActivity);
      setLiveActivities(prev => [randomActivity, ...prev.slice(0, 2)]);
      
      setTimeout(() => setNewActivity(null), 5000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="sticky top-0 z-20 border-b border-[#0d0d0d0d] bg-white px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <LayoutDashboard size={16} className="text-gray-700"/>
                  <h1 className=" text-md text-gray-700 font-medium">Dashboard</h1>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            </div>
      {/* Tabs */}
      <div className="sticky top-12 z-10 bg-white py-4">
        <div className="mx-auto px-10">
          <div className="flex space-x-2 justify-start">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-[7px] rounded-full font-medium text-[12px] transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-green-100 text-green-700 border border-green-300 shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mx-auto px-10 py-4 relative">
        {activeTab === 'for-you' && (
          <>
            {/* Main Layout: Left 3 + Right 1 */}
            <div className="mt-0 flex gap-4">
              {/* Left Section - 3 columns */}
              <div className="flex-1 space-y-4">
                
                {/* Today Schedule & Skill Analysis Cards */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Today Schedule */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-[#00bf53]" />
                        <h3 className="font-semibold text-gray-900 text-sm">Today Schedule</h3>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {todayClasses.slice(0, 3).map((cls, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium text-gray-900">{cls.subject}</p>
                            <p className="text-xs text-gray-500">{cls.time}</p>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${cls.status === 'live' ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></div>
                        </div>
                      ))}
                    </div>
                    {todayClasses.length > 3 && (
                      <button className="text-xs text-gray-500 font-medium hover:text-green-600 flex items-center gap-1 group">
                        Show More
                        <ArrowRight size={12} className="group-hover:text-green-600" />
                      </button>
                    )}
                  </div>
                  
                  {/* Skill Gap Analysis */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <BarChart3 size={16} className="text-[#00bf53]" />
                        <h3 className="font-semibold text-gray-900 text-sm">Skill Gap Analysis</h3>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {skillGaps.slice(0, 3).map((skill, index) => (
                        <div key={index} className="">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-gray-900">{skill.skill}</span>
                            <span className="text-xs text-gray-600">{skill.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div className="bg-[#00bf53] h-1 rounded-full" style={{width: `${skill.percentage}%`}}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {skillGaps.length > 3 && (
                      <button className="text-xs text-gray-500 mt-6 font-medium hover:text-green-600 flex items-center gap-1 group">
                        View Full Analysis
                        <ArrowRight size={12} className="group-hover:text-green-600" />
                      </button>
                    )}
                  </div>
                  
                  {/* Course Progress */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen size={16} className="text-[#00bf53]" />
                      <h3 className="font-semibold text-gray-900 text-sm">Course Progress</h3>
                    </div>
                    <div className="flex items-center justify-center mb-3">
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                          <path className="text-gray-200" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className="text-[#00bf53]" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-gray-900">75%</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-[#00bf53] font-medium">+8% this week</div>
                      <div className="text-xs text-gray-500">12/16 chapters completed</div>
                    </div>
                    <div className=" pt-2">
                      <button className="text-xs text-gray-500 font-medium hover:text-green-600 flex items-center gap-1 group">
                        Continue Course
                        <ArrowRight size={12} className="group-hover:text-green-600" />
                      </button>
                    </div>
                  </div>
                </div>

                                {/* Combined Banner and Summary Section */}
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
                  <button className="bg-gray-200 text-gray-900 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 mb-6 hover:bg-gray-300 transition-colors">
                    Become a Specialist
                    <ArrowRight size={14} />
                  </button>
                  
                  <hr className="border-gray-200 mb-4" />
                  
                  <h2 className="text-lg font-semibold text-gray-900 pb-2">Summary</h2>
                  <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                    <p>
                      Welcome to your smart learning space — a personalised hub built to understand how you learn, what you need, and how fast you're growing.
                    </p>
                    <p>
                      Your dashboard brings every course, skill, goal, and activity into one unified view so you can clearly track your progress without confusion.
                      Stay consistent with daily learning targets, timely reminders for live classes, and structured learning paths designed to help you build habits that actually stick.
                    </p>
                    <p>
                      Our AI continuously analyses your performance, identifies patterns, and gives you deep progress insights — showing not just what you learned but how you're improving over time.
                      Push your limits with weekly challenges, interactive quizzes, micro-tasks, and real-time competitions with learners across India. Compete, collaborate, and grow as you unlock achievements and climb your learning leaderboard.
                    </p>
                    <p>
                      Your dashboard also highlights your strengths and skill gaps, recommends the exact topics to focus on next, and maps your journey to the career path you're aiming for. You'll always know what to learn, why it matters, and how it brings you one step closer to your goals.
                    </p>
                    <p>
                      Join a growing community of learners, mentors, and industry experts who share knowledge, answer your questions, and help you stay motivated throughout your journey.
                    </p>
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
                
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Current Streak */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Flame size={16} className="text-[#00bf53]" />
                      <h3 className="font-semibold text-gray-900 text-sm">Current Streak</h3>
                    </div>
                    <div className="flex justify-between text-xs mb-2">
                      <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md">
                        <Flame size={12} className="text-white" />
                      </div>
                      <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md">
                        <Flame size={12} className="text-white" />
                      </div>
                      <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md">
                        <Flame size={12} className="text-white" />
                      </div>
                      <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md">
                        <Flame size={12} className="text-white" />
                      </div>
                      <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md">
                        <Flame size={12} className="text-white" />
                      </div>
                      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    </div>
                    <p className="text-center text-lg font-bold text-gray-900">5 Days</p>
                  </div>
                  
                  {/* Current Level */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Award size={16} className="text-[#00bf53]" />
                      <h3 className="font-semibold text-gray-900 text-sm">Current Level</h3>
                    </div>
                    <div className="text-center mb-3">
                      <div className="text-2xl font-bold text-gray-900">Level 12</div>
                      <div className="text-sm text-gray-500">2,450 XP</div>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Next Level</span>
                        <span className="text-gray-600">3,000 XP</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div className="bg-[#00bf53] h-1 rounded-full" style={{width: '82%'}}></div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 text-center">Unlock: Premium Badge</p>
                  </div>
                  
                  {/* Weekly Challenge */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Trophy size={16} className="text-[#00bf53]" />
                        <h3 className="font-semibold text-gray-900 text-sm">Weekly Challenge</h3>
                      </div>
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm mb-2">Build a Todo App</h4>
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-600">Progress</span>
                        <span className="text-xs font-medium text-[#00bf53]">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div className="bg-[#00bf53] h-1 rounded-full" style={{width: '65%'}}></div>
                      </div>
                    </div>
                    <div className="space-y-1 ">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Participants</span>
                        <span className="font-medium text-gray-900">2,341</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Your Rank</span>
                        <span className="font-medium text-gray-900">#47</span>
                      </div>
                      <div className="">
                      <button className="text-xs text-gray-500 font-medium hover:text-green-600 flex items-center gap-1 group">
                        Continue Course
                        <ArrowRight size={12} className="group-hover:text-green-600" />
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Section - 1 column */}
              <div className="w-80 space-y-4">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={16} className="text-[#00bf53]" />
                    <h2 className="text-md font-semibold text-gray-900">Quick Actions</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 p-2 mb-3 mt-1 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                      <div className="bg-gray-100 rounded-xl p-2 border border-1">
                        <FileText size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">Resume</h3>
                        <p className="text-xs text-gray-500">Build & edit</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 p-2 mb-3 mt-1 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                      <div className="bg-gray-100 rounded-xl p-2 border border-1">
                        <Code size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900  text-sm">Practice</h3>
                        <p className="text-xs text-gray-500">Code daily</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 p-2 mb-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                      <div className="bg-gray-100 rounded-xl p-2 border border-1">
                        <Trophy size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900  text-sm">Challenge</h3>
                        <p className="text-xs text-gray-500">Test skills</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 p-2 mb-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                      <div className="bg-gray-100 rounded-xl p-2 border border-1">
                        <Users size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900  text-sm">Community</h3>
                        <p className="text-xs text-gray-500">Connect now</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Attendance Health */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 ">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Calendar size={20} className="text-[#00bf53]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Attendance Health</h3>
                        <p className="text-sm text-gray-500">This month's overview</p>
                      </div>
                    </div>
                    <span className="bg-gray-200 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">90%</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-gray-900">18</div>
                      <div className="text-sm text-gray-600">Present</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-red-600">2</div>
                      <div className="text-sm text-gray-600">Absent</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-gray-900">20</div>
                      <div className="text-sm text-gray-600">Total</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-gray-600">Recent Sessions</p>
                      <p className="text-sm text-gray-600">December</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {currentSessions.map((session) => (
                        <div key={session.id} className={`w-12 h-10 border rounded flex items-center justify-center text-xs font-medium ${getSessionStyle(session.status)}`}>
                          {session.id}
                        </div>
                      ))}
                      {hasNextPage && (
                        <button 
                          onClick={() => setSessionPage(sessionPage + 1)}
                          className="w-12 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                        >
                          <ChevronRight size={16} className="text-gray-600" />
                        </button>
                      )}
                      {!hasNextPage && sessionPage > 0 && (
                        <button 
                          onClick={() => setSessionPage(sessionPage - 1)}
                          className="w-12 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                        >
                          <ChevronLeft size={16} className="text-gray-600" />
                        </button>
                      )}
                    </div>
                    <div className="flex gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Present</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-600">Absent</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-gray-600">Yet to Start</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Live Activity */}
                <div className="mt-6">
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#00bf53] rounded-full animate-pulse"></div>
                        <span className="font-semibold text-gray-900">Live Activity</span>
                      </div>
                      <span className="text-sm text-gray-500">{Math.floor(Math.random() * 200) + 800} learners online</span>
                    </div>
                    
                    <div className="space-y-3">
                      {/* {newActivity && (
                        <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg animate-pulse">
                          <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-sm font-medium">
                            {newActivity.initials}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">
                              <span className="font-medium">{newActivity.name}</span> {newActivity.action} <span className="text-[#00bf53] font-medium">{newActivity.target}</span>
                            </p>
                            <p className="text-xs text-green-600 font-medium">Just now</p>
                          </div>
                          {newActivity.icon}
                        </div>
                      )} */}
                      {liveActivities.slice(0, 3).map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                            {activity.initials}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">
                              <span className="font-medium">{activity.name}</span> {activity.action} <span className="text-[#00bf53] font-medium">{activity.target}</span>
                            </p>
                            <p className="text-xs text-gray-500">Just now</p>
                          </div>
                          {activity.icon}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'career-hub' && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Career Hub</h2>
            <p className="text-gray-600">Career guidance and opportunities coming soon...</p>
          </div>
        )}
        
        {activeTab === 'community' && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Community</h2>
            <p className="text-gray-600">Connect with fellow learners...</p>
          </div>
        )}
        
        {activeTab === 'feedback' && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Feedback</h2>
            <p className="text-gray-600">Share your thoughts and suggestions...</p>
          </div>
        )}
        
        {activeTab === 'weekly-challenge' && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Weekly Challenge</h2>
            <p className="text-gray-600">Take on exciting coding challenges...</p>
          </div>
        )}
      </div>
    </div>
  );
}
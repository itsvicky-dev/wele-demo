import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, FileText, Code, Trophy, Users, Calendar, Target, Clock, CheckCircle, XCircle, Circle, BookOpen, Zap, TrendingUp, Star, MessageCircle, Lightbulb, Gift, BarChart3, Heart, Share2, Bookmark, MoreHorizontal } from "lucide-react";
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
  
  const slides = [
    {
      badge: "AI Picked For You",
      title: "TypeScript will 10x your skills",
      description: "Based on your JavaScript mastery, this is your logical next superpower. Trust the algorithm!",
      primaryButton: "Start TypeScript",
      secondaryButton: "Maybe Later"
    },
    {
      badge: "Trending Now",
      title: "React Native for Mobile Apps",
      description: "Build cross-platform mobile applications with your existing React knowledge. Perfect next step!",
      primaryButton: "Start React Native",
      secondaryButton: "Learn More"
    },
    {
      badge: "Popular Choice",
      title: "Node.js Backend Development",
      description: "Complete your full-stack journey with server-side JavaScript. High demand skill in 2024!",
      primaryButton: "Start Node.js",
      secondaryButton: "View Curriculum"
    }
  ];
  

  
  const [liveActivities, setLiveActivities] = useState([
    { name: "Mathi R.", action: "reviewed", target: "5 code submissions", initials: "MR", icon: <Code size={16} className="text-[#00bf53]" /> },
    { name: "Sarah K.", action: "completed", target: "React Fundamentals", initials: "SK", icon: <BookOpen size={16} className="text-[#00bf53]" /> },
    { name: "Tom B.", action: "posted", target: "a helpful tip", initials: "TB", icon: <MessageCircle size={16} className="text-[#00bf53]" /> },
    { name: "Emma W.", action: "submitted", target: "Weekly Challenge", initials: "EW", icon: <Trophy size={16} className="text-[#00bf53]" /> },
    { name: "James L.", action: "completed", target: "TypeScript Basics", initials: "JL", icon: <BookOpen size={16} className="text-[#00bf53]" /> },
    { name: "Alex M.", action: "reviewed", target: "3 code submissions", initials: "AM", icon: <Code size={16} className="text-[#00bf53]" /> },
    { name: "Lisa P.", action: "posted", target: "a question", initials: "LP", icon: <MessageCircle size={16} className="text-[#00bf53]" /> },
    { name: "David C.", action: "completed", target: "Node.js Course", initials: "DC", icon: <BookOpen size={16} className="text-[#00bf53]" /> }
  ]);
  
  const dummyActivities = [
    { name: "Mathi R.", action: "reviewed", target: "5 code submissions", initials: "MR", icon: <Code size={16} className="text-[#00bf53]" /> },
    { name: "Priya S.", action: "completed", target: "Python Basics", initials: "PS", icon: <BookOpen size={16} className="text-[#00bf53]" /> },
    { name: "Raj K.", action: "submitted", target: "Daily Challenge", initials: "RK", icon: <Trophy size={16} className="text-[#00bf53]" /> },
    { name: "Anita M.", action: "posted", target: "a solution", initials: "AM", icon: <MessageCircle size={16} className="text-[#00bf53]" /> },
    { name: "Vikram T.", action: "reviewed", target: "2 code submissions", initials: "VT", icon: <Code size={16} className="text-[#00bf53]" /> },
    { name: "Neha G.", action: "completed", target: "JavaScript Advanced", initials: "NG", icon: <BookOpen size={16} className="text-[#00bf53]" /> },
    { name: "Arjun P.", action: "posted", target: "a helpful tip", initials: "AP", icon: <MessageCircle size={16} className="text-[#00bf53]" /> },
    { name: "Kavya R.", action: "submitted", target: "Weekly Project", initials: "KR", icon: <Trophy size={16} className="text-[#00bf53]" /> }
  ];
  

  
  useEffect(() => {
    const activityInterval = setInterval(() => {
      const randomActivity = dummyActivities[Math.floor(Math.random() * dummyActivities.length)];
      setLiveActivities(prev => [randomActivity, ...prev.slice(0, 4)]);
    }, 2000);
    return () => clearInterval(activityInterval);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* Tabs */}
      <div className="  border-gray-200 sticky top-0 z-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-10">
          <div className="flex space-x-4 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={ `py-4 px-1 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? ' text-[#00bf53] '
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-5 py-5 relative">
        {activeTab === 'for-you' && (
          <>
        {/* Carousel */}
        <div className="bg-white rounded-[20px] border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-all duration-500">
          <div className="">
            <div className="inline-flex items-center gap-2 bg-[#00bf53] text-white px-4 py-2 rounded-full text-sm font-medium mb-2 hover:scale-105 transition-transform bg-gray-800 hover:bg-gray-900">
              <Sparkles size={16} />
              AI Picked For You
            </div>
            <h1 className="text-4xl font-bold text-gray-600 mb-2 leading-tight transition-colors duration-300">
              TypeScript will 10x your skills
            </h1>            
            <p className="text-lg text-gray-600 mb-2 max-w-2xl hover:text-gray-800 transition-colors">
              Based on your JavaScript mastery, this is your logical next superpower. Trust the algorithm!
            </p>
            
            <div className="flex items-center gap-4">
              <button className="bg-gray-100 text-gray-600 px-6 py-3 rounded-3xl font-medium flex items-center gap-2 hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-300">
                <Sparkles size={16} />
                Start TypeScript
                <ArrowRight size={16} className="hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="text-gray-600 px-6 py-3 rounded-lg font-medium hover:text-gray-900 hover:bg-gray-50 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Maybe Later
                <ArrowRight size={16} className="hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-6">
            <div className="group bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-xl hover:border-[#00bf53]/20 transition-all duration-300 cursor-pointer text-center">
              <div className="bg-gray-100 rounded-lg p-3 w-fit mb-4 transition-colors mx-auto">
                <FileText size={24} className="text-gray-900" />
              </div>
              <h3 className="font-semibold text-gray-900 transition-colors">Resume</h3>
              <p className="text-sm text-gray-500 mt-1">Build & edit</p>
            </div>
            <div className="group bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-xl hover:border-[#00bf53]/20 transition-all duration-300 cursor-pointer text-center">
              <div className="bg-gray-100 rounded-lg p-3 w-fit mb-4 transition-colors mx-auto">
                <Code size={24} className="text-gray-900" />
              </div>
              <h3 className="font-semibold text-gray-900 transition-colors">Practice</h3>
              <p className="text-sm text-gray-500 mt-1">Code daily</p>
            </div>
            <div className="group bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-xl hover:border-[#00bf53]/20 transition-all duration-300 cursor-pointer text-center">
              <div className="bg-gray-100 rounded-lg p-3 w-fit mb-4 transition-colors mx-auto">
                <Trophy size={24} className="text-gray-900" />
              </div>
              <h3 className="font-semibold text-gray-900 transition-colors">Challenge</h3>
              <p className="text-sm text-gray-500 mt-1">Test skills</p>
            </div>
            <div className="group bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-xl hover:border-[#00bf53]/20 transition-all duration-300 cursor-pointer text-center">
              <div className="bg-gray-100 rounded-lg p-3 w-fit mb-4 transition-colors mx-auto">
                <Users size={24} className="text-gray-900" />
              </div>
              <h3 className="font-semibold text-gray-900 transition-colors">Community</h3>
              <p className="text-sm text-gray-500 mt-1">Connect now</p>
            </div>
          </div>
        </div>
        
        {/* Dashboard Cards */}
        <div className="mt-12 grid grid-cols-3 gap-6">
          {/* Attendance Health */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-[#00bf53]" />
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
              <p className="text-sm text-gray-600 mb-2">Recent Sessions</p>
              <div className="flex flex-wrap gap-2">
                <div className="flex flex-col items-center justify-center w-16 h-12 bg-gray-50 rounded text-xs">
                  <CheckCircle size={12} className="text-[#00bf53] mb-1" />
                  Dec 2
                </div>
                <div className="flex flex-col items-center justify-center w-16 h-12 bg-gray-50 rounded text-xs">
                  <CheckCircle size={12} className="text-[#00bf53] mb-1" />
                  Dec 3
                </div>
                <div className="flex flex-col items-center justify-center w-16 h-12 bg-red-50 rounded text-xs">
                  <XCircle size={12} className="text-red-600 mb-1" />
                  Dec 4
                </div>
                <div className="flex flex-col items-center justify-center w-16 h-12 bg-gray-50 rounded text-xs">
                  <CheckCircle size={12} className="text-[#00bf53] mb-1" />
                  Dec 5
                </div>
                <div className="flex flex-col items-center justify-center w-16 h-12 bg-gray-50 rounded text-xs">
                  <Circle size={12} className="text-gray-400 mb-1" />
                  Dec 6
                </div>
              </div>
            </div>
          </div>
          
          {/* Skill Gap Analysis */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Target size={20} className="text-[#00bf53]" />
              <div>
                <h3 className="font-semibold text-gray-900">Skill Gap Analysis</h3>
                <p className="text-sm text-gray-500">AI-powered insights</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">React</span>
                  <span className="text-sm text-gray-500">75% → 100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-[#00bf53] h-1 rounded-full" style={{width: '75%'}}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Focus needed</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">TypeScript</span>
                  <span className="text-sm text-gray-500">45% → 80%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-[#00bf53] h-1 rounded-full" style={{width: '45%'}}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Focus needed</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">Node.js</span>
                  <span className="text-sm text-gray-500">30% → 70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-[#00bf53] h-1 rounded-full" style={{width: '30%'}}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Focus needed</p>
              </div>
            </div>
            
            <button className="text-[#00bf53] text-sm font-medium mt-4 flex items-center gap-1">
              View Full Analysis <ArrowRight size={14} />
            </button>
          </div>
          
          {/* Today's Schedule */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-[#00bf53]" />
                <div>
                  <h3 className="font-semibold text-gray-900">Today's Schedule</h3>
                  <p className="text-sm text-gray-500">3 sessions planned</p>
                </div>
              </div>
              <button className="text-[#00bf53] text-sm font-medium">View all</button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-900">10:00 AM</div>
                <span className="w-2 h-2 bg-[#00bf53] rounded-full animate-pulse"></span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">React Advanced Patterns</h4>
                  <p className="text-sm text-gray-500">Live Session • Sarah Chen</p>
                </div>
                <ArrowRight size={16} className="text-gray-400" />
              </div>
              
              <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-900">2:00 PM</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">TypeScript Deep Dive</h4>
                  <p className="text-sm text-gray-500">Workshop • John Doe</p>
                </div>
                <ArrowRight size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Cards */}
        <div className="mt-8 grid grid-cols-3 gap-6">
          {/* Course Progress */}
          <div className="bg-white rounded-xl border-t-4 border-t-[#00bf53] border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-[#00bf53] text-sm mb-1">Course Progress</h3>
                <p className="text-gray-900 font-medium">Python Fundamentals</p>
              </div>
              <BookOpen size={20} className="text-[#00bf53]" />
            </div>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-200" stroke="currentColor" strokeWidth="1" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-[#00bf53]" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">75%</div>
                    <Star size={12} className="text-[#00bf53] mx-auto" />
                  </div>
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">12 <span className="text-lg text-gray-500">/ 16</span></div>
                <p className="text-sm text-gray-500">lessons completed</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-[#00bf53]">
                  <TrendingUp size={14} />
                  +8% this week
                </div>
              </div>
            </div>
            
            <button className="w-full text-[#00bf53] py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#00a047]/20 transition-colors">
              <Zap size={16} />
              Continue Learning
              <ArrowRight size={16} />
            </button>
          </div>
          
          {/* Weekly Challenge */}
          <div className="bg-white rounded-xl border-t-4 border-t-gray-700 border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-gray-700" />
                <span className="text-gray-700 font-semibold text-sm">WEEKLY CHALLENGE</span>
              </div>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">3 days left</span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Build a Todo App</h3>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Your Progress</span>
                <span className="text-sm font-semibold text-[#00bf53]">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-[#00bf53] h-1 rounded-full" style={{width: '65%'}}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">35% more to earn the Gold badge!</p>
            </div>
            
            <div className="flex items-center gap-4 mb-6 text-sm">
              <div className="flex items-center gap-1">
                <Users size={14} className="text-gray-500" />
                <span className="text-gray-900 font-medium">2,341</span>
                <span className="text-gray-500">competing</span>
              </div>
              <div className="flex items-center gap-1">
                <Target size={14} className="text-gray-400" />
                <span className="text-gray-900 font-medium">Rank #47</span>
              </div>
            </div>
            
            <button className="w-full text-gray-800 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-900/20 transition-all">
              <Zap size={16} />
              Continue Challenge
              <ArrowRight size={16} />
            </button>
          </div>
          
          {/* Tech Insider */}
          <div className="bg-white rounded-xl border-t-4 border-t-[#00bf53] border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <TrendingUp size={16} className="text-[#00bf53]" />
                </div>
                <span className="text-gray-600 font-medium">Tech Insider</span>
              </div>
              <span className="bg-[#00bf53] text-white px-3 py-1 rounded-full text-sm font-medium">Hot</span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">AI Engineers Earning $200k+ in 2025</h3>
            
            <div className="flex items-center gap-2 mb-6">
              <Zap size={16} className="text-[#00bf53]" />
              <span className="text-grey-300 font-semibold">+156% salary growth</span>
            </div>
            
            <button className="w-full text-[#00bf53] py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#00a047]/20 transition-colors">
              Master this skill
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
        
        {/* Live Activity */}
        <div className="mt-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#00bf53] rounded-full animate-pulse"></div>
                <span className="font-semibold text-gray-900">Live Activity</span>
              </div>
              <span className="text-sm text-gray-500">{Math.floor(Math.random() * 200) + 800} learners online</span>
            </div>
            
            <div className="space-y-3">
              {liveActivities.slice(0, 5).map((activity, index) => (
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
        
        {/* AI-Powered Feed */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-[#00bf53]" />
              <h2 className="text-xl font-semibold text-gray-900">Your AI-Powered Feed</h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Sparkles size={16} className="text-[#00bf53]" />
              Curated for you
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Pro Tip Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00bf53] to-gray-400 rounded-t-xl"></div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Lightbulb size={20} className="text-[#00bf53]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00bf53] font-semibold text-sm">Pro Tip</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Picked for you</span>
                </div>
                <button className="ml-auto text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Mind-Blown: console.table() exists!
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Stop using console.log() for arrays! Try console.table() — it displays data in a gorgeous tabular format. Your debugging game will never be the same. Trust me...
              </p>
              
              <button className="bg-[#00bf53] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#00a047] transition-colors mb-4">
                Try It Now
              </button>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <Heart size={16} />
                    47
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <MessageCircle size={16} />
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <Share2 size={16} />
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <Bookmark size={16} />
                  </button>
                </div>
                <button className="text-gray-500 text-sm hover:text-gray-700">
                  More
                </button>
              </div>
            </div>
            
            {/* New Course Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-[#00bf53] rounded-t-xl"></div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Gift size={20} className="text-[#00bf53]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00bf53] font-semibold text-sm">New at WE-LE</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Picked for you</span>
                </div>
                <button className="ml-auto text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                NEW: Advanced TypeScript Mastery
              </h3>
              
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                Master type inference, generics, and utility types like a PRO. This course has helped 5,000+ developers level up. Early bird pricing ends in 48 hours!
              </p>
              
              <div className="bg-gray-50 p-2 rounded text-xs text-gray-600 mb-4">
                40% OFF for early birds
              </div>
              
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors mb-4">
                Grab Your Spot
              </button>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <Heart size={16} />
                    17
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <MessageCircle size={16} />
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <Share2 size={16} />
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <Bookmark size={16} />
                  </button>
                </div>
                <button className="text-gray-500 text-sm hover:text-gray-700">
                  More
                </button>
              </div>
            </div>
            
            {/* Quick Challenge Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00bf53] to-gray-400 rounded-t-xl"></div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Zap size={20} className="text-[#00bf53]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00bf53] font-semibold text-sm">Quick Challenge</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Picked for you</span>
                </div>
                <button className="ml-auto text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                5-Minute Challenge: CSS Grid
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Can you build a responsive gallery layout in under 5 minutes? 342 learners have already crushed it today. Show us what you've got!
              </p>
              
              <button className="bg-[#00bf53] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#00a047] transition-colors mb-4">
                Accept Challenge
              </button>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <Heart size={16} />
                    30
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <MessageCircle size={16} />
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <Share2 size={16} />
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <Bookmark size={16} />
                  </button>
                </div>
                <button className="text-gray-500 text-sm hover:text-gray-700">
                  More
                </button>
              </div>
            </div>
            
            {/* Skill Insight Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-[#00bf53] rounded-t-xl"></div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <BarChart3 size={20} className="text-[#00bf53]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00bf53] font-semibold text-sm">Skill Insight</span>
                </div>
                <button className="ml-auto text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Python demand just EXPLODED
              </h3>
              
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                Job postings requiring Python are up 47% this quarter! AI/ML roles are driving this surge. The perfect time to add it to your arsenal is NOW.
              </p>
              
              <div className="bg-gray-50 p-2 rounded text-xs text-gray-600 mb-4">
                Industry Analysis
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <Heart size={16} />
                    50
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <MessageCircle size={16} />
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <Share2 size={16} />
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <Bookmark size={16} />
                  </button>
                </div>
                <button className="text-gray-500 text-sm hover:text-gray-700">
                  More
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-3 h-3 bg-[#00bf53] rounded-full opacity-60"></div>
        <div className="absolute top-40 right-40 w-2 h-2 bg-[#00bf53] rounded-full opacity-40"></div>
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-[#00bf53] rounded-full opacity-50"></div>
        <div className="absolute bottom-20 right-60 w-3 h-3 bg-[#00bf53] rounded-full opacity-30"></div>
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

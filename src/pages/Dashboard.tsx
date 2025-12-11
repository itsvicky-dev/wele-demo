import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, FileText, Code, Trophy, Users, Calendar, Target, Clock, CheckCircle, XCircle, Circle, BookOpen, Zap, TrendingUp, Star, MessageCircle, Lightbulb, Gift, BarChart3, Heart, Share2, Bookmark, MoreHorizontal, Flame, Award, Crown } from "lucide-react";
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
    { name: "Mathi R.", action: "reviewed", target: "5 code submissions", initials: "MR", icon: <Code size={16} className="text-[#00bf53]" /> },
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
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-gray-50 py-4">
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
      
      <div className="mx-auto px-8 py-4 relative">
        {activeTab === 'for-you' && (
          <>
            {/* Main Layout: Left 3 + Right 1 */}
            <div className="mt-0 flex gap-6">
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
                      <button className="text-xs text-[#00bf53] mt-2 hover:underline">Show More</button>
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
                      <button className="text-xs text-[#00bf53] mt-7 hover:underline">View Full Analysis</button>
                    )}
                  </div>
                  
                  {/* Weekly Challenge */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
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
                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Participants</span>
                        <span className="font-medium text-gray-900">2,341</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Your Rank</span>
                        <span className="font-medium text-gray-900">#47</span>
                      </div>
                    </div>
                    <div className=" pt-2">
                      <button className="text-xs text-[#00bf53] hover:underline">Continue Challenge</button>
                    </div>
                  </div>
                </div>

                                {/* Top Banner - Full Width */}
                <div className=" rounded-2xl  p-6 text-white relative overflow-hidden border border-gray-300 ">
                  <div className="absolute top-4 left-4 text-xs font-medium opacity-80 text-gray-900">ONLINE COURSE</div>
                  <h1 className="text-2xl font-bold mt-6 mb-2 text-gray-500">Sharpen Your Skills with</h1>
                  <h1 className="text-2xl font-bold mb-4 text-gray-500">Professional Online Courses</h1>
                  <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    Join Now
                    <ArrowRight size={14} />
                  </button>
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="w-2 h-2 bg-green-400 rounded-full absolute animate-float-up" style={{right: '10%', animationDelay: '0s'}}></div>
                    <div className="w-1.5 h-1.5 bg-green-300 rounded-full absolute animate-float-up" style={{right: '20%', animationDelay: '0.8s'}}></div>
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full absolute animate-float-up" style={{right: '15%', animationDelay: '1.6s'}}></div>
                    <div className="w-1 h-1 bg-green-200 rounded-full absolute animate-float-up" style={{right: '25%', animationDelay: '2.4s'}}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full absolute animate-float-up" style={{right: '8%', animationDelay: '3.2s'}}></div>
                    <div className="w-1.5 h-1.5 bg-green-300 rounded-full absolute animate-float-up" style={{right: '30%', animationDelay: '4s'}}></div>
                  </div>
                </div>
                
                {/* Summary Section */}
                <div className="bg-white rounded-2xl p-6 py-4 border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 pb-2">Summary</h2>
                  <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                    <p>
                      Welcome to your personalized learning dashboard! Track your progress across multiple courses and skills.
                      Stay updated with today's live sessions and monitor your attendance to maintain consistent learning habits.
                    </p>
                    <p>
                      Challenge yourself with weekly coding tasks and compete with thousands of learners worldwide.
                      Analyze your skill gaps to identify areas for improvement and focus your learning efforts effectively.
                    </p>
                    <p>
                      Connect with our vibrant community of learners and mentors for support and collaboration.
                      Access quick tools for resume building, daily practice, and career development to accelerate your growth.
                    </p>
                  </div>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Current Streak */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 text-sm mb-3">Current Streak</h3>
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
                    <h3 className="font-semibold text-gray-900 text-sm mb-3">Current Level</h3>
                    <div className="text-center mb-3">
                      <div className="text-2xl font-bold text-gray-900">Level 12</div>
                      <div className="text-sm text-gray-500">2,450 XP</div>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Next Level</span>
                        <span className="text-gray-600">3,000 XP</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#00bf53] h-2 rounded-full" style={{width: '82%'}}></div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 text-center">Unlock: Premium Badge</p>
                  </div>
                  
                  {/* Course Progress */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 text-sm mb-3">Course Progress</h3>
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
                      {newActivity && (
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
                      )}
                      {liveActivities.map((activity, index) => (
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
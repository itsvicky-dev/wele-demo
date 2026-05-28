import {
    Search,
    Bell,
    Settings,
    Play,
    Users,
    Star,
    Bookmark,
    Share2,
    Clock,
    GraduationCap,
    ChevronRight
} from 'lucide-react';
import topCardImg1 from '../assets/images/career-img.png';
import topCardImg2 from '../assets/images/student.png';
import topCardImg3 from '../assets/images/learner.png';
import topCardImg4 from '../assets/images/webinar-1.png';
import featureBg from '../assets/images/bgnew.jpg';
import miniCourseImg1 from '../assets/images/webinar-2.png';
import miniCourseImg2 from '../assets/images/webinar-3.png';
import miniCourseImg3 from '../assets/images/webinar-4.png';
import miniCourseImg4 from '../assets/images/webinar-5.png';
import miniCourseImg5 from '../assets/images/webinar-6.png';
import miniCourseImg6 from '../assets/images/bgnew.png';
import flagshipBg1 from '../assets/images/chart.png';
import flagshipBg2 from '../assets/images/bgnew.png';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-slate-900 font-sans pb-20 overflow-auto">
            {/* --- Top Navigation --- */}
            <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-xl">
                    <GraduationCap className="w-8 h-8" />
                    <span>Courses</span>
                </div>

                {/* <div className="flex-1 max-w-2xl mx-12 relative">
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Ask AI about what you want to learn today..."
              className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button className="absolute right-2 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors">
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        </div> */}

                <div className="flex items-center gap-4 text-gray-500">
                    <button className="p-2 hover:bg-gray-100 rounded-full"><Search className="w-6 h-6" /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-full"><Bell className="w-6 h-6" /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-full"><Settings className="w-6 h-6" /></button>
                </div>
            </nav>

            {/* --- Category Filters --- */}
            <div className="max-w-7xl mx-auto mt-8 px-6 text-center">
                <div className="flex flex-wrap justify-center gap-3 mb-2">
                    {['Development', 'AI Courses', 'Design', 'DevOps', 'Product Management', 'Operations', 'Marketing'].map((cat, i) => (
                        <button
                            key={cat}
                            className={`px-6 py-2 rounded-full border text-sm font-medium transition-all
                ${i === 0 ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                {/* <p className="text-sm text-gray-500 mb-6">Start learning future-ready skills powered by AI. We've matched courses to your unique profile.</p> */}
            </div>

            <main className="max-w-7xl mx-auto px-6 mt-8">

                {/* --- Section 1: Kickstart Today --- */}
                <section className="mb-12">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Kickstart Today</span>
                            <h2 className="text-3xl font-bold mt-1">Start Learning for Free</h2>
                        </div>
                        <button className="text-blue-600 font-semibold flex items-center gap-1 hover:underline">
                            View all <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Introduction to...", desc: "Master the fundamentals of LLMs...", time: "2.5 Hours", cat: "Beginner Friendly", image: topCardImg1 },
                            { title: "UI/UX Foundations", desc: "Learn the principles of modern interface design", time: "4 Hours", cat: "Design", image: topCardImg2 },
                            { title: "Python for...", desc: "The ultimate starting point for anyone looking", time: "6 Hours", cat: "Coding", image: topCardImg3 },
                            { title: "Data Literacy 101", desc: "Learn how to read, interpret, and...", time: "3 Hours", cat: "Business", image: topCardImg4 }
                        ].map((course, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                                <div className="h-40 relative overflow-hidden flex items-center justify-center">
                                    <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                                    <div className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded">FREE</div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="font-bold text-lg leading-tight mb-2">{course.title}</h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.desc}</p>
                                    <div className="mt-auto flex items-center gap-4 text-[11px] text-gray-400 font-semibold mb-5">
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.time}</span>
                                        <span className="flex items-center gap-1">• {course.cat}</span>
                                    </div>
                                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold hover:bg-blue-700">
                                        Start Learning Free <Play className="w-4 h-4 fill-current" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Section 2: Continue Learning --- */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold mb-6">Continue Learning</h2>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide max-w-[60vw]">
                        {[
                            { title: "Variables & Data Types", cat: "JAVASCRIPT", progress: 60, description: "Learn the building blocks of programming with JavaScript. Learn the building blocks of programming with JavaScript" },
                            { title: "Component Lifecycle", cat: "REACT.JS", progress: 20, description: "Understand the phases of a React component's existence. Learn the building blocks of programming with JavaScript" }
                        ].map((item, i) => (
                            <div key={i} className="min-w-[240px] bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-4 hover:border-blue-200 transition-colors cursor-pointer">
                                <div className="relative w-12 h-12 flex items-center justify-center">
                                    <svg className="w-12 h-12 -rotate-90">
                                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-100" />
                                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-blue-600" strokeDasharray={126} strokeDashoffset={126 - (126 * item.progress) / 100} />
                                    </svg>
                                    <span className="absolute text-[10px] font-bold">{item.progress}%</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-bold text-gray-400">{item.cat}</p>
                                    <h4 className="font-bold text-sm">{item.title}</h4>
                                    <p className="text-gray-500 text-xs">{item.description}</p>
                                </div>
                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                    <Play className="w-4 h-4 fill-current ml-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Section 3: Recommended for You --- */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-8">Recommended for You</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Feature Card */}
                        <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 flex relative overflow-hidden group">
                            <div className="flex-1 z-10">
                                <span className="bg-pink-100 text-pink-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Advanced AI Match</span>
                                <h3 className="text-3xl font-bold mt-4 mb-4 max-w-sm">Mastering Large Language Models with PyTorch</h3>
                                <p className="text-gray-500 mb-8 max-w-sm leading-relaxed">Based on your recent interest in Python and AI, we think you'll excel in this deep-dive into LLM architectures.</p>
                                <div className="flex items-center gap-6 text-sm mb-10">
                                    <span className="flex items-center gap-2 font-semibold text-slate-700"><Users className="w-5 h-5 text-blue-500" /> 1.2k Students</span>
                                    <span className="flex items-center gap-2 font-semibold text-slate-700"><Star className="w-5 h-5 text-yellow-400 fill-current" /> 4.9/5 Rating</span>
                                </div>
                                <div className="flex gap-3">
                                    <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">Explore Program</button>
                                    <button className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"><Bookmark className="w-6 h-6 text-gray-400" /></button>
                                </div>
                            </div>
                            <div className="flex-1 relative hidden md:block">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform">
                                    <img src={featureBg} alt="AI feature" className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-32 h-32 border border-blue-400 rounded-full blur-xl opacity-20"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Side Card: Mock Interview */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 flex flex-col">
                            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                                <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 leading-tight">Mock Interview: AI Engineer</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-10">Practice your technical skills with our AI-driven interview simulator based on your learning progress.</p>
                            <button className="mt-auto w-full bg-gray-100 text-gray-800 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all">
                                Start Mock Interview <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- Section 4: Mini Courses --- */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold mb-6">Mini & Crash Courses</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { title: "Git Fast-Track", meta: "15 mins • Dev", image: miniCourseImg1 },
                            { title: "Figma Auto-Layout", meta: "22 mins • Design", image: miniCourseImg2 },
                            { title: "SQL Mastery", meta: "45 mins • Data", image: miniCourseImg3 },
                            { title: "AI Prompt Guide", meta: "12 mins • AI", image: miniCourseImg4 },
                            { title: "Soft Skills Boost", meta: "20 mins • Business", image: miniCourseImg5 },
                            { title: "Tailwind Pro tips", meta: "18 mins • UI", image: miniCourseImg6 },
                        ].map((course, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="relative aspect-square rounded-2xl mb-3 shadow-sm overflow-hidden transition-transform group-hover:-translate-y-1">
                                    <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_35%)]" />
                                </div>
                                <h4 className="text-sm font-bold truncate">{course.title}</h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">{course.meta}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Section 5: Flagship Programs --- */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold mb-8">Flagship Programs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Product Management Elite Certification",
                                price: "12,999",
                                type: "MASTERCLASS",
                                desc: "A comprehensive 12-week program led by industry leaders from top tech firms.",
                                image: flagshipBg1
                            },
                            {
                                title: "Cloud Architect & DevOps Mastery",
                                price: "15,499",
                                type: "PROFESSIONAL",
                                desc: "Master AWS, Azure, and Google Cloud with hands-on labs and real-world deployment scenarios.",
                                image: flagshipBg2
                            }
                        ].map((prog, i) => (
                            <div key={i} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm flex flex-col md:flex-row h-[340px]">
                                <div className="relative w-full md:w-1/3 overflow-hidden">
                                    <img src={prog.image} alt={prog.title} className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col relative">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className={`text-[10px] font-bold px-3 py-1 rounded border tracking-widest ${i === 0 ? 'text-blue-600 border-blue-200' : 'text-emerald-600 border-emerald-200'}`}>
                                            {prog.type} <span className="ml-1 text-slate-300">🎓</span>
                                        </span>
                                        <span className="text-2xl font-black text-blue-900">₹{prog.price}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold leading-tight mb-4">{prog.title}</h3>
                                    <p className="text-gray-500 text-sm mb-8 leading-relaxed line-clamp-2">{prog.desc}</p>
                                    <div className="mt-auto flex gap-3">
                                        <button className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors">Add to Cart</button>
                                        <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-400"><Share2 className="w-5 h-5" /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LandingPage;
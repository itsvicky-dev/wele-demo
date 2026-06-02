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
    ChevronRight,
    ShoppingCart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
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
import { useState, useRef } from 'react';
import sessionVideo from '../assets/videos/interview.mp4';
import { ChatTextArea } from '../components/ChatTextArea';
import thumbnail1 from '../assets/images/thumbnail1.png';
import thumbnail2 from '../assets/images/thumbnail2.png';

const LandingPage = () => {
    const navigate = useNavigate();
      const { addToCart: addToCartCtx, items: cartItems } = useCart();
      const [selectedBadge, setSelectedBadge] = useState("Development");
      const [selectedLanguage, setSelectedLanguage] = useState("");
      const [cart, setCart] = useState<string[]>([]);
      const addToCart = (title: string, extra?: any) => {
        addToCartCtx({ title, price: extra?.price || '', basePrice: extra?.basePrice, trainer: extra?.trainer, date: extra?.date });
        setCart(prev => prev.includes(title) ? prev : [...prev, title]);
      };
      const badges = [
        "Development",
        "Design",
        "DevOps",
        "AI/ML",
        "Product Management",
        "Operations",
        "Marketing",
      ];
        const suggestions = [
            {
            id: "1",
            text: "Summarize my course.",
            },
            {
            id: "2",
            text: "Which course suits me best?",
            },
        ];
    return (
        <div className="min-h-screen bg-white overflow-y-auto w-full flex-1 flex flex-col relative">
            {/* --- Top Navigation --- */}
            <div className="sticky top-0 z-20 border-b border-[#0d0d0d0d] bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap size={16} className="text-gray-700" />
            <h1 className="text-md text-gray-700 font-medium">Courses</h1>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
                    <button className="p-[7px] hover:bg-gray-100 rounded-full"><Search className="w-4 h-4" /></button>
                    <button className="p-[7px] hover:bg-gray-100 rounded-full"><Bell className="w-4 h-4" /></button>
                    <button onClick={() => navigate('/cart')} className="relative p-[7px] hover:bg-gray-100 rounded-full">
                        <ShoppingCart className="w-4 h-4" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{cartItems.length}</span>
                        )}
                    </button>
                    <button className="p-[7px] hover:bg-gray-100 rounded-full"><Settings className="w-4 h-4" /></button>
                </div>
        </div>
      </div>
            <div className="max-w-5xl mx-auto px-6 pt-6 pb-[3rem]">
            {/* Personalized Course Recommendation Section */}
            <div className="mb-8">
            <div className="flex space-x-3">
                <div className="flex flex-col w-full">
                <div className="flex items-center justify-between w-full">
                <h3 className="text-xl flex items-center font-semibold text-gray-900 mb-0">
                    The courses listed below are smartly matched for you
                    <div className="text-2xl ml-1">👀</div>
                </h3>
                <select
                    value={selectedLanguage}
                    onChange={e => setSelectedLanguage(e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none focus:border-[#00BF53] cursor-pointer"
                >
                    <option value="">Language</option>
                    <option value="hindi">Hindi</option>
                    <option value="tamil">Tamil</option>
                    <option value="english">English</option>
                    <option value="telugu">Telugu</option>
                    <option value="kannada">Kannada</option>
                    <option value="malayalam">Malayalam</option>
                </select>
                </div>
                {/* <div className="space-y-2 text-sm text-gray-700 max-w-3xl">
                    <p>
                    They're selected based on your interests, domain focus, and
                    learning style.
                    Your progress and goals helped shape this list. Each course
                    fits where you are right now in your journey.
                    </p>
                    <p className="font-medium">
                    Jump in with confidence and keep moving forward at your own
                    pace.
                    </p>
                </div> */}
                </div>
            </div>
            </div>
            {/* --- Category Filters --- */}
            <div className="flex gap-3 mb-4">
          {badges.map((badge) => (
            <div
              key={badge}
              onClick={() => setSelectedBadge(badge)}
              className={`px-4 py-2 rounded-full text-xs font-medium border cursor-pointer transition-colors ${
                selectedBadge === badge
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "text-gray-500 border-gray-200 hover:bg-green-100 hover:text-green-800 hover:border-green-200"
              }`}
            >
              {badge}
            </div>
          ))}
        </div>

            <main className="max-w-7xl mx-auto  mt-8">

                {/* --- Section 1: Kickstart Today --- */}
                <section className="mb-12">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <span className="text-green-700 text-xs font-bold uppercase tracking-widest">Kickstart Today</span>
                            <h2 className="text-xl font-bold mt-1">Start Learning for Free</h2>
                        </div>
                        <button className="text-sm text-green-600 font-medium hover:text-green-700 flex items-center gap-1">
                            View all <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {[
                            { title: "Introduction to...", desc: "Master the fundamentals of LLMs...", time: "2.5 Hours", image: thumbnail1, languages: ["English", "Hindi", "Tamil", "Telugu"], level: "Beginner" },
                            { title: "UI/UX Foundations", desc: "Learn the principles of modern interface design", time: "4 Hours", image: thumbnail2, languages: ["Hindi", "English"], level: "Intermediate" },
                            { title: "Python for...", desc: "The ultimate starting point for anyone looking", time: "6 Hours", image: thumbnail1, languages: ["Tamil", "English", "Kannada"], level: "Beginner" },
                        ].map((course, i) => {
                            const visible = course.languages.slice(0, 2);
                            const extra = course.languages.slice(2);
                            return (
                            <div key={i} className="group bg-white rounded-[10px] border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow h-full"
                                onMouseEnter={e => { const v = e.currentTarget.querySelector('video') as HTMLVideoElement; if(v){v.style.opacity='1';v.play();} const img = e.currentTarget.querySelector('img') as HTMLImageElement; if(img) img.style.opacity='0'; }}
                                onMouseLeave={e => { const v = e.currentTarget.querySelector('video') as HTMLVideoElement; if(v){v.pause();v.currentTime=0;v.style.opacity='0';} const img = e.currentTarget.querySelector('img') as HTMLImageElement; if(img) img.style.opacity='1'; }}
                            >
                                <div className="h-36 relative overflow-hidden flex-shrink-0">
                                    <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" />
                                    <video src={sessionVideo} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300" muted playsInline loop />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                                    <div className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded">FREE</div>
                                    <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                                        <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow">
                                            <Play className="w-4 h-4 text-gray-800 fill-current ml-0.5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-sm leading-tight mb-1">{course.title}</h3>
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">⚡ {course.level}</span>                                        
                                    </div>
                                    <p className="text-gray-500 text-xs mb-4 line-clamp-2">{course.desc}</p>
                                    <div className="mt-auto flex items-center justify-between gap-4 text-[11px] text-gray-400 font-semibold mb-4">
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.time}</span>
                                        <div className="relative group/lang flex items-center gap-1 cursor-default">
                                            <span className="text-[11px] text-gray-400 font-semibold"> {course.languages.slice(0,2).join(', ')}{course.languages.length > 2 ? ` +${course.languages.length - 2}` : ''}</span>
                                            {course.languages.length > 2 && (
                                                <div className="absolute bottom-full left-0 mb-1.5 hidden group-hover/lang:flex flex-col gap-1 bg-gray-900 text-white text-[10px] rounded-lg px-2 py-1.5 whitespace-nowrap z-10 shadow-lg">
                                                    {course.languages.slice(2).map(l => <span key={l}> {l}</span>)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button onClick={() => window.open('#/course-learning', '_blank')} className="w-full border border-gray-400 text-gray-800 py-2 rounded-full flex items-center justify-center gap-2 text-xs font-medium hover:text-[#00BF5C] hover:border-[#00BF5C] transition-colors">
                                        Start Learning Free <Play className="w-3 h-3 fill-current" />
                                    </button>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                </section>

                {/* --- Section 2: Continue Learning --- */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Continue Learning</h2>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide max-w-[60vw]">
                        {[
                            { title: "Variables & Data Types", cat: "JAVASCRIPT", progress: 60, description: "Learn the building blocks of programming with JavaScript. Learn the building blocks of programming with JavaScript" },
                            { title: "Component Lifecycle", cat: "REACT.JS", progress: 20, description: "Understand the phases of a React component's existence. Learn the building blocks of programming with JavaScript" }
                        ].map((item, i) => (
                            <div key={i} className="min-w-[240px] bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-4 hover:border-green-200 transition-colors cursor-pointer">
                                <div className="relative w-12 h-12 flex items-center justify-center">
                                    <svg className="w-12 h-12 -rotate-90">
                                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-100" />
                                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-green-600" strokeDasharray={126} strokeDashoffset={126 - (126 * item.progress) / 100} />
                                    </svg>
                                    <span className="absolute text-[10px] font-bold">{item.progress}%</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-bold text-gray-400">{item.cat}</p>
                                    <h4 className="font-bold text-sm">{item.title}</h4>
                                    <p className="text-gray-500 text-xs">{item.description}</p>
                                </div>
                                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                                    <Play className="w-4 h-4 fill-current ml-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Section 3: Recommended for You --- */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Recommended for You</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Feature Card */}
                        <div className="lg:col-span-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 flex relative overflow-hidden group">
                            <div className="flex-1 z-10">
                                <span className="bg-green-100 text-green-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-green-200">Advanced AI Match</span>
                                <h3 className="text-xl font-bold mt-4 mb-3 max-w-sm">Mastering Large Language Models with PyTorch</h3>
                                <p className="text-gray-500 text-sm mb-6 max-w-sm leading-relaxed">Based on your recent interest in Python and AI, we think you'll excel in this deep-dive into LLM architectures.</p>
                                <div className="flex items-center gap-6 text-xs mb-8">
                                    <span className="flex items-center gap-2 font-semibold text-slate-700"><Users className="w-4 h-4 text-green-600" /> 1.2k Students</span>
                                    <span className="flex items-center gap-2 font-semibold text-slate-700"><Star className="w-4 h-4 text-yellow-400 fill-current" /> 4.9/5 Rating</span>
                                </div>
                                <div className="flex gap-3">
                                    <button className="border border-gray-400 text-gray-800 px-6 py-2 rounded-full text-xs font-medium hover:text-[#00BF5C] hover:border-[#00BF5C] transition-colors">Explore Program</button>
                                    <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50"><Bookmark className="w-4 h-4 text-gray-400" /></button>
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
                        <div className="bg-white rounded-3xl p-8 border border-gray-200 flex flex-col">
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-5">
                                <div className="w-5 h-5 bg-green-600 rounded-full"></div>
                            </div>
                            <h3 className="text-base font-bold mb-3 leading-tight">Mock Interview: AI Engineer</h3>
                            <p className="text-gray-500 text-xs leading-relaxed mb-8">Practice your technical skills with our AI-driven interview simulator based on your learning progress.</p>
                            <button className="mt-auto w-full border border-gray-400 text-gray-800 py-2 rounded-full text-xs font-medium flex items-center justify-center gap-2 hover:text-[#00BF5C] hover:border-[#00BF5C] transition-colors">
                                Start Mock Interview <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- Section 4: Mini Courses --- */}
                {[{ heading: "Mini Courses", badge: "MINI" }, { heading: "Crash Courses", badge: "CRASH" }].map((section) => (
                <section key={section.heading} className="mb-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">{section.heading}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {[
                            { title: "Git Fast-Track", desc: "Master AI/ML from Python basics to LLMs, RAG & Agentic AI. Build 6 real-world projects and become job-ready.", price: "₹ 24999", sessions: 1, trainer: "Harish", date: "30 Jun 2026 - 29 Sept 2026", image: miniCourseImg1, tags: ["Python for AI", "PyTorch", "Deep Learning", "NLP", "RAG", "Agentic AI", "LLMs", "Neural Networks", "Computer Vision", "Transformers", "MLOps", "Hugging Face", "OpenAI API", "Fine-tuning", "Vector DBs", "LangChain", "Embeddings", "Prompt Engineering"] },
                            { title: "Figma Auto-Layout", desc: "Master Figma's auto-layout to build responsive designs faster and more efficiently across all screen sizes.", price: "₹ 19999", basePrice: "₹ 24999", sessions: 2, trainer: "Priya", date: "15 Jul 2026 - 30 Sept 2026", image: miniCourseImg2, tags: ["Figma", "UI Design", "Auto Layout", "Components", "Prototyping"] },
                            { title: "SQL Mastery", desc: "Write powerful queries and understand relational databases deeply with hands-on real-world projects.", price: "₹ 14999", basePrice: "₹ 19999", sessions: 1, trainer: "Ravi", date: "1 Aug 2026 - 31 Oct 2026", image: miniCourseImg3, tags: ["SQL", "Databases", "Queries", "PostgreSQL", "Joins", "Indexes"] },
                        ].map((course, i) => (
                            <div key={i} className="group bg-white rounded-[10px] border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow h-full"
                                onMouseEnter={e => { const v = e.currentTarget.querySelector('video') as HTMLVideoElement; if(v){v.style.opacity='1';v.play();} const img = e.currentTarget.querySelector('img') as HTMLImageElement; if(img) img.style.opacity='0'; }}
                                onMouseLeave={e => { const v = e.currentTarget.querySelector('video') as HTMLVideoElement; if(v){v.pause();v.currentTime=0;v.style.opacity='0';} const img = e.currentTarget.querySelector('img') as HTMLImageElement; if(img) img.style.opacity='1'; }}
                            >
                                <div className="h-36 relative overflow-hidden flex-shrink-0">
                                    <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" />
                                    <video src={sessionVideo} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300" muted playsInline loop />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                                    <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                                        <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow">
                                            <Play className="w-4 h-4 text-gray-800 fill-current ml-0.5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="font-bold text-sm leading-tight mb-2">{course.title}</h3>
                                    <p className="text-gray-600 text-xs mb-4 line-clamp-3">{course.desc}</p>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-lg font-bold text-gray-900">{course.price}</span>
                                            <span className="text-xs text-gray-400 line-through">{course.basePrice}</span>
                                        </div>
                                        <span className="flex items-center gap-1 text-xs text-gray-500"><GraduationCap className="w-3.5 h-3.5" /> {course.sessions} Session{course.sessions > 1 ? 's' : ''}</span>
                                    </div>
                                    <div className="flex flex-col gap-1.5 mb-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 flex-shrink-0" /> Trainer - {course.trainer}</span>
                                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 flex-shrink-0" /> {course.date}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                        {course.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-full border border-gray-200 text-[11px] text-gray-600">{tag}</span>
                                        ))}
                                        {course.tags.length > 2 && (
                                            <span className="px-3 py-1 rounded-full border border-gray-200 text-[11px] text-gray-600">+{course.tags.length - 2} more</span>
                                        )}
                                    </div>
                                    <div className="mt-auto flex gap-2">
                                        <button onClick={() => navigate('/course-details', { state: { ...course } })} className="flex-1 border border-[#00BF5C] text-[#00BF5C] py-2.5 rounded-full text-xs font-medium hover:bg-green-50 transition-colors">
                                            Enroll Now
                                        </button>
                                        <button onClick={() => addToCart(course.title, course)} className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full border transition-colors ${cart.includes(course.title) ? 'border-green-500 text-green-600 bg-green-50' : 'border-gray-300 text-gray-500 hover:border-[#00BF5C] hover:text-[#00BF5C]'}`}>
                                            <ShoppingCart className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                ))}

                {/* --- Section 5: Flagship Programs --- */}
                <section className="mb-20">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Flagship Programs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: "Product Management Elite Certification", type: "MASTERCLASS", desc: "A comprehensive 12-week program led by industry leaders from top tech firms. Master AI/ML from Python basics to LLMs, RAG & Agentic AI. Build 6 real-world projects.", price: "₹ 49999", basePrice: "₹ 59999", sessions: 3, trainer: "Ananya", date: "1 Jul 2026 - 30 Sept 2026", image: flagshipBg1, tags: ["Product Strategy", "Roadmapping", "Agile", "OKRs", "Stakeholder Mgmt", "Metrics", "GTM"] },
                            { title: "Cloud Architect & DevOps Mastery", type: "PROFESSIONAL", desc: "Master AWS, Azure, and Google Cloud with hands-on labs and real-world deployment scenarios. Build 6 real-world projects and become job-ready.", price: "₹ 54999", basePrice: "₹ 64999", sessions: 4, trainer: "Karthik", date: "15 Jul 2026 - 15 Oct 2026", image: flagshipBg2, tags: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD", "Terraform", "Monitoring"] },
                        ].map((prog, i) => (
                            <div key={i} className="group bg-white rounded-[30px] border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                                onMouseEnter={e => { const v = e.currentTarget.querySelector('video') as HTMLVideoElement; if(v){v.style.opacity='1';v.play();} const img = e.currentTarget.querySelector('img') as HTMLImageElement; if(img) img.style.opacity='0'; }}
                                onMouseLeave={e => { const v = e.currentTarget.querySelector('video') as HTMLVideoElement; if(v){v.pause();v.currentTime=0;v.style.opacity='0';} const img = e.currentTarget.querySelector('img') as HTMLImageElement; if(img) img.style.opacity='1'; }}
                            >
                                <div className="h-36 relative overflow-hidden flex-shrink-0">
                                    <img src={prog.image} alt={prog.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" />
                                    <video src={sessionVideo} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300" muted playsInline loop />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                                    <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                                        <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow">
                                            <Play className="w-4 h-4 text-gray-800 fill-current ml-0.5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <p className="text-gray-600 text-xs mb-4 line-clamp-3">{prog.desc}</p>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-lg font-bold text-gray-900">{prog.price}</span>
                                            <span className="text-xs text-gray-400 line-through">{prog.basePrice}</span>
                                        </div>
                                        <span className="flex items-center gap-1 text-xs text-gray-500"><GraduationCap className="w-3.5 h-3.5" /> {prog.sessions} Sessions</span>
                                    </div>
                                    <div className="flex flex-col gap-1.5 mb-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 flex-shrink-0" /> Trainer - {prog.trainer}</span>
                                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 flex-shrink-0" /> {prog.date}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                        {prog.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-full border border-gray-200 text-[11px] text-gray-600">{tag}</span>
                                        ))}
                                        {prog.tags.length > 2 && (
                                            <span className="px-3 py-1 rounded-full border border-gray-200 text-[11px] text-gray-600">+{prog.tags.length - 2} more</span>
                                        )}
                                    </div>
                                    <div className="mt-auto flex gap-2">
                                        <button onClick={() => navigate('/course-details', { state: { ...prog } })} className="flex-1 border border-[#00BF5C] text-[#00BF5C] py-2.5 rounded-full text-xs font-medium hover:bg-green-50 transition-colors">
                                            Enroll Now
                                        </button>
                                        <button onClick={() => addToCart(prog.title, prog)} className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full border transition-colors ${cart.includes(prog.title) ? 'border-green-500 text-green-600 bg-green-50' : 'border-gray-300 text-gray-500 hover:border-[#00BF5C] hover:text-[#00BF5C]'}`}>
                                            <ShoppingCart className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            </div>
            {/* Chat Text Area - Centered within course section */}
                  <div
                    className="fixed bottom-[20px] z-[60]"
                    style={{
                      left: "calc(50% + 500px - 50vw)",
                      width: "calc(100vw - 760px)",
                    }}
                  >
                    <ChatTextArea
                      placeholder="Ask AI about this session..."
                      suggestions={suggestions}
                      onSendMessage={(message) => console.log("Chat message:", message)}
                    />
                  </div>
        </div>
    );
};

export default LandingPage;
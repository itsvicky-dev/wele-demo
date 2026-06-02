import { ChevronRight, GraduationCap, Calendar, Globe, Clock, Send, ThumbsUp, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function CourseDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const course = (location.state as any) || {};
  const { addToCart, items } = useCart();

  const [activeTab, setActiveTab] = useState("sessions");
  const [newComment, setNewComment] = useState("");

  const title = course.title || "Mini-Website Course";
  const desc = course.desc || "What you learnWhat you learnWhat you learnWhat you learnWhat you learn";
  const price = course.price || "₹ 24999";
  const basePrice = course.basePrice;
  const trainer = course.trainer || "Harish";
  const date = course.date || "02 June 2026 - 19 June 2026";
  const sessions = course.sessions || 2;
  const tags = course.tags || ["html"];
  const initials = title.split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
  const inCart = items.some((i) => i.title === title);
  const cartCount = items.length;

  const sessionList = Array.from({ length: sessions }, (_, i) => ({
    id: i + 1,
    title: `Session ${i + 1}`,
    date: `0${i + 2} June 2026`,
    time: "10:00:00 - 11:00:00",
    locked: i > 0,
  }));

  const comments = [
    { id: 1, author: "Amaranth", time: "1 year ago", text: "Really well structured course! 🔥", likes: 340, replies: 2 },
    { id: 2, author: "Praveena Kumar", time: "1 year ago", text: "The career guidance session gave me real clarity on what to learn next 🔥", likes: 280, replies: 0 },
    { id: 3, author: "Balaji", time: "1 year ago", text: "Never thought online learning could feel this personal and motivating 🔥", likes: 210, replies: 2 },
  ];

  const learnPoints = [
    "What you learnWhat you learnWhat you learn",
    "Build real-world projects from scratch",
    "Master industry-standard tools and workflows",
  ];

  return (
    <div className="bg-white overflow-y-auto w-full min-h-screen">
      {/* Breadcrumb / Header */}
      <div className="sticky top-0 z-20 border-b border-gray-100 bg-white px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => navigate(-1)} className="hover:text-[#00BF53] cursor-pointer flex items-center gap-1">
              <GraduationCap className="w-4 h-4" /> Courses
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium truncate">{title}</span>
          </div>
          <button onClick={() => navigate("/cart")} className="relative p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 pb-24">
        <div className="flex gap-12">
          {/* LEFT */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{title}</h1>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">{desc}</p>

            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full mb-5">Students</span>

            <div className="space-y-2.5 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">Category :</span>
                <span>AI Machine Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>Course start date & end date : <span className="text-gray-800">{date}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 flex-shrink-0" />
                <span>Tamil</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>{sessions} Sessions</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-base font-bold text-gray-900 mb-3">Skills you gain</h2>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 6).map((tag: string) => (
                  <span key={tag} className="px-3 py-1 border border-gray-200 text-gray-600 rounded-full text-xs">{tag}</span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-base font-bold text-gray-900 mb-3">What you'll learn</h2>
              <ul className="space-y-2">
                {learnPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tabs */}
            <div className="border-b">
              <div className="flex">
                {["sessions", "modules", "comments"].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                    {tab === "sessions" ? "Course Sessions" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="py-2">
              {activeTab === "sessions" && (
                <div className="divide-y">
                  {sessionList.map((s) => (
                    <div key={s.id} className="py-4 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${s.locked ? "bg-gray-100" : "bg-green-500"}`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={s.locked ? "#9ca3af" : "white"} strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{s.title}</p>
                        <div className="flex items-center gap-4 text-xs text-green-600 mt-0.5">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{s.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{s.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "modules" && (
                <div className="py-4 text-sm text-gray-500">No modules available yet.</div>
              )}
              {activeTab === "comments" && (
                <div className="space-y-5 pt-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium flex-shrink-0">U</div>
                    <div className="flex-1 flex gap-2">
                      <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add your comment..."
                        className="flex-1 px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-green-500 text-sm" />
                      <button className="text-[#00BF53]"><Send className="w-4 h-4" /></button>
                    </div>
                  </div>
                  {comments.map((c) => (
                    <div key={c.id} className="flex gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium flex-shrink-0">{c.author[0]}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{c.author}</span>
                          <span className="text-xs text-gray-400">{c.time}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{c.text}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <button className="flex items-center gap-1 hover:text-green-600"><ThumbsUp className="w-3 h-3" />{c.likes}</button>
                          <button className="hover:text-green-600">Reply</button>
                          {c.replies > 0 && <span className="text-green-600">{c.replies} Replies</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — sticky card */}
          <div className="w-72 flex-shrink-0">
            <div className="sticky top-20">
              <div className="bg-gray-100 rounded-2xl p-6 flex items-center justify-center gap-4 mb-5">
                <div className="w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <span className="text-xl font-bold text-black">{initials}</span>
                </div>
                <span className="font-semibold text-gray-800 text-base">Course</span>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-gray-800">Trainer Name :</span>
                  <span className="text-green-600 font-medium">{trainer}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-600">Enrollment End Date:</span>
                  <span className="text-green-600 font-medium">{date.split(" - ")[0]}</span>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-xl font-bold text-gray-900">{price}</span>
                {basePrice && <span className="text-sm text-gray-400 line-through">{basePrice}</span>}
              </div>

              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-sm font-semibold transition-colors mb-2">
                Enroll Now
              </button>
              <button
                onClick={() => {
                  addToCart({ title, price, basePrice, trainer, date });
                  navigate("/cart");
                }}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border transition-colors ${inCart ? "border-green-500 text-green-600 bg-green-50" : "border-gray-300 text-gray-700 hover:border-green-400 hover:text-green-600"}`}
              >
                <ShoppingCart className="w-4 h-4" />
                {inCart ? "View Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

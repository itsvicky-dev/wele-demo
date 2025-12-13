import { ArrowLeft, Star, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgnew from "../assets/images/bgpatternnew.png";
import badge1 from "../assets/images/badge1.png";
import badge2 from "../assets/images/badge2.png";
import { ChatTextArea } from "../components/ChatTextArea";

export function MentorProfile() {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>('about');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const services = [
    {
      title: "UX Analogy",
      duration: "1:00 to 1:30 PM IST",
      type: "Book Now"
    },
    {
      title: "UX in Corporates", 
      duration: "3:00 to 3:30 PM IST",
      type: "Book Now"
    },
    {
      title: "UX Leader",
      duration: "4:00 to 4:30 PM IST", 
      type: "Book Now"
    },
  ];

  const reviews = [
    {
      name: "Krishna",
      rating: 5.0,
      text: "Having Scarlett Johnson as my mentor has been a transformative experience. Their ability to break down complex concepts into clear, actionable steps has accelerated my learning far beyond my expectations. "
    },
    {
      name: "Ram Kumar", 
      rating: 5.0,
      text: "Having Scarlett Johnson as my mentor has been a transformative experience. Their ability to break down complex concepts into clear, actionable steps has accelerated my learning far beyond my expectations. "
    }
  ];
    const suggestions = [
    {
      id: "1",
      text: "Book a session with this mentor",
    },
    {
      id: "2",
      text: "Is this mentor right for my goal?",
    },
  ];
  return (
    <div className="flex-1 overflow-y-auto bg-white">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded">
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-medium text-gray-900">Mentor Profile</h1>
        </div>
      </div>

      <div className="max-w-[calc(100vw-450px)] mx-auto space-y-3 py-6 relative">
        {/* Expertise Rank */}
        <div className="flex items-center gap-4 mb-6 relative p-4 rounded-lg overflow-hidden min-h-[200px]">
          <img src={bgnew} alt="background" className="absolute inset-0 w-full h-full object-cover opacity-90" />
          <div className="absolute w-[max-content] h-[max-content] flex bottom-5 left-0 right-0 m-auto gap-4 ">
            {/* <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <img src={badge1} alt="badge" className="w-6 h-6" />
              </div>
              <div>
                <div className="text-gray-900 font-semibold text-xs">Expertise Rank</div>
              </div>
            </div> */}
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <img src={badge2} alt="badge" className="w-6 h-6" />
              </div>
              <div>
                <div className="text-gray-900 font-bold text-sm">137</div>
                <div className="text-gray-600 text-xs">No. of Mentees</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6 px-4">
          {/* Profile Card */}
          <div className="w-[35%] bg-white rounded-2xl border h-[max-content] border-gray-200 overflow-hidden -mt-40 relative z-8">
            <div className="p-4 mt-5 px-2">
              <div className="flex justify-center mb-4">
                <img 
                  src="https://api.dicebear.com/9.x/notionists/svg?seed=varient1" 
                  alt="Suriya Prakash"
                  className="w-20 h-20 rounded-full border-4 bg-white border-[#00BF53] object-cover"
                />
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h2 className="text-sm font-semibold text-gray-900">Suriya Prakash</h2>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-1">Product Designer - Startup | MBA @IIFT Delhi</p>
                <p className="text-xs text-gray-500 mb-4">Ex- HT Media, Brandwagon IIFT | Star Performer IIT Media</p>
                
                <div className="flex items-center justify-center gap-4 text-xs text-gray-600 mb-0">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">8</div>
                    <div>Year of experience</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expandable Sections */}
            <div className="space-y-0 p-4">
              {/* About Me */}
              <div className="bg-white rounded-xl ">
                <button 
                  onClick={() => toggleSection('about')}
                  className="w-full p-4 px-0 flex items-center justify-between text-left pb-0"
                >
                  <h3 className="font-medium text-gray-900 text-xs">About Me</h3>
                  {expandedSection === 'about' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSection === 'about' && (
                  <div className="px-0 pb-4 text-xs text-gray-600">
                    I'm Suriya Prakash, I'm a Product Designer with a passion for creating intuitive and impactful digital experiences. Today, I'm leading Industries of design, I've helped hundreds of thousands of students learn to code and change their lives by becoming a Designer. I've been invited by companies such as Twitter, Facebook and Google to teach their employees.
                  </div>
                )}
              </div>

              {/* Experience */}
              <div className="bg-white rounded-xl ">
                <button 
                  onClick={() => toggleSection('experience')}
                  className="w-full p-4 px-0 flex items-center justify-between text-left pb-0"
                >
                  <h3 className="font-medium text-gray-900 text-xs">Experience</h3>
                  {expandedSection === 'experience' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSection === 'experience' && (
                  <div className="px-0 pb-4 text-xs text-gray-600">
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-gray-900 text-xs">Senior Product Designer - TechCorp (2020-Present)</div>
                        <div>Led design for mobile app with 2M+ users, increased engagement by 40%</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-xs">UX Designer - StartupXYZ (2018-2020)</div>
                        <div>Designed complete user journey for B2B SaaS platform</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Top Works */}
              <div className="bg-white rounded-xl ">
                <button 
                  onClick={() => toggleSection('works')}
                  className="w-full p-4 px-0 flex items-center justify-between text-left pb-0"
                >
                  <h3 className="font-medium text-gray-900 text-xs">Top Works</h3>
                  {expandedSection === 'works' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSection === 'works' && (
                  <div className="px-0 pb-4 text-xs text-gray-600">
                    <div className="space-y-2">
                      <div>• E-commerce Mobile App - Award winning design</div>
                      <div>• Healthcare Dashboard - Improved workflow efficiency</div>
                      <div>• Banking App Redesign - Enhanced user experience</div>
                      <div>• Design System - Scalable component library</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Education */}
              <div className="bg-white rounded-xl ">
                <button 
                  onClick={() => toggleSection('education')}
                  className="w-full p-4 px-0 flex items-center justify-between text-left pb-0"
                >
                  <h3 className="font-medium text-gray-900 text-xs">Education</h3>
                  {expandedSection === 'education' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSection === 'education' && (
                  <div className="px-0 pb-4 text-xs text-gray-600">
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-gray-900">MBA - IIFT Delhi (2016-2018)</div>
                        <div>Specialization in Marketing & Digital Strategy</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">B.Des - National Institute of Design (2012-2016)</div>
                        <div>Product Design & User Experience</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Available Slots */}
          <div className="w-[30%] bg-white rounded-xl border h-[max-content] border-gray-200 p-6 px-4">
            <h3 className="font-semibold text-gray-900 mb-0 text-sm">Available slots and Services</h3>
            <p className="text-xs text-gray-600 mb-4">Where Experience Meets Aspiration</p>
            
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2 text-xs">{service.title}</h4>
                  <div className="flex items-center gap-2 mb-3 ">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-xs text-gray-600">{service.duration}</span>
                  </div>
                  <button className="w-full bg-white  py-1 rounded-md text-xs font-regular  transition-colors border border-[#00BF53] text-[#00BF53] hover:bg-[#00BF53]/10">
                    {service.type}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="w-[35%] bg-white rounded-xl border border-gray-200 p-6 h-[max-content]">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-bold text-gray-900">5.0</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-500 text-xs">Average Rating (341 Reviews)</span>
            </div>
            
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="pb-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src="https://api.dicebear.com/9.x/notionists/svg?seed=reviewer" 
                      alt={review.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{review.name}</div>
                      <div className="text-xs text-gray-500">18 Jul24, 05:07 PM GST</div>
                    </div>
                    <div className="bg-green-100 px-2 py-1 rounded flex items-center gap-1">
                      <span className="text-green-600 font-medium text-sm">{review.rating}</span>
                      <Star size={12} className="fill-green-600 text-green-600" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
       <div
                            className="sticky bottom-[20px] z-[60] "
                            style={{
                              width: "60%",
                              margin:"auto",
                              left:"0px",
                              right:"0px",
                              marginTop:"20px"
                            }}
                          >
                            <ChatTextArea
                              placeholder="Ask AI about this dashboard..."
                              suggestions={suggestions}
                              sessionContext={{
                                title: "Dashboard",
                                courseName: "Learning Dashboard",
                                description: "Your personalized learning hub",
                                duration:300,
                              }}
                              onSendMessage={(message) =>
                                console.log("Chat message:", message)
                              }
                            />
                      </div>
    </div>
  );
}
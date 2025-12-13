import {  UserCircle, Star, ChevronLeft, ChevronRight, Crown } from "lucide-react";
import { ChatTextArea } from "../components/ChatTextArea";
import { useNavigate } from "react-router-dom";
import bgpattern from "../assets/images/bgpatternnew.png"
import bgpatternnew2 from "../assets/images/bgpatternnew2.png"
export function Mentors() {
  const navigate = useNavigate();
  const mentors = [
    {
      id: 1,
      name: "Maya Patel",
      title: "Senior UX Designer @Adobe",
      subtitle: "NID Ahmedabad, Ex-Figma, Sketch",
      rating: 5,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=varient1",
      rank: "#1"
    },
    {
      id: 2,
      name: "Karan Singh",
      title: "ML Engineer @OpenAI",
      subtitle: "IIT Bombay, Ex-DeepMind, Tesla",
      rating: 5,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=varient2",
      rank: "#2"
    },
    {
      id: 3,
      name: "Ananya Reddy",
      title: "Product Lead @Stripe",
      subtitle: "ISB Hyderabad, Ex-PayPal, Razorpay",
      rating: 5,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=varient3",
      rank: "#3"
    },
    {
      id: 4,
      name: "Vikram Joshi",
      title: "DevOps Architect @AWS",
      subtitle: "BITS Pilani, Ex-Docker, HashiCorp",
      rating: 5,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=varient4",
      rank: "#4"
    },
    {
      id: 5,
      name: "Riya Sharma",
      title: "Frontend Lead @Vercel",
      subtitle: "DTU Delhi, Ex-Next.js, React Team",
      rating: 5,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=varient5",
      rank: "#5"
    },
    {
      id: 6,
      name: "Arjun Kumar",
      title: "Data Scientist @Meta",
      subtitle: "IISc Bangalore, Ex-Google, Uber",
      rating: 5,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=varient6",
      rank: "#6"
    },

  ];
  const topMentors = [
    {
      id: 1,
      name: "Sophia Chen",
      title: "VP Engineering @Notion",
      subtitle: "Stanford CS, Ex-Facebook, Airbnb",
      rating: 5,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=varient1",
      rank: "#1"
    },
    {
      id: 2,
      name: "Rahul Mehta",
      title: "Principal Designer @Figma",
      subtitle: "NIFT Delhi, Ex-Adobe, Sketch",
      rating: 5,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=varient2",
      rank: "#2"
    },
    {
      id: 3,
      name: "Priya Agarwal",
      title: "Head of AI @Microsoft",
      subtitle: "MIT Boston, Ex-OpenAI, DeepMind",
      rating: 5,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=varient3",
      rank: "#3"
    },
  ];
  const domains = [
    "DevOps & Cloud Computing",
    "Data Analytics & Visualization", 
    "Designing",
    "Visualization",
    "Leadership",
    "Machine Learning",
    "Frontend Development",
    "Backend Development",
    "Mobile Development",
    "Product Management"
  ];
  
  const scrollLeft = () => {
    const container = document.querySelector('.domain-scroll');
    if (container) {
      container.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    const container = document.querySelector('.domain-scroll');
    if (container) {
      container.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const suggestions = [
    {
      id: "1",
      text: "Show my upcoming mentor sessions",
    },
    {
      id: "2",
      text: "Who can help me with my current skill gap?",
    },
    {
      id: "3",
      text: "Top-rated mentors for my career path",
    },
  ];
  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="sticky top-0 z-30 border-b border-[#0d0d0d0d] bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <UserCircle size={16} className="text-gray-700"/>
            <h1 className="text-md text-gray-700 font-medium">Mentors</h1>
          </div>
          <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-end relative ">
              <span  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm whitespace-nowrap flex-shrink-0 flex items-center gap-1 hover:bg-gray-200 cursor-pointer transition-colors hover:text-[#00BF53]">
                <Crown size={14} className="text-[#E4BD37]" />
                Upgrade
              </span>
        </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-[calc(100vw-450px)] mx-auto px-6 space-y-3 py-6 relative">

         <div >
        <div className="flex items-center justify-center gap-0  w-[100%]">
          <h2 className="text-md font-medium text-black mr-2">Domains</h2>
          <button 
            onClick={scrollLeft}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={16} className="text-gray-600" />
          </button>
          <div className="domain-scroll flex gap-2 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {domains.map((domain, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm whitespace-nowrap flex-shrink-0">
                {domain}
              </span>
            ))}
          </div>
          <button 
            onClick={scrollRight}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        </div>
         </div>
         
        
        <div className="grid grid-cols-3 gap-4 pt-4">
          {topMentors.map((mentor, index) => (
                            <div className="relative">
                              <div className="absolute top-[-10px] left-0 right-0 w-[max-content] m-auto bg-gray-200 text-black/80 px-2 py-1 rounded-full text-xs font-medium z-[20]">
                  Top Rated
                </div>
            <div key={mentor.id} className="bg-white rounded-3xl border border-gray-200  hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="bg-white h-20 relative">

                <div className="absolute top-0 left-0 h-[70px]">
                  <img src={index % 2 === 0 ? bgpattern : bgpatternnew2} alt="image" className="opacity-90 h-full w-full object-cover"/>
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
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <h3 className="font-semibold text-black text-sm">{mentor.name}</h3>
                    <div className="flex">
                      {[...Array(mentor.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-500 text-xs">⭐</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{mentor.title}</p>
                  <p className="text-xs text-gray-500 mb-4">{mentor.subtitle}</p>
                  <button 
                    onClick={() => navigate('/mentor-profile')}
                    className="w-[max-content] border border-gray-400 text-gray-700 py-1 px-4 rounded-xl text-xs font-medium hover:text-[#00BF53] transition-colors"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
                            </div>
          ))}
        </div>
         <div className="flex items-center justify-between">
          <p className="text-black text-sm font-semibold "> Mentors</p>
              {/* <span  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm whitespace-nowrap flex-shrink-0">
                Unlock Premium Mentorship
              </span> */}
        </div>
        <div className="grid grid-cols-3 gap-4 pb-8">
          {mentors.map((mentor,index) => (
            <div key={mentor.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow relative">
              <div className="bg-white h-20 relative">
                {/* <div className="absolute top-2 left-2 bg-black/30 text-black/80 px-2 py-1 rounded text-xs font-medium z-9">
                  {mentor.rank}
                </div> */}
                <div className="absolute top-0 left-0 h-[70px]">
                  <img src={index % 2 === 0 ? bgpattern : bgpatternnew2} alt="image" className="opacity-90 h-full w-full object-cover"/>
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
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <h3 className="font-semibold text-black text-sm">{mentor.name}</h3>
                    <div className="flex">
                      {[...Array(mentor.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-500 text-xs">⭐</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{mentor.title}</p>
                  <p className="text-xs text-gray-500 mb-4">{mentor.subtitle}</p>
                  <button className="w-[max-content] border border-gray-400 text-gray-700 py-1 px-4 rounded-xl text-xs font-medium hover:text-[#00BF53] transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
                <div
                      className="sticky bottom-[20px] z-[60] "
                      style={{
                        width: "80%",
                        margin:"auto",
                        left:"0px",
                        right:"0px"
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
    </div>
  );
}

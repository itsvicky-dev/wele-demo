import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { LearningHub } from "./pages/LearningHub";
import { CareerCompass } from "./pages/CareerCompass";
import { MockInterviews } from "./pages/MockInterviews";
import { LearningCommunity } from "./pages/LearningCommunity";
import { Courses } from "./pages/Courses";
import { Webinars } from "./pages/Webinars";
import { Mentors } from "./pages/Mentors";
import { MentorProfile } from "./pages/MentorProfile";
import { SkillShowcase } from "./pages/SkillShowcase";
import { ChatHistory } from "./pages/ChatHistory";
import { WhatIsBest } from "./pages/WhatIsBest";
import { Chat } from "./pages/Chat";
import { AIChat } from "./components/AIChat";
import { UserProvider } from "./contexts/UserContext";
import { CartProvider } from "./contexts/CartContext";
import LandingPage from "./pages/LandingPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import CartPage from "./pages/CartPage";
import CourseLearningPage from "./pages/CourseLearningPage";
import { LearningHubClone } from "./pages/LearningHubClone";

function SidebarWrapper() {
  const location = useLocation();
  if (location.pathname === '/course-learning') return null;
  if (location.pathname === '/cart') return null;
  return <Sidebar />;
}

function App() {
  return (
    <UserProvider>
      <CartProvider>
      <HashRouter>
        <div className="flex h-screen overflow-hidden">
          <SidebarWrapper />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/chat" element={<Chat key={window.location.href} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learning-hub" element={<LearningHub />} />
            <Route path="/career-compass" element={<CareerCompass />} />
            <Route path="/learning-community" element={<LearningCommunity />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/webinars" element={<Webinars />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/mentor-profile" element={<MentorProfile />} />
            <Route path="/skill-showcase" element={<SkillShowcase />} />
            <Route path="/chat-history" element={<ChatHistory />} />
            <Route path="/what-is-best" element={<WhatIsBest />} />
            <Route path="/mock-interviews" element={<MockInterviews />} />
            <Route path="/course-details" element={<CourseDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/course-learning" element={<CourseLearningPage />} />
            <Route path="/learning-hub-clone" element={<LearningHubClone />} />
          </Routes>
        </div>
      </HashRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;

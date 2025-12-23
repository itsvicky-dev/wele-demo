import { HashRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <UserProvider>
      <HashRouter>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
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
          </Routes>
        </div>
      </HashRouter>
    </UserProvider>
  );
}

export default App;

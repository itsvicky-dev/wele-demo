import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { LearningHub } from './pages/LearningHub';
import { CareerCompass } from './pages/CareerCompass';
import { MockInterviews } from './pages/MockInterviews';
import { LearningCommunity } from './pages/LearningCommunity';
import { Courses } from './pages/Courses';
import { Webinars } from './pages/Webinars';
import { Mentors } from './pages/Mentors';
import { SkillShowcase } from './pages/SkillShowcase';
import { ChatHistory } from './pages/ChatHistory';
import { WhatIsBest } from './pages/WhatIsBest';
import { Chat } from './pages/Chat';

function App() {

  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learning-hub" element={<LearningHub />} />
          <Route path="/career-compass" element={<CareerCompass />} />
          <Route path="/mock-interviews" element={<MockInterviews />} />
          <Route path="/learning-community" element={<LearningCommunity />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/skill-showcase" element={<SkillShowcase />} />
          <Route path="/chat-history" element={<ChatHistory />} />
          <Route path="/what-is-best" element={<WhatIsBest />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

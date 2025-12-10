import { Play, ThumbsUp, Send, Volume2, Maximize, Settings, Pause, Calendar, Globe, Clock, BookOpen, BarChart3, BarChart, AudioWaveform } from 'lucide-react';
import { useState, useRef } from 'react';
import sessionVideo from '../assets/videos/session.mp4';

export function LearningHub() {
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(300);
  const [showCourseDetails, setShowCourseDetails] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const sessions = [
    { id: 1, title: 'The Complete JavaScript Course 2025: From Zero to Expert!', trainer: 'Scarlett Johnson', status: 'Head of Design, Zoho', video: sessionVideo },
    { id: 2, title: 'The Complete JavaScript Course 2025: From Zero to Expert!', trainer: 'Scarlett Johnson', status: 'Head of Design, Zoho', video: sessionVideo },
    { id: 3, title: 'The Complete JavaScript Course 2025: From Zero to Expert!', trainer: 'Scarlett Johnson', status: 'Head of Design, Zoho', video: sessionVideo },
    { id: 4, title: 'The Complete JavaScript Course 2025: From Zero to Expert!', trainer: 'Scarlett Johnson', status: 'Head of Design, Zoho', video: sessionVideo },
    { id: 5, title: 'The Complete JavaScript Course 2025: From Zero to Expert!', trainer: 'Scarlett Johnson', status: 'Head of Design, Zoho', video: sessionVideo },
  ];

  const comments = [
    { id: 1, user: 'Trainer', text: 'After completing this session, you\'ll be ready to perform well in the mini test.', time: '2h ago', likes: 640, pinned: true },
    { id: 2, user: 'Amarnath', text: 'I finally understand how closures works - the lessons broke it down so well!🔥', time: '40min ago', likes: 640 },
    { id: 3, user: 'Parveen Kumar', text: 'I never thought online learning could feel this personal and motivating🔥', time: '30min ago', likes: 640 },
    { id: 4, user: 'Balaji', text: 'I took the web development class and already built my first portfolio site💕', time: '30min ago', likes: 320 },
  ];

  const sessionDetails = [
    { id: 1, title: 'Session 1 : Introduction', date: 'July 08, 2025', notes: ['Notes 1', 'Notes 2', 'Notes 3'] },
    { id: 2, title: 'Session 2 : The Scopes', date: 'July 08, 2025', notes: ['Notes 1', 'Notes 2', 'Notes 3'] },
    { id: 3, title: 'Session 3 : Primary grades', date: 'July 08, 2025', notes: ['Notes 1', 'Notes 2', 'Notes 3'] },
    { id: 4, title: 'Session 4 : Secondary grades', date: 'July 08, 2025', notes: ['Notes 1', 'Notes 2', 'Notes 3'] },
    { id: 5, title: 'Session 5 : Variables grades', date: 'July 08, 2025', status: 'Not yet started' },
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSessionClick = (sessionId: number) => {
    setSelectedSession(sessionId);
    setShowCourseDetails(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 p-8 bg-white overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">The Complete JavaScript Course 2025: From Zero to Expert!</h1>
      
      <div className="flex gap-6">
        {/* Left Container */}
        <div className="flex-1">
          {selectedSession ? (
            <div className="bg-black rounded-lg overflow-hidden mb-6">
              <div className="relative aspect-video bg-black group">
                <video
                  ref={videoRef}
                  className="w-full h-full"
                  src={sessions.find(s => s.id === selectedSession)?.video}
                  onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                />
                
                {/* Course Details Overlay */}
                {showCourseDetails && (
                  <div className="absolute inset-0 bg-gray-800/95 text-white p-8 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4">The Complete JavaScript Course 2025: From Zero to Expert!!</h2>
                    <p className="text-gray-300 mb-6">The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one!</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>Course start date & end date : 28th July, 2025 - 27th August, 2025</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4" />
                        <span>English, Tamil, 4 more languages</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>08 Sessions - Totally</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm">40% Completed</span>
                      <span className="text-sm">6 Session remaining</span>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">What you'll learn</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Foundational Concepts', 'Control Structures', 'Functions & Scope', 'Objects & Arrays', 'DOM Manipulation', 'Advanced JavaScript (Introductory)', 'Intro to APIs & JSON', 'Mini Projects & Practice'].map((topic) => (
                          <span key={topic} className="px-3 py-1.5 bg-gray-700 rounded text-sm">{topic}</span>
                        ))}
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 rounded-lg opacity-20"></div>
                      <div className="relative p-6">
                        <div className="text-6xl font-bold opacity-30">JavaScript</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-4 left-4">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setShowCourseDetails(false)}
                        className={`px-4 py-2 rounded-full text-sm transition-colors ${
                          !showCourseDetails ? 'bg-gray-700 text-white' : 'bg-white/20 text-white'
                        }`}
                      >
                        Recording Video
                      </button>
                      <button 
                        onClick={() => setShowCourseDetails(true)}
                        className={`px-4 py-2 rounded-full text-sm transition-colors ${
                          showCourseDetails ? 'bg-white text-gray-800' : 'bg-white/20 text-white'
                        }`}
                      >
                        Course Details
                      </button>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <button onClick={togglePlay} className="w-10 h-10 bg-[#00BF53] rounded-full flex items-center justify-center hover:bg-[#00a045]">
                        {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white fill-white" />}
                      </button>
                      <div className="flex-1">
                        <input
                          type="range"
                          min="0"
                          max={duration}
                          value={currentTime}
                          onChange={(e) => {
                            const time = parseFloat(e.target.value);
                            setCurrentTime(time);
                            if (videoRef.current) videoRef.current.currentTime = time;
                          }}
                          className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00BF53]"
                        />
                      </div>
                      <span className="text-white text-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>
                      <Volume2 className="w-5 h-5 text-white cursor-pointer" />
                      <Settings className="w-5 h-5 text-white cursor-pointer" />
                      <Maximize className="w-5 h-5 text-white cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          
          {(!selectedSession && showCourseDetails) && (
            <div className="bg-gray-800 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">The Complete JavaScript Course 2025: From Zero to Expert!!</h2>
            <p className="text-gray-300 mb-6">The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one!</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Course start date & end date : 28th July, 2025 - 27th August, 2025</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4" />
                <span>English, Tamil, 4 more languages</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>08 Sessions - Totally</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="text-sm">40% Completed</span>
              <span className="text-sm">6 Session remaining</span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">What you'll learn</h3>
              <div className="flex flex-wrap gap-2">
                {['Foundational Concepts', 'Control Structures', 'Functions & Scope', 'Objects & Arrays', 'DOM Manipulation', 'Advanced JavaScript (Introductory)', 'Intro to APIs & JSON', 'Mini Projects & Practice'].map((topic) => (
                  <span key={topic} className="px-3 py-1.5 bg-gray-700 rounded text-sm">{topic}</span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 rounded-lg opacity-20"></div>
              <div className="relative p-6">
                <div className="text-6xl font-bold opacity-30">JavaScript</div>
              </div>
            </div>
            </div>
          )}

          {/* Session Details & Comments */}
          <div className="mt-6 space-y-6">
            {/* Session Quiz */}
            <div className="flex gap-4 text-gray-900">
              <div className="flex-1 bg-white p-4 rounded-lg border-2 border-[#00BF53]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">➕</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Summaries with AI</h3>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-1">Session Quiz</h3>
                <p className="text-sm text-[#00BF53]">HTML5 API - Geolocation API</p>
                <p className="text-xs text-gray-600">23 marks out of 25 - 96%</p>
              </div>
              <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <img src="https://via.placeholder.com/32" alt="Trainer" className="w-8 h-8 rounded-full" />
                    <span className="font-semibold text-sm">Scarlett Johnson</span>
                  </div>
                  <p className="text-xs text-gray-600 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    Head of Design, Zoho
                  </p>
                </div>
                <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-4">
                  <button className="text-[#00BF53] font-semibold border-b-2 border-[#00BF53] pb-2">All Comments</button>
                  <button className="text-gray-600 pb-2">Conversation with Trainer</button>
                </div>
                <span className="text-gray-600">367 Comments</span>
              </div>

              <div className="flex gap-3 mb-6">
                <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full" />
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    placeholder="Add your comment..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BF53]"
                  />
                  <button className="px-4 py-2 bg-[#00BF53] text-white rounded-lg hover:bg-[#00a045]">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <img src="https://via.placeholder.com/40" alt={comment.user} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{comment.user}</span>
                        {comment.pinned && <span className="px-2 py-0.5 bg-[#00BF53] text-white text-xs rounded-full">Pinned by Trainer</span>}
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{comment.text}</p>
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#00BF53]">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="text-sm text-gray-600 hover:text-[#00BF53]">Reply</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Container */}
        <div className="w-96 space-y-4">
          <div className="flex gap-2 mb-4">
            <button className="px-4 py-2 bg-green-100 text-green-700 rounded text-sm font-medium">Completed Session</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm">Up Coming Session</button>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => handleSessionClick(session.id)}
                className={`cursor-pointer transition-all ${
                  selectedSession === session.id ? 'border-[#00BF53] bg-green-50' : 'border-gray-200 hover:border-[#00BF53]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button className="mt-1 w-8 h-8 bg-[#00BF53] rounded-full flex items-center justify-center hover:bg-[#00a045] transition-colors">
                    {selectedSession === session.id ? (
                      <AudioWaveform className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white fill-white" />
                    )}
                  </button>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-gray-900 mb-1">{session.title}</h3>
                    {/* <p className="text-xs text-gray-600">Trainer : {session.trainer}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {session.status}
                    </p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Session Details */}
          <div className="mt-6 bg-white rounded-lg p-4">
            <div className="flex gap-2 mb-4 border-b">
              <button className="px-4 py-2 text-[#00BF53] border-b-2 border-[#00BF53] font-medium">Notes</button>
              <button className="px-4 py-2 text-gray-600">Webinar</button>
              <button className="px-4 py-2 text-gray-600">Mentor Connect</button>
            </div>
            <h3 className="font-bold text-gray-900 mb-4">The Complete JavaScript Course 2025: From Zero to Expert!</h3>
            <div className="space-y-4">
              {sessionDetails.map((detail) => (
                <div key={detail.id} className="border-l-2 border-gray-200 pl-4">
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">{detail.title}</h4>
                  <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {detail.date}
                  </p>
                  {detail.notes ? (
                    <div className="flex gap-2">
                      {detail.notes.map((note, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded">{note}</span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">{detail.status}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

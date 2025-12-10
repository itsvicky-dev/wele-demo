import { Play, Pause, Volume2, Settings, Maximize, Info } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface VideoPlayerProps {
  videoSrc: string;
  onCourseDetailsClick: () => void;
}

export function VideoPlayer({ videoSrc, onCourseDetailsClick }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(300);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative flex-1 bg-black group"
         onMouseEnter={() => setShowControls(true)}
         onMouseLeave={() => setShowControls(false)}>
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        src={videoSrc}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />
      
      {/* Video Controls Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Top Controls */}
        <div className="absolute top-4 right-4">
          <button 
            onClick={onCourseDetailsClick}
            className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-colors"
          >
            <Info className="w-4 h-4" />
            Course Details
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={togglePlay} 
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
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
                className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>
            <span className="text-white text-sm font-medium">{formatTime(currentTime)} / {formatTime(duration)}</span>
            <Volume2 className="w-5 h-5 text-white cursor-pointer hover:text-gray-300" />
            <Settings className="w-5 h-5 text-white cursor-pointer hover:text-gray-300" />
            <Maximize className="w-5 h-5 text-white cursor-pointer hover:text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
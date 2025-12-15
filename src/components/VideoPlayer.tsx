import { Play, Pause, Volume2, VolumeX, Settings, Maximize, Minimize, Info } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface VideoPlayerProps {
  videoSrc: string;
  onCourseDetailsClick: () => void;
  isMiniPlayer?: boolean;
}

export function VideoPlayer({ videoSrc, onCourseDetailsClick, isMiniPlayer = false }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState('Auto');
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

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

  const handleVideoClick = () => {
    togglePlay();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleFullscreen = () => {
    if (isMiniPlayer) {
      // In mini player, make the video element fullscreen
      if (!document.fullscreenElement && videoRef.current) {
        videoRef.current.requestFullscreen();
      } else if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    } else {
      // In main player, make the container fullscreen
      if (!document.fullscreenElement && containerRef.current) {
        containerRef.current.requestFullscreen();
      } else if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    setShowSettings(false);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      ref={containerRef}
      className="relative flex-1 bg-black group cursor-pointer rounded-[10px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => !showSettings && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className={`w-full h-full object-contain rounded-[10px] ${!isFullscreen ? 'max-h-[455px]' : ''}`}
        src={videoSrc}
        onClick={handleVideoClick}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {/* Video Controls Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 transition-opacity duration-300 rounded-[10px] ${
        showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Top Controls */}
        {/* <div className="absolute top-4 right-4">
          <button 
            onClick={onCourseDetailsClick}
            className="flex items-center gap-2 px-3 py-2 bg-black/40 hover:bg-[#00BF53]/80 rounded-lg text-white text-sm transition-colors backdrop-blur-sm"
          >
            <Info className="w-4 h-4" />
            Course Details
          </button>
        </div> */}

        {/* Center Play Button (when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              onClick={togglePlay}
              className="w-20 h-20 bg-[#00BF53]/90 hover:bg-[#00BF53] rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
            >
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </button>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="relative w-full h-1 bg-white/30 rounded-full cursor-pointer group/progress"
                 onClick={(e) => {
                   const rect = e.currentTarget.getBoundingClientRect();
                   const percent = (e.clientX - rect.left) / rect.width;
                   const time = percent * duration;
                   setCurrentTime(time);
                   if (videoRef.current) videoRef.current.currentTime = time;
                 }}>
              <div 
                className="absolute top-0 left-0 h-full bg-[#00BF53] rounded-full transition-all duration-150"
                style={{ width: `${progressPercentage}%` }}
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#00BF53] rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"
                style={{ left: `${progressPercentage}%`, transform: 'translateX(-50%) translateY(-50%)' }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={togglePlay} 
              className="w-10 h-10 bg-white/20 hover:bg-[#00BF53]/80 rounded-full flex items-center justify-center transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white fill-white" />}
            </button>
            
            {/* Volume Controls */}
            <div className="flex items-center gap-2 group/volume">
              <button onClick={toggleMute} className="text-white hover:text-[#00BF53] transition-colors">
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <div className="w-0 group-hover/volume:w-20 overflow-hidden transition-all duration-200">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00BF53] [&::-webkit-slider-track]:bg-white/30 [&::-webkit-slider-track]:rounded-lg"
                />
              </div>
            </div>

            <span className="text-white text-sm font-medium">{formatTime(currentTime)} / {formatTime(duration)}</span>
            
            <div className="flex-1" />
            
            {/* Settings */}
            <div className="relative">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  showSettings ? 'bg-[#00BF53] text-white' : 'text-white hover:text-[#00BF53]'
                }`}
              >
                <Settings className="w-5 h-5" />
              </button>
              
              {showSettings && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-3 min-w-48 backdrop-blur-sm">
                  <div className="text-white text-sm font-medium mb-2">Playback Speed</div>
                  <div className="space-y-1">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => handlePlaybackRateChange(rate)}
                        className={`w-full text-left px-2 py-1 text-sm rounded transition-colors ${
                          playbackRate === rate ? 'bg-[#00BF53] text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                  <div className="text-white text-sm font-medium mb-2 mt-3">Quality</div>
                  <div className="space-y-1">
                    {['Auto', '1080p', '720p', '480p'].map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuality(q)}
                        className={`w-full text-left px-2 py-1 text-sm rounded transition-colors ${
                          quality === q ? 'bg-[#00BF53] text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={toggleFullscreen}
              className="text-white hover:text-[#00BF53] transition-colors"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
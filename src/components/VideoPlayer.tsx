import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  Minimize,
  Info,
  MessageSquare,
  Mic,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Chapter {
  id: number;
  title: string;
  startTime: number;
  duration: number;
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  src: string;
}

interface VideoPlayerProps {
  videoSrc: string;
  onCourseDetailsClick: () => void;
  isMiniPlayer?: boolean;
  sharedVideoState?: {
    currentTime: number;
    isPlaying: boolean;
    duration: number;
  };
  onVideoStateChange?: (state: {
    currentTime: number;
    isPlaying: boolean;
    duration: number;
  }) => void;
  chapters?: Chapter[];
  courseName?: string;
  sessionName?: string;
  onAIRequest?: (
    type: "summarize" | "voice-summarize",
    chapterTitle: string
  ) => void;
  videos?: Video[];
  currentVideoIndex?: number;
  onVideoChange?: (index: number) => void;
}

export function VideoPlayer({
  videoSrc,
  onCourseDetailsClick,
  isMiniPlayer = false,
  sharedVideoState,
  onVideoStateChange,
  chapters = [],
  courseName,
  sessionName,
  onAIRequest,
  videos = [],
  currentVideoIndex = 0,
  onVideoChange,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(
    sharedVideoState?.isPlaying || false
  );
  const [currentTime, setCurrentTime] = useState(
    sharedVideoState?.currentTime || 0
  );
  const [duration, setDuration] = useState(sharedVideoState?.duration || 0);
  const [showControls, setShowControls] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState("Auto");
  const [hoveredChapter, setHoveredChapter] = useState<Chapter | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [hoveredNavButton, setHoveredNavButton] = useState<
    "prev" | "next" | null
  >(null);
  const [navHoverPosition, setNavHoverPosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Sync with shared video state
  useEffect(() => {
    if (sharedVideoState && videoRef.current) {
      const video = videoRef.current;

      // Sync current time if different
      if (Math.abs(video.currentTime - sharedVideoState.currentTime) > 1) {
        video.currentTime = sharedVideoState.currentTime;
      }

      // Sync play/pause state
      if (sharedVideoState.isPlaying !== isPlaying) {
        if (sharedVideoState.isPlaying) {
          video.play();
        } else {
          video.pause();
        }
        setIsPlaying(sharedVideoState.isPlaying);
      }

      setCurrentTime(sharedVideoState.currentTime);
      setDuration(sharedVideoState.duration);
    }
  }, [sharedVideoState]);

  const togglePlay = () => {
    if (videoRef.current) {
      const newPlayingState = !isPlaying;
      if (newPlayingState) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsPlaying(newPlayingState);
      onVideoStateChange?.({
        currentTime,
        isPlaying: newPlayingState,
        duration,
      });
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
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getChapterMarkers = () => {
    if (!chapters.length || isMiniPlayer || duration === 0) return [];
    return chapters.map((chapter) => ({
      ...chapter,
      startPosition: (chapter.startTime / duration) * 100,
      width: (chapter.duration / duration) * 100,
    }));
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressHover = (e: React.MouseEvent) => {
    if (!chapters.length || isMiniPlayer) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = percent * duration;

    const chapter = chapters.find(
      (ch) => time >= ch.startTime && time <= ch.startTime + ch.duration
    );
    if (chapter) {
      setHoveredChapter(chapter);
      setHoverPosition({ x: e.clientX, y: e.clientY });
    } else {
      setHoveredChapter(null);
    }
  };

  const handleProgressLeave = () => {
    setHoveredChapter(null);
  };

  const jumpToChapter = (startTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
      setCurrentTime(startTime);
      onVideoStateChange?.({ currentTime: startTime, isPlaying, duration });
    }
  };

  const handlePrevVideo = () => {
    if (currentVideoIndex > 0) {
      onVideoChange?.(currentVideoIndex - 1);
    }
  };

  const handleNextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      onVideoChange?.(currentVideoIndex + 1);
    }
  };

  const handleNavButtonHover = (type: "prev" | "next", e: React.MouseEvent) => {
    setHoveredNavButton(type);
    const rect = e.currentTarget.getBoundingClientRect();
    setNavHoverPosition({ x: rect.left + rect.width / 2, y: rect.top });
  };

  const getNavVideo = (type: "prev" | "next") => {
    const index =
      type === "prev" ? currentVideoIndex - 1 : currentVideoIndex + 1;
    return videos[index];
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-1 bg-black group cursor-pointer rounded-[10px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => !showSettings && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className={`w-full h-full object-contain rounded-[10px] ${
          !isFullscreen ? "max-h-[455px]" : ""
        }`}
        src={videoSrc}
        onClick={handleVideoClick}
        onTimeUpdate={(e) => {
          const newTime = e.currentTarget.currentTime;
          setCurrentTime(newTime);
          onVideoStateChange?.({ currentTime: newTime, isPlaying, duration });
        }}
        onLoadedMetadata={(e) => {
          const newDuration = e.currentTarget.duration;
          setDuration(newDuration);
          onVideoStateChange?.({
            currentTime,
            isPlaying,
            duration: newDuration,
          });
        }}
        onPlay={() => {
          setIsPlaying(true);
          onVideoStateChange?.({ currentTime, isPlaying: true, duration });
        }}
        onPause={() => {
          setIsPlaying(false);
          onVideoStateChange?.({ currentTime, isPlaying: false, duration });
        }}
        controlsList={isFullscreen ? "nodownload" : undefined}
        onContextMenu={isFullscreen ? (e) => e.preventDefault() : undefined}
      />

      {/* Video Controls Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 transition-opacity duration-300 rounded-[10px] ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
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
            <div
              className="relative w-full h-1 cursor-pointer group/progress"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                const time = percent * duration;
                setCurrentTime(time);
                if (videoRef.current) videoRef.current.currentTime = time;
                onVideoStateChange?.({
                  currentTime: time,
                  isPlaying,
                  duration,
                });
              }}
              onMouseMove={handleProgressHover}
              onMouseLeave={handleProgressLeave}
            >
              {/* Chapter segments */}
              {!isMiniPlayer && chapters.length > 0 ? (
                getChapterMarkers().map((marker, index) => {
                  const isWatched = currentTime > marker.startTime;
                  const isCurrentChapter =
                    currentTime >= marker.startTime &&
                    currentTime <= marker.startTime + marker.duration;
                  const watchedWidth = isCurrentChapter
                    ? ((currentTime - marker.startTime) / marker.duration) * 100
                    : isWatched
                    ? 100
                    : 0;

                  return (
                    <div key={marker.id}>
                      {/* Chapter segment background */}
                      <div
                        className="absolute top-0 h-full bg-white/30 hover:bg-white/40 transition-colors cursor-pointer"
                        style={{
                          left: `${marker.startPosition}%`,
                          width: `${marker.width}%`,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          jumpToChapter(marker.startTime);
                        }}
                      />
                      {/* Watched portion of chapter */}
                      <div
                        className="absolute top-0 h-full bg-[#00BF53] transition-all duration-150"
                        style={{
                          left: `${marker.startPosition}%`,
                          width: `${(marker.width * watchedWidth) / 100}%`,
                        }}
                      />
                      {/* Chapter boundary */}
                      {index < chapters.length - 1 && (
                        <div
                          className="absolute top-0 w-0.5 h-full bg-black/60 z-10"
                          style={{
                            left: `${marker.startPosition + marker.width}%`,
                          }}
                        />
                      )}
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="absolute top-0 left-0 w-full h-full bg-white/30 rounded-full" />
                  <div
                    className="absolute top-0 left-0 h-full bg-[#00BF53] rounded-full transition-all duration-150"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </>
              )}

              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#00BF53] rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity z-30"
                style={{
                  left: `${progressPercentage}%`,
                  transform: "translateX(-50%) translateY(-50%)",
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-10 h-10 bg-white/20 hover:bg-[#00BF53]/80 rounded-full flex items-center justify-center transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white fill-white" />
              )}
            </button>
            {/* Previous Video Button */}
            {videos.length > 1 && currentVideoIndex > 0 && (
              <button
                onClick={handlePrevVideo}
                onMouseEnter={(e) => handleNavButtonHover("prev", e)}
                onMouseLeave={() => setHoveredNavButton(null)}
                className="w-8 h-8 bg-white/20 hover:bg-[#00BF53]/80 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
            )}
            {/* Next Video Button */}
            {videos.length > 1 && currentVideoIndex < videos.length - 1 && (
              <button
                onClick={handleNextVideo}
                onMouseEnter={(e) => handleNavButtonHover("next", e)}
                onMouseLeave={() => setHoveredNavButton(null)}
                className="w-8 h-8 bg-white/20 hover:bg-[#00BF53]/80 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            )}

            {/* Volume Controls - Hidden in mini player */}
            {!isMiniPlayer && (
              <div className="flex items-center gap-2 group/volume">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-[#00BF53] transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
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
            )}

            <span className="text-white text-sm font-medium">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className="flex-1" />

            {/* Settings - Hidden in mini player */}
            {!isMiniPlayer && (
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    showSettings
                      ? "bg-[#00BF53] text-white"
                      : "text-white hover:text-[#00BF53]"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                </button>

                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-3 min-w-48 backdrop-blur-sm">
                    <div className="text-white text-sm font-medium mb-2">
                      Playback Speed
                    </div>
                    <div className="space-y-1">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => handlePlaybackRateChange(rate)}
                          className={`w-full text-left px-2 py-1 text-sm rounded transition-colors ${
                            playbackRate === rate
                              ? "bg-[#00BF53] text-white"
                              : "text-gray-300 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                    <div className="text-white text-sm font-medium mb-2 mt-3">
                      Quality
                    </div>
                    <div className="space-y-1">
                      {["Auto", "1080p", "720p", "480p"].map((q) => (
                        <button
                          key={q}
                          onClick={() => setQuality(q)}
                          className={`w-full text-left px-2 py-1 text-sm rounded transition-colors ${
                            quality === q
                              ? "bg-[#00BF53] text-white"
                              : "text-gray-300 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-[#00BF53] transition-colors"
            >
              {isFullscreen ? (
                <Minimize className="w-5 h-5" />
              ) : (
                <Maximize className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Chapter Hover Tooltip */}
      {hoveredChapter && !isMiniPlayer && (
        <div
          className="fixed z-50 bg-black/90 text-white p-3 rounded-lg shadow-lg max-w-xs backdrop-blur-sm"
          style={{
            left: Math.max(
              10,
              Math.min(window.innerWidth - 250, hoverPosition.x - 125)
            ),
            top: hoverPosition.y - 106,
          }}
          onMouseEnter={() => setHoveredChapter(hoveredChapter)}
          onMouseLeave={() => setHoveredChapter(null)}
        >
          <h4 className="font-medium text-sm mb-2">{hoveredChapter.title}</h4>
          <div className="text-xs text-gray-300 mb-3">
            {formatTime(hoveredChapter.startTime)} -{" "}
            {formatTime(hoveredChapter.startTime + hoveredChapter.duration)}
          </div>
          <div className="flex gap-2">
            <button
              className="px-2 py-1 border border-[#00BF53] text-white hover:text-[#00BF53] text-xs rounded transition-colors"
              onClick={() => onAIRequest?.("summarize", hoveredChapter.title)}
            >
              Summarize
            </button>
            <button
              className="px-2 py-1 border border-[#00BF53] text-white hover:text-[#00BF53] text-xs rounded transition-colors"
              onClick={() =>
                onAIRequest?.("voice-summarize", hoveredChapter.title)
              }
            >
              Voice Summary
            </button>
          </div>
        </div>
      )}

      {/* Video Navigation Hover Popup */}
      {hoveredNavButton &&
        !isMiniPlayer &&
        (() => {
          const navVideo = getNavVideo(hoveredNavButton);
          if (!navVideo) return null;

          return (
            <div
              className="fixed z-50 bg-black/90 text-white p-3 rounded-lg shadow-lg backdrop-blur-sm"
              style={{
                left: Math.max(
                  10,
                  Math.min(window.innerWidth - 200, navHoverPosition.x - 100)
                ),
                top: navHoverPosition.y - 120,
              }}
            >
              <div className="flex items-center gap-3 min-w-[180px]">
                <img
                  src={navVideo.thumbnail}
                  alt={navVideo.title}
                  className="w-16 h-12 object-cover rounded bg-gray-700"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-400 mb-1">
                    {hoveredNavButton === "prev" ? "Previous" : "Next"}
                  </div>
                  <div className="text-sm font-medium truncate">
                    {navVideo.title}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
}

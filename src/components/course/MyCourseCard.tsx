import { Clock, Users, BookOpen, Play } from "lucide-react";
import courseBgImage from "../../assets/images/course-bg.png";

interface CourseCardProps {
  type: string;
  title: string;
  price: number;
  sessions: number;
  progress: number;
  currentSession: string;
  icon: React.ReactNode;
  bgColor: string;
  showBadges?: boolean;
  onCourseClick?: () => void;
  onJoinSession?: () => void;
}

export function MyCourseCard({
  type,
  title,
  price,
  sessions,
  progress,
  currentSession,
  icon,
  bgColor,
  showBadges = true,
  onCourseClick,
  onJoinSession,
}: CourseCardProps) {
  return (
    <div
      className="bg-white rounded-[30px] overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
      onClick={(e) => {
        e.stopPropagation();
        onCourseClick?.();
      }}
    >
      <div
        className="p-6 relative"
        style={{
          backgroundImage: `url(${courseBgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-xs font-medium text-gray-700 mb-4">{type}</div>
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-1 text-xs text-gray-600 mb-4">
          <BookOpen className="w-4 h-4" />
          <span>{sessions} Sessions</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">Progress</span>
            <span className="text-xs font-medium text-gray-900">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#00BF56] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Current Session */}
        <div className="mb-4">
          <p className="text-xs text-gray-600 mb-1">Current Session:</p>
          <p className="text-sm font-medium text-gray-900">{currentSession}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCourseClick?.();
            }}
            className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            View Course
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onJoinSession?.();
            }}
            className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-gray-800 border border-gray-300 rounded-lg transition-colors"
          >
            <Play className="w-3 h-3" />
            Join Session
          </button>
        </div>
      </div>
    </div>
  );
}

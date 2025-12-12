import { Clock, Users, BookOpen } from 'lucide-react';
import courseBgImage from '../assets/images/course-bg.png';

interface CourseCardProps {
  type: string;
  title: string;
  description: string;
  price: number;
  sessions: number;
  enrolledMembers: number;
  icon: React.ReactNode;
  bgColor: string;
  showBadges?: boolean;
}

export function CourseCard({
  type,
  title,
  description,
  price,
  sessions,
  enrolledMembers,
  icon,
  bgColor,
  showBadges = true,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
      <div className="p-6 relative" style={{ backgroundImage: `url(${courseBgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="text-xs font-medium text-gray-700 mb-4">{type}</div>
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>
      </div>

      <div className="p-6">
        <h4 className="font-bold text-gray-900 mb-2 text-sm">{description}</h4>
        <p className="text-xs text-gray-600 mb-4">
          Build 5 Real-World Projects, Master the Full PHP Ecosystem and Go from Beginner to a Hired Full-Stack Developer
        </p>

        <div className="flex w-full items-center justify-between mb-4">
          <div className="flex items-center w-full justify-between gap-4">
            <div className="text-xl font-bold text-gray-900">₹ {price}</div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <BookOpen className="w-4 h-4" />
              <span>{sessions} Sessions</span>
            </div>
          </div>
        </div>

        {showBadges && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
              Popular Choices
            </span>
            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Industry Best
            </span>
            <span className="text-xs text-gray-600 flex items-center gap-1">
              <Users className="w-3 h-3" />
              Enrolled Members
            </span>
            <span className="text-xs font-bold text-gray-900">{enrolledMembers}</span>
          </div>
        )}

        <button className="w-full py-2.5 border-2 border-green-600 text-green-600 font-medium rounded-md hover:bg-green-50 transition-colors text-sm">
          Enroll Now
        </button>
      </div>
    </div>
  );
}

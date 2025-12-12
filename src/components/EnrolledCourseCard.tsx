import { Calendar, User, MapPin, CheckCircle2 } from 'lucide-react';

interface EnrolledCourseCardProps {
  type: string;
  icon: React.ReactNode;
  title: string;
  courseName: string;
  price: number;
  duration: string;
  progress: number;
  nextSession: string;
  nextTopic: string;
  sessionDate: string;
  trainer: string;
  tags: string[];
  buttonText: string;
  buttonType?: 'primary' | 'secondary';
  status?: string;
}

export function EnrolledCourseCard({
  type,
  icon,
  title,
  courseName,
  price,
  duration,
  progress,
  nextSession,
  nextTopic,
  sessionDate,
  trainer,
  tags,
  buttonText,
  buttonType = 'secondary',
  status,
}: EnrolledCourseCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 flex-shrink-0 w-[280px] relative">
      <div className="p-4 relative" style={{ backgroundImage: 'url(/src/assets/images/course-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="text-xs font-medium text-gray-700 mb-3">{type}</div>
        <div className="flex items-center gap-3 mb-3">
          {icon}
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
        </div>
        {status && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-white text-[#00BF53] text-xs font-medium rounded shadow-lg">
            {status}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between">
        <h4 className="font-bold text-gray-900 mb-2 text-xs">{courseName}</h4>

        <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
          <div className="font-bold text-gray-900">₹ {price}</div>
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>{duration}</span>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-600">{progress}% Completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-green-600 h-1.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-3">
          <div className="text-xs text-gray-600 mb-1">
            <span className="font-medium">{nextSession}:</span> {nextTopic}
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1 text-green-600">
              <Calendar className="w-3 h-3" />
              <span>{sessionDate}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <span className="font-medium">Trainer:</span>
              <User className="w-3 h-3" />
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-3 flex-wrap">
          {tags.map((tag, index) => (
            <div key={index} className="flex items-center gap-1 text-xs">
              {tag.includes('Must') && <span className="text-green-600 font-medium">{tag}</span>}
              {tag.includes('Value') && (
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="w-3 h-3" />
                  {tag}
                </span>
              )}
            </div>
          ))}
        </div>

        <button
          className={`w-full py-2 font-medium rounded-md transition-colors text-xs ${
            buttonType === 'primary'
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'border-2 border-green-600 text-green-600 hover:bg-green-50'
          }`}
        >
          {buttonText}
        </button>
      </div>

    </div>
  );
}

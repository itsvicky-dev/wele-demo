import { Calendar, Play, Video } from "lucide-react";

interface ActionCardProps {
  type: "current" | "past" | "future";
  title: string;
  date: string;
  time: string;
  onAction: () => void;
}

export function ActionCard({
  type,
  title,
  date,
  time,
  onAction,
}: ActionCardProps) {
  const getButtonText = () => {
    switch (type) {
      case "current":
        return "Join Now";
      case "past":
        return "Recording";
      case "future":
        return "Reminder";
    }
  };

  return (
    <div className={`rounded-2xl flex items-end justify-between gap-x-2`}>
      <div className="">
        <div className="flex flex-col text-left mb-2">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <div className="flex">
            
          </div>
          <span className="text-xs">Trainer: John Doe</span>
          <span className="text-xs font-medium">
            {type == "current" && "Started: 5 mins ago"}
            {type == "past" && "Duration: 1h 12m"}
            {type == "future" && "Scheduled: Tomorrow • 7:00 PM"}
          </span>
        </div>
        <div className="">
          <p className="text-xs text-gray-600 mb-1">
            This session directly supports your current backend learning goal.
            Join now to stay in flow
          </p>
        </div>
      </div>
      <div>
        <button
          onClick={onAction}
          className={`w-full w-[6rem] px-4 py-2 rounded-lg text-xs font-medium transition-colors border border-gray-300 text-gray-600 hover:text-[#00BF56] hover:border-[#00BF56]`}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}

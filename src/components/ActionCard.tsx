import { Calendar, Clock, Play, User, User2, Video } from "lucide-react";

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
        return "Join Session";
      case "past":
        return "Recording";
      case "future":
        return "Reminder";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "current":
        return <Play className="w-4 h-4" />;
      case "past":
        return <Video className="w-4 h-4" />;
      case "future":
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getTimeText = () => {
    switch (type) {
      case "current":
        return "Started: 5 mins ago";
      case "past":
        return "Duration: 1h 12m";
      case "future":
        return "Scheduled: Tomorrow • 7:00 PM";
    }
  };

  const getContentText = () => {
    switch (type) {
      case "current":
        return "You’re right on time. This session is live and matches what you’re learning this week. Jump in now and stay in the flow.";
      case "past":
        return "Looks like you stepped out mid-way. No worries. Watch the recording, take the quick wrap-up quiz, and you’ll be fully ready 🔥";
      case "future":
        return "Reminder";
    }
  };

  const getTrainer = () => {
    switch (type) {
      case "current":
        return "Sara";
      case "past":
        return "Anna";
      case "future":
        return "Reminder";
    }
  };

  const getTrainerProfile = () => {
    switch (type) {
      case "current":
        return "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=100&q=80";
      case "past":
        return "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=100&q=80";
      case "future":
    }
  };

  return (
    <div className={`rounded-2xl flex items-end justify-between gap-x-2`}>
      <div className="">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="flex items-center gap-x-1 mt-1 mb-4">
          {/* <img
              src={getTrainerProfile()}
              alt=""
              className="h-7 w-7 rounded-full object-cover"
            /> */}
          <span className="text-xs flex items-center mr-2">
            <User2 className="w-3 h-3 inline-block text-gray-500 mr-1" />
            {getTrainer()}
          </span>
          <span className="text-xs flex items-center">
            <Clock className="w-3 h-3 inline-block text-gray-500 mr-1" />
            {getTimeText()}
            </span>
        </div>
        <div className="flex justify-between gap-x-2">
          <p className="text-xs text-gray-600 mb-1">{getContentText()}</p>
          <div>
            <button
              onClick={onAction}
              className={`w-full whitespace-nowrap w-[6rem] px-4 py-2 rounded-lg text-xs font-medium transition-colors border text-[#00BF56] border-[#00BF56] hover:text-white hover:bg-[#00BF56]`}
            >
              {getButtonText()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

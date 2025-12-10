import { ArrowUpRight } from "lucide-react";

interface Suggestion {
  id: string;
  text: string;
}

interface SuggestionListProps {
  suggestions: Suggestion[];
  onSuggestionClick: (suggestion: string) => void;
  className?: string;
}

export function SuggestionList({
  suggestions,
  onSuggestionClick,
  className = "",
}: SuggestionListProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className={`mb-4 ${className}`}>
      {/* <h3 className="text-sm font-medium text-gray-900 mb-3">Related</h3> */}
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => onSuggestionClick(suggestion.text)}
            className="px-3 py-1.5 bg-gray-100 hover:bg-[#00BF53] text-gray-700 hover:text-white rounded-full text-sm transition-colors duration-200 flex items-center gap-1"
          >
            <span>{suggestion.text}</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        ))}
      </div>
    </div>
  );
}
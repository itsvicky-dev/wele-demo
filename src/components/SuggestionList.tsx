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
      <h3 className="text-sm font-medium text-gray-900 mb-3">Related</h3>
      <div className="space-y-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => onSuggestionClick(suggestion.text)}
            className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group flex items-start gap-2"
          >
            <ArrowUpRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">
              {suggestion.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
import { useState } from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

interface MCQOption {
  text: string;
  value: string;
  points?: number;
}

interface MCQQuestion {
  id: number;
  question: string;
  options: MCQOption[];
}

interface MCQAssessmentProps {
  title: string;
  description?: string;
  questions: MCQQuestion[];
  onComplete: (answers: Record<number, string>) => void;
}

export function MCQAssessment({ title, description, questions, onComplete }: MCQAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = { ...answers, [questions[currentQuestion].id]: selectedOption };
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(answers[questions[currentQuestion + 1].id] || null);
      } else {
        onComplete(newAnswers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[questions[currentQuestion - 1].id] || null);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-medium text-gray-900 mb-2">{title}</h2>
        {description && <p className="text-gray-600 text-sm">{description}</p>}
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h3 className="text-lg text-gray-900 mb-6 leading-relaxed">{question.question}</h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option.value)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                selectedOption === option.value
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-800">{option.text}</span>
                {selectedOption === option.value && (
                  <CheckCircle2 size={20} className="text-black flex-shrink-0 ml-2" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className="flex items-center space-x-2 px-5 py-2.5 bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200"
        >
          <span>{currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

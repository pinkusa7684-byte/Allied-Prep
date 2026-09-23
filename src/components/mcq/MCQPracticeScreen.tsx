import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Flag,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Grid,
  Check,
  Sparkles,
  ArrowRight,
  Share2,
} from 'lucide-react';
import { MCQQuestion } from '../../types';
import { ReportQuestionModal } from './ReportQuestionModal';

interface MCQPracticeScreenProps {
  questions: MCQQuestion[];
  subjectTitle: string;
  topicTitle: string;
  onExit: () => void;
  onRecordAnswer: (questionId: string, selectedOption: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => void;
  bookmarkedQuestionIds: string[];
  onToggleBookmark: (questionId: string) => void;
}

export const MCQPracticeScreen: React.FC<MCQPracticeScreenProps> = ({
  questions,
  subjectTitle,
  topicTitle,
  onExit,
  onRecordAnswer,
  bookmarkedQuestionIds,
  onToggleBookmark,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [showPalette, setShowPalette] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  // Timer counter
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-4">
        <h3 className="text-base font-bold text-slate-800">No questions available</h3>
        <p className="text-xs text-slate-500">There are no questions loaded for this topic yet.</p>
        <button
          onClick={onExit}
          className="px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-semibold"
        >
          Return to Topics
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const selectedOption = selectedAnswers[currentIndex];
  const isAnswered = selectedOption !== undefined;
  const isCorrect = isAnswered && selectedOption === currentQ.correctAnswer;
  const isBookmarked = bookmarkedQuestionIds.includes(currentQ.id);

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optId: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered) return; // Prevent changing once answered according to spec

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optId,
    }));

    const correct = optId === currentQ.correctAnswer;
    onRecordAnswer(currentQ.id, optId, correct);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto pb-24 animate-fadeIn">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-900 transition-colors py-1 px-2 rounded-lg hover:bg-slate-100"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Topics</span>
          </button>

          <div className="text-center">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-heading">
              {subjectTitle} – {topicTitle}
            </h3>
            <span className="text-[11px] font-semibold text-blue-900">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Timer toggle */}
            <button
              onClick={() => setTimerActive(!timerActive)}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition-colors"
              title={timerActive ? 'Pause Timer' : 'Resume Timer'}
            >
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{formatTime(elapsedSeconds)}</span>
            </button>

            {/* Question Grid / Palette */}
            <button
              onClick={() => setShowPalette(!showPalette)}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-colors"
              title="Question Palette"
            >
              <Grid className="w-4 h-4" />
            </button>

            {/* Report Question */}
            <button
              onClick={() => setShowReportModal(true)}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-rose-600 transition-colors"
              title="Report Issue"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-blue-900 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium px-0.5">
            <span>Progress: {progressPercent}%</span>
            <span>
              {Object.keys(selectedAnswers).length}/{questions.length} Answered
            </span>
          </div>
        </div>
      </div>

      {/* Question Palette Drawer (Collapsible) */}
      {showPalette && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Question Navigator
            </h4>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Correct
              </span>
              <span className="flex items-center gap-1 text-rose-700">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Wrong
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <span className="w-2 h-2 rounded-full bg-slate-300" /> Unattempted
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((q, idx) => {
              const ans = selectedAnswers[idx];
              const isCurrent = idx === currentIndex;
              let btnClass = 'bg-slate-100 text-slate-700 border-slate-200';

              if (ans !== undefined) {
                if (ans === q.correctAnswer) {
                  btnClass = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                } else {
                  btnClass = 'bg-rose-500 text-white border-rose-600 font-bold';
                }
              }

              if (isCurrent) {
                btnClass += ' ring-2 ring-blue-900 ring-offset-1';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowPalette(false);
                  }}
                  className={`h-9 rounded-xl border text-xs font-medium transition-all ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Question Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-5">
        <div className="flex items-start justify-between gap-3">
          <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200">
            Q{currentIndex + 1}
          </span>
          {currentQ.difficulty && (
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                currentQ.difficulty === 'Easy'
                  ? 'bg-emerald-50 text-emerald-800'
                  : currentQ.difficulty === 'Medium'
                  ? 'bg-amber-50 text-amber-800'
                  : 'bg-rose-50 text-rose-800'
              }`}
            >
              {currentQ.difficulty}
            </span>
          )}
        </div>

        {/* Question Text */}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
          {currentQ.question}
        </h2>

        {/* 4 Options Grid */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((opt) => {
            const isThisSelected = selectedOption === opt.id;
            const isThisCorrect = opt.id === currentQ.correctAnswer;

            let cardStyles = 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/90 hover:border-slate-300 text-slate-800';
            let badgeStyles = 'bg-white border-slate-300 text-slate-700';

            if (isAnswered) {
              if (isThisCorrect) {
                // Correct answer always highlighted with green border & background
                cardStyles = 'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500/30';
                badgeStyles = 'bg-emerald-600 text-white border-emerald-600';
              } else if (isThisSelected && !isThisCorrect) {
                // User picked wrong option -> red border & light red background
                cardStyles = 'bg-rose-50/90 border-rose-500 text-rose-950 font-semibold ring-1 ring-rose-500/30';
                badgeStyles = 'bg-rose-600 text-white border-rose-600';
              } else {
                cardStyles = 'bg-white/50 border-slate-100 text-slate-400 opacity-60';
                badgeStyles = 'bg-slate-100 border-slate-200 text-slate-400';
              }
            }

            return (
              <button
                key={opt.id}
                id={`practice-opt-${opt.id}`}
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${cardStyles}`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-lg border text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${badgeStyles}`}
                  >
                    {opt.id}
                  </div>
                  <span className="text-xs sm:text-sm">{opt.text}</span>
                </div>

                {isAnswered && (
                  <div className="shrink-0">
                    {isThisCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    {isThisSelected && !isThisCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Answer Feedback & Clinical Explanation Banner */}
        {isAnswered && (
          <div
            className={`rounded-xl p-4 sm:p-5 border transition-all space-y-3 animate-fadeIn ${
              isCorrect
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                : 'bg-rose-50/80 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <span className="text-base">✅</span>
                    <span className="text-sm font-bold text-emerald-900 font-heading">
                      Correct Answer!
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-base">❌</span>
                    <span className="text-sm font-bold text-rose-900 font-heading">
                      Incorrect
                    </span>
                  </>
                )}
              </div>

              <span className="text-xs font-bold text-slate-800 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
                Correct Answer: {currentQ.correctAnswer}. {currentQ.options.find((o) => o.id === currentQ.correctAnswer)?.text}
              </span>
            </div>

            {/* Explanation */}
            {currentQ.explanation && (
              <div className="text-xs text-slate-800 bg-white/90 rounded-lg p-3 border border-slate-200/70 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-[11px] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-blue-900" />
                  <span>Clinical Rationale & Explanation:</span>
                </div>
                <p className="leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}

            {/* Direct Next button inside feedback card according to prompt */}
            <div className="flex justify-end pt-1">
              <button
                id="feedback-next-question-btn"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition-all"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-sm flex items-center justify-between gap-3">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
              : 'border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {!isAnswered ? (
          <button
            onClick={handleSkip}
            className="px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Skip Question
          </button>
        ) : (
          <span className="text-xs text-slate-400 font-medium">Answer Recorded</span>
        )}

        <button
          onClick={handleNext}
          disabled={currentIndex === questions.length - 1}
          className={`inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            currentIndex === questions.length - 1
              ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500'
              : 'bg-blue-900 hover:bg-blue-800 text-white shadow-sm'
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Report Question Modal */}
      <ReportQuestionModal
        question={currentQ}
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSubmitReport={(reason, details) => {
          console.log(`Question ${currentQ.id} reported for ${reason}: ${details}`);
        }}
      />
    </div>
  );
};

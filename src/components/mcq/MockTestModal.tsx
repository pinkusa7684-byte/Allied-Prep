import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Home,
  Check,
  Flag,
  Bookmark,
  Zap,
  Award,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { MCQQuestion, MockTestResultData } from '../../types';
import { CircularProgress } from '../common/CircularProgress';

interface MockTestModalProps {
  allQuestions: MCQQuestion[];
  initialCount?: number;
  initialScope?: 'random' | 'topic' | 'semester' | 'full';
  initialTopicId?: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveResult: (result: MockTestResultData) => void;
}

type TestPhase = 'setup' | 'active' | 'result' | 'review';

export const MockTestModal: React.FC<MockTestModalProps> = ({
  allQuestions,
  initialCount = 25,
  initialScope = 'semester',
  initialTopicId,
  isOpen,
  onClose,
  onSaveResult,
}) => {
  const [phase, setPhase] = useState<TestPhase>('setup');
  const [questionCount, setQuestionCount] = useState<number>(initialCount);
  const [scope, setScope] = useState<'random' | 'topic' | 'semester' | 'full'>(initialScope);

  // Active test state
  const [testQuestions, setTestQuestions] = useState<MCQQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | null>>({});
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // seconds
  const [totalTestTime, setTotalTestTime] = useState(25 * 60);
  const [testResult, setTestResult] = useState<MockTestResultData | null>(null);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'skipped'>('all');

  // Timer countdown in active phase
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (phase === 'active' && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer!);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [phase, timeRemaining]);

  if (!isOpen) return null;

  // Format seconds to mm:ss
  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startTest = () => {
    // Select questions according to settings
    let pool = [...allQuestions];
    if (scope === 'topic' && initialTopicId) {
      pool = pool.filter((q) => q.topic.toLowerCase().includes(initialTopicId.toLowerCase()));
    }
    // Shuffle pool
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    // Time: 1.2 minutes per question
    const totalSecs = Math.max(300, selected.length * 72);

    setTestQuestions(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setTimeRemaining(totalSecs);
    setTotalTestTime(totalSecs);
    setPhase('active');
  };

  const handleSelectOption = (optId: 'A' | 'B' | 'C' | 'D') => {
    const qId = testQuestions[currentIndex].id;
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optId,
    }));
  };

  const handleClearAnswer = () => {
    const qId = testQuestions[currentIndex].id;
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: null,
    }));
  };

  const handleAutoSubmit = () => {
    calculateAndFinish();
  };

  const calculateAndFinish = () => {
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;

    testQuestions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (!ans) {
        skipped++;
      } else if (ans === q.correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const total = testQuestions.length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    const timeTaken = totalTestTime - timeRemaining;

    const resultData: MockTestResultData = {
      id: `test-${Date.now()}`,
      title: `${scope === 'full' ? 'Full Syllabus' : 'Allied Health'} Mock Examination`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      totalQuestions: total,
      correct,
      incorrect,
      skipped,
      accuracy,
      timeTakenSeconds: timeTaken,
      userAnswers,
      questionIds: testQuestions.map((q) => q.id),
    };

    setTestResult(resultData);
    onSaveResult(resultData);
    setShowSubmitConfirm(false);
    setPhase('result');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-auto overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]">
        {/* SETUP PHASE */}
        {phase === 'setup' && (
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-400/20">
                  <Zap className="w-6 h-6 fill-slate-950" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    Mock Test Setup
                  </h3>
                  <p className="text-xs text-slate-500">Configure your timed exam environment</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            {/* Select Test Question Count */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Select Test Length
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[10, 25, 50, 100].map((count) => (
                  <button
                    key={count}
                    id={`mock-count-${count}`}
                    onClick={() => setQuestionCount(count)}
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      questionCount === count
                        ? 'bg-blue-900 text-white border-blue-900 shadow-sm ring-2 ring-blue-500/20'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span className="block text-lg font-bold font-heading">{count}</span>
                    <span className="text-[11px] font-medium opacity-90">Questions</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Select Options / Scope */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Syllabus Scope
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'random', label: 'Random Questions', desc: 'Mixed random topics from across the semester' },
                  { id: 'topic', label: 'Topic-wise', desc: 'Focus specifically on the current selected subject' },
                  { id: 'semester', label: 'Semester-wise', desc: 'Standard comprehensive semester examination' },
                  { id: 'full', label: 'Full Syllabus', desc: 'Grand mock test covering all courses & years' },
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`mock-scope-${item.id}`}
                    onClick={() => setScope(item.id as any)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      scope === item.id
                        ? 'bg-blue-50 border-blue-900 text-blue-950 ring-1 ring-blue-900'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="block text-xs font-bold font-heading">{item.label}</span>
                    <span className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Test rules & summary */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Clock className="w-4 h-4 text-blue-900" />
                <span>Exam Conditions:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 pl-1 text-[11px]">
                <li>Duration: ~{Math.round((questionCount * 72) / 60)} minutes with live countdown.</li>
                <li>Instant answer feedback is paused until you finish the test.</li>
                <li>Detailed score breakdown and full rationale review provided at the end.</li>
              </ul>
            </div>

            <button
              id="start-mock-exam-btn"
              onClick={startTest}
              className="w-full py-3.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-900/20 transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Begin Examination Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ACTIVE TEST PHASE */}
        {phase === 'active' && testQuestions.length > 0 && (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Header: Question 12 / 50 & Timer 28:42 */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="space-y-0.5">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  {scope === 'full' ? 'Full Mock' : 'Semester Mock'}
                </span>
                <h4 className="text-sm font-bold">
                  Question {currentIndex + 1} / {testQuestions.length}
                </h4>
              </div>

              {/* Timer */}
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider border ${
                  timeRemaining < 300
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse'
                    : 'bg-slate-800 border-slate-700 text-amber-300'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Timer: {formatTimer(timeRemaining)}</span>
              </div>

              <button
                id="finish-mock-test-btn"
                onClick={() => setShowSubmitConfirm(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm transition-all"
              >
                Submit Test
              </button>
            </div>

            {/* Question Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                  {testQuestions[currentIndex].subject} • {testQuestions[currentIndex].topic}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed pt-1">
                  {testQuestions[currentIndex].question}
                </h3>
              </div>

              {/* 4 Options */}
              <div className="space-y-2.5">
                {testQuestions[currentIndex].options.map((opt) => {
                  const isSelected = userAnswers[testQuestions[currentIndex].id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      id={`mock-opt-${opt.id}`}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-blue-900 text-white border-blue-900 shadow-md shadow-blue-900/10'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-lg border text-xs font-bold flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-amber-400 text-slate-950 border-amber-400'
                              : 'bg-white border-slate-300 text-slate-700'
                          }`}
                        >
                          {opt.id}
                        </span>
                        <span className="text-xs sm:text-sm font-medium">{opt.text}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-300" />}
                    </button>
                  );
                })}
              </div>

              {userAnswers[testQuestions[currentIndex].id] && (
                <div className="flex justify-end">
                  <button
                    onClick={handleClearAnswer}
                    className="text-xs text-slate-400 hover:text-slate-600 underline"
                  >
                    Clear Choice
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Navigator: Previous | Next */}
            <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  currentIndex === 0
                    ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-xs px-2 py-1">
                {testQuestions.map((q, idx) => {
                  const hasAnswered = !!userAnswers[q.id];
                  const isCur = idx === currentIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-6 h-6 rounded-md text-[10px] font-bold transition-all shrink-0 ${
                        isCur
                          ? 'ring-2 ring-blue-900 bg-blue-900 text-white'
                          : hasAnswered
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  if (currentIndex < testQuestions.length - 1) {
                    setCurrentIndex((prev) => prev + 1);
                  } else {
                    setShowSubmitConfirm(true);
                  }
                }}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition-all"
              >
                <span>{currentIndex === testQuestions.length - 1 ? 'Finish' : 'Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SUBMIT CONFIRM MODAL */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 font-heading">Submit Examination?</h4>
                <p className="text-xs text-slate-500 mt-1">
                  You have answered {Object.values(userAnswers).filter(Boolean).length} of {testQuestions.length} questions.
                </p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Return to Test
                </button>
                <button
                  id="confirm-submit-test-btn"
                  onClick={calculateAndFinish}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
                >
                  Yes, Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RESULT PHASE */}
        {phase === 'result' && testResult && (
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-widest font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Examination Completed
              </span>
              <h3 className="text-2xl font-bold text-slate-900 font-heading">Your Result</h3>
              <p className="text-xs text-slate-500">Allied Health Sciences Performance Assessment</p>
            </div>

            {/* Circular score visualization */}
            <div className="flex flex-col items-center justify-center py-2">
              <CircularProgress
                percentage={testResult.accuracy}
                size={120}
                strokeWidth={10}
                color={testResult.accuracy >= 75 ? '#059669' : testResult.accuracy >= 50 ? '#1d4ed8' : '#e11d48'}
                label="Accuracy"
              />
              <div className="text-center mt-3">
                <span className="text-3xl font-bold font-heading text-slate-900">
                  {testResult.correct} / {testResult.totalQuestions}
                </span>
                <p className="text-xs font-semibold text-emerald-600 mt-0.5">
                  {testResult.accuracy}% Accuracy Score
                </p>
              </div>
            </div>

            {/* Detailed metric cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                <span className="text-lg font-bold text-emerald-800 font-heading">{testResult.correct}</span>
                <span className="block text-[11px] font-semibold text-emerald-700">Correct</span>
              </div>
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-center">
                <span className="text-lg font-bold text-rose-800 font-heading">{testResult.incorrect}</span>
                <span className="block text-[11px] font-semibold text-rose-700">Incorrect</span>
              </div>
              <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-center">
                <span className="text-lg font-bold text-slate-800 font-heading">{testResult.skipped}</span>
                <span className="block text-[11px] font-semibold text-slate-600">Skipped</span>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-center">
                <span className="text-lg font-bold text-blue-900 font-heading">
                  {Math.round(testResult.timeTakenSeconds / 60)} min
                </span>
                <span className="block text-[11px] font-semibold text-blue-800">Time Taken</span>
              </div>
            </div>

            {/* Action Buttons: Review Answers, Try Again, Back to Dashboard */}
            <div className="space-y-2 pt-2">
              <button
                id="mock-review-answers-btn"
                onClick={() => setPhase('review')}
                className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Review Answers & Explanations</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={startTest}
                  className="py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
                <button
                  onClick={onClose}
                  className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Back to Dashboard</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* REVIEW PHASE */}
        {phase === 'review' && testResult && (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPhase('result')}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h4 className="text-sm font-bold text-slate-900 font-heading">
                  Reviewing {testQuestions.length} Questions
                </h4>
              </div>

              {/* Filter pills */}
              <div className="flex items-center gap-1 text-[11px]">
                {(['all', 'correct', 'incorrect', 'skipped'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setReviewFilter(filter)}
                    className={`px-2 py-0.5 rounded-md capitalize font-medium ${
                      reviewFilter === filter
                        ? 'bg-blue-900 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions list with rationales */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              {testQuestions
                .filter((q) => {
                  const userAns = testResult.userAnswers[q.id];
                  if (reviewFilter === 'correct') return userAns === q.correctAnswer;
                  if (reviewFilter === 'incorrect') return userAns && userAns !== q.correctAnswer;
                  if (reviewFilter === 'skipped') return !userAns;
                  return true;
                })
                .map((q, idx) => {
                  const userAns = testResult.userAnswers[q.id];
                  const isCorrect = userAns === q.correctAnswer;
                  const isSkipped = !userAns;

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          Q{idx + 1}
                        </span>
                        {isCorrect && (
                          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        )}
                        {!isCorrect && !isSkipped && (
                          <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Incorrect
                          </span>
                        )}
                        {isSkipped && (
                          <span className="text-xs font-bold text-slate-500">Skipped</span>
                        )}
                      </div>

                      <h5 className="text-sm font-bold text-slate-900">{q.question}</h5>

                      {/* Options */}
                      <div className="space-y-1.5 text-xs">
                        {q.options.map((opt) => {
                          const isKey = opt.id === q.correctAnswer;
                          const wasChosen = userAns === opt.id;
                          return (
                            <div
                              key={opt.id}
                              className={`p-2 rounded-lg border flex items-center justify-between ${
                                isKey
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                                  : wasChosen && !isKey
                                  ? 'bg-rose-50 border-rose-300 text-rose-950 font-semibold'
                                  : 'bg-slate-50/50 border-slate-100 text-slate-600'
                              }`}
                            >
                              <span>
                                {opt.id}. {opt.text}
                              </span>
                              {isKey && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 text-xs text-slate-700 space-y-0.5">
                        <span className="font-bold text-blue-900 block text-[11px]">Explanation:</span>
                        <p>{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

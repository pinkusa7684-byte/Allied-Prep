import React from 'react';
import {
  FileText,
  BookOpen,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  ChevronRight,
  Sparkles,
  BookMarked,
  Layers,
} from 'lucide-react';
import { CourseId, Level, UserProgressState, CourseInfo, SubjectTopic } from '../types';
import { CircularProgress } from './common/CircularProgress';

interface HomeScreenProps {
  selectedLevel: Level;
  selectedCourse: CourseId;
  onSelectCourse: (course: CourseId, level: Level) => void;
  onNavigateToMCQ: () => void;
  onNavigateToQuestionBank: () => void;
  onNavigateToBooks: () => void;
  onContinueTopic: (topic: SubjectTopic) => void;
  onStartMockTestDirect: () => void;
  progress: UserProgressState;
  courses: CourseInfo[];
  topics: SubjectTopic[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  selectedLevel,
  selectedCourse,
  onSelectCourse,
  onNavigateToMCQ,
  onNavigateToQuestionBank,
  onNavigateToBooks,
  onContinueTopic,
  onStartMockTestDirect,
  progress,
  courses,
  topics,
}) => {
  const ugCourses = courses.filter((c) => c.level === 'UG');
  const pgCourses = courses.filter((c) => c.level === 'PG');

  const activeCourseInfo = courses.find((c) => c.id === selectedCourse) || courses[0];

  // Map recent topics to full topic objects if available
  const recentTopicsWithData = progress.recentTopics.map((rt) => {
    const fullTopic = topics.find(
      (t) => t.subject.toLowerCase() === rt.subject.toLowerCase() && t.name.toLowerCase() === rt.topic.toLowerCase()
    ) || {
      id: `${rt.subject}-${rt.topic}`.toLowerCase().replace(/\s+/g, '-'),
      subject: rt.subject,
      name: rt.topic,
      questionCount: 120,
      accuracy: 75,
      course: rt.course,
      year: rt.year,
      semester: rt.semester,
    };
    return { ...rt, fullTopic };
  });

  const accuracyRate =
    progress.questionsAttempted > 0
      ? Math.round((progress.correctAnswers / progress.questionsAttempted) * 100)
      : 78;

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F2552] via-[#1E3A8A] to-[#172554] p-5 sm:p-6 text-white shadow-lg shadow-blue-950/20 border border-blue-800/40">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-800/80 border border-blue-700/60 text-amber-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Practice. Prepare. Perform.</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white tracking-tight leading-tight">
              {activeCourseInfo.fullName}
            </h2>
            <p className="text-xs sm:text-sm text-blue-200/90 max-w-xl font-normal leading-relaxed">
              Curated syllabus-aligned MCQs, verified previous university question papers, and essential medical reference textbooks.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1 md:pt-0">
            <button
              id="home-quick-mock-btn"
              onClick={onStartMockTestDirect}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold shadow-md shadow-amber-400/20 transition-all active:scale-95"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              Quick Mock Test
            </button>
          </div>
        </div>
      </div>

      {/* Course Selection Card */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">Choose Your Course</h3>
            <p className="text-xs text-slate-500">Switch curriculum between Undergraduate & Postgraduate degrees</p>
          </div>
          <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
            Active: {selectedCourse} ({selectedLevel})
          </span>
        </div>

        {/* UG Courses */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">UG Programs</span>
            <span className="flex-1 h-px bg-slate-100" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ugCourses.map((c) => {
              const isSelected = selectedCourse === c.id;
              return (
                <button
                  key={c.id}
                  id={`course-select-${c.id}`}
                  onClick={() => onSelectCourse(c.id, 'UG')}
                  className={`p-3 rounded-xl text-left border transition-all relative overflow-hidden ${
                    isSelected
                      ? 'bg-blue-900 text-white border-blue-900 shadow-md shadow-blue-900/20 ring-2 ring-blue-500/20'
                      : 'bg-slate-50/70 hover:bg-slate-100/80 text-slate-800 border-slate-200/90'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-bold font-heading ${isSelected ? 'text-amber-300' : 'text-slate-900'}`}>
                      {c.name}
                    </span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                  </div>
                  <p className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    {c.fullName}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* PG Courses */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">PG Programs</span>
            <span className="flex-1 h-px bg-slate-100" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {pgCourses.map((c) => {
              const isSelected = selectedCourse === c.id;
              return (
                <button
                  key={c.id}
                  id={`course-select-${c.id}`}
                  onClick={() => onSelectCourse(c.id, 'PG')}
                  className={`p-3 rounded-xl text-left border transition-all relative overflow-hidden ${
                    isSelected
                      ? 'bg-blue-900 text-white border-blue-900 shadow-md shadow-blue-900/20 ring-2 ring-blue-500/20'
                      : 'bg-slate-50/70 hover:bg-slate-100/80 text-slate-800 border-slate-200/90'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-bold font-heading ${isSelected ? 'text-amber-300' : 'text-slate-900'}`}>
                      {c.name}
                    </span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                  </div>
                  <p className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    {c.fullName}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 Main Feature Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 font-heading">Primary Learning Hubs</h3>
          <span className="text-xs text-slate-500">Tap to enter</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* 1. MCQ / Mock Test */}
          <div className="group relative bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:border-blue-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center border border-blue-200 group-hover:bg-blue-900 group-hover:text-amber-300 transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 font-heading group-hover:text-blue-900 transition-colors">
                  📝 MCQ / Mock Test
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Practice topic-wise MCQs and improve your score with instant feedback & clinical rationales.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100">
              <button
                id="home-start-mcq-btn"
                onClick={onNavigateToMCQ}
                className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-blue-50 text-blue-900 hover:bg-blue-900 hover:text-white text-xs font-bold transition-all"
              >
                <span>Start Practice</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* 2. Question Bank */}
          <div className="group relative bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:border-blue-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                <BookMarked className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 font-heading group-hover:text-emerald-900 transition-colors">
                  📚 Question Bank
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Previous-year questions organized semester-wise and year-wise with simulated university paper viewer.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100">
              <button
                id="home-explore-qp-btn"
                onClick={onNavigateToQuestionBank}
                className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-900 hover:bg-emerald-900 hover:text-white text-xs font-bold transition-all"
              >
                <span>Explore Questions</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* 3. Books */}
          <div className="group relative bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:border-blue-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-900 flex items-center justify-center border border-indigo-200 group-hover:bg-indigo-900 group-hover:text-white transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 font-heading group-hover:text-indigo-900 transition-colors">
                  📖 Books
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Access your uploaded study books and PDFs with chapters, highlighters, and continue reading support.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100">
              <button
                id="home-view-books-btn"
                onClick={onNavigateToBooks}
                className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-indigo-50 text-indigo-900 hover:bg-indigo-900 hover:text-white text-xs font-bold transition-all"
              >
                <span>View Books</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-900" />
            <h3 className="text-base font-bold text-slate-900 font-heading">Continue Learning</h3>
          </div>
          <span className="text-xs text-slate-500">Pick up where you left off</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {recentTopicsWithData.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-semibold text-blue-800">{item.subject}</span>
                  <span className="text-[11px]">{item.lastAttempted}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 tracking-tight">{item.topic}</h4>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Progress</span>
                  <span className="font-bold text-slate-800">{item.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-blue-800 rounded-full transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>

              <button
                id={`continue-learning-btn-${idx}`}
                onClick={() => onContinueTopic(item.fullTopic)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold transition-all active:scale-95"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Summary */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-900" />
            <h3 className="text-base font-bold text-slate-900 font-heading">Performance Summary</h3>
          </div>
          <span className="text-xs text-slate-500">Overall academic metrics</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Card 1: Questions Attempted */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center">
            <span className="text-2xl font-bold font-heading text-slate-900">
              {progress.questionsAttempted}
            </span>
            <span className="text-xs font-semibold text-slate-600 mt-1">Questions Attempted</span>
            <div className="mt-2 w-full flex justify-center">
              <CircularProgress percentage={Math.min(100, Math.round((progress.questionsAttempted / 200) * 100))} size={48} strokeWidth={4} color="#0F2552" showText={false} />
            </div>
          </div>

          {/* Card 2: Correct Answers */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center">
            <span className="text-2xl font-bold font-heading text-emerald-700">
              {progress.correctAnswers}
            </span>
            <span className="text-xs font-semibold text-slate-600 mt-1">Correct Answers</span>
            <div className="mt-2 w-full flex justify-center">
              <CircularProgress percentage={accuracyRate} size={48} strokeWidth={4} color="#059669" showText={false} />
            </div>
          </div>

          {/* Card 3: Accuracy % */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center">
            <span className="text-2xl font-bold font-heading text-blue-800">
              {accuracyRate}%
            </span>
            <span className="text-xs font-semibold text-slate-600 mt-1">Accuracy Rate</span>
            <div className="mt-2 w-full flex justify-center">
              <CircularProgress percentage={accuracyRate} size={48} strokeWidth={4} color="#1d4ed8" showText={false} />
            </div>
          </div>

          {/* Card 4: Tests Completed */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center">
            <span className="text-2xl font-bold font-heading text-amber-700">
              {progress.testsCompleted}
            </span>
            <span className="text-xs font-semibold text-slate-600 mt-1">Tests Completed</span>
            <div className="mt-2 w-full flex justify-center">
              <CircularProgress percentage={Math.min(100, progress.testsCompleted * 15)} size={48} strokeWidth={4} color="#d97706" showText={false} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

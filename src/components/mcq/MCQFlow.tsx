import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  ArrowRight,
  ChevronLeft,
  Search,
  BookOpen,
  Activity,
  Sparkles,
  Footprints,
  Mic,
  Stethoscope,
  Brain,
  Compass,
  Zap,
  Target,
  Clock,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { Level, CourseId, YearId, SemesterId, CourseInfo, SubjectTopic, MCQQuestion } from '../../types';

interface MCQFlowProps {
  courses: CourseInfo[];
  topics: SubjectTopic[];
  mcqs: MCQQuestion[];
  initialLevel?: Level;
  initialCourse?: CourseId;
  onStartTopicPractice: (topic: SubjectTopic) => void;
  onStartMockTest: (config: {
    questionCount: number;
    scope: 'random' | 'topic' | 'semester' | 'full';
    topicId?: string;
  }) => void;
}

type FlowStep = 'level' | 'course' | 'year' | 'semester' | 'topic';

export const MCQFlow: React.FC<MCQFlowProps> = ({
  courses,
  topics,
  mcqs,
  initialLevel = 'UG',
  initialCourse = 'BPT',
  onStartTopicPractice,
  onStartMockTest,
}) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('level'); // Default to 'Select Level (UG/PG)' by default
  const [selectedLevel, setSelectedLevel] = useState<Level>(initialLevel);
  const [selectedCourse, setSelectedCourse] = useState<CourseId>(initialCourse);
  const [selectedYear, setSelectedYear] = useState<YearId>('first');
  const [selectedSemester, setSelectedSemester] = useState<SemesterId>('sem1');
  const [searchTopicQuery, setSearchTopicQuery] = useState('');

  // Course icons helper
  const getCourseIcon = (courseId: CourseId) => {
    switch (courseId) {
      case 'BPT':
        return <Activity className="w-5 h-5 text-blue-900" />;
      case 'BOT':
        return <Sparkles className="w-5 h-5 text-emerald-800" />;
      case 'BPO':
        return <Footprints className="w-5 h-5 text-indigo-900" />;
      case 'BASLP':
        return <Mic className="w-5 h-5 text-amber-800" />;
      case 'MPT':
        return <Stethoscope className="w-5 h-5 text-blue-900" />;
      case 'MOT':
        return <Brain className="w-5 h-5 text-purple-900" />;
      case 'MPO':
        return <Compass className="w-5 h-5 text-teal-900" />;
    }
  };

  const levelCourses = courses.filter((c) => c.level === selectedLevel);
  const currentCourseInfo = courses.find((c) => c.id === selectedCourse) || courses[0];

  const ugYears: { id: YearId; label: string; mcqCount: string }[] = [
    { id: 'first', label: 'First Year', mcqCount: '1200+ MCQs' },
    { id: 'second', label: 'Second Year', mcqCount: '1450+ MCQs' },
    { id: 'third', label: 'Third Year', mcqCount: '980+ MCQs' },
    { id: 'final', label: 'Final Year', mcqCount: '1100+ MCQs' },
  ];

  const pgYears: { id: YearId; label: string; mcqCount: string }[] = [
    { id: 'first', label: 'First Year', mcqCount: '850+ MCQs' },
    { id: 'second', label: 'Second Year', mcqCount: '920+ MCQs' },
  ];

  const availableYears = selectedLevel === 'UG' ? ugYears : pgYears;

  // Filter topics for the active selections
  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      const matchCourse = t.course === selectedCourse;
      const matchYear = t.year === selectedYear;
      const matchSem = t.semester === selectedSemester;
      const matchSearch =
        searchTopicQuery.trim() === '' ||
        t.name.toLowerCase().includes(searchTopicQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchTopicQuery.toLowerCase());

      return matchCourse && matchYear && matchSem && matchSearch;
    });
  }, [topics, selectedCourse, selectedYear, selectedSemester, searchTopicQuery]);

  // Group topics by Subject
  const groupedBySubject = useMemo(() => {
    const groups: Record<string, SubjectTopic[]> = {};
    filteredTopics.forEach((t) => {
      if (!groups[t.subject]) {
        groups[t.subject] = [];
      }
      groups[t.subject].push(t);
    });
    return groups;
  }, [filteredTopics]);

  return (
    <div className="space-y-5 pb-20 animate-fadeIn">
      {/* Top Header & Breadcrumbs */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {currentStep !== 'level' && (
              <button
                onClick={() => {
                  if (currentStep === 'topic') setCurrentStep('semester');
                  else if (currentStep === 'semester') setCurrentStep('year');
                  else if (currentStep === 'year') setCurrentStep('course');
                  else if (currentStep === 'course') setCurrentStep('level');
                }}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                title="Back"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                {currentStep === 'level' && 'Select Level'}
                {currentStep === 'course' && 'Select Your Course'}
                {currentStep === 'year' && 'Select Year'}
                {currentStep === 'semester' && 'Select Semester'}
                {currentStep === 'topic' && 'Select Topic'}
              </h2>
              <p className="text-xs text-slate-500">
                {currentStep === 'level' && 'Choose Undergraduate or Postgraduate study'}
                {currentStep === 'course' && `Target program under ${selectedLevel}`}
                {currentStep === 'year' && `Academic year for ${selectedCourse}`}
                {currentStep === 'semester' && `Select semester to view syllabus topics`}
                {currentStep === 'topic' && `Topic-wise practice for ${selectedCourse} • ${selectedYear} Year • Sem ${selectedSemester === 'sem1' ? '1' : '2'}`}
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              onStartMockTest({
                questionCount: 25,
                scope: 'semester',
              })
            }
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-sm shadow-amber-400/20 transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            Mock Test Mode
          </button>
        </div>

        {/* Dynamic Quick Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            onClick={() => setCurrentStep('level')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 ${
              currentStep === 'level'
                ? 'bg-blue-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {selectedLevel}
          </button>
          <span className="text-slate-300">/</span>
          <button
            onClick={() => setCurrentStep('course')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 ${
              currentStep === 'course'
                ? 'bg-blue-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {selectedCourse}
          </button>
          <span className="text-slate-300">/</span>
          <button
            onClick={() => setCurrentStep('year')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 capitalize ${
              currentStep === 'year'
                ? 'bg-blue-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {selectedYear} Year
          </button>
          <span className="text-slate-300">/</span>
          <button
            onClick={() => setCurrentStep('semester')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 ${
              currentStep === 'semester'
                ? 'bg-blue-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {selectedSemester === 'sem1' ? '1st Sem' : '2nd Sem'}
          </button>
          <span className="text-slate-300">/</span>
          <button
            onClick={() => setCurrentStep('topic')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 ${
              currentStep === 'topic'
                ? 'bg-blue-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Topics
          </button>
        </div>
      </div>

      {/* STEP 1: Select Level */}
      {currentStep === 'level' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              id="mcq-select-ug"
              onClick={() => {
                setSelectedLevel('UG');
                setSelectedCourse('BPT');
                setCurrentStep('course');
              }}
              className={`p-6 rounded-2xl border text-left transition-all relative group flex flex-col justify-between ${
                selectedLevel === 'UG'
                  ? 'bg-white border-blue-900 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center border border-blue-200 group-hover:bg-blue-900 group-hover:text-amber-300 transition-colors">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">UG</h3>
                  <p className="text-sm font-semibold text-blue-900 mt-0.5">Undergraduate Courses</p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    BPT, BOT, BPO, BASLP programs with full semester syllabi and clinical question banks.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center text-xs font-bold text-blue-900 gap-1 group-hover:translate-x-1 transition-transform">
                <span>Choose UG Courses</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>

            <button
              id="mcq-select-pg"
              onClick={() => {
                setSelectedLevel('PG');
                setSelectedCourse('MPT');
                setCurrentStep('course');
              }}
              className={`p-6 rounded-2xl border text-left transition-all relative group flex flex-col justify-between ${
                selectedLevel === 'PG'
                  ? 'bg-white border-blue-900 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-900 flex items-center justify-center border border-indigo-200 group-hover:bg-indigo-900 group-hover:text-white transition-colors">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">PG</h3>
                  <p className="text-sm font-semibold text-indigo-900 mt-0.5">Postgraduate Courses</p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    MPT, MOT, MPO advanced specialty domains, clinical reasoning & evidence-based practice.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center text-xs font-bold text-indigo-900 gap-1 group-hover:translate-x-1 transition-transform">
                <span>Choose PG Courses</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Course Selection */}
      {currentStep === 'course' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {levelCourses.map((c) => (
              <button
                key={c.id}
                id={`mcq-course-${c.id}`}
                onClick={() => {
                  setSelectedCourse(c.id);
                  setCurrentStep('year');
                }}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all relative group flex items-start justify-between ${
                  selectedCourse === c.id
                    ? 'bg-white border-blue-900 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200/90 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 group-hover:bg-blue-50 transition-colors">
                    {getCourseIcon(c.id)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-slate-900 font-heading">{c.name}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold">
                        {c.availableQuestionsCount}+ Qs
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-blue-900">{c.fullName}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{c.description}</p>
                  </div>
                </div>
                <div className="p-1 rounded-lg text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: Year Selection */}
      {currentStep === 'year' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {availableYears.map((yr) => (
              <button
                key={yr.id}
                id={`mcq-year-${yr.id}`}
                onClick={() => {
                  setSelectedYear(yr.id);
                  setCurrentStep('semester');
                }}
                className={`p-5 rounded-2xl border text-left transition-all relative group flex items-center justify-between ${
                  selectedYear === yr.id
                    ? 'bg-white border-blue-900 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200/90 hover:border-blue-300'
                }`}
              >
                <div className="space-y-1">
                  <span className="text-base font-bold text-slate-900 font-heading">{yr.label}</span>
                  <p className="text-xs font-semibold text-emerald-700">{yr.mcqCount}</p>
                  <p className="text-xs text-slate-500">Core foundational & clinical subjects</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-blue-900 group-hover:text-white transition-all text-slate-600">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: Semester Selection */}
      {currentStep === 'semester' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              id="mcq-semester-1"
              onClick={() => {
                setSelectedSemester('sem1');
                setCurrentStep('topic');
              }}
              className={`p-6 rounded-2xl border text-left transition-all relative group flex flex-col justify-between ${
                selectedSemester === 'sem1'
                  ? 'bg-white border-blue-900 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Semester 1</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">1st Semester</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Explore 1st semester subjects and topics including primary foundational sciences.
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-bold text-blue-900 gap-1 group-hover:translate-x-1 transition-transform">
                <span>Explore Topics</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>

            <button
              id="mcq-semester-2"
              onClick={() => {
                setSelectedSemester('sem2');
                setCurrentStep('topic');
              }}
              className={`p-6 rounded-2xl border text-left transition-all relative group flex flex-col justify-between ${
                selectedSemester === 'sem2'
                  ? 'bg-white border-blue-900 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Semester 2</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">2nd Semester</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Explore 2nd semester subjects and topics including system anatomy and applied therapeutics.
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-bold text-emerald-900 gap-1 group-hover:translate-x-1 transition-transform">
                <span>Explore Topics</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Topic Selection */}
      {currentStep === 'topic' && (
        <div className="space-y-4">
          {/* Search bar & Mock Test Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="search-mcq-topics-input"
                type="text"
                value={searchTopicQuery}
                onChange={(e) => setSearchTopicQuery(e.target.value)}
                placeholder="Search topics (e.g. Upper Limb, CVS, Gait)..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
            </div>

            <button
              id="mcq-mock-test-btn"
              onClick={() =>
                onStartMockTest({
                  questionCount: 25,
                  scope: 'semester',
                })
              }
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-400/20 transition-all shrink-0"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              Start Mock Test (Timed)
            </button>
          </div>

          {/* Grouped Topics */}
          {Object.keys(groupedBySubject).length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800 font-heading">No topics found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try switching semester or course to explore other syllabus domains.
              </p>
              <button
                onClick={() => {
                  setSelectedSemester('sem1');
                  setSearchTopicQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-semibold"
              >
                Reset to Semester 1
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedBySubject).map(([subject, subjectTopics]) => (
                <div key={subject} className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 font-heading uppercase tracking-wider">
                      {subject}
                    </h3>
                    <span className="flex-1 h-px bg-slate-200" />
                    <span className="text-[11px] text-slate-400 font-medium">
                      {subjectTopics.length} Topics
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {subjectTopics.map((topic) => (
                      <div
                        key={topic.id}
                        className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 font-heading">{topic.name}</h4>
                            <p className="text-xs text-slate-500 mt-0.5">{topic.questionCount} Questions</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Acc: {topic.accuracy}%</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                          <button
                            id={`practice-topic-btn-${topic.id}`}
                            onClick={() => onStartTopicPractice(topic)}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all active:scale-95"
                          >
                            <span>Practice</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() =>
                              onStartMockTest({
                                questionCount: 10,
                                scope: 'topic',
                                topicId: topic.id,
                              })
                            }
                            className="px-2.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
                            title="Mock Test for this topic"
                          >
                            <Zap className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

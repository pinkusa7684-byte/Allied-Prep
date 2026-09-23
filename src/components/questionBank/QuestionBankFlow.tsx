import React, { useState, useMemo } from 'react';
import {
  FileText,
  ChevronLeft,
  ArrowRight,
  Download,
  Bookmark,
  Calendar,
  Layers,
  GraduationCap,
  Sparkles,
  Search,
  ExternalLink,
} from 'lucide-react';
import { CourseId, Level, YearId, SemesterId, CourseInfo, QuestionPaper } from '../../types';
import { QuestionPaperViewer } from './QuestionPaperViewer';

interface QuestionBankFlowProps {
  courses: CourseInfo[];
  papers: QuestionPaper[];
  initialLevel?: Level;
  initialCourse?: CourseId;
  bookmarkedPaperIds?: string[];
  onToggleBookmarkPaper?: (paperId: string) => void;
}

type QPStep = 'level' | 'course' | 'year' | 'semester' | 'papers';

export const QuestionBankFlow: React.FC<QuestionBankFlowProps> = ({
  courses,
  papers,
  initialLevel = 'UG',
  initialCourse = 'BPT',
}) => {
  const [currentStep, setCurrentStep] = useState<QPStep>('level'); // Default to 'Select Level (UG/PG)' by default
  const [selectedLevel, setSelectedLevel] = useState<Level>(initialLevel);
  const [selectedCourse, setSelectedCourse] = useState<CourseId>(initialCourse);
  const [selectedYear, setSelectedYear] = useState<YearId>('first');
  const [selectedSemester, setSelectedSemester] = useState<SemesterId>('sem1');
  const [searchPaperQuery, setSearchPaperQuery] = useState('');
  const [activeViewingPaper, setActiveViewingPaper] = useState<QuestionPaper | null>(null);

  const levelCourses = courses.filter((c) => c.level === selectedLevel);

  const ugYears: { id: YearId; label: string }[] = [
    { id: 'first', label: 'First Year' },
    { id: 'second', label: 'Second Year' },
    { id: 'third', label: 'Third Year' },
    { id: 'final', label: 'Final Year' },
  ];

  const pgYears: { id: YearId; label: string }[] = [
    { id: 'first', label: 'First Year' },
    { id: 'second', label: 'Second Year' },
  ];

  const availableYears = selectedLevel === 'UG' ? ugYears : pgYears;

  // Filter papers
  const filteredPapers = useMemo(() => {
    return papers.filter((p) => {
      const matchCourse = p.course === selectedCourse;
      const matchYear = p.year === selectedYear;
      const matchSem = p.semester === selectedSemester;
      const matchSearch =
        searchPaperQuery.trim() === '' ||
        p.subject.toLowerCase().includes(searchPaperQuery.toLowerCase()) ||
        p.examName.toLowerCase().includes(searchPaperQuery.toLowerCase()) ||
        p.examYear.toString().includes(searchPaperQuery);

      return matchCourse && matchYear && matchSem && matchSearch;
    });
  }, [papers, selectedCourse, selectedYear, selectedSemester, searchPaperQuery]);

  // Group papers by exam year (e.g. 2026, 2025, 2024, 2023)
  const groupedPapers = useMemo(() => {
    const groups: Record<number, QuestionPaper[]> = {};
    filteredPapers.forEach((p) => {
      if (!groups[p.examYear]) {
        groups[p.examYear] = [];
      }
      groups[p.examYear].push(p);
    });
    // Sort years descending
    return Object.entries(groups).sort(([a], [b]) => Number(b) - Number(a));
  }, [filteredPapers]);

  return (
    <div className="space-y-5 pb-20 animate-fadeIn">
      {/* Top Header Card & Breadcrumbs */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {currentStep !== 'level' && (
              <button
                onClick={() => {
                  if (currentStep === 'papers') setCurrentStep('semester');
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
                {currentStep === 'papers' && 'Previous Year Question Papers'}
              </h2>
              <p className="text-xs text-slate-500">
                {currentStep === 'papers'
                  ? `${selectedCourse} • ${selectedYear} Year • ${selectedSemester === 'sem1' ? '1st Semester' : '2nd Semester'}`
                  : 'Navigate through degree, academic year and semester'}
              </p>
            </div>
          </div>
        </div>

        {/* Step Navigation Pills */}
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
            onClick={() => setCurrentStep('papers')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 ${
              currentStep === 'papers'
                ? 'bg-blue-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Papers
          </button>
        </div>
      </div>

      {/* STEP 1: Level */}
      {currentStep === 'level' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => {
              setSelectedLevel('UG');
              setSelectedCourse('BPT');
              setCurrentStep('course');
            }}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-900 shadow-sm text-left transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center border border-blue-200 group-hover:bg-blue-900 group-hover:text-white transition-colors mb-3">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">UG</h3>
            <p className="text-sm font-semibold text-blue-900">Undergraduate Question Papers</p>
            <p className="text-xs text-slate-500 mt-2">BPT, BOT, BPO, BASLP previous-year university examinations.</p>
          </button>

          <button
            onClick={() => {
              setSelectedLevel('PG');
              setSelectedCourse('MPT');
              setCurrentStep('course');
            }}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-900 shadow-sm text-left transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-900 flex items-center justify-center border border-indigo-200 group-hover:bg-indigo-900 group-hover:text-white transition-colors mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">PG</h3>
            <p className="text-sm font-semibold text-indigo-900">Postgraduate Question Papers</p>
            <p className="text-xs text-slate-500 mt-2">MPT, MOT, MPO advanced specialty papers with case studies.</p>
          </button>
        </div>
      )}

      {/* STEP 2: Course */}
      {currentStep === 'course' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {levelCourses.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCourse(c.id);
                setCurrentStep('year');
              }}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-900 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <span className="text-base font-bold text-slate-900 font-heading">{c.name}</span>
                <p className="text-xs text-blue-900 font-medium">{c.fullName}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      )}

      {/* STEP 3: Year */}
      {currentStep === 'year' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {availableYears.map((yr) => (
            <button
              key={yr.id}
              onClick={() => {
                setSelectedYear(yr.id);
                setCurrentStep('semester');
              }}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-900 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <span className="text-base font-bold text-slate-900 font-heading">{yr.label}</span>
                <p className="text-xs text-slate-500">University annual & semester question papers</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      )}

      {/* STEP 4: Semester */}
      {currentStep === 'semester' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => {
              setSelectedSemester('sem1');
              setCurrentStep('papers');
            }}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-900 text-left transition-all group"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200 mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Semester 1</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">1st Semester Papers</h3>
            <p className="text-xs text-slate-500 mt-1">Previous 5 years question papers for 1st semester.</p>
          </button>

          <button
            onClick={() => {
              setSelectedSemester('sem2');
              setCurrentStep('papers');
            }}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-900 text-left transition-all group"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200 mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Semester 2</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">2nd Semester Papers</h3>
            <p className="text-xs text-slate-500 mt-1">Previous 5 years question papers for 2nd semester.</p>
          </button>
        </div>
      )}

      {/* STEP 5: Papers List */}
      {currentStep === 'papers' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchPaperQuery}
              onChange={(e) => setSearchPaperQuery(e.target.value)}
              placeholder="Search by subject, examination year (e.g. Anatomy, 2026)..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>

          {groupedPapers.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
              <FileText className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">No question papers found</h4>
              <p className="text-xs text-slate-500">
                There are no papers matching the current filter. Try resetting search or switching semesters.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {groupedPapers.map(([yearStr, yearPapers]) => (
                <div key={yearStr} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-900 text-white text-xs font-bold font-heading">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{yearStr}</span>
                    </div>
                    <span className="flex-1 h-px bg-slate-200" />
                    <span className="text-[11px] text-slate-400 font-medium">
                      {yearPapers.length} Question Paper{yearPapers.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {yearPapers.map((paper) => {
                      return (
                        <div
                          key={paper.id}
                          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:border-blue-300 flex flex-col justify-between space-y-4"
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-xs border border-rose-200">
                                  PDF
                                </div>
                                <div>
                                  <span className="text-xs font-semibold text-slate-500">
                                    {paper.paperCode}
                                  </span>
                                  <h4 className="text-sm font-bold text-slate-900 font-heading">
                                    {paper.subject}
                                  </h4>
                                </div>
                              </div>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed font-medium">
                              {paper.examName} – {paper.examYear}
                            </p>

                            <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                              <span>Size: {paper.pdfSize}</span>
                              <span>•</span>
                              <span>{paper.totalPages} Pages</span>
                              <span>•</span>
                              <span>{paper.durationHours} Hours</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                            <button
                              id={`view-paper-btn-${paper.id}`}
                              onClick={() => setActiveViewingPaper(paper)}
                              className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all active:scale-95"
                            >
                              <span>View Paper</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Integrated PDF Reader Modal */}
      {activeViewingPaper && (
        <QuestionPaperViewer
          paper={activeViewingPaper}
          isOpen={!!activeViewingPaper}
          onClose={() => setActiveViewingPaper(null)}
        />
      )}
    </div>
  );
};

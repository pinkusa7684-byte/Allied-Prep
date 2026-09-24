import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Bell,
  Calendar,
  Sparkles,
  ArrowRight,
  X,
  FileText,
  AlertCircle,
  ExternalLink,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';

export interface NoticeBannerItem {
  id: string;
  categoryTag: string;
  categoryColor: string; // e.g. 'amber', 'emerald', 'indigo'
  title: string;
  subtitle: string;
  badge: string;
  date: string;
  bgGradient: string;
  borderColor: string;
  accentColor: string;
  targetAudience: string;
  fullNotice: {
    referenceNumber: string;
    issuingAuthority: string;
    effectiveDate: string;
    summary: string;
    keyPoints: string[];
    actionRequired: string;
    contactSupport: string;
  };
}

export const NOTICE_BANNERS: NoticeBannerItem[] = [
  {
    id: 'notice-exam-schedule-2026',
    categoryTag: 'EXAMINATION NOTICE • URGENT',
    categoryColor: 'amber',
    title: 'University Annual & Semester Exam Schedule 2026 Released',
    subtitle:
      'Official date sheet for BASLP, BOT, BPT & Post-Graduate theory and practical clinical examinations now available.',
    badge: 'Hall Tickets Active',
    date: 'Academic Year 2026-27',
    bgGradient: 'from-[#0B1E48] via-[#162F6D] to-[#1E1B4B]',
    borderColor: 'border-amber-400/30 hover:border-amber-400/60',
    accentColor: 'text-amber-300',
    targetAudience: 'BASLP, BOT, BPT, BPO (UG & PG)',
    fullNotice: {
      referenceNumber: 'EXAM-AHS/2026/NOT-089',
      issuingAuthority: 'Controller of Examinations — Allied Health Sciences Board',
      effectiveDate: 'September 2026 — October 2026 Session',
      summary:
        'The University Examination Board has finalized the timetable for UG (BASLP, BOT, BPT, BPO) and PG (MPT, MOT, MPO) academic examinations. Theory exams will commence in standard morning sessions, followed immediately by clinical OSCE and viva voce examinations.',
      keyPoints: [
        'Hall tickets with verified candidate biometric barcode can be verified via college credentials.',
        'Theory exam timetable: Paper I (Basic Medical Sciences), Paper II (Core Specialty Disciplines), Paper III (Clinical Applied Sciences).',
        'Practical viva voce and patient assessment case presentations will be evaluated by external university examiners.',
        'Mandatory attendance criteria: minimum 75% theory and 80% clinical internship attendance required.',
      ],
      actionRequired:
        'Review the subject-wise syllabus from the Question Bank tab, attempt previous 10-year question papers, and download your practical case presentation record.',
      contactSupport: 'co-exam@alliedprep.edu | Academic Helpline: 1800-266-AHS',
    },
  },
  {
    id: 'notice-mock-series-aiims',
    categoryTag: 'ACADEMIC ADVISORY • NEW UPDATE',
    categoryColor: 'emerald',
    title: 'National Clinical Mock Test Series & AIIMS / PGIMER Pattern',
    subtitle:
      '250+ updated clinical vignette MCQs with in-depth rationales, high-yield diagrams, and instant diagnostic scoring.',
    badge: 'Clinical Series Live',
    date: 'Updated Daily',
    bgGradient: 'from-[#063529] via-[#0D4E3E] to-[#12283A]',
    borderColor: 'border-emerald-400/30 hover:border-emerald-400/60',
    accentColor: 'text-emerald-300',
    targetAudience: 'Candidates Preparing for University & PG Entrances',
    fullNotice: {
      referenceNumber: 'ACAD-AIIMS/MOCK/2026/V4',
      issuingAuthority: 'Academic Curriculum & Simulation Cell',
      effectiveDate: 'Active for all Registered Candidates',
      summary:
        'To simulate contemporary university and central institute examination patterns (AIIMS, PGIMER, SVNIRTAR, AYJNIHH), our question faculty has integrated scenario-based clinical problems and multimedia imaging questions.',
      keyPoints: [
        'Timed mock examination mode available under MCQ section with customizable 25, 50, and 100 questions.',
        'Immediate rationale feedback with reference textbook citations (Guyton, Gray\'s, Tidy\'s, Snell).',
        'Performance breakdown by subject accuracy, negative mark penalty mitigation, and average pace per question.',
        'Special emphasis on clinical pharmacology, electrotherapy parameters, audiometry interpretation, and neurological assessments.',
      ],
      actionRequired:
        'Candidates are advised to take at least two 45-minute mock tests weekly to build real-time examination pacing and stamina.',
      contactSupport: 'academic-review@alliedprep.edu',
    },
  },
  {
    id: 'notice-syllabus-textbooks',
    categoryTag: 'SYLLABUS & DIGITAL LIBRARY',
    categoryColor: 'indigo',
    title: 'Revised 4-Year BASLP, BOT & BPT Syllabus & Textbooks Available',
    subtitle:
      'Access verified university textbooks, clinical procedure manuals, and solved previous year papers in our digital library.',
    badge: 'Syllabus 2026',
    date: 'Curriculum Approved',
    bgGradient: 'from-[#22134E] via-[#311A6D] to-[#111A3E]',
    borderColor: 'border-indigo-400/30 hover:border-indigo-400/60',
    accentColor: 'text-indigo-300',
    targetAudience: 'Undergraduate Semesters 1 through 8',
    fullNotice: {
      referenceNumber: 'CURR-REG/2026/BASLP-BPT',
      issuingAuthority: 'National Academic Council for Allied Healthcare',
      effectiveDate: 'Revised 2026-2027 Academic Regulations',
      summary:
        'The revised competence-based curriculum for BASLP, BOT, and BPT incorporates hands-on early clinical exposure, ethical clinical jurisprudence, and evidence-based rehabilitation protocols.',
      keyPoints: [
        'BASLP updated modules: Advanced Pediatric Audiology, Vestibular Evaluation, Cognitive-Communication & Dysphagia.',
        'BPT & BOT core curriculum: Biomechanics of human motion, neuro-rehab robotics, sports injury recovery, and pediatric therapy.',
        'Digital library updated with standard medical reference textbooks and fast page bookmarks.',
        'All chapter summaries include high-yield key takeaway review boxes for rapid revision before exams.',
      ],
      actionRequired:
        'Check the Books section from the main navigation bar to browse prescribed textbooks and resume your reading progress.',
      contactSupport: 'library-curriculum@alliedprep.edu',
    },
  },
];

interface HomeNoticeBannerCarouselProps {
  onNavigateToMCQ?: () => void;
  onNavigateToQuestionBank?: () => void;
  onNavigateToBooks?: () => void;
}

export const HomeNoticeBannerCarousel: React.FC<HomeNoticeBannerCarouselProps> = ({
  onNavigateToMCQ,
  onNavigateToQuestionBank,
  onNavigateToBooks,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeNoticeModal, setActiveNoticeModal] = useState<NoticeBannerItem | null>(null);

  // Touch swipe handling
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const minSwipeDistance = 45;

  const totalBanners = NOTICE_BANNERS.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalBanners);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalBanners) % totalBanners);
  };

  // Automatic slide interval (every 4.5 seconds)
  useEffect(() => {
    if (isPaused || activeNoticeModal) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, activeNoticeModal, totalBanners]);

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartXRef.current || !touchEndXRef.current) return;

    const distance = touchStartXRef.current - touchEndXRef.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const currentBanner = NOTICE_BANNERS[currentIndex];

  const handleBannerAction = (bannerId: string) => {
    if (bannerId.includes('mock') && onNavigateToMCQ) {
      onNavigateToMCQ();
    } else if (bannerId.includes('exam') && onNavigateToQuestionBank) {
      onNavigateToQuestionBank();
    } else if (bannerId.includes('syllabus') && onNavigateToBooks) {
      onNavigateToBooks();
    }
  };

  return (
    <section className="space-y-2.5">
      {/* Header with Title and Manual Next/Prev controls */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-blue-900" />
            <span>Important Notices & Information</span>
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-500 mr-1">
            {currentIndex + 1} of {totalBanners}
          </span>
          <button
            id="banner-prev-btn"
            onClick={handlePrev}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors shadow-xs"
            title="Previous Notice Banner"
            aria-label="Previous Notice"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            id="banner-next-btn"
            onClick={handleNext}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors shadow-xs"
            title="Next Notice Banner"
            aria-label="Next Notice"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Carousel Container */}
      <div
        className="relative overflow-hidden rounded-2xl border transition-all duration-300 shadow-md group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Banner Card */}
        <div
          onClick={() => setActiveNoticeModal(currentBanner)}
          className={`cursor-pointer relative p-5 sm:p-6 text-white bg-gradient-to-br ${currentBanner.bgGradient} border ${currentBanner.borderColor} transition-all duration-500 min-h-[160px] sm:min-h-[175px] flex flex-col justify-between`}
        >
          {/* Subtle Background Glow Accent */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-12 w-44 h-44 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Tag & Badge */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-xs border border-white/15 text-[11px] font-bold tracking-wide text-white">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{currentBanner.categoryTag}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-extrabold text-[11px] shadow-xs">
                {currentBanner.badge}
              </span>
              <span className="hidden sm:inline-block text-[11px] text-white/70 font-medium">
                {currentBanner.date}
              </span>
            </div>
          </div>

          {/* Content Headline & Subtitle */}
          <div className="relative z-10 my-3 space-y-1.5">
            <h4 className="text-base sm:text-lg md:text-xl font-bold font-heading text-white tracking-tight leading-snug group-hover:text-amber-200 transition-colors">
              {currentBanner.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-200/90 line-clamp-2 leading-relaxed font-normal">
              {currentBanner.subtitle}
            </p>
          </div>

          {/* Bottom Action Prompts */}
          <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <div className="flex items-center gap-1 text-[11px] text-slate-300">
              <span>Audience:</span>
              <strong className="text-white font-medium">{currentBanner.targetAudience}</strong>
            </div>

            <div className="inline-flex items-center gap-1.5 font-bold text-amber-300 hover:text-amber-200 group-hover:translate-x-1 transition-transform">
              <span>Tap to see full notice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Carousel Indicators / Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 pointer-events-none">
          {NOTICE_BANNERS.map((banner, idx) => {
            const isActive = idx === currentIndex;
            return (
              <span
                key={banner.id}
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-6 h-1.5 bg-amber-400 shadow-sm'
                    : 'w-1.5 h-1.5 bg-white/40'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Interactive Notice Details Modal ("see manually also") */}
      {activeNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`p-5 sm:p-6 bg-gradient-to-br ${activeNoticeModal.bgGradient} text-white relative`}>
              <button
                id="close-notice-modal-btn"
                onClick={() => setActiveNoticeModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white/90 transition-colors"
                title="Close Notice"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 pr-8">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-[11px] font-bold text-amber-300">
                  <Bell className="w-3 h-3" />
                  <span>{activeNoticeModal.categoryTag}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-white leading-tight">
                  {activeNoticeModal.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200">
                  <span>Ref: {activeNoticeModal.fullNotice.referenceNumber}</span>
                  <span>•</span>
                  <span>{activeNoticeModal.fullNotice.effectiveDate}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed flex-1">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Issuing Authority
                </h4>
                <p className="font-semibold text-slate-900">
                  {activeNoticeModal.fullNotice.issuingAuthority}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Official Bulletin Summary
                </h4>
                <p className="text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  {activeNoticeModal.fullNotice.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Key Academic Instructions & Requirements
                </h4>
                <ul className="space-y-2">
                  {activeNoticeModal.fullNotice.keyPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/90 text-amber-950 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Recommended Action for Candidates</span>
                </div>
                <p className="text-xs text-amber-900/90">
                  {activeNoticeModal.fullNotice.actionRequired}
                </p>
              </div>

              <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100 flex items-center justify-between">
                <span>Support: {activeNoticeModal.fullNotice.contactSupport}</span>
                <span className="font-semibold text-blue-900">Allied Prep Portal</span>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
              <button
                onClick={() => {
                  handleBannerAction(activeNoticeModal.id);
                  setActiveNoticeModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition-all"
              >
                Go to Recommended Section
              </button>
              <button
                onClick={() => setActiveNoticeModal(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-all"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

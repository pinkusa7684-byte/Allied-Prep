import React, { useState } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Search,
  Download,
  Share2,
  Bookmark,
  Printer,
  FileText,
  Clock,
  Award,
  Check,
} from 'lucide-react';
import { QuestionPaper } from '../../types';

interface QuestionPaperViewerProps {
  paper: QuestionPaper;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}

export const QuestionPaperViewer: React.FC<QuestionPaperViewerProps> = ({
  paper,
  isOpen,
  onClose,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalPages = paper.totalPages || 6;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleDownload = () => {
    // Generate text document representation for download
    let textContent = `=========================================================\n`;
    textContent += `ALLIED HEALTH SCIENCES UNIVERSITY EXAMINATION\n`;
    textContent += `${paper.examName} - ${paper.examYear}\n`;
    textContent += `Degree: ${paper.course} (${paper.level}) - ${paper.subject}\n`;
    textContent += `Paper Code: ${paper.paperCode} | Max Marks: ${paper.maxMarks} | Time: ${paper.durationHours} Hours\n`;
    textContent += `=========================================================\n\n`;

    paper.sections.forEach((sec) => {
      textContent += `\n--- ${sec.title} ---\n`;
      textContent += `Instructions: ${sec.instructions}\n\n`;
      sec.questions.forEach((q) => {
        textContent += `${q.qNumber} [${q.marks} Marks]: ${q.text}\n`;
        if (q.subparts) {
          q.subparts.forEach((sp) => {
            textContent += `   - ${sp}\n`;
          });
        }
        textContent += `\n`;
      });
    });

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${paper.paperCode}_${paper.examYear}_Question_Paper.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Question Paper downloaded successfully!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${paper.subject} ${paper.examYear} Paper`,
          text: `Check out the ${paper.examYear} ${paper.subject} previous year university paper on Allied Prep.`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Paper link copied to clipboard!');
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col ${
        isFullScreen ? 'p-0' : 'p-2 sm:p-4'
      }`}
    >
      <div className="bg-slate-900 text-white rounded-2xl flex-1 flex flex-col overflow-hidden shadow-2xl border border-slate-800 max-w-5xl mx-auto w-full">
        {/* PDF Viewer Toolbar */}
        <div className="bg-slate-900 border-b border-slate-800 p-3 sm:px-5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Close Viewer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <h3 className="text-xs sm:text-sm font-bold truncate max-w-xs md:max-w-md">
                {paper.subject} ({paper.examYear})
              </h3>
              <p className="text-[11px] text-slate-400">
                {paper.paperCode} • {paper.pdfSize}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`p-2 rounded-lg text-xs transition-colors ${
                showSearch ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
              }`}
              title="Search in PDF"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Zoom Out */}
            <button
              onClick={() => setZoomLevel((prev) => Math.max(70, prev - 15))}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono text-slate-400 px-1">{zoomLevel}%</span>

            {/* Zoom In */}
            <button
              onClick={() => setZoomLevel((prev) => Math.min(150, prev + 15))}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-700 mx-1" />

            {/* Page Navigation */}
            <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-lg">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-0.5 rounded text-slate-400 hover:text-white disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-300 px-1">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-0.5 rounded text-slate-400 hover:text-white disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

            {/* Download */}
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
              title="Download Paper"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
              title="Share Paper"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Fullscreen */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors hidden sm:inline-flex"
              title="Toggle Fullscreen"
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* In-Document Search Input */}
        {showSearch && (
          <div className="bg-slate-800/90 border-b border-slate-700 px-4 py-2 flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search inside exam paper (e.g. Brachial Plexus, Blood Pressure, Gait)..."
              className="bg-transparent text-xs sm:text-sm text-white focus:outline-none flex-1 placeholder-slate-400"
              autoFocus
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-slate-400 text-xs">
                Clear
              </button>
            )}
          </div>
        )}

        {/* Simulated Document Canvas / PDF Page */}
        <div className="flex-1 bg-slate-950 p-4 sm:p-8 overflow-auto flex justify-center items-start">
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-2xl bg-white text-slate-900 rounded-sm shadow-2xl p-8 sm:p-12 border border-slate-300 transition-transform duration-200"
          >
            {/* Real University Exam Header */}
            <div className="text-center space-y-1.5 border-b-2 border-slate-900 pb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-600">
                National University of Health Sciences
              </h3>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-950 font-serif">
                {paper.course} Degree Examination – {paper.examYear}
              </h2>
              <p className="text-xs font-semibold text-slate-700">
                {paper.subject} ({paper.paperCode})
              </p>
              <div className="flex items-center justify-between text-xs font-semibold pt-2 text-slate-800 border-t border-slate-200 mt-2">
                <span>Time: {paper.durationHours} Hours</span>
                <span>Maximum Marks: {paper.maxMarks}</span>
              </div>
            </div>

            {/* General Instructions */}
            <div className="my-4 p-3 bg-slate-50 border border-slate-200 text-[11px] text-slate-600 rounded">
              <span className="font-bold text-slate-900 block mb-0.5">Instructions to Candidates:</span>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Your answers should be specific to the questions asked.</li>
                <li>Draw neat labeled diagrams wherever necessary.</li>
                <li>Write Section A and Section B in the specified answer books.</li>
              </ul>
            </div>

            {/* Sections & Questions */}
            <div className="space-y-6 pt-2">
              {paper.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-3">
                  <div className="border-b border-slate-300 pb-1">
                    <h4 className="text-xs font-bold uppercase text-slate-950 tracking-wider">
                      {section.title}
                    </h4>
                    <p className="text-[11px] italic text-slate-600">{section.instructions}</p>
                  </div>

                  <div className="space-y-4">
                    {section.questions.map((q, qIdx) => {
                      const matchesSearch =
                        searchQuery.trim() !== '' &&
                        q.text.toLowerCase().includes(searchQuery.toLowerCase());

                      return (
                        <div
                          key={qIdx}
                          className={`p-2 rounded transition-colors ${
                            matchesSearch ? 'bg-amber-100 ring-2 ring-amber-400' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 text-xs sm:text-sm">
                            <span className="font-bold shrink-0">{q.qNumber}.</span>
                            <p className="flex-1 leading-relaxed text-slate-900">{q.text}</p>
                            <span className="font-mono text-xs font-bold text-slate-700 shrink-0">
                              ({q.marks})
                            </span>
                          </div>

                          {q.subparts && (
                            <div className="pl-6 pt-1.5 space-y-0.5 text-xs text-slate-600">
                              {q.subparts.map((sp, spIdx) => (
                                <p key={spIdx}>• {sp}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Document Footer */}
            <div className="mt-12 pt-4 border-t border-slate-300 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>Paper Code: {paper.paperCode}</span>
              <span>*** END OF QUESTION PAPER ***</span>
              <span>Page {currentPage} of {totalPages}</span>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2 border border-slate-700 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

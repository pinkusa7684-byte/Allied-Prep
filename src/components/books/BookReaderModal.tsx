import React, { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Bookmark,
  Share2,
  Download,
  Search,
  BookOpen,
  List,
  Sparkles,
  Check,
  FileText,
} from 'lucide-react';
import { BookMaterial, BookChapter } from '../../types';

interface BookReaderModalProps {
  book: BookMaterial;
  isOpen: boolean;
  onClose: () => void;
  currentPage: number;
  onUpdatePage: (page: number) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}

export const BookReaderModal: React.FC<BookReaderModalProps> = ({
  book,
  isOpen,
  onClose,
  currentPage,
  onUpdatePage,
}) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showToc, setShowToc] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Determine which chapter corresponds to currentPage
  const currentChapter =
    book.chapters.find((ch) => currentPage >= ch.pageStart && currentPage <= ch.pageEnd) ||
    book.chapters[0];

  const handleDownload = () => {
    let content = `=========================================================\n`;
    content += `${book.title.toUpperCase()}\n`;
    content += `Author: ${book.author} | Subject: ${book.subject}\n`;
    content += `Edition: ${book.edition || 'Latest Clinical Edition'} | Total Pages: ${book.totalPages}\n`;
    content += `=========================================================\n\n`;

    book.chapters.forEach((ch) => {
      content += `\n--- CHAPTER ${ch.chapterNumber}: ${ch.title.toUpperCase()} (Pages ${ch.pageStart}-${ch.pageEnd}) ---\n`;
      content += `SUMMARY: ${ch.summary}\n\n`;
      content += `CORE STUDY NOTES:\n`;
      ch.content.forEach((paragraph) => {
        content += `${paragraph}\n\n`;
      });
      content += `HIGH-YIELD CLINICAL POINTS:\n`;
      ch.keyPoints.forEach((kp) => {
        content += `* ${kp}\n`;
      });
      content += `\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${book.title.replace(/\s+/g, '_')}_Study_Notes.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Book study notes downloaded!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: book.title,
          text: `Studying ${book.title} by ${book.author} on Allied Prep.`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Book reference copied to clipboard!');
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex flex-col ${
        isFullScreen ? 'p-0' : 'p-2 sm:p-4'
      }`}
    >
      <div className="bg-slate-900 text-white rounded-2xl flex-1 flex flex-col overflow-hidden shadow-2xl border border-slate-800 max-w-5xl mx-auto w-full">
        {/* PDF Reader Toolbar */}
        <div className="bg-slate-900 border-b border-slate-800 p-3 sm:px-5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Close Reader"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <h3 className="text-xs sm:text-sm font-bold truncate max-w-xs md:max-w-md">
                {book.title}
              </h3>
              <p className="text-[11px] text-slate-400">
                {book.author} • {book.subject}
              </p>
            </div>
          </div>

          {/* Reader Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Table of Contents Button */}
            <button
              onClick={() => setShowToc(!showToc)}
              className={`p-2 rounded-lg text-xs transition-colors flex items-center gap-1 ${
                showToc ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
              }`}
              title="Table of Contents"
            >
              <List className="w-4 h-4" />
              <span className="text-xs hidden md:inline">Index</span>
            </button>

            {/* In-Book Search */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`p-2 rounded-lg text-xs transition-colors ${
                showSearch ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
              }`}
              title="Search Book"
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
              onClick={() => setZoomLevel((prev) => Math.min(140, prev + 15))}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-700 mx-1" />

            {/* Page Navigator ("Page 126 of 850") */}
            <div className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg">
              <button
                onClick={() => onUpdatePage(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
                className="p-0.5 rounded text-slate-400 hover:text-white disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-200 px-1 font-semibold">
                Page {currentPage} of {book.totalPages}
              </span>
              <button
                onClick={() => onUpdatePage(Math.min(book.totalPages, currentPage + 1))}
                disabled={currentPage >= book.totalPages}
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
              title="Download Notes"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
              title="Share Book"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Fullscreen */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors hidden sm:inline-flex"
              title="Fullscreen"
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* In-Book Search Input Bar */}
        {showSearch && (
          <div className="bg-slate-800/95 border-b border-slate-700 px-4 py-2 flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts in book (e.g. Brachial plexus, Action potential, Gait cycle)..."
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

        {/* Reader Layout: Optional TOC Sidebar + Page Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* TOC Sidebar */}
          {showToc && (
            <div className="w-64 bg-slate-850 border-r border-slate-800 p-4 overflow-y-auto space-y-3 shrink-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Table of Contents
              </h4>
              <div className="space-y-1.5">
                {book.chapters.map((ch) => {
                  const isCurrent = currentChapter?.chapterNumber === ch.chapterNumber;
                  return (
                    <button
                      key={ch.chapterNumber}
                      onClick={() => {
                        onUpdatePage(ch.pageStart);
                        setShowToc(false);
                      }}
                      className={`w-full p-2 rounded-xl text-left text-xs transition-all flex items-start gap-2 ${
                        isCurrent
                          ? 'bg-blue-900 text-white font-semibold'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-mono text-slate-400 shrink-0">Ch {ch.chapterNumber}.</span>
                      <div className="flex-1">
                        <p className="line-clamp-2 leading-tight">{ch.title}</p>
                        <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                          p. {ch.pageStart} - {ch.pageEnd}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Book Content Canvas */}
          <div className="flex-1 bg-slate-950 p-4 sm:p-8 overflow-y-auto flex justify-center items-start">
            <div
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              className="w-full max-w-2xl bg-[#FFFDF9] text-slate-900 rounded-sm shadow-2xl p-8 sm:p-14 border border-amber-100 transition-transform duration-200 font-serif leading-relaxed"
            >
              {/* Header inside textbook page */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs font-sans text-slate-400 font-medium">
                <span>{book.title}</span>
                <span>
                  CHAPTER {currentChapter?.chapterNumber || 1}: {currentChapter?.title}
                </span>
              </div>

              {/* Chapter Title Banner */}
              <div className="py-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-900 font-sans block">
                  Chapter {currentChapter?.chapterNumber || 1}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-950">
                  {currentChapter?.title}
                </h2>
                <div className="p-3 bg-amber-50/70 border-l-4 border-amber-400 rounded-r-lg text-xs font-sans text-amber-950">
                  <span className="font-bold block mb-0.5">Chapter Summary:</span>
                  <p>{currentChapter?.summary}</p>
                </div>
              </div>

              {/* Main Reading Text */}
              <div className="space-y-4 text-sm sm:text-base text-slate-800 leading-relaxed font-serif">
                {currentChapter?.content.map((paragraph, pIdx) => {
                  const matchesSearch =
                    searchQuery.trim() !== '' &&
                    paragraph.toLowerCase().includes(searchQuery.toLowerCase());

                  return (
                    <p
                      key={pIdx}
                      className={`transition-colors ${
                        matchesSearch ? 'bg-amber-200 px-1 py-0.5 rounded' : ''
                      }`}
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Key Clinical Pearls Box */}
              {currentChapter?.keyPoints && currentChapter.keyPoints.length > 0 && (
                <div className="mt-8 p-5 bg-blue-50/60 border border-blue-200 rounded-xl space-y-2 font-sans">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-900">
                    <Sparkles className="w-4 h-4 text-blue-800" />
                    <span>Clinical Correlation & High-Yield Points:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {currentChapter.keyPoints.map((pt, ptIdx) => (
                      <li key={ptIdx} className="flex items-start gap-2">
                        <span className="text-blue-900 font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Page Footer */}
              <div className="mt-12 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-sans text-slate-400">
                <span>{book.edition || 'Clinical Edition'}</span>
                <span className="font-bold text-slate-700">Page {currentPage}</span>
                <span>{book.subject}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Toast */}
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

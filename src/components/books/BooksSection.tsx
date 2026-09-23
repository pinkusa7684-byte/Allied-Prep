import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Bookmark,
  ArrowRight,
  Sparkles,
  BookMarked,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { BookMaterial, CourseId, Level } from '../../types';
import { BookReaderModal } from './BookReaderModal';

interface BooksSectionProps {
  books: BookMaterial[];
  activeCourse: CourseId;
  activeLevel: Level;
  bookmarkedBookIds: string[];
  onToggleBookmarkBook: (bookId: string) => void;
  readingProgress: Record<string, number>;
  onUpdateReadingProgress: (bookId: string, page: number) => void;
}

export const BooksSection: React.FC<BooksSectionProps> = ({
  books,
  activeCourse,
  activeLevel,
  bookmarkedBookIds,
  onToggleBookmarkBook,
  readingProgress,
  onUpdateReadingProgress,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [activeReadingBook, setActiveReadingBook] = useState<BookMaterial | null>(null);

  // Collect distinct subjects
  const subjects = useMemo(() => {
    const set = new Set<string>();
    books.forEach((b) => set.add(b.subject));
    return ['all', ...Array.from(set)];
  }, [books]);

  // Filter books
  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const matchSearch =
        searchQuery.trim() === '' ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.subject.toLowerCase().includes(searchQuery.toLowerCase());

      const matchSubject =
        selectedSubjectFilter === 'all' || b.subject === selectedSubjectFilter;

      return matchSearch && matchSubject;
    });
  }, [books, searchQuery, selectedSubjectFilter]);

  // Get most recently read book for "Continue Reading"
  const continueReadingBook = useMemo(() => {
    const bookWithProgress = books.find((b) => (readingProgress[b.id] || 0) > 0);
    return bookWithProgress || books[0];
  }, [books, readingProgress]);

  const continuePage = continueReadingBook ? readingProgress[continueReadingBook.id] || 1 : 1;

  // Helper for stylized vector academic book cover styling
  const getCoverStyles = (theme: BookMaterial['coverTheme']) => {
    switch (theme) {
      case 'emerald':
        return 'from-emerald-900 via-emerald-800 to-teal-950 border-emerald-700 text-emerald-200';
      case 'amber':
        return 'from-amber-900 via-amber-800 to-orange-950 border-amber-700 text-amber-200';
      case 'crimson':
        return 'from-rose-900 via-rose-800 to-red-950 border-rose-700 text-rose-200';
      case 'indigo':
        return 'from-indigo-900 via-indigo-800 to-blue-950 border-indigo-700 text-indigo-200';
      case 'purple':
        return 'from-purple-900 via-purple-800 to-fuchsia-950 border-purple-700 text-purple-200';
      case 'blue':
      default:
        return 'from-blue-950 via-blue-900 to-slate-900 border-blue-700 text-blue-200';
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Continue Reading Highlight Card */}
      {continueReadingBook && (
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-blue-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-16 rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 border border-blue-500 shadow-md flex flex-col items-center justify-center text-center p-1 shrink-0">
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300 line-clamp-1">
                {continueReadingBook.subject}
              </span>
              <BookOpen className="w-5 h-5 text-white my-1" />
              <span className="text-[8px] font-mono text-blue-200">PDF</span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                Continue Reading
              </span>
              <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                {continueReadingBook.title}
              </h3>
              <p className="text-xs text-blue-200">
                Page {continuePage} of {continueReadingBook.totalPages} • {continueReadingBook.subject}
              </p>
            </div>
          </div>

          <button
            id="continue-reading-banner-btn"
            onClick={() => setActiveReadingBook(continueReadingBook)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md transition-all active:scale-95 shrink-0"
          >
            <span>Resume Reading</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Search */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              📚 Books & Study Materials
            </h2>
            <p className="text-xs text-slate-500">
              Standard medical textbooks & high-yield reference literature
            </p>
          </div>

          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, authors..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Subject:
          </span>
          {subjects.map((subj) => (
            <button
              key={subj}
              onClick={() => setSelectedSubjectFilter(subj)}
              className={`px-3 py-1 rounded-lg capitalize font-medium transition-all shrink-0 ${
                selectedSubjectFilter === subj
                  ? 'bg-blue-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {subj === 'all' ? 'All Subjects' : subj}
            </button>
          ))}
        </div>
      </div>

      {/* 2 × 2 Professional Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredBooks.map((book) => {
          const isBookmarked = bookmarkedBookIds.includes(book.id);
          const currentProgressPage = readingProgress[book.id] || 0;
          const progressPct =
            currentProgressPage > 0
              ? Math.round((currentProgressPage / book.totalPages) * 100)
              : 0;

          return (
            <div
              key={book.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:border-blue-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-start gap-4">
                {/* Book Cover */}
                <div
                  className={`w-20 h-28 rounded-xl bg-gradient-to-br ${getCoverStyles(
                    book.coverTheme
                  )} border shadow-md flex flex-col justify-between p-2.5 shrink-0 transition-transform group-hover:scale-102`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-amber-300 truncate">
                      {book.subject}
                    </span>
                    <span className="text-[7px] font-mono px-1 py-0.2 rounded bg-white/20 text-white">
                      PDF
                    </span>
                  </div>

                  <div className="text-center my-auto">
                    <p className="text-[10px] font-bold font-serif text-white line-clamp-3 leading-tight">
                      {book.title}
                    </p>
                  </div>

                  <div className="text-[7px] font-mono opacity-75 truncate text-slate-300">
                    {book.edition || 'Allied Ed.'}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                      {book.subject}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 font-heading leading-snug line-clamp-2">
                    {book.title}
                  </h3>

                  <p className="text-xs text-slate-500 truncate">{book.author}</p>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                    <span className="font-semibold text-slate-700">PDF • {book.totalPages} pages</span>
                    <span>•</span>
                    <span>{book.chapters.length} Chapters</span>
                  </div>

                  {currentProgressPage > 0 && (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Read: p. {currentProgressPage}</span>
                        <span>{progressPct}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-blue-900 rounded-full"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  id={`open-book-btn-${book.id}`}
                  onClick={() => setActiveReadingBook(book)}
                  className="w-full inline-flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50 group-hover:bg-blue-900 text-slate-800 group-hover:text-white text-xs font-bold transition-all active:scale-98"
                >
                  <span>{currentProgressPage > 0 ? 'Continue Reading' : 'Open Textbook'}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Book Reader Modal */}
      {activeReadingBook && (
        <BookReaderModal
          book={activeReadingBook}
          isOpen={!!activeReadingBook}
          onClose={() => setActiveReadingBook(null)}
          currentPage={readingProgress[activeReadingBook.id] || 1}
          onUpdatePage={(page) => onUpdateReadingProgress(activeReadingBook.id, page)}
          isBookmarked={bookmarkedBookIds.includes(activeReadingBook.id)}
          onToggleBookmark={() => onToggleBookmarkBook(activeReadingBook.id)}
        />
      )}
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  FileQuestion,
  BookMarked,
  BookOpen,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import { MCQQuestion, QuestionPaper, BookMaterial, SubjectTopic } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  mcqs: MCQQuestion[];
  topics: SubjectTopic[];
  papers: QuestionPaper[];
  books: BookMaterial[];
  onSelectTopic: (topic: SubjectTopic) => void;
  onSelectPaper: (paper: QuestionPaper) => void;
  onSelectBook: (book: BookMaterial) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  mcqs,
  topics,
  papers,
  books,
  onSelectTopic,
  onSelectPaper,
  onSelectBook,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const query = searchQuery.trim().toLowerCase();

  // Search MCQs
  const matchedMCQs = useMemo(() => {
    if (!query) return [];
    return mcqs.filter(
      (m) =>
        m.question.toLowerCase().includes(query) ||
        m.topic.toLowerCase().includes(query) ||
        m.subject.toLowerCase().includes(query) ||
        m.options.some((o) => o.text.toLowerCase().includes(query))
    );
  }, [mcqs, query]);

  // Search Topics
  const matchedTopics = useMemo(() => {
    if (!query) return [];
    return topics.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.subject.toLowerCase().includes(query)
    );
  }, [topics, query]);

  // Search Papers
  const matchedPapers = useMemo(() => {
    if (!query) return [];
    return papers.filter(
      (p) =>
        p.subject.toLowerCase().includes(query) ||
        p.examName.toLowerCase().includes(query) ||
        p.examYear.toString().includes(query) ||
        p.paperCode.toLowerCase().includes(query)
    );
  }, [papers, query]);

  // Search Books
  const matchedBooks = useMemo(() => {
    if (!query) return [];
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        b.subject.toLowerCase().includes(query) ||
        b.chapters.some((ch) => ch.title.toLowerCase().includes(query))
    );
  }, [books, query]);

  const totalResults =
    matchedMCQs.length + matchedTopics.length + matchedPapers.length + matchedBooks.length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-6 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh]">
        {/* Search Input Header */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-900 shrink-0" />
          <input
            id="global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions, topics, papers, or books (e.g. Brachial Plexus, Deltoid, Gait)..."
            className="w-full text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded text-slate-400 hover:text-slate-600 text-xs font-semibold"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        {!query && (
          <div className="p-4 bg-slate-50 border-b border-slate-100 text-xs text-slate-600 space-y-2">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Brachial Plexus',
                'Deltoid',
                'Gait Analysis',
                'Sensory Integration',
                'Erb\'s Palsy',
                'Blood Pressure',
                'Trendelenburg',
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-blue-900 hover:text-blue-900 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Container */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {query && totalResults === 0 && (
            <div className="text-center py-12 space-y-3">
              <Search className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">No matching content found</h4>
              <p className="text-xs text-slate-500">
                Try searching for specific anatomical terms, clinical conditions, or exam years.
              </p>
            </div>
          )}

          {/* 1. Topics */}
          {matchedTopics.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-blue-900">
                  <Layers className="w-4 h-4" /> Syllabus Topics ({matchedTopics.length})
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedTopics.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onSelectTopic(t);
                      onClose();
                    }}
                    className="p-3 rounded-xl border border-slate-200 hover:border-blue-900 text-left transition-all flex items-center justify-between group bg-slate-50/50 hover:bg-slate-50"
                  >
                    <div>
                      <span className="text-xs font-semibold text-blue-800">{t.subject}</span>
                      <h5 className="text-sm font-bold text-slate-900 font-heading">{t.name}</h5>
                      <span className="text-[11px] text-slate-500">{t.questionCount} Questions</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. MCQs */}
          {matchedMCQs.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-blue-900">
                  <FileQuestion className="w-4 h-4" /> MCQs ({matchedMCQs.length} Questions)
                </span>
              </div>
              <div className="space-y-2">
                {matchedMCQs.slice(0, 4).map((q) => (
                  <div
                    key={q.id}
                    className="p-3 rounded-xl border border-slate-200 bg-white space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between text-slate-500 text-[11px]">
                      <span className="font-semibold text-blue-900">
                        {q.subject} • {q.topic}
                      </span>
                      <span>Key: {q.correctAnswer}</span>
                    </div>
                    <p className="font-bold text-slate-900 text-xs sm:text-sm">{q.question}</p>
                    <p className="text-slate-600 line-clamp-1 text-[11px]">{q.explanation}</p>
                  </div>
                ))}
                {matchedMCQs.length > 4 && (
                  <p className="text-xs text-slate-500 text-center font-medium">
                    + {matchedMCQs.length - 4} more questions matched
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 3. Question Bank Papers */}
          {matchedPapers.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-emerald-800">
                  <BookMarked className="w-4 h-4" /> Question Bank Papers ({matchedPapers.length})
                </span>
              </div>
              <div className="space-y-2">
                {matchedPapers.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectPaper(p);
                      onClose();
                    }}
                    className="w-full p-3 rounded-xl border border-slate-200 hover:border-emerald-700 text-left transition-all flex items-center justify-between group bg-emerald-50/20"
                  >
                    <div>
                      <span className="text-xs font-bold text-emerald-800 font-mono">
                        {p.examYear} • {p.paperCode}
                      </span>
                      <h5 className="text-sm font-bold text-slate-900 font-heading">
                        {p.subject} ({p.examName})
                      </h5>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-800">
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. Books */}
          {matchedBooks.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-indigo-900">
                  <BookOpen className="w-4 h-4" /> Reference Books ({matchedBooks.length})
                </span>
              </div>
              <div className="space-y-2">
                {matchedBooks.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      onSelectBook(b);
                      onClose();
                    }}
                    className="w-full p-3 rounded-xl border border-slate-200 hover:border-indigo-800 text-left transition-all flex items-center justify-between group bg-indigo-50/20"
                  >
                    <div>
                      <span className="text-xs font-bold text-indigo-900">{b.subject}</span>
                      <h5 className="text-sm font-bold text-slate-900 font-heading">{b.title}</h5>
                      <p className="text-xs text-slate-500">{b.author} • {b.totalPages} Pages</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-indigo-900">
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

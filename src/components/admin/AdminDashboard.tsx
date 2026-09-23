import React, { useState } from 'react';
import {
  ShieldCheck,
  PlusCircle,
  FileText,
  BookOpen,
  Trash2,
  Check,
  X,
  Layers,
  ArrowLeft,
  Sparkles,
  Search,
} from 'lucide-react';
import {
  MCQQuestion,
  QuestionPaper,
  BookMaterial,
  Level,
  CourseId,
  YearId,
  SemesterId,
  CourseInfo,
} from '../../types';

interface AdminDashboardProps {
  courses: CourseInfo[];
  mcqs: MCQQuestion[];
  papers: QuestionPaper[];
  books: BookMaterial[];
  onAddMCQ: (question: MCQQuestion) => void;
  onDeleteMCQ: (id: string) => void;
  onAddPaper: (paper: QuestionPaper) => void;
  onDeletePaper: (id: string) => void;
  onAddBook: (book: BookMaterial) => void;
  onDeleteBook: (id: string) => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  courses,
  mcqs,
  papers,
  books,
  onAddMCQ,
  onDeleteMCQ,
  onAddPaper,
  onDeletePaper,
  onAddBook,
  onDeleteBook,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'mcq' | 'paper' | 'book' | 'manage'>('mcq');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New MCQ form state
  const [level, setLevel] = useState<Level>('UG');
  const [course, setCourse] = useState<CourseId>('BPT');
  const [year, setYear] = useState<YearId>('first');
  const [semester, setSemester] = useState<SemesterId>('sem1');
  const [subject, setSubject] = useState('Anatomy');
  const [topic, setTopic] = useState('Upper Limb');
  const [questionText, setQuestionText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctKey, setCorrectKey] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [explanation, setExplanation] = useState('');

  // New Paper form state
  const [paperCode, setPaperCode] = useState('BPT-101');
  const [paperSubject, setPaperSubject] = useState('Anatomy');
  const [examName, setExamName] = useState('End Semester Examination');
  const [examYear, setExamYear] = useState(2026);
  const [paperLevel, setPaperLevel] = useState<Level>('UG');
  const [paperCourse, setPaperCourse] = useState<CourseId>('BPT');

  // New Book form state
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookSubject, setBookSubject] = useState('Anatomy');
  const [bookPages, setBookPages] = useState(450);
  const [bookTheme, setBookTheme] = useState<BookMaterial['coverTheme']>('blue');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCreateMCQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText || !optA || !optB || !optC || !optD) {
      alert('Please fill all options and the question prompt.');
      return;
    }

    const newMCQ: MCQQuestion = {
      id: `mcq-custom-${Date.now()}`,
      level,
      course,
      year,
      semester,
      subject,
      topic,
      question: questionText,
      options: [
        { id: 'A', text: optA },
        { id: 'B', text: optB },
        { id: 'C', text: optC },
        { id: 'D', text: optD },
      ],
      correctAnswer: correctKey,
      explanation: explanation || 'Standard clinical curriculum rationale.',
      difficulty: 'Medium',
    };

    onAddMCQ(newMCQ);
    setQuestionText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setExplanation('');
    showToast('MCQ added to curriculum database!');
  };

  const handleCreatePaper = (e: React.FormEvent) => {
    e.preventDefault();
    const newPaper: QuestionPaper = {
      id: `paper-custom-${Date.now()}`,
      course: paperCourse,
      level: paperLevel,
      year: 'first',
      semester: 'sem1',
      subject: paperSubject,
      examYear,
      examName,
      paperCode,
      pdfSize: '1.4 MB',
      totalPages: 6,
      maxMarks: 100,
      durationHours: 3,
      sections: [
        {
          title: 'Section A: Clinical Short Essays',
          instructions: 'Answer any five of the following questions (5 x 10 = 50 Marks)',
          questions: [
            {
              qNumber: '1',
              text: `Discuss the anatomy and clinical relations of the relevant structures in ${paperSubject}.`,
              marks: 10,
            },
          ],
        },
      ],
    };

    onAddPaper(newPaper);
    showToast('Question Paper published!');
  };

  const handleCreateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle || !bookAuthor) return;

    const newBook: BookMaterial = {
      id: `book-custom-${Date.now()}`,
      title: bookTitle,
      author: bookAuthor,
      subject: bookSubject,
      level: 'UG',
      course: 'BPT',
      pdfSize: '18.2 MB',
      totalPages: Number(bookPages),
      coverTheme: bookTheme,
      chapters: [
        {
          chapterNumber: 1,
          title: `Foundations of ${bookSubject}`,
          pageStart: 1,
          pageEnd: 45,
          summary: `Comprehensive introductory principles for Allied Health Sciences.`,
          content: [
            `This volume covers systematic clinical concepts in ${bookSubject}, intended for undergraduate and postgraduate allied healthcare students.`,
          ],
          keyPoints: ['Comprehensive coverage according to university guidelines.'],
        },
      ],
    };

    onAddBook(newBook);
    setBookTitle('');
    setBookAuthor('');
    showToast('Textbook added to library!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Admin Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-heading">
                Allied Prep Content Management System
              </h3>
              <p className="text-xs text-slate-400">
                Academic Portal for Question Banks, MCQs & Textbooks
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 p-2 flex items-center gap-2 border-b border-slate-200 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('mcq')}
            className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'mcq' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:bg-white/50'
            }`}
          >
            + Add MCQ
          </button>
          <button
            onClick={() => setActiveTab('paper')}
            className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'paper' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:bg-white/50'
            }`}
          >
            + Upload Question Paper
          </button>
          <button
            onClick={() => setActiveTab('book')}
            className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'book' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:bg-white/50'
            }`}
          >
            + Upload Textbook
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'manage' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:bg-white/50'
            }`}
          >
            Manage Existing Content ({mcqs.length} MCQs, {papers.length} Papers)
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: ADD MCQ */}
          {activeTab === 'mcq' && (
            <form onSubmit={handleCreateMCQ} className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as Level)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="UG">UG</option>
                    <option value="PG">PG</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Course</label>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value as CourseId)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value as YearId)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="first">First Year</option>
                    <option value="second">Second Year</option>
                    <option value="third">Third Year</option>
                    <option value="final">Final Year</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Semester</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value as SemesterId)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="sem1">1st Semester</option>
                    <option value="sem2">2nd Semester</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                    placeholder="e.g. Anatomy, Physiology, Biomechanics"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Topic</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                    placeholder="e.g. Upper Limb, Muscle Physiology"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-slate-700 block">Question Prompt</label>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="e.g. Which muscle is the primary abductor of the shoulder beyond 15 degrees?"
                  rows={2}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                  required
                />
              </div>

              {/* 4 Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Option A</label>
                  <input
                    type="text"
                    value={optA}
                    onChange={(e) => setOptA(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                    placeholder="Option A text"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Option B</label>
                  <input
                    type="text"
                    value={optB}
                    onChange={(e) => setOptB(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                    placeholder="Option B text"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Option C</label>
                  <input
                    type="text"
                    value={optC}
                    onChange={(e) => setOptC(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                    placeholder="Option C text"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Option D</label>
                  <input
                    type="text"
                    value={optD}
                    onChange={(e) => setOptD(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                    placeholder="Option D text"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Correct Answer</label>
                  <select
                    value={correctKey}
                    onChange={(e) => setCorrectKey(e.target.value as any)}
                    className="w-full p-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-950 font-bold"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Explanation / Clinical Rationale
                  </label>
                  <input
                    type="text"
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    placeholder="Brief explanation for students..."
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-md flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Save MCQ to Database</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: UPLOAD QUESTION PAPER */}
          {activeTab === 'paper' && (
            <form onSubmit={handleCreatePaper} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <input
                    type="text"
                    value={paperSubject}
                    onChange={(e) => setPaperSubject(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Paper Code</label>
                  <input
                    type="text"
                    value={paperCode}
                    onChange={(e) => setPaperCode(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Exam Year</label>
                  <input
                    type="number"
                    value={examYear}
                    onChange={(e) => setExamYear(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Exam Title</label>
                <input
                  type="text"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200"
                  placeholder="e.g. End Semester University Examination"
                  required
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-center space-y-2">
                <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                <span className="font-bold text-slate-800 block">Upload Document (PDF)</span>
                <p className="text-[11px] text-slate-500">
                  Document formatted to university template standards automatically.
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-md"
                >
                  Publish Question Paper
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: UPLOAD BOOK */}
          {activeTab === 'book' && (
            <form onSubmit={handleCreateBook} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Book Title</label>
                  <input
                    type="text"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    placeholder="e.g. Clinical Kinesiology and Biomechanics"
                    className="w-full p-2 rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Author(s)</label>
                  <input
                    type="text"
                    value={bookAuthor}
                    onChange={(e) => setBookAuthor(e.target.value)}
                    placeholder="e.g. Cynthia C. Norkin"
                    className="w-full p-2 rounded-xl border border-slate-200"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <input
                    type="text"
                    value={bookSubject}
                    onChange={(e) => setBookSubject(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Total Pages</label>
                  <input
                    type="number"
                    value={bookPages}
                    onChange={(e) => setBookPages(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cover Theme</label>
                  <select
                    value={bookTheme}
                    onChange={(e) => setBookTheme(e.target.value as any)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="blue">Blue (Anatomy)</option>
                    <option value="emerald">Emerald (Physiology)</option>
                    <option value="amber">Amber (Biomechanics)</option>
                    <option value="crimson">Crimson (Psychology)</option>
                    <option value="indigo">Indigo (Exercise Therapy)</option>
                    <option value="purple">Purple (Electrotherapy)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs shadow-md"
                >
                  Save Textbook to Library
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: MANAGE CONTENT */}
          {activeTab === 'manage' && (
            <div className="space-y-6">
              {/* Manage MCQs */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  MCQs ({mcqs.length})
                </h4>
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                  {mcqs.map((q) => (
                    <div
                      key={q.id}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-blue-900">
                          {q.course} • {q.subject}
                        </span>
                        <p className="font-semibold text-slate-900 truncate">{q.question}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm('Delete this MCQ?')) {
                            onDeleteMCQ(q.id);
                            showToast('MCQ deleted.');
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete MCQ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Manage Papers */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Question Papers ({papers.length})
                </h4>
                <div className="space-y-2">
                  {papers.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-emerald-800">
                          {p.examYear} • {p.paperCode}
                        </span>
                        <p className="font-semibold text-slate-900 truncate">
                          {p.subject} ({p.examName})
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm('Delete this question paper?')) {
                            onDeletePaper(p.id);
                            showToast('Question paper deleted.');
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete Paper"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Toast */}
        {toastMessage && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2 border border-slate-700 animate-fadeIn z-50">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  TabType,
  CourseId,
  Level,
  SubjectTopic,
  MCQQuestion,
  QuestionPaper,
  BookMaterial,
  MockTestResultData,
  UserProfile,
  UserProgressState,
  AuthUser,
} from './types';
import {
  INITIAL_COURSES,
  INITIAL_TOPICS,
  loadStoredMCQs,
  saveStoredMCQs,
  loadStoredPapers,
  saveStoredPapers,
  loadStoredBooks,
  saveStoredBooks,
  loadStoredProfile,
  saveStoredProfile,
  loadStoredProgress,
  saveStoredProgress,
  loadStoredBookmarks,
  saveStoredBookmarks,
  loadStoredMockTests,
  saveStoredMockTests,
  loadStoredReadingProgress,
  saveStoredReadingProgress,
  loadCurrentUser,
  saveCurrentUser,
  loadRegisteredUsers,
  saveRegisteredUsers,
  BookmarksData,
} from './data/initialData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { MCQFlow } from './components/mcq/MCQFlow';
import { MCQPracticeScreen } from './components/mcq/MCQPracticeScreen';
import { MockTestModal } from './components/mcq/MockTestModal';
import { QuestionBankFlow } from './components/questionBank/QuestionBankFlow';
import { QuestionPaperViewer } from './components/questionBank/QuestionPaperViewer';
import { BooksSection } from './components/books/BooksSection';
import { BookReaderModal } from './components/books/BookReaderModal';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { AuthModal } from './components/auth/AuthModal';

export default function App() {
  // Navigation & Hierarchy State
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedLevel, setSelectedLevel] = useState<Level>('UG');
  const [selectedCourse, setSelectedCourse] = useState<CourseId>('BPT');

  // Candidate Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => loadCurrentUser());
  const [registeredUsers, setRegisteredUsers] = useState<AuthUser[]>(() => loadRegisteredUsers());
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  // Stored Data State
  const [mcqs, setMcqs] = useState<MCQQuestion[]>(() => loadStoredMCQs());
  const [papers, setPapers] = useState<QuestionPaper[]>(() => loadStoredPapers());
  const [books, setBooks] = useState<BookMaterial[]>(() => loadStoredBooks());
  const [userProfile, setUserProfile] = useState<UserProfile>(() => loadStoredProfile());
  const [userProgress, setUserProgress] = useState<UserProgressState>(() => loadStoredProgress());
  const [bookmarks, setBookmarks] = useState<BookmarksData>(() => loadStoredBookmarks());
  const [mockTests, setMockTests] = useState<MockTestResultData[]>(() => loadStoredMockTests());
  const [readingProgress, setReadingProgress] = useState<Record<string, number>>(() => loadStoredReadingProgress());

  // Interactive Modal / Screen States
  const [activePracticeTopic, setActivePracticeTopic] = useState<SubjectTopic | null>(null);
  const [isMockTestOpen, setIsMockTestOpen] = useState(false);
  const [mockTestConfig, setMockTestConfig] = useState<{
    count?: number;
    scope?: 'random' | 'topic' | 'semester' | 'full';
    topicId?: string;
  }>({ count: 25, scope: 'semester' });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Quick viewer states for search shortcuts & bookmarks
  const [quickViewingPaper, setQuickViewingPaper] = useState<QuestionPaper | null>(null);
  const [quickReadingBook, setQuickReadingBook] = useState<BookMaterial | null>(null);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    saveStoredMCQs(mcqs);
  }, [mcqs]);

  useEffect(() => {
    saveStoredPapers(papers);
  }, [papers]);

  useEffect(() => {
    saveStoredBooks(books);
  }, [books]);

  useEffect(() => {
    saveStoredProfile(userProfile);
  }, [userProfile]);

  useEffect(() => {
    saveStoredProgress(userProgress);
  }, [userProgress]);

  useEffect(() => {
    saveStoredBookmarks(bookmarks);
  }, [bookmarks]);

  useEffect(() => {
    saveStoredMockTests(mockTests);
  }, [mockTests]);

  useEffect(() => {
    saveStoredReadingProgress(readingProgress);
  }, [readingProgress]);

  useEffect(() => {
    if (currentUser) {
      saveCurrentUser(currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    saveRegisteredUsers(registeredUsers);
  }, [registeredUsers]);

  // Toast helper
  const triggerNotification = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  // Auth handler
  const handleAuthSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setUserProfile((prev) => ({
      ...prev,
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      course: user.course || prev.course,
    }));
    if (user.course) {
      setSelectedCourse(user.course);
    }
    triggerNotification(`Logged in successfully as ${user.name}`);
  };

  const handleRegisterUser = (newUser: AuthUser) => {
    setRegisteredUsers((prev) => {
      const filtered = prev.filter((u) => u.mobileNumber !== newUser.mobileNumber);
      return [newUser, ...filtered];
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    saveCurrentUser(null);
    setActiveTab('home');
    triggerNotification('Logged out from Candidate Account.');
  };

  // Handler for practicing MCQs
  const handleStartPractice = (topic: SubjectTopic) => {
    setActivePracticeTopic(topic);
    setActiveTab('mcq');
  };

  // Handler for recording answer in practice mode
  const handleRecordAnswer = (questionId: string, selectedOption: string, isCorrect: boolean) => {
    setUserProgress((prev) => {
      const newAttempted = (prev.questionsAttempted || 0) + 1;
      const newCorrect = (prev.correctAnswers || 0) + (isCorrect ? 1 : 0);
      const newAccuracy = Math.round((newCorrect / newAttempted) * 100);
      return {
        ...prev,
        questionsAttempted: newAttempted,
        correctAnswers: newCorrect,
        totalPracticed: newAttempted,
        accuracyRate: newAccuracy,
        answeredQuestionRecords: {
          ...prev.answeredQuestionRecords,
          [questionId]: {
            selected: selectedOption as 'A' | 'B' | 'C' | 'D',
            isCorrect,
            timestamp: Date.now(),
          },
        },
      };
    });
  };

  // Bookmark handlers
  const handleToggleBookmarkQuestion = (questionId: string) => {
    setBookmarks((prev) => {
      const exists = prev.questionIds.includes(questionId);
      const updated = exists
        ? prev.questionIds.filter((id: string) => id !== questionId)
        : [...prev.questionIds, questionId];
      return { ...prev, questionIds: updated };
    });
  };

  const handleToggleBookmarkPaper = (paperId: string) => {
    setBookmarks((prev) => {
      const exists = prev.paperIds.includes(paperId);
      const updated = exists
        ? prev.paperIds.filter((id: string) => id !== paperId)
        : [...prev.paperIds, paperId];
      return { ...prev, paperIds: updated };
    });
  };

  const handleToggleBookmarkBook = (bookId: string) => {
    setBookmarks((prev) => {
      const exists = prev.bookIds.includes(bookId);
      const updated = exists
        ? prev.bookIds.filter((id: string) => id !== bookId)
        : [...prev.bookIds, bookId];
      return { ...prev, bookIds: updated };
    });
  };

  // Mock test completion handler
  const handleSaveMockTestResult = (result: MockTestResultData) => {
    setMockTests((prev) => [result, ...prev]);
    setUserProgress((prev) => {
      const newCompleted = (prev.testsCompleted || 0) + 1;
      const newAttempted = (prev.questionsAttempted || 0) + result.totalQuestions;
      const newCorrect = (prev.correctAnswers || 0) + result.correct;
      const newAccuracy = Math.round((newCorrect / newAttempted) * 100);
      return {
        ...prev,
        testsCompleted: newCompleted,
        testsAttempted: newCompleted,
        questionsAttempted: newAttempted,
        totalPracticed: newAttempted,
        correctAnswers: newCorrect,
        accuracyRate: newAccuracy,
        mockTestHistory: [result, ...prev.mockTestHistory],
      };
    });
  };

  // Reading progress update
  const handleUpdateReadingProgress = (bookId: string, page: number) => {
    setReadingProgress((prev) => ({
      ...prev,
      [bookId]: page,
    }));
  };

  // Filter questions for active practice session
  const activeTopicQuestions = activePracticeTopic
    ? mcqs.filter((q) => q.topic.toLowerCase() === activePracticeTopic.name.toLowerCase())
    : [];

  const bookmarkedMCQsList = mcqs.filter((q) => bookmarks.questionIds.includes(q.id));
  const bookmarkedPapersList = papers.filter((p) => bookmarks.paperIds.includes(p.id));
  const bookmarkedBooksList = books.filter((b) => bookmarks.bookIds.includes(b.id));

  const totalBookmarksCount = bookmarks.questionIds.length + bookmarks.paperIds.length + bookmarks.bookIds.length;

  // Mandatory Candidate Login / Signup Gate Screen: Candidate cannot enter home screen without logging in or signing up
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0B1E48] to-slate-950 flex flex-col justify-center items-center p-3 sm:p-6 font-sans">
        {notificationToast && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl border border-slate-700 animate-fadeIn flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{notificationToast}</span>
          </div>
        )}
        <AuthModal
          isOpen={true}
          isGatedScreen={true}
          initialMode={authModalMode}
          onAuthSuccess={handleAuthSuccess}
          registeredUsers={registeredUsers}
          onRegisterUser={handleRegisterUser}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-900 selection:text-white font-sans">
      {/* Top Notification Toast if triggered */}
      {notificationToast && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl border border-slate-700 animate-fadeIn flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Top Academic Header */}
      <Header
        userProfile={userProfile}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => triggerNotification('You have 2 new Mock Tests and updated 2026 Anatomy Question Papers!')}
        onOpenProfile={() => setActiveTab('profile')}
        onLogout={handleLogout}
        unreadNotificationsCount={2}
        activeCourse={selectedCourse}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3.5 sm:px-6 pt-4 pb-24">
        {/* 1. HOME SCREEN */}
        {activeTab === 'home' && (
          <HomeScreen
            selectedLevel={selectedLevel}
            selectedCourse={selectedCourse}
            onSelectCourse={(c, l) => {
              setSelectedCourse(c);
              setSelectedLevel(l);
            }}
            onNavigateToMCQ={() => {
              setActivePracticeTopic(null);
              setActiveTab('mcq');
            }}
            onNavigateToQuestionBank={() => setActiveTab('questionBank')}
            onNavigateToBooks={() => setActiveTab('books')}
            onContinueTopic={(topic) => handleStartPractice(topic)}
            onStartMockTestDirect={() => {
              setMockTestConfig({ count: 25, scope: 'semester' });
              setIsMockTestOpen(true);
            }}
            progress={userProgress}
            courses={INITIAL_COURSES}
            topics={INITIAL_TOPICS}
          />
        )}

        {/* 2. MCQ / MOCK TEST SCREEN */}
        {activeTab === 'mcq' && (
          <>
            {activePracticeTopic && activeTopicQuestions.length > 0 ? (
              <MCQPracticeScreen
                questions={activeTopicQuestions}
                subjectTitle={activePracticeTopic.subject}
                topicTitle={activePracticeTopic.name}
                onExit={() => setActivePracticeTopic(null)}
                onRecordAnswer={handleRecordAnswer}
                bookmarkedQuestionIds={bookmarks.questionIds}
                onToggleBookmark={handleToggleBookmarkQuestion}
              />
            ) : (
              <MCQFlow
                courses={INITIAL_COURSES}
                topics={INITIAL_TOPICS}
                mcqs={mcqs}
                initialLevel={selectedLevel}
                initialCourse={selectedCourse}
                onStartTopicPractice={(topic) => handleStartPractice(topic)}
                onStartMockTest={(cfg) => {
                  setMockTestConfig({
                    count: cfg.questionCount,
                    scope: cfg.scope,
                    topicId: cfg.topicId,
                  });
                  setIsMockTestOpen(true);
                }}
              />
            )}
          </>
        )}

        {/* 3. QUESTION BANK SCREEN */}
        {activeTab === 'questionBank' && (
          <QuestionBankFlow
            courses={INITIAL_COURSES}
            papers={papers}
            initialLevel={selectedLevel}
            initialCourse={selectedCourse}
            bookmarkedPaperIds={bookmarks.paperIds}
            onToggleBookmarkPaper={handleToggleBookmarkPaper}
          />
        )}

        {/* 4. BOOKS & STUDY MATERIALS */}
        {activeTab === 'books' && (
          <BooksSection
            books={books}
            activeCourse={selectedCourse}
            activeLevel={selectedLevel}
            bookmarkedBookIds={bookmarks.bookIds}
            onToggleBookmarkBook={handleToggleBookmarkBook}
            readingProgress={readingProgress}
            onUpdateReadingProgress={handleUpdateReadingProgress}
          />
        )}

        {/* 5. PROFILE SCREEN */}
        {activeTab === 'profile' && (
          <ProfileScreen
            userProfile={userProfile}
            userProgress={userProgress}
            onUpdateProfile={(up) => setUserProfile((prev) => ({ ...prev, ...up }))}
            onResetProgress={() => {
              setUserProgress({
                questionsAttempted: 0,
                correctAnswers: 0,
                testsCompleted: 0,
                studyTimeMinutes: 0,
                recentTopics: [],
                bookmarkedQuestionIds: [],
                bookmarkedPaperIds: [],
                bookmarkedBookIds: [],
                bookmarkedTopicIds: [],
                bookReadingProgress: {},
                answeredQuestionRecords: {},
                mockTestHistory: [],
                totalPracticed: 0,
                testsAttempted: 0,
                accuracyRate: 0,
                studyStreakDays: 1,
              });
              setMockTests([]);
            }}
            onLogout={handleLogout}
            mockTestHistory={mockTests}
          />
        )}
      </main>

      {/* Persistent Bottom Mobile/Desktop Navigation Bar */}
      <Navigation
        currentTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'mcq') {
            setActivePracticeTopic(null);
          }
        }}
        bookmarksCount={totalBookmarksCount}
      />

      {/* Timed Mock Test Exam Modal */}
      {isMockTestOpen && (
        <MockTestModal
          allQuestions={mcqs}
          initialCount={mockTestConfig.count || 25}
          initialScope={mockTestConfig.scope || 'semester'}
          initialTopicId={mockTestConfig.topicId}
          isOpen={isMockTestOpen}
          onClose={() => setIsMockTestOpen(false)}
          onSaveResult={handleSaveMockTestResult}
        />
      )}

      {/* Global Cross-Feature Search Modal */}
      {isSearchOpen && (
        <GlobalSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          mcqs={mcqs}
          topics={INITIAL_TOPICS}
          papers={papers}
          books={books}
          onSelectTopic={(topic) => {
            handleStartPractice(topic);
          }}
          onSelectPaper={(paper) => setQuickViewingPaper(paper)}
          onSelectBook={(book) => setQuickReadingBook(book)}
        />
      )}

      {/* Quick Paper Viewer Modal (Search Shortcuts) */}
      {quickViewingPaper && (
        <QuestionPaperViewer
          paper={quickViewingPaper}
          isOpen={!!quickViewingPaper}
          onClose={() => setQuickViewingPaper(null)}
          isBookmarked={bookmarks.paperIds.includes(quickViewingPaper.id)}
          onToggleBookmark={() => handleToggleBookmarkPaper(quickViewingPaper.id)}
        />
      )}

      {/* Quick Book Reader Modal (Search Shortcuts) */}
      {quickReadingBook && (
        <BookReaderModal
          book={quickReadingBook}
          isOpen={!!quickReadingBook}
          onClose={() => setQuickReadingBook(null)}
          currentPage={readingProgress[quickReadingBook.id] || 1}
          onUpdatePage={(page) => handleUpdateReadingProgress(quickReadingBook.id, page)}
          isBookmarked={bookmarks.bookIds.includes(quickReadingBook.id)}
          onToggleBookmark={() => handleToggleBookmarkBook(quickReadingBook.id)}
        />
      )}
    </div>
  );
}

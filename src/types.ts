export type Level = 'UG' | 'PG';

export type CourseId = 'BPT' | 'BOT' | 'BPO' | 'BASLP' | 'MPT' | 'MOT' | 'MPO';

export type YearId = 'first' | 'second' | 'third' | 'final';

export type SemesterId = 'sem1' | 'sem2';

export type TabType = 'home' | 'mcq' | 'questionBank' | 'books' | 'profile' | 'admin';
export type TabId = TabType;

export interface CourseInfo {
  id: CourseId;
  name: string;
  fullName: string;
  level: Level;
  description: string;
  iconName: string;
  availableQuestionsCount: number;
}

export interface SubjectTopic {
  id: string;
  subject: string;
  name: string;
  questionCount: number;
  accuracy: number;
  course: CourseId;
  year: YearId;
  semester: SemesterId;
}

export interface MCQOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface MCQQuestion {
  id: string;
  course: CourseId;
  level: Level;
  year: YearId;
  semester: SemesterId;
  subject: string;
  topic: string;
  question: string;
  options: MCQOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface PaperQuestion {
  qNumber: string | number;
  marks: number;
  text: string;
  subparts?: string[];
}

export interface PaperSection {
  title: string;
  instructions: string;
  questions: PaperQuestion[];
}

export interface QuestionPaper {
  id: string;
  course: CourseId;
  level: Level;
  year: YearId;
  semester: SemesterId;
  subject: string;
  examYear: number;
  examName: string;
  paperCode: string;
  pdfSize: string;
  totalPages: number;
  durationHours: number;
  maxMarks: number;
  sections: PaperSection[];
}

export interface BookChapter {
  chapterNumber: number;
  title: string;
  pageStart: number;
  pageEnd: number;
  summary: string;
  content: string[];
  keyPoints: string[];
}

export interface BookMaterial {
  id: string;
  title: string;
  author: string;
  subject: string;
  course: CourseId;
  level: Level;
  year?: YearId;
  totalPages: number;
  coverTheme: 'blue' | 'emerald' | 'amber' | 'crimson' | 'indigo' | 'purple';
  edition?: string;
  pdfSize?: string;
  chapters: BookChapter[];
}

export interface RecentTopicProgress {
  subject: string;
  topic: string;
  course: CourseId;
  year: YearId;
  semester: SemesterId;
  progress: number;
  lastAttempted: string;
}

export interface MockTestResultData {
  id: string;
  title: string;
  date: string;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  skipped: number;
  accuracy: number;
  timeTakenSeconds: number;
  userAnswers: Record<string, 'A' | 'B' | 'C' | 'D' | null>;
  questionIds: string[];
}

export interface UserProfile {
  name: string;
  avatarSeed: string;
  course: CourseId;
  level: Level;
  year: YearId;
  semester: SemesterId;
  institution: string;
  college?: string;
  email: string;
  mobileNumber?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  mobileNumber: string;
  email: string;
  course: CourseId;
  password?: string;
  registeredAt: string;
}

export interface UserProgressState {
  questionsAttempted: number;
  correctAnswers: number;
  testsCompleted: number;
  studyTimeMinutes: number;
  recentTopics: RecentTopicProgress[];
  bookmarkedQuestionIds: string[];
  bookmarkedPaperIds: string[];
  bookmarkedBookIds: string[];
  bookmarkedTopicIds: string[];
  bookReadingProgress: Record<string, number>; // bookId -> currentPage
  answeredQuestionRecords: Record<string, { selected: 'A' | 'B' | 'C' | 'D'; isCorrect: boolean; timestamp: number }>;
  mockTestHistory: MockTestResultData[];
  totalPracticed?: number;
  testsAttempted?: number;
  accuracyRate?: number;
  studyStreakDays?: number;
}

export type UserProgress = UserProgressState;

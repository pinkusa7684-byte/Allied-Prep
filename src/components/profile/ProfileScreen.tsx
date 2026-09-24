import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Building,
  Bookmark,
  Award,
  Zap,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  FileText,
  FileQuestion,
  HelpCircle,
  Mail,
  Check,
  Flame,
  Clock,
  LogOut,
  Sparkles,
} from 'lucide-react';
import {
  UserProfile,
  UserProgress,
  MCQQuestion,
  QuestionPaper,
  BookMaterial,
  MockTestResultData,
} from '../../types';
import { CircularProgress } from '../common/CircularProgress';

interface ProfileScreenProps {
  userProfile: UserProfile;
  userProgress: UserProgress;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onResetProgress: () => void;
  bookmarkedMCQs?: MCQQuestion[];
  bookmarkedPapers?: QuestionPaper[];
  bookmarkedBooks?: BookMaterial[];
  onOpenMCQ?: (question: MCQQuestion) => void;
  onOpenPaper?: (paper: QuestionPaper) => void;
  onOpenBook?: (book: BookMaterial) => void;
  onLogout?: () => void;
  mockTestHistory: MockTestResultData[];
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userProfile,
  userProgress,
  onUpdateProfile,
  onResetProgress,
  onLogout,
  mockTestHistory,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editCollege, setEditCollege] = useState(userProfile.college || userProfile.institution || '');
  const [editCourse, setEditCourse] = useState(userProfile.course);
  const [editYear, setEditYear] = useState(userProfile.year);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const totalQuestions = userProgress.totalPracticed ?? userProgress.questionsAttempted;
  const totalMockTests = userProgress.testsAttempted ?? userProgress.testsCompleted;
  const accuracy = userProgress.accuracyRate ?? (userProgress.questionsAttempted > 0 ? Math.round((userProgress.correctAnswers / userProgress.questionsAttempted) * 100) : 82);
  const streak = userProgress.studyStreakDays ?? 9;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: editName,
      college: editCollege,
      institution: editCollege,
      course: editCourse,
      year: editYear,
    });
    setIsEditing(false);
    showToast('Profile updated successfully!');
  };

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* Top Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-900 to-indigo-700 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-900/20 font-heading">
              {userProfile.name.charAt(0)}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                  {userProfile.name}
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200">
                  {userProfile.level} • {userProfile.course}
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>{userProfile.college || userProfile.institution || 'Allied Health Sciences'}</span>
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
                <span>{userProfile.email}</span>
                {userProfile.mobileNumber && (
                  <>
                    <span>•</span>
                    <span className="font-mono text-slate-500 font-semibold">{userProfile.mobileNumber}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
            {onLogout && (
              <button
                id="profile-logout-btn"
                onClick={onLogout}
                className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                title="Log out of Candidate Portal"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-600" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>

        {/* Inline Edit Form */}
        {isEditing && (
          <form
            onSubmit={handleSaveProfile}
            className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 animate-fadeIn"
          >
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Edit Academic Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600">
                  College / University
                </label>
                <input
                  type="text"
                  value={editCollege}
                  onChange={(e) => setEditCollege(e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold shadow-sm hover:bg-blue-800"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* 4 Performance Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-200/80">
            <div className="flex items-center justify-between text-blue-900 mb-1">
              <FileQuestion className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">MCQs</span>
            </div>
            <span className="text-xl font-bold text-blue-950 font-heading">
              {totalQuestions}
            </span>
            <p className="text-[11px] text-slate-500 font-medium">Questions Practiced</p>
          </div>

          <div className="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-200/80">
            <div className="flex items-center justify-between text-indigo-900 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Tests</span>
            </div>
            <span className="text-xl font-bold text-indigo-950 font-heading">
              {totalMockTests}
            </span>
            <p className="text-[11px] text-slate-500 font-medium">Mock Exams</p>
          </div>

          <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80">
            <div className="flex items-center justify-between text-emerald-800 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Accuracy</span>
            </div>
            <span className="text-xl font-bold text-emerald-950 font-heading">
              {accuracy}%
            </span>
            <p className="text-[11px] text-slate-500 font-medium">Overall Accuracy</p>
          </div>

          <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/80">
            <div className="flex items-center justify-between text-amber-700 mb-1">
              <Flame className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Streak</span>
            </div>
            <span className="text-xl font-bold text-amber-950 font-heading">
              {streak} Days
            </span>
            <p className="text-[11px] text-slate-500 font-medium">Daily Streak</p>
          </div>
        </div>
      </div>

      {/* Tabs: Profile Settings | Test History */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'profile'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          General & Settings
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'history'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Exam History ({mockTestHistory.length})
        </button>
      </div>

      {/* TAB 1: General & Settings */}
      {activeTab === 'profile' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading">Application Preferences</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="font-semibold text-slate-800">Academic Notifications</span>
                  <p className="text-slate-500 text-[11px]">Exam alerts and daily practice reminders</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-blue-900 focus:ring-blue-900 w-4 h-4"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="font-semibold text-slate-800">High-Yield Clinical Pearls</span>
                  <p className="text-slate-500 text-[11px]">Show automatic clinical rationales after each MCQ</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-blue-900 focus:ring-blue-900 w-4 h-4"
                />
              </div>
            </div>
          </div>

          {/* Academic Help & Reset Actions */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 font-heading">Data & Support</h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset your practice statistics? This cannot be undone.')) {
                    onResetProgress();
                    showToast('Learning progress reset.');
                  }
                }}
                className="w-full p-3 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-700 text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Practice Data & Test Scores</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="mailto:support@alliedprep.edu"
                className="w-full p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-900" />
                  <span>Contact Academic Helpdesk (support@alliedprep.edu)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>

              {onLogout && (
                <button
                  id="profile-bottom-logout-btn"
                  onClick={onLogout}
                  className="w-full p-3 rounded-xl border border-rose-200 bg-rose-50/60 hover:bg-rose-100 text-rose-800 text-xs font-bold flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <LogOut className="w-4 h-4 text-rose-700" />
                    <span>Log Out from Candidate Account</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-rose-600" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Exam History */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {mockTestHistory.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-2">
              <Award className="w-8 h-8 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">No examination attempts yet</h4>
              <p className="text-xs text-slate-500">
                Attempt a timed mock test from the Home or MCQ section to see your score cards.
              </p>
            </div>
          ) : (
            mockTestHistory.map((hist) => (
              <div
                key={hist.id}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-900">{hist.title}</span>
                    <span className="text-[11px] text-slate-400">{hist.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <span>
                      Score: <strong className="text-slate-900">{hist.correct}/{hist.totalQuestions}</strong>
                    </span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold">{hist.accuracy}% Accuracy</span>
                    <span>•</span>
                    <span>{Math.round(hist.timeTakenSeconds / 60)} min</span>
                  </div>
                </div>

                <div className="w-12 h-12 flex items-center justify-center">
                  <CircularProgress
                    percentage={hist.accuracy}
                    size={42}
                    strokeWidth={4}
                    color={hist.accuracy >= 75 ? '#059669' : '#1d4ed8'}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2 border border-slate-700 animate-fadeIn z-50">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

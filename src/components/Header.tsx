import React from 'react';
import { Search, Bell, Shield, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProfile, CourseId } from '../types';

interface HeaderProps {
  userProfile: UserProfile;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenAdmin: () => void;
  onOpenAuth?: () => void;
  unreadNotificationsCount?: number;
  activeCourse: CourseId;
  isAdminMode: boolean;
  onToggleAdminMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  onOpenSearch,
  onOpenNotifications,
  onOpenProfile,
  onOpenAdmin,
  onOpenAuth,
  unreadNotificationsCount = 2,
  activeCourse,
  isAdminMode,
  onToggleAdminMode,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 sm:px-6 transition-colors">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Greeting */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-amber-400 flex items-center justify-center shadow-md shadow-blue-950/10 shrink-0 border border-blue-700/50">
            <span className="font-heading font-extrabold text-lg tracking-wider text-amber-300">AP</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                Hello, {userProfile.name.split(' ')[0] || 'Student'} <span className="inline-block animate-wave">👋</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold text-xs border border-blue-200">
                <BookOpen className="w-3 h-3" />
                {activeCourse}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Prepare smarter with Allied Prep</p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Candidate Auth Button */}
          {onOpenAuth && (
            <button
              id="header-candidate-auth-btn"
              onClick={onOpenAuth}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 transition-colors"
              title="Candidate Login or Sign Up"
            >
              <span>Login / Sign Up</span>
            </button>
          )}

          {/* Admin Switch */}
          <button
            id="header-admin-toggle-btn"
            onClick={onToggleAdminMode}
            title={isAdminMode ? "Exit Admin Mode" : "Admin Panel"}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              isAdminMode
                ? 'bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAdminMode ? 'Admin Active' : 'Admin'}</span>
          </button>

          {/* Search Button */}
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            className="p-2 rounded-xl text-slate-600 hover:text-blue-900 hover:bg-blue-50 transition-colors"
            title="Search MCQs, Papers & Books"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button
            id="header-notifications-btn"
            onClick={onOpenNotifications}
            className="p-2 rounded-xl text-slate-600 hover:text-blue-900 hover:bg-blue-50 transition-colors relative"
            title="Announcements & Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            )}
          </button>

          {/* Profile Avatar */}
          <button
            id="header-profile-btn"
            onClick={onOpenProfile}
            className="ml-1 w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-800 to-blue-900 text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-slate-200 hover:ring-blue-400 transition-all overflow-hidden"
            title="Student Profile"
            aria-label="Profile"
          >
            {userProfile.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
};

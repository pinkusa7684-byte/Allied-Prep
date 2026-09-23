import React from 'react';
import { Home, FileQuestion, BookMarked, BookOpen, User, Bookmark } from 'lucide-react';

export type TabType = 'home' | 'mcq' | 'questionBank' | 'books' | 'profile' | 'admin';

interface NavigationProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  bookmarksCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const navItems = [
    {
      id: 'home' as TabType,
      label: 'Home',
      icon: Home,
    },
    {
      id: 'mcq' as TabType,
      label: 'MCQ',
      icon: FileQuestion,
    },
    {
      id: 'questionBank' as TabType,
      label: 'Question Bank',
      icon: BookMarked,
    },
    {
      id: 'books' as TabType,
      label: 'Books',
      icon: BookOpen,
    },
    {
      id: 'profile' as TabType,
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg shadow-slate-900/5 pb-safe">
      <div className="max-w-md sm:max-w-xl md:max-w-3xl mx-auto px-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-2 min-w-[56px] sm:min-w-[68px] min-h-[52px] rounded-xl transition-all relative ${
                isActive
                  ? 'text-blue-900 font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4px]' : 'stroke-[1.8px]'
                  }`}
                />
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight truncate max-w-[64px] ${
                  isActive ? 'font-bold text-blue-900' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-1 rounded-full bg-blue-900 transition-all" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

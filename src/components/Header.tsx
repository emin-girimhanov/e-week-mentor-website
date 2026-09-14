import type { FC } from 'react';
import { Calendar, BookOpen, MapPin, Lock, Search } from 'lucide-react';

export type ActiveTab = 'schedule' | 'handbook' | 'map';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onLock: () => void;
}

export const Header: FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onLock
}) => {
  const tabs = [
    { id: 'schedule' as ActiveTab, label: 'Dienstplan', icon: Calendar },
    { id: 'handbook' as ActiveTab, label: 'Handbuch & FAQ', icon: BookOpen },
    { id: 'map' as ActiveTab, label: 'Lageplan & Räume', icon: MapPin }
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/farafin_logo_blue.svg"
              alt="FaRaFIN Logo"
              className="h-7 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-zinc-100 tracking-tight">
                  FaRaFIN E-Woche
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-medium bg-zinc-800 text-zinc-300 rounded border border-zinc-700/60">
                  Mentoren-Portal
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Desktop Search Input */}
            <div className="relative hidden sm:block w-48 md:w-60">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Suchen..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Lock Button */}
            <button
              onClick={onLock}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-md text-xs font-medium transition-colors cursor-pointer"
              title="Portal sperren"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sperren</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="relative mt-2.5 sm:hidden">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Suchen nach Raum, Schicht oder Name..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-md pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300"
            >
              ✕
            </button>
          )}
        </div>

        {/* 3 Main Navigation Tabs */}
        <nav className="flex items-center gap-2 mt-3 pt-1 border-t border-zinc-900 sm:border-t-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 flex-1 sm:flex-initial px-4 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-zinc-950' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

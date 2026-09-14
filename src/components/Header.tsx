import type { FC } from 'react';
import { Calendar, BookOpen, MapPin, Search } from 'lucide-react';

export type ActiveTab = 'schedule' | 'handbook' | 'map';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery
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
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-medium bg-farafin/20 text-blue-200 rounded border border-farafin/40">
                  Mentoren-Portal
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Desktop Search Input */}
            <div className="relative hidden sm:block w-52 md:w-64">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Suchen nach Raum, Schicht, Name..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-farafin focus:ring-1 focus:ring-farafin transition-colors"
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
            className="w-full bg-zinc-900 border border-zinc-800 rounded-md pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-farafin focus:ring-1 focus:ring-farafin transition-colors"
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
                    ? 'bg-farafin text-white font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

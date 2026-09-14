import type { FC } from 'react';
import { Calendar, DoorOpen, PhoneCall, HelpCircle, MapPin, ExternalLink, Lock, Search } from 'lucide-react';

export type ActiveTab = 'schedule' | 'rooms' | 'emergency' | 'faq' | 'rallye' | 'links';

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
    { id: 'rooms' as ActiveTab, label: 'Räume (G29)', icon: DoorOpen },
    { id: 'emergency' as ActiveTab, label: 'Notfall & Leitfaden', icon: PhoneCall, badge: 'Wichtig' },
    { id: 'faq' as ActiveTab, label: 'Westentaschen-FAQ', icon: HelpCircle },
    { id: 'rallye' as ActiveTab, label: 'Rallye-Stationen', icon: MapPin },
    { id: 'links' as ActiveTab, label: 'Ressourcen', icon: ExternalLink }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/farafin_logo_blue.svg"
              alt="FaRaFIN Logo"
              className="h-8 w-auto object-contain"
              onError={(e) => {
                // Fallback to text icon if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                  FaRaFIN E-Woche
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-cyan-950 text-cyan-400 border border-cyan-800/60 rounded">
                  Mentoren-Hub 26/27
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden xs:block">
                Einsatzplanung, Räume und Notfallkette
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Input for Mobile/Desktop */}
            <div className="relative hidden md:block w-48 lg:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Suche (Raum, Name, Tag)..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Emergency Button */}
            <button
              onClick={() => setActiveTab('emergency')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/70 border border-rose-800/80 hover:bg-rose-900 text-rose-300 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              title="Notfallkontakte öffnen"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Notfall-Hotline</span>
            </button>

            {/* Lock Button */}
            <button
              onClick={onLock}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 rounded-lg transition-all cursor-pointer"
              title="Portal sperren"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search for Mobile */}
        <div className="relative mt-2.5 md:hidden">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Schnellsuche nach Raum, Schicht oder Name..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Tab Navigation (Horizontal Scrollable on Mobile) */}
        <nav className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar pb-1 pt-0.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.2 text-[9px] font-bold bg-rose-500/20 text-rose-300 rounded border border-rose-500/40">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

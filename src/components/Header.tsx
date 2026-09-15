import type { FC } from 'react';
import { Calendar, BookOpen, MapPin, Search, Sun, Moon, Bell, BellOff, Smartphone } from 'lucide-react';
import type { ThemeMode } from '../hooks/useTheme';

export type ActiveTab = 'schedule' | 'handbook' | 'map';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  isNotificationsEnabled: boolean;
  onToggleNotifications: () => void;
  onOpenInstallModal: () => void;
}

export const Header: FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  theme,
  toggleTheme,
  isNotificationsEnabled,
  onToggleNotifications,
  onOpenInstallModal
}) => {
  const tabs = [
    { id: 'schedule' as ActiveTab, label: 'Dienstplan', icon: Calendar },
    { id: 'handbook' as ActiveTab, label: 'Handbuch & FAQ', icon: BookOpen },
    { id: 'map' as ActiveTab, label: 'Lageplan & Räume', icon: MapPin }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-950/90 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 transition-colors">
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
                <span className="text-base font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
                  FaRaFIN E-Woche
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-farafin/15 text-farafin dark:text-blue-200 rounded border border-farafin/30">
                  Mentoren-Portal
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Desktop Search Input */}
            <div className="relative hidden sm:block w-48 md:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Raum, Schicht, Name..."
                className="w-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg pl-8 pr-7 py-1.5 text-xs text-slate-900 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-farafin focus:ring-1 focus:ring-farafin transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 cursor-pointer"
                  aria-label="Suche zurücksetzen"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Notification / Reminder Button */}
            <button
              onClick={onToggleNotifications}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                isNotificationsEnabled
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
                  : 'bg-slate-100 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
              title={isNotificationsEnabled ? 'Vorab-Erinnerungen sind aktiv (Klick zum Deaktivieren)' : '10-Minuten-Vorab-Erinnerungen aktivieren'}
              aria-label="Erinnerungen verwalten"
            >
              {isNotificationsEnabled ? (
                <>
                  <Bell className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="hidden md:inline text-[11px] font-semibold">Alarm an</span>
                </>
              ) : (
                <>
                  <BellOff className="w-3.5 h-3.5" />
                  <span className="hidden md:inline text-[11px]">Alarm</span>
                </>
              )}
            </button>

            {/* PWA Install Button */}
            <button
              onClick={onOpenInstallModal}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 transition-colors cursor-pointer flex items-center gap-1.5"
              title="Portal als Web-App installieren"
              aria-label="Als App installieren"
            >
              <Smartphone className="w-3.5 h-3.5 text-farafin dark:text-farafin-light" />
              <span className="hidden md:inline text-[11px]">App</span>
            </button>

            {/* Theme Toggle (Dark / Light) */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              title={theme === 'dark' ? 'Zu hellem Modus wechseln' : 'Zu dunklem Modus wechseln'}
              aria-label="Farbschema wechseln"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden lg:inline text-[11px]">Hell</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                  <span className="hidden lg:inline text-[11px]">Dunkel</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="relative mt-2.5 sm:hidden">
          <Search className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Suchen nach Raum, Schicht oder Name..."
            className="w-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg pl-8 pr-7 py-1.5 text-xs text-slate-900 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-farafin focus:ring-1 focus:ring-farafin transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* 3 Main Navigation Tabs */}
        <nav className="flex items-center gap-2 mt-3 pt-1 border-t border-slate-200 dark:border-zinc-900 sm:border-t-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-farafin text-white shadow-sm'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-900 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-zinc-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

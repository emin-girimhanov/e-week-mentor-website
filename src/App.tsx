import { useState } from 'react';
import { Header } from './components/Header';
import type { ActiveTab } from './components/Header';
import { ScheduleView } from './components/ScheduleView';
import { HandbookView } from './components/HandbookView';
import { MapView } from './components/MapView';
import { NextEventBanner } from './components/NextEventBanner';
import { AudienceFilter } from './components/AudienceFilter';
import type { AudienceFilterValue, LanguageFilterValue } from './components/AudienceFilter';
import { InstallModal } from './components/InstallModal';
import { DAYS_SCHEDULE } from './data/portalData';
import { Calendar, BookOpen, MapPin, Wifi } from 'lucide-react';
import { useTheme } from './hooks/useTheme';
import { useReminders } from './hooks/useReminders';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('schedule');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAudience, setSelectedAudience] = useState<AudienceFilterValue>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageFilterValue>('all');
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);

  const { theme, toggleTheme } = useTheme();
  const { isEnabled: isNotificationsEnabled, enableReminders, disableReminders } = useReminders();

  // Dynamic counts for each target audience
  const audienceCounts = {
    all: DAYS_SCHEDULE.reduce((acc, d) => acc + d.items.length, 0),
    bachelor: DAYS_SCHEDULE.reduce((acc, d) => acc + d.items.filter(it => it.audiences.includes('bachelor')).length, 0),
    international: DAYS_SCHEDULE.reduce((acc, d) => acc + d.items.filter(it => it.audiences.includes('international')).length, 0),
    master: DAYS_SCHEDULE.reduce((acc, d) => acc + d.items.filter(it => it.audiences.includes('master')).length, 0)
  };

  // Dynamic counts for each language track
  const languageCounts = {
    all: DAYS_SCHEDULE.reduce((acc, d) => acc + d.items.length, 0),
    en: DAYS_SCHEDULE.reduce((acc, d) => acc + d.items.filter(it => it.language === 'en').length, 0),
    bilingual: DAYS_SCHEDULE.reduce((acc, d) => acc + d.items.filter(it => it.language === 'bilingual').length, 0),
    de: DAYS_SCHEDULE.reduce((acc, d) => acc + d.items.filter(it => it.language === 'de').length, 0)
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-zinc-100 flex flex-col pb-20 sm:pb-8 selection:bg-farafin selection:text-white transition-colors">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        theme={theme}
        toggleTheme={toggleTheme}
        isNotificationsEnabled={isNotificationsEnabled}
        onToggleNotifications={isNotificationsEnabled ? disableReminders : enableReminders}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* Top-Level Target Audience & Language Filters */}
        <AudienceFilter
          audienceValue={selectedAudience}
          onAudienceChange={setSelectedAudience}
          languageValue={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          audienceCounts={audienceCounts}
          languageCounts={languageCounts}
        />

        {/* Next Event Ticker & Full Calendar / PWA Banner */}
        <NextEventBanner
          onOpenInstallModal={() => setIsInstallModalOpen(true)}
          selectedAudience={selectedAudience}
          selectedLanguage={selectedLanguage}
          isNotificationsEnabled={isNotificationsEnabled}
          onToggleNotifications={isNotificationsEnabled ? disableReminders : enableReminders}
        />

        {activeTab === 'schedule' && (
          <ScheduleView
            searchQuery={searchQuery}
            selectedAudience={selectedAudience}
            selectedLanguage={selectedLanguage}
          />
        )}
        {activeTab === 'handbook' && <HandbookView searchQuery={searchQuery} />}
        {activeTab === 'map' && (
          <MapView
            searchQuery={searchQuery}
            selectedAudience={selectedAudience}
            selectedLanguage={selectedLanguage}
          />
        )}
      </main>

      {/* App Install Guide Modal */}
      <InstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* Desktop & Tablet Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-zinc-900 bg-white/80 dark:bg-zinc-950/80 py-5 text-center text-xs text-slate-500 dark:text-zinc-500 transition-colors">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-farafin" />
            <span className="text-slate-800 dark:text-zinc-300 font-medium">FaRaFIN Mentoren-Portal • WiSe 2026/2027</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-zinc-500">
            <span>Gebäude 29 (FIN) • Universitätsplatz 2</span>
            <span>Notfall-Desk: G29-103</span>
            <span className="flex items-center gap-1 text-slate-600 dark:text-zinc-400">
              <Wifi className="w-3 h-3 text-farafin" />
              <span>Offline-bereit</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Navigation Bar (3 Clean Tabs) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-slate-200 dark:border-zinc-800 px-3 py-2 flex items-center justify-around transition-colors">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex flex-col items-center gap-1 p-1 text-[11px] cursor-pointer transition-colors ${
            activeTab === 'schedule' ? 'text-farafin dark:text-blue-400 font-semibold' : 'text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-zinc-300'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Dienstplan</span>
        </button>

        <button
          onClick={() => setActiveTab('handbook')}
          className={`flex flex-col items-center gap-1 p-1 text-[11px] cursor-pointer transition-colors ${
            activeTab === 'handbook' ? 'text-farafin dark:text-blue-400 font-semibold' : 'text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-zinc-300'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Handbuch & FAQ</span>
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center gap-1 p-1 text-[11px] cursor-pointer transition-colors ${
            activeTab === 'map' ? 'text-farafin dark:text-blue-400 font-semibold' : 'text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-zinc-300'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Lageplan & Räume</span>
        </button>
      </nav>
    </div>
  );
}

export default App;

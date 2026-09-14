import { useState } from 'react';
import { LockScreen } from './components/LockScreen';
import { Header } from './components/Header';
import type { ActiveTab } from './components/Header';
import { ScheduleView } from './components/ScheduleView';
import { HandbookView } from './components/HandbookView';
import { MapView } from './components/MapView';
import { NextEventBanner } from './components/NextEventBanner';
import { InstallModal } from './components/InstallModal';
import { Calendar, BookOpen, MapPin, Wifi } from 'lucide-react';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ewoche_mentor_auth') === 'authenticated';
    } catch {
      return false;
    }
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('schedule');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);

  const handleLock = () => {
    try {
      localStorage.removeItem('ewoche_mentor_auth');
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LockScreen onUnlock={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col pb-20 sm:pb-8 selection:bg-zinc-800 selection:text-zinc-100">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLock={handleLock}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* Next Event Ticker & Full Calendar / PWA Banner */}
        <NextEventBanner onOpenInstallModal={() => setIsInstallModalOpen(true)} />

        {activeTab === 'schedule' && <ScheduleView searchQuery={searchQuery} />}
        {activeTab === 'handbook' && <HandbookView searchQuery={searchQuery} />}
        {activeTab === 'map' && <MapView searchQuery={searchQuery} />}
      </main>

      {/* App Install Guide Modal */}
      <InstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* Desktop & Tablet Footer */}
      <footer className="mt-auto border-t border-zinc-900 bg-zinc-950/80 py-5 text-center text-xs text-zinc-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <span className="text-zinc-400 font-medium">FaRaFIN Mentoren-Portal • WiSe 2026/2027</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-zinc-500">
            <span>Gebäude 29 (FIN) • Universitätsplatz 2</span>
            <span>Notfall-Desk: G29-103</span>
            <span className="flex items-center gap-1 text-zinc-400">
              <Wifi className="w-3 h-3" />
              <span>Offline-bereit</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Navigation Bar (3 Clean Tabs) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 px-3 py-2 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex flex-col items-center gap-1 p-1 text-[11px] cursor-pointer transition-colors ${
            activeTab === 'schedule' ? 'text-zinc-100 font-semibold' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Dienstplan</span>
        </button>

        <button
          onClick={() => setActiveTab('handbook')}
          className={`flex flex-col items-center gap-1 p-1 text-[11px] cursor-pointer transition-colors ${
            activeTab === 'handbook' ? 'text-zinc-100 font-semibold' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Handbuch & FAQ</span>
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center gap-1 p-1 text-[11px] cursor-pointer transition-colors ${
            activeTab === 'map' ? 'text-zinc-100 font-semibold' : 'text-zinc-500 hover:text-zinc-300'
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

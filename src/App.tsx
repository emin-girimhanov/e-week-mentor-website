import { useState } from 'react';
import { LockScreen } from './components/LockScreen';
import { Header } from './components/Header';
import type { ActiveTab } from './components/Header';
import { ScheduleView } from './components/ScheduleView';
import { RoomsView } from './components/RoomsView';
import { EmergencyView } from './components/EmergencyView';
import { FAQView } from './components/FAQView';
import { RallyeView } from './components/RallyeView';
import { LinksView } from './components/LinksView';
import { Calendar, DoorOpen, PhoneCall, HelpCircle, MapPin, ExternalLink, Wifi } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 pb-20 sm:pb-8">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLock={handleLock}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'schedule' && <ScheduleView searchQuery={searchQuery} />}
        {activeTab === 'rooms' && <RoomsView searchQuery={searchQuery} />}
        {activeTab === 'emergency' && <EmergencyView />}
        {activeTab === 'faq' && <FAQView searchQuery={searchQuery} />}
        {activeTab === 'rallye' && <RallyeView />}
        {activeTab === 'links' && <LinksView />}
      </main>

      {/* Desktop & Tablet Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-400 font-medium">FaRaFIN Mentoren-Portal • WiSe 2026/2027</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Gebäude 29 (FIN) • Universitätsplatz 2</span>
            <span>Notfall-Desk: G29-103</span>
            <span className="flex items-center gap-1 text-cyan-400">
              <Wifi className="w-3 h-3" />
              <span>Offline-optimiert</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] cursor-pointer transition-colors ${
            activeTab === 'schedule' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Plan</span>
        </button>

        <button
          onClick={() => setActiveTab('rooms')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] cursor-pointer transition-colors ${
            activeTab === 'rooms' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <DoorOpen className="w-4 h-4" />
          <span>Räume</span>
        </button>

        <button
          onClick={() => setActiveTab('emergency')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] cursor-pointer transition-colors ${
            activeTab === 'emergency' ? 'text-rose-400 font-bold' : 'text-rose-300 hover:text-rose-200'
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          <span>Notfall</span>
        </button>

        <button
          onClick={() => setActiveTab('faq')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] cursor-pointer transition-colors ${
            activeTab === 'faq' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>FAQ</span>
        </button>

        <button
          onClick={() => setActiveTab('rallye')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] cursor-pointer transition-colors ${
            activeTab === 'rallye' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Rallye</span>
        </button>

        <button
          onClick={() => setActiveTab('links')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] cursor-pointer transition-colors ${
            activeTab === 'links' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ExternalLink className="w-4 h-4" />
          <span>Links</span>
        </button>
      </nav>
    </div>
  );
}

export default App;

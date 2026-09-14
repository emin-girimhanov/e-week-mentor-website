import type { FC } from 'react';
import type { TargetAudience, EventLanguage } from '../data/portalData';
import { Users, GraduationCap, Globe, Sparkles, Languages } from 'lucide-react';

export type AudienceFilterValue = 'all' | TargetAudience;
export type LanguageFilterValue = 'all' | EventLanguage;

interface AudienceFilterProps {
  audienceValue: AudienceFilterValue;
  onAudienceChange: (val: AudienceFilterValue) => void;
  languageValue: LanguageFilterValue;
  onLanguageChange: (val: LanguageFilterValue) => void;
  audienceCounts?: {
    all: number;
    bachelor: number;
    international: number;
    master: number;
  };
  languageCounts?: {
    all: number;
    en: number;
    bilingual: number;
    de: number;
  };
}

export const AudienceFilter: FC<AudienceFilterProps> = ({
  audienceValue,
  onAudienceChange,
  languageValue,
  onLanguageChange,
  audienceCounts,
  languageCounts
}) => {
  const audienceOptions: { id: AudienceFilterValue; label: string; icon: typeof Users }[] = [
    { id: 'all', label: 'Alle anzeigen', icon: Users },
    { id: 'bachelor', label: 'Bachelor', icon: GraduationCap },
    { id: 'international', label: 'Internationals', icon: Globe },
    { id: 'master', label: 'Master', icon: Sparkles }
  ];

  const languageOptions: { id: LanguageFilterValue; label: string; flag: string }[] = [
    { id: 'all', label: 'Alle Sprachen', flag: '🌐' },
    { id: 'en', label: 'Nur Englisch (English only)', flag: '🇬🇧' },
    { id: 'bilingual', label: 'Bilingual (DE / EN)', flag: '🔀' },
    { id: 'de', label: 'Deutsch', flag: '🇩🇪' }
  ];

  const hasActiveFilter = audienceValue !== 'all' || languageValue !== 'all';

  const handleReset = () => {
    onAudienceChange('all');
    onLanguageChange('all');
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-3.5 shadow-md mb-6 space-y-3">
      {/* Top Header Row with Reset Button */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-farafin animate-pulse" />
          <h2 className="text-xs font-semibold text-zinc-100 uppercase tracking-wider">
            Filter: Zielgruppe & Sprache (Englisch / International)
          </h2>
        </div>

        {hasActiveFilter && (
          <button
            onClick={handleReset}
            className="text-[11px] text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700 px-2 py-0.5 rounded cursor-pointer transition-colors"
          >
            Filter zurücksetzen
          </button>
        )}
      </div>

      {/* Row 1: Zielgruppen (Bachelor, Internationals, Master, Alle) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-zinc-400">
            1. Zielgruppe:
          </span>
          <span className="text-[10px] text-zinc-500 hidden sm:inline">
            {audienceValue === 'all' && 'Alle Studiengänge und Helfer'}
            {audienceValue === 'bachelor' && 'Nur Bachelor-Erstis und Mentoren'}
            {audienceValue === 'international' && 'Nur internationale Studierende und englische Orientierung'}
            {audienceValue === 'master' && 'Nur Master-Studierende'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {audienceOptions.map(opt => {
            const Icon = opt.icon;
            const isActive = audienceValue === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onAudienceChange(opt.id)}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-farafin text-white font-semibold shadow-sm ring-1 ring-farafin-light/40'
                    : 'bg-zinc-950/70 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                <span>{opt.label}</span>
                {audienceCounts && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ml-0.5 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {audienceCounts[opt.id]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 2: Sprache (Englisch, Bilingual, Deutsch) */}
      <div className="space-y-1.5 pt-1 border-t border-zinc-800/60">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-zinc-400 flex items-center gap-1">
            <Languages className="w-3.5 h-3.5 text-zinc-500" />
            <span>2. Sprache & Track:</span>
          </span>
          <span className="text-[10px] text-zinc-500 hidden sm:inline">
            {languageValue === 'all' && 'Alle Sprachen (Deutsch, Englisch & Bilingual)'}
            {languageValue === 'en' && 'Rein englischsprachige Termine'}
            {languageValue === 'bilingual' && 'Termine mit englisch- und deutschsprachigen Kleingruppen'}
            {languageValue === 'de' && 'Ausschließlich deutschsprachige Termine'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {languageOptions.map(opt => {
            const isActive = languageValue === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onLanguageChange(opt.id)}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-farafin text-white font-semibold shadow-sm ring-1 ring-farafin-light/40'
                    : 'bg-zinc-950/70 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-zinc-800'
                }`}
              >
                <span className="text-xs">{opt.flag}</span>
                <span>{opt.label}</span>
                {languageCounts && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ml-0.5 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {languageCounts[opt.id]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

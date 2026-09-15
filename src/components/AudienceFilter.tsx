import { useState } from 'react';
import type { FC } from 'react';
import type { TargetAudience, EventLanguage } from '../data/portalData';
import { Users, GraduationCap, Globe, Sparkles, Languages, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const audienceOptions: { id: AudienceFilterValue; label: string; icon: typeof Users }[] = [
    { id: 'all', label: 'Alle', icon: Users },
    { id: 'bachelor', label: 'Bachelor', icon: GraduationCap },
    { id: 'international', label: 'Internationals', icon: Globe },
    { id: 'master', label: 'Master', icon: Sparkles }
  ];

  const languageOptions: { id: LanguageFilterValue; label: string; flag: string }[] = [
    { id: 'all', label: 'Alle Sprachen', flag: '🌐' },
    { id: 'en', label: 'Nur Englisch', flag: '🇬🇧' },
    { id: 'bilingual', label: 'Bilingual (DE/EN)', flag: '🔀' },
    { id: 'de', label: 'Deutsch', flag: '🇩🇪' }
  ];

  const hasActiveFilter = audienceValue !== 'all' || languageValue !== 'all';

  const handleReset = () => {
    onAudienceChange('all');
    onLanguageChange('all');
  };

  const applyPreset = (audience: AudienceFilterValue, language: LanguageFilterValue) => {
    onAudienceChange(audience);
    onLanguageChange(language);
  };

  return (
    <div className="bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 rounded-2xl p-3.5 sm:p-4 shadow-sm dark:shadow-md mb-6 space-y-3 transition-colors">
      {/* Top Bar with Status and Quick Presets */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-zinc-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-farafin animate-pulse shrink-0" />
          <h2 className="text-xs font-bold text-slate-900 dark:text-zinc-100 uppercase tracking-wider">
            Filter: Zielgruppe & Sprache
          </h2>
          {hasActiveFilter && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-farafin/10 text-farafin dark:text-blue-300 font-semibold border border-farafin/20">
              Aktiv
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilter && (
            <button
              onClick={handleReset}
              className="text-[11px] text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 px-2 py-1 rounded-md cursor-pointer transition-colors flex items-center gap-1"
              title="Alle Filter zurücksetzen"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Zurücksetzen</span>
            </button>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-[11px] text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 p-1 cursor-pointer flex items-center gap-0.5"
            title={isCollapsed ? 'Filterleiste ausklappen' : 'Filterleiste einklappen'}
          >
            {isCollapsed ? (
              <>
                <span className="text-[10px] hidden sm:inline">Anpassen</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span className="text-[10px] hidden sm:inline">Kompakt</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Track Presets (1-Klick Wahl für Mentoren) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
        <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium shrink-0 mr-1">
          Schnellwahl:
        </span>
        <button
          onClick={() => applyPreset('bachelor', 'all')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 cursor-pointer transition-all ${
            audienceValue === 'bachelor' && languageValue === 'all'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
          }`}
        >
          🎓 Bachelor-Mentor
        </button>
        <button
          onClick={() => applyPreset('international', 'all')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 cursor-pointer transition-all ${
            audienceValue === 'international' && languageValue === 'all'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
          }`}
        >
          🌐 Internationals
        </button>
        <button
          onClick={() => applyPreset('master', 'all')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 cursor-pointer transition-all ${
            audienceValue === 'master' && languageValue === 'all'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
          }`}
        >
          ✨ Master-Mentor
        </button>
        <button
          onClick={() => applyPreset('all', 'en')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 cursor-pointer transition-all ${
            languageValue === 'en'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
          }`}
        >
          🇬🇧 English Only
        </button>
      </div>

      {/* Expandable Detailed Filters */}
      {!isCollapsed && (
        <div className="space-y-3 pt-1">
          {/* Row 1: Zielgruppen */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-zinc-400">
              <span className="font-semibold">1. Zielgruppe:</span>
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 hidden sm:inline">
                {audienceValue === 'all' && 'Alle Studiengänge'}
                {audienceValue === 'bachelor' && 'Nur Bachelor-Erstis und Mentoren'}
                {audienceValue === 'international' && 'Nur internationale Studierende'}
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
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-farafin text-white font-bold shadow-sm ring-2 ring-farafin/30'
                        : 'bg-slate-100 dark:bg-zinc-950/70 text-slate-700 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-zinc-500'}`} />
                    <span>{opt.label}</span>
                    {audienceCounts && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ml-0.5 ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
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

          {/* Row 2: Sprache & Track */}
          <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-zinc-800/60">
            <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-zinc-400">
              <span className="font-semibold flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
                <span>2. Sprache & Track:</span>
              </span>
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 hidden sm:inline">
                {languageValue === 'all' && 'Alle Sprachen (Deutsch, Englisch, Bilingual)'}
                {languageValue === 'en' && 'Rein englischsprachig'}
                {languageValue === 'bilingual' && 'Zweisprachige Stationen'}
                {languageValue === 'de' && 'Deutschsprachig'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {languageOptions.map(opt => {
                const isActive = languageValue === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => onLanguageChange(opt.id)}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-farafin text-white font-bold shadow-sm ring-2 ring-farafin/30'
                        : 'bg-slate-100 dark:bg-zinc-950/70 text-slate-700 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800'
                    }`}
                  >
                    <span className="text-xs">{opt.flag}</span>
                    <span>{opt.label}</span>
                    {languageCounts && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ml-0.5 ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
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
      )}
    </div>
  );
};

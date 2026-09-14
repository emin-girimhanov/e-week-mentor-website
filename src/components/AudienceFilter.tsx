import type { FC } from 'react';
import type { TargetAudience } from '../data/portalData';
import { Users, GraduationCap, Globe, Sparkles } from 'lucide-react';

export type AudienceFilterValue = 'all' | TargetAudience;

interface AudienceFilterProps {
  value: AudienceFilterValue;
  onChange: (val: AudienceFilterValue) => void;
  counts?: {
    all: number;
    bachelor: number;
    international: number;
    master: number;
  };
}

export const AudienceFilter: FC<AudienceFilterProps> = ({ value, onChange, counts }) => {
  const options: { id: AudienceFilterValue; label: string; icon: typeof Users }[] = [
    { id: 'all', label: 'Alles anzeigen', icon: Users },
    { id: 'bachelor', label: 'Bachelor', icon: GraduationCap },
    { id: 'international', label: 'Internationals', icon: Globe },
    { id: 'master', label: 'Master', icon: Sparkles }
  ];

  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 shadow-sm mb-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 px-0.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-farafin animate-pulse" />
          <span className="text-xs font-semibold text-zinc-200">
            Zielgruppen-Filter
          </span>
        </div>
        <span className="text-[11px] text-zinc-400">
          {value === 'all' && 'Alle Schichten und Programmpunkte sichtbar'}
          {value === 'bachelor' && 'Gefiltert auf Bachelor-Erstis und Mentoren'}
          {value === 'international' && 'Gefiltert auf Internationals (English Tracks und Orientation)'}
          {value === 'master' && 'Gefiltert auf Master-Erstis (Studiumsplanung und Brunch)'}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
        {options.map(opt => {
          const Icon = opt.icon;
          const isActive = value === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-farafin text-white font-semibold shadow-sm ring-1 ring-farafin-light/40'
                  : 'bg-zinc-950/70 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
              <div className="flex items-center gap-1.5">
                <span>{opt.label}</span>
                {counts && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {counts[opt.id]}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

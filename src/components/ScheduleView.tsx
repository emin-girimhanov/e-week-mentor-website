import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { DAYS_SCHEDULE } from '../data/portalData';
import type { ScheduleItem } from '../data/portalData';
import { Clock, MapPin, Users, CheckSquare, Square, AlertTriangle, Info, Sparkles } from 'lucide-react';

interface ScheduleViewProps {
  searchQuery: string;
}

export const ScheduleView: FC<ScheduleViewProps> = ({ searchQuery }) => {
  const [selectedDayId, setSelectedDayId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ewoche_checked_tasks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('ewoche_checked_tasks', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleCheck = (taskId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const categories = [
    { id: 'all', label: 'Alle Aufgaben' },
    { id: 'lotsendienst', label: 'Lotsendienst' },
    { id: 'planung', label: 'Studiumsplanung' },
    { id: 'rallye', label: 'Rallyes' },
    { id: 'party', label: 'Abend & Party' },
    { id: 'orga', label: 'Orga & Logistik' }
  ];

  // Filtering logic
  const filteredDays = DAYS_SCHEDULE.map(day => {
    if (selectedDayId !== 'all' && day.id !== selectedDayId) {
      return null;
    }

    const items = day.items.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchLocation = item.location.toLowerCase().includes(q);
      const matchRoom = item.roomBadge.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchResponsible = item.responsible.some(r => r.toLowerCase().includes(q));

      return matchTitle || matchLocation || matchRoom || matchDesc || matchResponsible;
    });

    return { ...day, items };
  }).filter((d): d is typeof DAYS_SCHEDULE[0] => d !== null && d.items.length > 0);

  return (
    <div className="space-y-6">
      {/* Day Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setSelectedDayId('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer shrink-0 transition-all ${
            selectedDayId === 'all'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          Ganze Woche
        </button>
        {DAYS_SCHEDULE.map(day => (
          <button
            key={day.id}
            onClick={() => setSelectedDayId(day.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer shrink-0 transition-all ${
              selectedDayId === day.id
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span>{day.dayName}</span>
            <span className="opacity-70 ml-1 text-[10px]">({day.date.split('.')[0]}.{day.date.split('.')[1]}.)</span>
          </button>
        ))}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-2.5 py-1 rounded-md text-[11px] cursor-pointer shrink-0 transition-all ${
              selectedCategory === cat.id
                ? 'bg-slate-700 text-cyan-300 font-semibold border border-cyan-500/40'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results Summary */}
      {searchQuery && (
        <div className="text-xs text-slate-400 bg-slate-900/60 border border-slate-800 px-3 py-2 rounded-lg flex items-center justify-between">
          <span>Suchergebnisse für: <strong className="text-cyan-300">"{searchQuery}"</strong></span>
          <span>{filteredDays.reduce((acc, d) => acc + d.items.length, 0)} Treffer</span>
        </div>
      )}

      {/* Schedule Items by Day */}
      {filteredDays.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 border border-slate-800/80 rounded-2xl">
          <Info className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <p className="text-sm text-slate-300 font-medium">Keine Einträge für diese Filterkombination gefunden</p>
          <p className="text-xs text-slate-500 mt-1">Überprüfe deine Suchbegriffe oder wähle "Alle Aufgaben" aus.</p>
        </div>
      ) : (
        filteredDays.map(day => (
          <div key={day.id} className="space-y-3">
            {/* Day Header */}
            <div className="flex items-baseline justify-between border-b border-slate-800 pb-2 pt-2">
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {day.dayName}, {day.date}
                </h2>
                <span className="text-xs text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded-full hidden sm:inline-block">
                  {day.focus}
                </span>
              </div>
              <span className="text-xs text-slate-400">
                {day.items.length} {day.items.length === 1 ? 'Programmpunkt' : 'Programmpunkte'}
              </span>
            </div>

            {/* Event Cards */}
            <div className="grid gap-3">
              {day.items.map(item => (
                <ScheduleCard
                  key={item.id}
                  item={item}
                  checkedItems={checkedItems}
                  onToggleCheck={toggleCheck}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

interface ScheduleCardProps {
  item: ScheduleItem;
  checkedItems: Record<string, boolean>;
  onToggleCheck: (taskId: string) => void;
}

const ScheduleCard: FC<ScheduleCardProps> = ({ item, checkedItems, onToggleCheck }) => {
  const [expanded, setExpanded] = useState(false);

  const getCategoryColor = (cat: ScheduleItem['category']) => {
    switch (cat) {
      case 'lotsendienst':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'begruessung':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'planung':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      case 'rallye':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'party':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'mensa':
        return 'bg-orange-500/15 text-orange-300 border-orange-500/30';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="bg-slate-900/85 border border-slate-800/90 hover:border-slate-700 rounded-xl p-4 sm:p-5 shadow-sm transition-all">
      {/* Top line with Time and Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 px-2.5 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5" />
            {item.time}
          </span>
          <span className={`text-[11px] font-medium border px-2 py-0.5 rounded-md ${getCategoryColor(item.category)}`}>
            {item.category.toUpperCase()}
          </span>
        </div>

        <span className="flex items-center gap-1 text-xs font-medium text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          {item.roomBadge}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-1">
        {item.title}
      </h3>

      {/* Location string */}
      <p className="text-xs text-slate-400 mb-2.5">
        Ort: {item.location}
      </p>

      {/* Responsible People */}
      <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800 mb-3">
        <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span className="text-slate-400">Zuständig:</span>
        <span className="font-medium text-slate-200">{item.responsible.join(', ')}</span>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
        {item.description}
      </p>

      {/* Important Note Alert */}
      {item.importantNote && (
        <div className="flex items-start gap-2 bg-amber-950/40 border border-amber-800/60 rounded-lg p-2.5 text-xs text-amber-200 mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>{item.importantNote}</p>
        </div>
      )}

      {/* Mentor Instructions Box */}
      {item.mentorInstructions && (
        <div className="flex items-start gap-2 bg-cyan-950/40 border border-cyan-800/50 rounded-lg p-2.5 text-xs text-cyan-200 mb-3">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-cyan-300 block mb-0.5">Hinweis für Mentoren:</span>
            <p>{item.mentorInstructions}</p>
          </div>
        </div>
      )}

      {/* Action Checklist */}
      {item.checklist && item.checklist.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-800">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-xs font-semibold text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer py-1"
          >
            <span>Aufgaben-Checkliste ({item.checklist.length} Punkte)</span>
            <span className="text-slate-500">{expanded ? '▲ Weniger' : '▼ Aufgaben anzeigen'}</span>
          </button>

          {expanded && (
            <div className="space-y-2 mt-2 pl-1">
              {item.checklist.map((task, idx) => {
                const taskId = `${item.id}-task-${idx}`;
                const isDone = !!checkedItems[taskId];
                return (
                  <div
                    key={taskId}
                    onClick={() => onToggleCheck(taskId)}
                    className="flex items-start gap-2 text-xs text-slate-300 cursor-pointer group select-none"
                  >
                    <button type="button" className="shrink-0 mt-0.5 text-cyan-400 group-hover:text-cyan-300">
                      {isDone ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                    <span className={isDone ? 'line-through text-slate-500' : 'text-slate-200'}>
                      {task}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

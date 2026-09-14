import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { DAYS_SCHEDULE } from '../data/portalData';
import type { ScheduleItem } from '../data/portalData';
import { Clock, MapPin, Users, CheckSquare, Square, Info, Calendar } from 'lucide-react';
import { generateSingleICS, downloadICSFile, getGoogleCalendarUrl } from '../utils/calendar';

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
    { id: 'all', label: 'Alle' },
    { id: 'lotsendienst', label: 'Lotsendienst' },
    { id: 'planung', label: 'Studiumsplanung' },
    { id: 'rallye', label: 'Rallyes' },
    { id: 'party', label: 'Abendveranstaltung' },
    { id: 'orga', label: 'Orga & Logistik' }
  ];

  // Filtering logic
  const filteredDays = DAYS_SCHEDULE.map(day => {
    if (selectedDayId !== 'all' && day.id !== selectedDayId) {
      return null;
    }

    const items = day.items.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

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
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Day Selector Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setSelectedDayId('all')}
          className={`px-3 py-1.5 rounded-md text-xs cursor-pointer shrink-0 transition-colors ${
            selectedDayId === 'all'
              ? 'bg-zinc-100 text-zinc-950 font-semibold'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          Ganze Woche
        </button>
        {DAYS_SCHEDULE.map(day => (
          <button
            key={day.id}
            onClick={() => setSelectedDayId(day.id)}
            className={`px-3 py-1.5 rounded-md text-xs cursor-pointer shrink-0 transition-colors ${
              selectedDayId === day.id
                ? 'bg-zinc-100 text-zinc-950 font-semibold'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            <span>{day.dayName}</span>
            <span className="opacity-60 ml-1 text-[11px]">({day.date.split('.')[0]}.{day.date.split('.')[1]}.)</span>
          </button>
        ))}
      </div>

      {/* Category Pills (Subdued, simple) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-2.5 py-1 rounded text-xs cursor-pointer shrink-0 transition-colors ${
              selectedCategory === cat.id
                ? 'bg-zinc-800 text-zinc-200 font-medium border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results note if searching */}
      {searchQuery && (
        <div className="text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-md flex items-center justify-between">
          <span>Suchergebnisse für: <strong className="text-zinc-200">"{searchQuery}"</strong></span>
          <span>{filteredDays.reduce((acc, d) => acc + d.items.length, 0)} Treffer</span>
        </div>
      )}

      {/* Days & Events */}
      {filteredDays.length === 0 ? (
        <div className="text-center py-12 bg-zinc-900/40 border border-zinc-800/80 rounded-xl">
          <Info className="w-6 h-6 text-zinc-500 mx-auto mb-2" />
          <p className="text-sm text-zinc-300 font-medium">Keine Einträge für diese Filterkombination gefunden</p>
          <p className="text-xs text-zinc-500 mt-1">Überprüfe deine Suchbegriffe oder wähle "Alle" aus.</p>
        </div>
      ) : (
        filteredDays.map(day => (
          <div key={day.id} className="space-y-3">
            {/* Day Header */}
            <div className="flex items-baseline justify-between border-b border-zinc-800 pb-2 pt-2">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-semibold text-zinc-100">
                  {day.dayName}, {day.date}
                </h2>
                <span className="text-xs text-zinc-400 hidden sm:inline-block">
                  • {day.focus}
                </span>
              </div>
              <span className="text-xs text-zinc-500">
                {day.items.length} {day.items.length === 1 ? 'Eintrag' : 'Einträge'}
              </span>
            </div>

            {/* Event Cards */}
            <div className="grid gap-2.5">
              {day.items.map(item => (
                <ScheduleCard
                  key={item.id}
                  item={item}
                  dateStr={day.date}
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
  dateStr: string;
  checkedItems: Record<string, boolean>;
  onToggleCheck: (taskId: string) => void;
}

const ScheduleCard: FC<ScheduleCardProps> = ({ item, dateStr, checkedItems, onToggleCheck }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-zinc-900/60 border border-zinc-800/90 rounded-lg p-4 transition-colors hover:border-zinc-700">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {/* Red Meeting Time (10 min earlier) */}
          <span className="text-xs font-mono font-bold text-red-400 bg-red-950/60 border border-red-800/60 px-2 py-0.5 rounded">
            Treffen: {item.meetingTime}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/60">
            <Clock className="w-3 h-3 text-zinc-500" />
            {item.time}
          </span>
        </div>

        <span className="flex items-center gap-1 text-xs font-medium text-zinc-300 bg-zinc-800/50 px-2 py-0.5 rounded border border-zinc-800">
          <MapPin className="w-3 h-3 text-zinc-400" />
          {item.roomBadge}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-zinc-100 tracking-tight mb-1">
        {item.title}
      </h3>

      {/* Location with Direct Map Links */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-2">
        <span>Ort: {item.location}</span>
        <div className="inline-flex items-center gap-1.5 ml-auto">
          <a
            href={item.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-zinc-300 hover:text-white bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700/80"
          >
            Google Maps
          </a>
          <a
            href={item.appleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-zinc-300 hover:text-white bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700/80"
          >
            Apple Karten
          </a>
        </div>
      </div>

      {/* Responsible People */}
      <div className="flex items-center gap-1.5 text-xs text-zinc-300 mb-2.5">
        <Users className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
        <span className="text-zinc-500">Zuständig:</span>
        <span className="font-medium text-zinc-300">{item.responsible.join(', ')}</span>
      </div>

      {/* Description */}
      <p className="text-xs text-zinc-300 leading-relaxed mb-2.5">
        {item.description}
      </p>

      {/* Important Note */}
      {item.importantNote && (
        <div className="bg-zinc-800/50 border-l-2 border-amber-500/80 px-3 py-2 rounded-r text-xs text-zinc-300 mb-2.5">
          <strong className="text-zinc-200 block mb-0.5">Wichtiger Hinweis:</strong>
          <span>{item.importantNote}</span>
        </div>
      )}

      {/* Mentor Instructions */}
      {item.mentorInstructions && (
        <div className="bg-zinc-800/40 border-l-2 border-zinc-400 px-3 py-2 rounded-r text-xs text-zinc-300 mb-2.5">
          <strong className="text-zinc-200 block mb-0.5">Hinweis für Mentoren:</strong>
          <span>{item.mentorInstructions}</span>
        </div>
      )}

      {/* 1-Click Calendar Actions */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-800/80 mb-2">
        <span className="text-[11px] text-zinc-500 font-medium">Kalender (-10 Min Alarm):</span>
        <button
          onClick={() => downloadICSFile(generateSingleICS(item, dateStr), `FaRaFIN-${item.id}.ics`)}
          className="text-[11px] text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-2 py-0.5 rounded border border-zinc-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
          title="Als .ics-Datei mit 10-Min-Alarm herunterladen"
        >
          <Calendar className="w-3 h-3 text-zinc-400" />
          <span>In Kalender (.ics)</span>
        </button>
        <a
          href={getGoogleCalendarUrl(item, dateStr)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-2 py-0.5 rounded border border-zinc-700 transition-colors inline-flex items-center gap-1"
          title="Direkt zu Google Kalender hinzufügen"
        >
          <span>Google Kalender</span>
        </a>
      </div>

      {/* Checklist */}
      {item.checklist && item.checklist.length > 0 && (
        <div className="mt-3 pt-2.5 border-t border-zinc-800/80">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-xs font-medium text-zinc-400 hover:text-zinc-200 cursor-pointer py-0.5"
          >
            <span>Aufgaben ({item.checklist.length})</span>
            <span className="text-[11px] text-zinc-500">{expanded ? 'Schließen' : 'Anzeigen'}</span>
          </button>

          {expanded && (
            <div className="space-y-1.5 mt-2 pt-1">
              {item.checklist.map((task, idx) => {
                const taskId = `${item.id}-task-${idx}`;
                const isDone = !!checkedItems[taskId];
                return (
                  <div
                    key={taskId}
                    onClick={() => onToggleCheck(taskId)}
                    className="flex items-start gap-2 text-xs text-zinc-300 cursor-pointer select-none py-0.5"
                  >
                    <button type="button" className="shrink-0 mt-0.5 text-zinc-400">
                      {isDone ? (
                        <CheckSquare className="w-3.5 h-3.5 text-zinc-100" />
                      ) : (
                        <Square className="w-3.5 h-3.5 text-zinc-600" />
                      )}
                    </button>
                    <span className={isDone ? 'line-through text-zinc-500' : 'text-zinc-300'}>
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

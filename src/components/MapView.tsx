import { useState } from 'react';
import type { FC } from 'react';
import { DAYS_SCHEDULE, ROOMS_DATA } from '../data/portalData';
import type { AudienceFilterValue, LanguageFilterValue } from './AudienceFilter';
import { InteractiveMap } from './InteractiveMap';
import { MapPin, Navigation, ExternalLink, Clock, Users, Layers, Info, Map as MapIcon, Table } from 'lucide-react';

interface MapViewProps {
  searchQuery: string;
  selectedAudience?: AudienceFilterValue;
  selectedLanguage?: LanguageFilterValue;
}

export const MapView: FC<MapViewProps> = ({
  searchQuery,
  selectedAudience = 'all',
  selectedLanguage = 'all'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'table' | 'interactive' | 'rooms'>('table');
  const [selectedDayId, setSelectedDayId] = useState<string>('all');

  // Filter schedule items for table
  const filteredDays = DAYS_SCHEDULE.map(day => {
    if (selectedDayId !== 'all' && day.id !== selectedDayId) {
      return null;
    }

    const items = day.items.filter(item => {
      // 1. Audience Filter
      if (selectedAudience !== 'all' && !item.audiences.includes(selectedAudience)) {
        return false;
      }

      // 2. Language Filter
      if (selectedLanguage !== 'all' && item.language !== selectedLanguage) {
        return false;
      }

      // 3. Search Query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchLocation = item.location.toLowerCase().includes(q);
      const matchRoom = item.roomBadge.toLowerCase().includes(q);
      const matchResponsible = item.responsible.some(r => r.toLowerCase().includes(q));
      const matchTime = item.meetingTime.toLowerCase().includes(q) || item.time.toLowerCase().includes(q);
      const matchLanguage = (item.language === 'en' && (q.includes('engl') || q.includes('internat'))) ||
                            (item.language === 'bilingual' && (q.includes('bil') || q.includes('engl') || q.includes('internat')));

      return matchTitle || matchLocation || matchRoom || matchResponsible || matchTime || matchLanguage;
    });

    return { ...day, items };
  }).filter((d): d is typeof DAYS_SCHEDULE[0] => d !== null && d.items.length > 0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Subtab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 border-b border-slate-200 dark:border-zinc-800">
        <button
          onClick={() => setActiveSubTab('table')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs cursor-pointer transition-colors shrink-0 font-medium ${
            activeSubTab === 'table'
              ? 'bg-farafin text-white font-bold shadow-sm'
              : 'bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 border border-slate-200 dark:border-zinc-800'
          }`}
        >
          <Table className="w-3.5 h-3.5" />
          <span>Einsatz-Tabelle (-10 Min)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('interactive')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs cursor-pointer transition-colors shrink-0 font-medium ${
            activeSubTab === 'interactive'
              ? 'bg-farafin text-white font-bold shadow-sm'
              : 'bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 border border-slate-200 dark:border-zinc-800'
          }`}
        >
          <MapIcon className="w-3.5 h-3.5" />
          <span>Interaktive Karte (Campus & Rallye)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('rooms')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs cursor-pointer transition-colors shrink-0 font-medium ${
            activeSubTab === 'rooms'
              ? 'bg-farafin text-white font-bold shadow-sm'
              : 'bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 border border-slate-200 dark:border-zinc-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Gebäude 29 Raum-Verzeichnis</span>
        </button>
      </div>

      {/* View 1: Einsatz-Tabelle mit roten Treffzeiten & Trefforten */}
      {activeSubTab === 'table' && (
        <div className="space-y-5">
          {/* Info Banner */}
          <div className="bg-white dark:bg-zinc-900/70 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 text-xs text-slate-700 dark:text-zinc-300 leading-relaxed flex items-start gap-3 shadow-xs">
            <Info className="w-4 h-4 text-farafin dark:text-farafin-light shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-zinc-100 block mb-0.5">
                Idiotensicherer Einsatzplan: Zeiten & Treffort rot markiert
              </span>
              <span>
                Die <strong className="text-red-600 dark:text-red-400 font-black">rot markierten Zeiten</strong> und der <strong className="text-red-600 dark:text-red-400 font-bold">rot markierte Treffort</strong> zeigen exakt, wann und wo ihr vor Ort sein müsst (immer 10 Minuten vor offiziellem Programmstart). Klickt beim Ort direkt auf Google Maps oder Apple Karten für die Navigation.
              </span>
            </div>
          </div>

          {/* Day Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setSelectedDayId('all')}
              className={`px-3 py-1.5 rounded-lg text-xs cursor-pointer shrink-0 transition-colors font-medium ${
                selectedDayId === 'all'
                  ? 'bg-farafin text-white font-bold shadow-sm'
                  : 'bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 border border-slate-200 dark:border-zinc-800'
              }`}
            >
              Ganze Woche
            </button>
            {DAYS_SCHEDULE.map(day => (
              <button
                key={day.id}
                onClick={() => setSelectedDayId(day.id)}
                className={`px-3 py-1.5 rounded-lg text-xs cursor-pointer shrink-0 transition-colors font-medium ${
                  selectedDayId === day.id
                    ? 'bg-farafin text-white font-bold shadow-sm'
                    : 'bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 border border-slate-200 dark:border-zinc-800'
                }`}
              >
                <span>{day.dayName}</span>
                <span className="opacity-75 ml-1 text-[11px]">({day.date.split('.')[0]}.{day.date.split('.')[1]}.)</span>
              </button>
            ))}
          </div>

          {/* Schedule Table */}
          {filteredDays.length === 0 ? (
            <div className="text-center py-10 bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 rounded-xl text-xs text-slate-500 dark:text-zinc-400">
              Keine Termine für diese Suchkriterien gefunden.
            </div>
          ) : (
            <div className="space-y-6">
              {filteredDays.map(day => (
                <div key={day.id} className="space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-1.5">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-200">
                      {day.dayName}, {day.date}
                    </h3>
                    <span className="text-[11px] text-slate-500 dark:text-zinc-500 font-medium">
                      {day.focus}
                    </span>
                  </div>

                  {/* Responsive Table Container */}
                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-xs">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/90 text-slate-700 dark:text-zinc-400 font-semibold">
                          <th className="py-3 px-3.5 whitespace-nowrap text-red-600 dark:text-red-400 font-bold">
                            Wann da sein? (-10 Min)
                          </th>
                          <th className="py-3 px-3.5 min-w-[170px]">
                            Programmpunkt & Beginn
                          </th>
                          <th className="py-3 px-3.5 min-w-[210px] text-red-600 dark:text-red-400">
                            Treffort (Rot markiert)
                          </th>
                          <th className="py-3 px-3.5 min-w-[140px]">
                            Zuständige Mentoren
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-zinc-800/70 text-slate-700 dark:text-zinc-300">
                        {day.items.map(item => (
                          <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                            {/* 1. Treffzeit (10 Min eher in auffälligem Rot) */}
                            <td className="py-3.5 px-3.5 align-top whitespace-nowrap">
                              <div className="inline-flex flex-col items-start">
                                <span className="text-sm font-mono font-black text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 px-2.5 py-1 rounded-md">
                                  {item.meetingTime}
                                </span>
                                <span className="text-[10px] text-red-700 dark:text-red-300 mt-1 font-bold">
                                  10 Min vor Beginn
                                </span>
                              </div>
                            </td>

                            {/* 2. Programmpunkt & Offizielle Uhrzeit */}
                            <td className="py-3.5 px-3.5 align-top">
                              <div className="flex items-center gap-1 flex-wrap mb-1">
                                {item.audiences.map(aud => (
                                  <span
                                    key={aud}
                                    className={`text-[9px] uppercase font-mono font-bold px-1.5 py-0.2 rounded border ${
                                      aud === 'bachelor'
                                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50'
                                        : aud === 'master'
                                        ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/50'
                                        : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50'
                                    }`}
                                  >
                                    {aud === 'international' ? 'International' : aud}
                                  </span>
                                ))}
                                {item.language === 'en' && (
                                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50">
                                    🇬🇧 English
                                  </span>
                                )}
                                {item.language === 'bilingual' && (
                                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800/50">
                                    🔀 Bilingual
                                  </span>
                                )}
                                {item.language === 'de' && (
                                  <span className="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded border bg-slate-100 dark:bg-zinc-800/60 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-700/50">
                                    🇩🇪 DE
                                  </span>
                                )}
                              </div>
                              <strong className="text-slate-900 dark:text-zinc-100 block text-xs font-bold mb-0.5">
                                {item.title}
                              </strong>
                              <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 flex items-center gap-1 font-medium">
                                <Clock className="w-3 h-3 text-slate-400 dark:text-zinc-500" />
                                {item.time}
                              </span>
                            </td>

                            {/* 3. Treffort rot markiert & Karten-Verlinkung */}
                            <td className="py-3.5 px-3.5 align-top">
                              <div className="space-y-2">
                                <div className="flex items-start gap-1.5 p-2 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 font-bold">
                                  <MapPin className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                                  <div>
                                    <span className="block leading-snug">{item.location}</span>
                                    <span className="inline-block mt-1 text-[10px] font-mono px-1.5 py-0.2 bg-red-100 dark:bg-red-900/60 rounded text-red-800 dark:text-red-200 border border-red-300 dark:border-red-800">
                                      Raum: {item.roomBadge}
                                    </span>
                                  </div>
                                </div>

                                {/* Direct Map Links */}
                                <div className="flex items-center gap-1.5 pt-0.5">
                                  <a
                                    href={item.googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-zinc-700 text-[11px] font-medium transition-colors"
                                  >
                                    <Navigation className="w-3 h-3 text-farafin dark:text-zinc-400" />
                                    <span>Google Maps</span>
                                  </a>

                                  <a
                                    href={item.appleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-zinc-700 text-[11px] font-medium transition-colors"
                                  >
                                    <ExternalLink className="w-3 h-3 text-farafin dark:text-zinc-400" />
                                    <span>Apple Karten</span>
                                  </a>
                                </div>
                              </div>
                            </td>

                            {/* 4. Zuständige */}
                            <td className="py-3.5 px-3.5 align-top text-slate-600 dark:text-zinc-400">
                              <div className="flex items-start gap-1">
                                <Users className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                                <span className="leading-snug">
                                  {item.responsible.join(', ')}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* View 2: Interaktive Karte (Leaflet OpenStreetMap) */}
      {activeSubTab === 'interactive' && (
        <InteractiveMap />
      )}

      {/* View 3: Gebäude 29 Raum-Verzeichnis */}
      {activeSubTab === 'rooms' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-700 dark:text-zinc-400 bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-xs">
            Übersicht aller Kernräume im Gebäude 29 (FIN) mit Etagen und Verwendungszweck.
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/90 text-slate-700 dark:text-zinc-400 font-semibold">
                  <th className="py-2.5 px-3">Raum</th>
                  <th className="py-2.5 px-3">Etage</th>
                  <th className="py-2.5 px-3">Nutzung / Studiengang</th>
                  <th className="py-2.5 px-3">Kartenlink</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-zinc-800/70 text-slate-700 dark:text-zinc-300">
                {ROOMS_DATA.map(r => (
                  <tr key={r.room} className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-transparent whitespace-nowrap">
                      {r.room}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-zinc-400 whitespace-nowrap font-medium">
                      {r.floor}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="leading-relaxed">
                        <span className="text-slate-900 dark:text-zinc-200 font-medium">{r.purpose}</span>
                        {r.studyPrograms && r.studyPrograms.length > 0 && (
                          <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                            Studiengänge: {r.studyPrograms.join(', ')}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={r.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-farafin hover:underline font-medium"
                        >
                          Google
                        </a>
                        <span className="text-slate-400 dark:text-zinc-600">/</span>
                        <a
                          href={r.appleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-farafin hover:underline font-medium"
                        >
                          Apple
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

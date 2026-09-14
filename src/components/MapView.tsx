import { useState } from 'react';
import type { FC } from 'react';
import { DAYS_SCHEDULE, ROOMS_DATA } from '../data/portalData';
import { InteractiveMap } from './InteractiveMap';
import { MapPin, Navigation, ExternalLink, Clock, Users, Layers, Info, Map as MapIcon, Table } from 'lucide-react';

interface MapViewProps {
  searchQuery: string;
}

export const MapView: FC<MapViewProps> = ({ searchQuery }) => {
  const [activeSubTab, setActiveSubTab] = useState<'table' | 'interactive' | 'rooms'>('table');
  const [selectedDayId, setSelectedDayId] = useState<string>('all');

  // Filter schedule items for table
  const filteredDays = DAYS_SCHEDULE.map(day => {
    if (selectedDayId !== 'all' && day.id !== selectedDayId) {
      return null;
    }

    const items = day.items.filter(item => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchLocation = item.location.toLowerCase().includes(q);
      const matchRoom = item.roomBadge.toLowerCase().includes(q);
      const matchResponsible = item.responsible.some(r => r.toLowerCase().includes(q));
      const matchTime = item.meetingTime.toLowerCase().includes(q) || item.time.toLowerCase().includes(q);

      return matchTitle || matchLocation || matchRoom || matchResponsible || matchTime;
    });

    return { ...day, items };
  }).filter((d): d is typeof DAYS_SCHEDULE[0] => d !== null && d.items.length > 0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Subtab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 border-b border-zinc-800">
        <button
          onClick={() => setActiveSubTab('table')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors shrink-0 ${
            activeSubTab === 'table'
              ? 'bg-zinc-100 text-zinc-950 font-semibold'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          <Table className="w-3.5 h-3.5" />
          <span>Einsatz-Tabelle (-10 Min)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('interactive')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors shrink-0 ${
            activeSubTab === 'interactive'
              ? 'bg-zinc-100 text-zinc-950 font-semibold'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          <MapIcon className="w-3.5 h-3.5" />
          <span>Interaktive Karte (Campus & Rallye)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('rooms')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors shrink-0 ${
            activeSubTab === 'rooms'
              ? 'bg-zinc-100 text-zinc-950 font-semibold'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Gebäude 29 Raum-Verzeichnis</span>
        </button>
      </div>

      {/* View 1: Einsatz-Tabelle mit roten Treffzeiten */}
      {activeSubTab === 'table' && (
        <div className="space-y-5">
          {/* Info Banner */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-lg p-3.5 text-xs text-zinc-300 leading-relaxed flex items-start gap-2.5">
            <Info className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-zinc-100 block mb-0.5">
                Idiotensicherer Einsatzplan: Pünktlichkeit & Treffzeiten
              </span>
              <span>
                Die <strong className="text-red-400">rot markierten Zeiten</strong> zeigen den verbindlichen Eintreffzeitpunkt für alle eingeteilten Mentorinnen und Mentoren (jeweils 10 Minuten vor offiziellem Programmstart). Klicke beim Ort auf Google Maps oder Apple Karten für die direkte Wegführung.
              </span>
            </div>
          </div>

          {/* Day Selector Pills */}
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

          {/* Schedule Table */}
          {filteredDays.length === 0 ? (
            <div className="text-center py-10 bg-zinc-900/40 border border-zinc-800 rounded-lg text-xs text-zinc-400">
              Keine Termine für diese Suchkriterien gefunden.
            </div>
          ) : (
            <div className="space-y-6">
              {filteredDays.map(day => (
                <div key={day.id} className="space-y-2">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
                    <h3 className="text-sm font-semibold text-zinc-200">
                      {day.dayName}, {day.date}
                    </h3>
                    <span className="text-[11px] text-zinc-500">
                      {day.focus}
                    </span>
                  </div>

                  {/* Responsive Table Container */}
                  <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/50">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/90 text-zinc-400 font-medium">
                          <th className="py-2.5 px-3 whitespace-nowrap text-red-400 font-semibold">
                            Wann da sein? (-10 Min)
                          </th>
                          <th className="py-2.5 px-3 min-w-[160px]">
                            Programmpunkt & Beginn
                          </th>
                          <th className="py-2.5 px-3 min-w-[200px]">
                            Treffort & Verlinkung
                          </th>
                          <th className="py-2.5 px-3 min-w-[140px]">
                            Zuständige Mentoren
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/70 text-zinc-300">
                        {day.items.map(item => (
                          <tr key={item.id} className="hover:bg-zinc-800/40 transition-colors">
                            {/* 1. Treffzeit (10 Min eher in auffälligem Rot) */}
                            <td className="py-3 px-3 align-top whitespace-nowrap">
                              <div className="inline-flex flex-col items-start">
                                <span className="text-sm font-mono font-bold text-red-400 bg-red-950/50 border border-red-800/60 px-2 py-0.5 rounded">
                                  {item.meetingTime}
                                </span>
                                <span className="text-[10px] text-red-300/80 mt-1 font-medium">
                                  10 Min vor Beginn
                                </span>
                              </div>
                            </td>

                            {/* 2. Programmpunkt & Offizielle Uhrzeit */}
                            <td className="py-3 px-3 align-top">
                              <strong className="text-zinc-100 block text-xs mb-0.5">
                                {item.title}
                              </strong>
                              <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-zinc-500" />
                                {item.time}
                              </span>
                            </td>

                            {/* 3. Treffort & Karten-Verlinkung */}
                            <td className="py-3 px-3 align-top">
                              <div className="space-y-1.5">
                                <div className="flex items-start gap-1">
                                  <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                                  <span className="text-zinc-200 font-medium">
                                    {item.location}
                                  </span>
                                </div>

                                {/* Direct Map Links */}
                                <div className="flex items-center gap-1.5 pt-0.5">
                                  <a
                                    href={item.googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 text-[11px] transition-colors"
                                  >
                                    <Navigation className="w-3 h-3 text-zinc-400" />
                                    <span>Google Maps</span>
                                  </a>

                                  <a
                                    href={item.appleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 text-[11px] transition-colors"
                                  >
                                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                                    <span>Apple Karten</span>
                                  </a>
                                </div>
                              </div>
                            </td>

                            {/* 4. Zuständige */}
                            <td className="py-3 px-3 align-top text-zinc-400">
                              <div className="flex items-start gap-1">
                                <Users className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
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
          <div className="text-xs text-zinc-400 bg-zinc-900/60 border border-zinc-800 rounded-lg p-3">
            Übersicht aller Kernräume im Gebäude 29 (FIN) mit Etagen und Verwendungszweck.
          </div>

          <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/50">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/90 text-zinc-400 font-medium">
                  <th className="py-2.5 px-3">Raum</th>
                  <th className="py-2.5 px-3">Etage</th>
                  <th className="py-2.5 px-3">Nutzung / Studiengang</th>
                  <th className="py-2.5 px-3">Kartenlink</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/70 text-zinc-300">
                {ROOMS_DATA.map(r => (
                  <tr key={r.room} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-semibold text-zinc-100 whitespace-nowrap">
                      {r.room}
                    </td>
                    <td className="py-2.5 px-3 text-zinc-400 whitespace-nowrap">
                      {r.floor}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="leading-relaxed">
                        <span className="text-zinc-200">{r.purpose}</span>
                        {r.studyPrograms && r.studyPrograms.length > 0 && (
                          <div className="text-[11px] text-zinc-400 mt-0.5">
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
                          className="text-[11px] text-zinc-400 hover:text-zinc-200 underline"
                        >
                          Google
                        </a>
                        <span className="text-zinc-600">/</span>
                        <a
                          href={r.appleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-zinc-400 hover:text-zinc-200 underline"
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

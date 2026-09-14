import { useState } from 'react';
import type { FC } from 'react';
import { ROOMS_DATA } from '../data/portalData';
import { DoorOpen, Layers, Monitor, Phone, Info } from 'lucide-react';

interface RoomsViewProps {
  searchQuery: string;
}

export const RoomsView: FC<RoomsViewProps> = ({ searchQuery }) => {
  const [selectedFloor, setSelectedFloor] = useState<string>('all');

  const floors = [
    { id: 'all', label: 'Alle Etagen' },
    { id: 'Keller', label: 'Keller (UG)' },
    { id: '1. Obergeschoss', label: '1. OG (Büro)' },
    { id: '3. Obergeschoss', label: '3. OG (Hörsaal & Seminare)' },
    { id: '4. Obergeschoss', label: '4. OG (Lager)' },
    { id: 'Erdgeschoss', label: 'Erdgeschoss / Campus' }
  ];

  const filteredRooms = ROOMS_DATA.filter(r => {
    if (selectedFloor !== 'all' && !r.floor.includes(selectedFloor)) {
      return false;
    }

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchRoom = r.room.toLowerCase().includes(q);
    const matchBuilding = r.building.toLowerCase().includes(q);
    const matchPurpose = r.purpose.toLowerCase().includes(q);
    const matchPrograms = r.studyPrograms?.some(p => p.toLowerCase().includes(q));

    return matchRoom || matchBuilding || matchPurpose || matchPrograms;
  });

  return (
    <div className="space-y-6">
      {/* Introduction Banner */}
      <div className="bg-gradient-to-r from-blue-950/60 to-slate-900/80 border border-blue-800/40 rounded-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl shrink-0">
            <DoorOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Raum-Kompass: Gebäude 29 & Campus
            </h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Übersicht aller gebuchten Kernräume für die E-Woche. Das FaRaFIN-Büro (G29-103) ist die durchgehend besetzte Einsatzzentrale. G29-301 steht allen Mentoren als Ruhe- und Vorbereitungsraum zur Verfügung.
            </p>
          </div>
        </div>
      </div>

      {/* Floor Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {floors.map(floor => (
          <button
            key={floor.id}
            onClick={() => setSelectedFloor(floor.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer shrink-0 transition-all ${
              selectedFloor === floor.id
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {floor.label}
          </button>
        ))}
      </div>

      {/* Rooms Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filteredRooms.map(r => (
          <div
            key={r.room}
            className={`rounded-xl p-4 sm:p-5 border transition-all ${
              r.room === 'G29-103'
                ? 'bg-cyan-950/30 border-cyan-500/50 shadow-lg shadow-cyan-950/20'
                : r.room === 'G29-307'
                ? 'bg-blue-950/30 border-blue-500/50'
                : 'bg-slate-900/80 border-slate-800/90 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <span>{r.room}</span>
                  {r.room === 'G29-103' && (
                    <span className="text-[10px] uppercase font-bold bg-cyan-500 text-slate-950 px-2 py-0.5 rounded">
                      Notfall-Zentrale
                    </span>
                  )}
                  {r.room === 'G29-301' && (
                    <span className="text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded">
                      Mentoren-Ruheraum
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{r.building}</p>
              </div>

              <span className="flex items-center gap-1 text-xs font-semibold text-slate-300 bg-slate-800/80 px-2 py-1 rounded border border-slate-700">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                {r.floor}
              </span>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed mb-3">
              <strong className="text-white block mb-0.5">Nutzung:</strong>
              {r.purpose}
            </div>

            {/* Study Programs Assigned */}
            {r.studyPrograms && r.studyPrograms.length > 0 && (
              <div className="mb-3">
                <span className="text-[11px] font-semibold text-cyan-300 block mb-1">
                  Studiengänge (Dienstag / Mittwoch):
                </span>
                <div className="flex flex-wrap gap-1">
                  {r.studyPrograms.map(p => (
                    <span
                      key={p}
                      className="text-[10px] font-medium bg-slate-800 text-slate-200 px-2 py-0.5 rounded border border-slate-700"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Equipment */}
            <div className="flex items-start gap-1.5 text-xs text-slate-400 mb-2">
              <Monitor className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
              <span>{r.equipment}</span>
            </div>

            {/* Responsible Contact */}
            {r.responsibleContact && (
              <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-medium pt-2 border-t border-slate-800">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>Kontakt: {r.responsibleContact}</span>
              </div>
            )}

            {/* Notes */}
            {r.notes && (
              <div className="flex items-start gap-1.5 text-[11px] text-slate-400 pt-2 border-t border-slate-800/60 mt-2">
                <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>{r.notes}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

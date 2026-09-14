import { useState } from 'react';
import type { FC } from 'react';
import { CAMPUS_LOCATIONS, ROOMS_DATA } from '../data/portalData';
import { MapPin, Navigation, ExternalLink, Layers, Monitor, Phone, Info } from 'lucide-react';

interface MapViewProps {
  searchQuery: string;
}

export const MapView: FC<MapViewProps> = ({ searchQuery }) => {
  const [activeSubTab, setActiveSubTab] = useState<'locations' | 'g29rooms'>('locations');
  const [selectedFloor, setSelectedFloor] = useState<string>('all');

  const floors = [
    { id: 'all', label: 'Alle Etagen' },
    { id: 'Keller', label: 'Keller (UG)' },
    { id: '1. Obergeschoss', label: '1. OG (Büro)' },
    { id: '3. Obergeschoss', label: '3. OG (Hörsaal)' },
    { id: '4. Obergeschoss', label: '4. OG (Lager)' },
    { id: 'Erdgeschoss', label: 'Erdgeschoss' }
  ];

  const filteredLocations = CAMPUS_LOCATIONS.filter(loc => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchName = loc.name.toLowerCase().includes(q);
    const matchDesc = loc.description.toLowerCase().includes(q);
    const matchAddr = loc.address.toLowerCase().includes(q);
    const matchRooms = loc.rooms?.some(r => r.toLowerCase().includes(q));
    const matchEvents = loc.keyEvents?.some(e => e.toLowerCase().includes(q));
    return matchName || matchDesc || matchAddr || matchRooms || matchEvents;
  });

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
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Subtab Navigation */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
        <button
          onClick={() => setActiveSubTab('locations')}
          className={`px-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
            activeSubTab === 'locations'
              ? 'bg-zinc-100 text-zinc-950 font-semibold'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          Campus-Orte & Navigation
        </button>
        <button
          onClick={() => setActiveSubTab('g29rooms')}
          className={`px-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
            activeSubTab === 'g29rooms'
              ? 'bg-zinc-100 text-zinc-950 font-semibold'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          Gebäude 29 Raum-Finder
        </button>
      </div>

      {/* View 1: Campus Locations with Maps Links */}
      {activeSubTab === 'locations' && (
        <div className="space-y-4">
          <div className="text-xs text-zinc-400 bg-zinc-900/60 border border-zinc-800/80 rounded-lg p-3">
            Klicke auf die Kartendienste, um eine Route direkt in der jeweiligen Karten-App auf deinem Smartphone zu starten.
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {filteredLocations.map(loc => (
              <div
                key={loc.id}
                className="bg-zinc-900/60 border border-zinc-800/90 rounded-lg p-4 flex flex-col justify-between hover:border-zinc-700 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded border border-zinc-800">
                      {loc.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-zinc-100 mb-1">
                    {loc.name}
                  </h3>

                  <p className="text-xs text-zinc-400 mb-2 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{loc.address}</span>
                  </p>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                    {loc.description}
                  </p>

                  {loc.rooms && loc.rooms.length > 0 && (
                    <div className="mb-3">
                      <span className="text-[11px] text-zinc-400 block mb-1">Enthaltene Räume:</span>
                      <div className="flex flex-wrap gap-1">
                        {loc.rooms.map(r => (
                          <span
                            key={r}
                            className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-700/60"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {loc.keyEvents && loc.keyEvents.length > 0 && (
                    <div className="mb-3 text-xs text-zinc-400">
                      <span className="text-zinc-500">Events: </span>
                      <span>{loc.keyEvents.join(', ')}</span>
                    </div>
                  )}
                </div>

                {/* Map Buttons: Google Maps & Apple Karten */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-zinc-800/80 mt-2">
                  <a
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 rounded text-xs font-medium border border-zinc-700/80 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Google Maps</span>
                  </a>

                  <a
                    href={loc.appleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 rounded text-xs font-medium border border-zinc-700/80 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Apple Karten</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 2: Building 29 Room Directory */}
      {activeSubTab === 'g29rooms' && (
        <div className="space-y-4">
          {/* Floor filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {floors.map(floor => (
              <button
                key={floor.id}
                onClick={() => setSelectedFloor(floor.id)}
                className={`px-3 py-1.5 rounded-md text-xs cursor-pointer shrink-0 transition-colors ${
                  selectedFloor === floor.id
                    ? 'bg-zinc-100 text-zinc-950 font-semibold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {floor.label}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {filteredRooms.map(r => (
              <div
                key={r.room}
                className="bg-zinc-900/60 border border-zinc-800/90 rounded-lg p-4 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                      <span>{r.room}</span>
                      {r.room === 'G29-103' && (
                        <span className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-700">
                          Zentrale
                        </span>
                      )}
                      {r.room === 'G29-301' && (
                        <span className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-700">
                          Ruheraum
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-zinc-400">{r.building}</p>
                  </div>

                  <span className="flex items-center gap-1 text-[11px] text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded border border-zinc-800">
                    <Layers className="w-3 h-3 text-zinc-500" />
                    {r.floor}
                  </span>
                </div>

                <div className="text-xs text-zinc-300 leading-relaxed mb-2.5">
                  <strong className="text-zinc-200 block mb-0.5">Zweck:</strong>
                  {r.purpose}
                </div>

                {r.studyPrograms && r.studyPrograms.length > 0 && (
                  <div className="mb-2.5">
                    <span className="text-[11px] text-zinc-400 block mb-1">Studiengänge:</span>
                    <div className="flex flex-wrap gap-1">
                      {r.studyPrograms.map(p => (
                        <span
                          key={p}
                          className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-700/60"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-1.5 text-xs text-zinc-400 mb-2">
                  <Monitor className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                  <span>{r.equipment}</span>
                </div>

                {r.responsibleContact && (
                  <div className="flex items-center gap-1.5 text-xs text-zinc-300 pt-2 border-t border-zinc-800/80">
                    <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>Kontakt: {r.responsibleContact}</span>
                  </div>
                )}

                {r.notes && (
                  <div className="flex items-start gap-1.5 text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/60 mt-2">
                    <Info className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                    <span>{r.notes}</span>
                  </div>
                )}

                {/* Map navigation for room */}
                {r.googleMapsUrl && r.appleMapsUrl && (
                  <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-zinc-800/80 mt-3">
                    <a
                      href={r.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center py-1.5 px-2 bg-zinc-800/70 hover:bg-zinc-700 text-zinc-300 rounded text-[11px] border border-zinc-700/60 transition-colors"
                    >
                      Google Maps
                    </a>
                    <a
                      href={r.appleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center py-1.5 px-2 bg-zinc-800/70 hover:bg-zinc-700 text-zinc-300 rounded text-[11px] border border-zinc-700/60 transition-colors"
                    >
                      Apple Karten
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

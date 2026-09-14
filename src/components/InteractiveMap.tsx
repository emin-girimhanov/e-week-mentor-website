import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, ExternalLink } from 'lucide-react';

interface MapPoint {
  id: string;
  name: string;
  category: 'campus' | 'stadt';
  coords: [number, number];
  badge: string;
  description: string;
  contact?: string;
  googleMapsUrl: string;
  appleMapsUrl: string;
}

const MAP_POINTS: MapPoint[] = [
  // Campus & Campusrallye
  {
    id: 'g29',
    name: 'Gebäude 29 (FIN)',
    category: 'campus',
    coords: [52.13903, 11.64468],
    badge: 'Zentrale & FaRaFIN-Station',
    description: 'Start- und Zielpunkt aller Rallyes, FaRaFIN-Büro (G29-103) und Hörsaal (G29-307).',
    contact: 'Davide & Emin',
    googleMapsUrl: 'https://maps.google.com/?q=52.13903,11.64468',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+29+FIN+OVGU&ll=52.13903,11.64468'
  },
  {
    id: 'g11',
    name: 'Gebäude 11: UMD Racing Werkstatt',
    category: 'campus',
    coords: [52.13970, 11.64160],
    badge: 'Rallye Route 5',
    description: 'Formula Student Rennwagen, Rennsimulator und Einblick in die Rennwagen-Konstruktion.',
    contact: 'UMD Racing Team',
    googleMapsUrl: 'https://maps.google.com/?q=52.13970,11.64160',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+11+OVGU&ll=52.13970,11.64160'
  },
  {
    id: 'g22',
    name: 'Gebäude 22: DoJo & CWC',
    category: 'campus',
    coords: [52.13812, 11.64251],
    badge: 'Rallye Route 2',
    description: 'Studentenwerk Lerncafé, DoJo, SIDUM, Börsenverein und Campus Welcome Center.',
    contact: 'Studentenwerk Magdeburg',
    googleMapsUrl: 'https://maps.google.com/?q=52.13812,11.64251',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+22+OVGU&ll=52.13812,11.64251'
  },
  {
    id: 'g03',
    name: 'Gebäude 03: Netz39 (G03-106)',
    category: 'campus',
    coords: [52.13880, 11.64320],
    badge: 'Rallye Route 3',
    description: 'Magdeburger Hackerspace: Hardware-Rätsel, Elektronik und Open Source.',
    contact: 'Netz39 e.V.',
    googleMapsUrl: 'https://maps.google.com/?q=52.13880,11.64320',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+03+OVGU&ll=52.13880,11.64320'
  },
  {
    id: 'g05',
    name: 'Gebäude 05: E-Sports (G05-117)',
    category: 'campus',
    coords: [52.13850, 11.64360],
    badge: 'Rallye Route 3',
    description: 'Gaming-Station und Mini-Game Highscore-Challenge.',
    contact: 'E-Sports Magdeburg',
    googleMapsUrl: 'https://maps.google.com/?q=52.13850,11.64360',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+05+OVGU&ll=52.13850,11.64360'
  },
  {
    id: 'g26',
    name: 'Gebäude 26 / Hörsaal 1: StuRa',
    category: 'campus',
    coords: [52.13760, 11.64300],
    badge: 'Rallye Route 4',
    description: 'Hochschulpolitik-Quiz vor dem Hörsaalkomplex und Infos zu Gremien.',
    contact: 'Studierendenrat (StuRa)',
    googleMapsUrl: 'https://maps.google.com/?q=52.13760,11.64300',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+26+OVGU&ll=52.13760,11.64300'
  },
  {
    id: 'mensa',
    name: 'Mensa UniCampus',
    category: 'campus',
    coords: [52.13812, 11.64251],
    badge: 'Verpflegung & Bits & Bites',
    description: 'Kartenterminals zur Gültigkeitsverlängerung und gemeinsamer Mensagang.',
    googleMapsUrl: 'https://maps.google.com/?q=52.13812,11.64251',
    appleMapsUrl: 'https://maps.apple.com/?q=Mensa+UniCampus+Magdeburg&ll=52.13812,11.64251'
  },
  {
    id: 'nordpark',
    name: 'Nordpark (Grillwiese)',
    category: 'campus',
    coords: [52.14410, 11.64350],
    badge: 'Freitag Abschlussgrillen',
    description: 'Große Wiese für Kooperationsgrillen mit Fachschaft Mathematik, Spikeball und Wikingerschach.',
    contact: 'Lars & Lukas',
    googleMapsUrl: 'https://maps.google.com/?q=52.14410,11.64350',
    appleMapsUrl: 'https://maps.apple.com/?q=Nordpark+Magdeburg&ll=52.14410,11.64350'
  },

  // Stadtrallye Mittwoch
  {
    id: 'regiocom',
    name: 'regiocom SE Challenge-Station',
    category: 'stadt',
    coords: [52.13320, 11.64950],
    badge: 'Hauptsponsor-Station',
    description: 'Exklusive Rätselstation direkt an der Elbe. Sponsoren-Rucksäcke und Tech-Preise gewinnen.',
    contact: 'Timon Christ (regiocom)',
    googleMapsUrl: 'https://maps.google.com/?q=52.13320,11.64950',
    appleMapsUrl: 'https://maps.apple.com/?q=regiocom+Magdeburg&ll=52.13320,11.64950'
  },
  {
    id: 'domplatz',
    name: 'Domplatz Magdeburg',
    category: 'stadt',
    coords: [52.12520, 11.63520],
    badge: 'Kultur-Wegpunkt',
    description: 'Magdeburger Dom, Landtag, Grüne Zitadelle (Hundertwasserhaus) und Fotospot.',
    googleMapsUrl: 'https://maps.google.com/?q=52.12520,11.63520',
    appleMapsUrl: 'https://maps.apple.com/?q=Domplatz+Magdeburg&ll=52.12520,11.63520'
  },
  {
    id: 'hassel',
    name: 'Hasselbachplatz',
    category: 'stadt',
    coords: [52.12282, 11.62775],
    badge: 'Kneipentour & Barabend',
    description: 'Zentrum der Magdeburger Gastronomie und Kneipenszene am Dienstagabend.',
    contact: 'Diana',
    googleMapsUrl: 'https://maps.google.com/?q=52.12282,11.62775',
    appleMapsUrl: 'https://maps.apple.com/?q=Hasselbachplatz+Magdeburg&ll=52.12282,11.62775'
  },
  {
    id: 'festung',
    name: 'Festung Mark',
    category: 'stadt',
    coords: [52.13670, 11.64680],
    badge: 'Donnerstag Ausklang',
    description: 'Kulturzentrum, Stübchen und historischer Festungswall.',
    googleMapsUrl: 'https://maps.google.com/?q=52.13670,11.64680',
    appleMapsUrl: 'https://maps.apple.com/?q=Festung+Mark+Magdeburg&ll=52.13670,11.64680'
  }
];

export const InteractiveMap: FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [mapScope, setMapScope] = useState<'campus' | 'stadt'>('campus');
  const [selectedPoint, setSelectedPoint] = useState<MapPoint>(MAP_POINTS[0]);

  const activePoints = MAP_POINTS.filter(p => p.category === mapScope || p.id === 'g29');

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center coordinates: Campus vs Magdeburg City
    const initialCenter: [number, number] = mapScope === 'campus'
      ? [52.13903, 11.64468]
      : [52.13000, 11.63800];
    const initialZoom = mapScope === 'campus' ? 16 : 14;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        zoomControl: true,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView(initialCenter, initialZoom);
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Custom FaRaFIN blue marker icon (red when active)
    const createCustomIcon = (isSelected: boolean) => L.divIcon({
      className: 'custom-map-pin',
      html: `<div style="
        background: ${isSelected ? '#ef4444' : '#3567b0'};
        color: #ffffff;
        border: 2px solid #ffffff;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: bold;
        box-shadow: 0 4px 10px rgba(0,0,0,0.6);
      ">📍</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    // Add markers
    activePoints.forEach(point => {
      const marker = L.marker(point.coords, {
        icon: createCustomIcon(point.id === selectedPoint.id)
      }).addTo(map);

      marker.on('click', () => {
        setSelectedPoint(point);
        map.setView(point.coords, map.getZoom(), { animate: true });
      });
    });

    // Fix leaflet tile rendering on load
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

  }, [mapScope, selectedPoint.id, activePoints]);

  const handleSelectPoint = (point: MapPoint) => {
    setSelectedPoint(point);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(point.coords, 17, { animate: true });
    }
  };

  return (
    <div className="space-y-4">
      {/* Map Scope Selector */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => {
              setMapScope('campus');
              setSelectedPoint(MAP_POINTS[0]);
            }}
            className={`px-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
              mapScope === 'campus'
                ? 'bg-farafin text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Campus- & Rallye-Karte
          </button>
          <button
            onClick={() => {
              setMapScope('stadt');
              setSelectedPoint(MAP_POINTS.find(p => p.id === 'regiocom') || MAP_POINTS[0]);
            }}
            className={`px-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
              mapScope === 'stadt'
                ? 'bg-farafin text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Stadtrallye Magdeburg
          </button>
        </div>

        <span className="text-[11px] text-zinc-500 hidden sm:inline">
          Tippe auf eine Station für Navigationslinks
        </span>
      </div>

      {/* Map Element */}
      <div className="relative rounded-lg overflow-hidden border border-zinc-800 h-72 sm:h-96 w-full z-0">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Selected Point Details Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
              {selectedPoint.badge}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={selectedPoint.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 py-1.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-xs font-medium border border-zinc-700 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-zinc-400" />
              <span>Google Maps</span>
            </a>

            <a
              href={selectedPoint.appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 py-1.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-xs font-medium border border-zinc-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              <span>Apple Karten</span>
            </a>
          </div>
        </div>

        <h4 className="text-base font-semibold text-zinc-100 mb-1">
          {selectedPoint.name}
        </h4>

        <p className="text-xs text-zinc-300 leading-relaxed mb-2">
          {selectedPoint.description}
        </p>

        {selectedPoint.contact && (
          <p className="text-xs text-zinc-400">
            <span className="text-zinc-500">Zuständig: </span>
            <span className="font-medium text-zinc-300">{selectedPoint.contact}</span>
          </p>
        )}
      </div>

      {/* Quick Station Selection Chips */}
      <div className="space-y-2">
        <span className="text-xs font-medium text-zinc-400 block">
          Schnell-Auswahl der Stationen:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {activePoints.map(point => (
            <button
              key={point.id}
              onClick={() => handleSelectPoint(point)}
              className={`px-2.5 py-1.5 rounded text-xs cursor-pointer transition-colors text-left ${
                selectedPoint.id === point.id
                  ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <span>{point.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

import type { FC } from 'react';
import { RALLYE_STATIONS } from '../data/portalData';
import { MapPin, Trophy, Flag, Sparkles } from 'lucide-react';

export const RallyeView: FC = () => {
  const campusStations = RALLYE_STATIONS.filter(s => s.type === 'campus');
  const stadtStations = RALLYE_STATIONS.filter(s => s.type === 'stadt');

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900/80 border border-emerald-800/40 rounded-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl shrink-0">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Campusrallye & Stadtrallye Masterplan
            </h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Übersicht aller 5 Campusrallye-Routen am Montag sowie der bilingualen Stadtrallye am Mittwoch mit der exklusiven Challenge-Station unseres Hauptsponsors regiocom.
            </p>
          </div>
        </div>
      </div>

      {/* Campusrallye 5-Routen Logik */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <span>Campusrallye: 5 Routen im Überblick (Montag 15:00 bis 18:00 Uhr)</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl">
            <span className="font-bold text-cyan-300 block mb-1">Route 1: G29 FIN & Nord-Campus</span>
            <p className="text-slate-400">Gebäude 29 Erkundung, Rechner-Pools, Prüfungsamt G29-101 und FaRaFIN-Station.</p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl">
            <span className="font-bold text-cyan-300 block mb-1">Route 2: G22 Campus Welcome Center</span>
            <p className="text-slate-400">DoJo und Lerncafé des Studentenwerks, Infopoint, SIDUM und Börsenverein.</p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl">
            <span className="font-bold text-cyan-300 block mb-1">Route 3: G05 & G03 Hörsäle</span>
            <p className="text-slate-400">Hörsaalkomplexe, Netz39 Hackerspace in G03-106 und E-Sports Magdeburg in G05-117.</p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl">
            <span className="font-bold text-cyan-300 block mb-1">Route 4: StuRa & Festung Mark</span>
            <p className="text-slate-400">StuRa vor G26 / Hörsaal 1, Unitheke, Kulturareal Festung Mark und Stübchen.</p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl">
            <span className="font-bold text-cyan-300 block mb-1">Route 5: UMD Racing Werkstatt (G11)</span>
            <p className="text-slate-400">Formula Student Rennwagen in G11, Rennsimulator und Maschinenbau-Labore.</p>
          </div>

          <div className="bg-cyan-950/40 border border-cyan-800/50 p-3.5 rounded-xl">
            <span className="font-bold text-white block mb-1">Ziel & Punkteauswertung</span>
            <p className="text-cyan-200">Rückkehr aller Gruppen nach G29 Foyer. Abgabe der Wertungsbögen bei Davide und Emin.</p>
          </div>
        </div>
      </div>

      {/* Campusrallye Stations List */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Flag className="w-4 h-4 text-emerald-400" />
          <span>Stationen der studentischen Initiativen (Montag)</span>
        </h3>

        <div className="grid sm:grid-cols-2 gap-3">
          {campusStations.map((st, idx) => (
            <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h4 className="text-sm font-bold text-white tracking-tight">
                  {st.name}
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  st.status === 'Bestaetigt'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {st.status}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-cyan-300 mb-2 font-medium">
                <MapPin className="w-3.5 h-3.5" />
                <span>{st.location}</span>
                <span className="text-slate-500">• Leitung: {st.lead}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {st.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stadtrallye & regiocom Station */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Stadtrallye: Mittwoch 13:45 bis 18:30 Uhr (Bilingual)</span>
        </h3>

        <div className="space-y-3">
          {stadtStations.map((st, idx) => (
            <div key={idx} className="bg-purple-950/30 border border-purple-800/60 rounded-xl p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-base font-bold text-white">
                  {st.name}
                </h4>
                <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded">
                  Hauptsponsor-Station
                </span>
              </div>
              <p className="text-xs text-cyan-300 mb-2">Ort: {st.location} • Ansprechpartner: {st.lead}</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {st.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Gewinne & Ehrung */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Preise & Gewinner-Ehrung</span>
        </h3>

        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl">
            <span className="font-bold text-amber-300 block mb-1">1. Platz Campusrallye (Hauptpreis)</span>
            <p className="text-slate-300">Hochwertige Rucksäcke und Tech-Goodies unseres Hauptsponsors regiocom SE sowie FaRaFIN-Specials.</p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl">
            <span className="font-bold text-cyan-300 block mb-1">Stadtrallye Etappenpreise</span>
            <p className="text-slate-300">Edle Trinkflaschen und Notizblöcke von SelectLine Software sowie Freigetränk-Gutscheine für die Instaparty.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

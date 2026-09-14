import type { FC } from 'react';
import { QUICK_LINKS } from '../data/portalData';
import { ExternalLink, Award } from 'lucide-react';

export const LinksView: FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-950/60 to-slate-900/80 border border-blue-800/40 rounded-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl shrink-0">
            <ExternalLink className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Ressourcen & Quick-Links
            </h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Direkter Zugriff auf externe Cloud-Ordner, Typst-Zertifikate, Miro-Feedback-Boards und die offizielle FaRaFIN-Webseite.
            </p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {QUICK_LINKS.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-4 sm:p-5 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Externer Link
                </span>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                {link.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {link.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center text-xs font-semibold text-cyan-400 group-hover:underline">
              <span>Jetzt im Browser öffnen</span>
              <span className="ml-1">→</span>
            </div>
          </a>
        ))}
      </div>

      {/* Typst Info Box */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-xl shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white mb-1">
              Offizielle Typst Helfer- & Mentoren-Zertifikate
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Am Wochenende nach der E-Woche (beim Mentoring-Dinner) werden alle offiziellen Bescheinigungen über das bereitstehende Typst-Projekt generiert. Tragt eure geleisteten Schichten sorgfältig ein, damit die Auswertung reibungslos funktioniert.
            </p>
            <a
              href="https://typst.app/team/aaT7YZTCKOva32XW4Tduj4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 underline"
            >
              <span>Typst Team-Projekt ansehen</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

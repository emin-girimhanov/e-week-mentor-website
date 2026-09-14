import type { FC } from 'react';
import { EMERGENCY_CONTACTS } from '../data/portalData';
import { PhoneCall, ShieldAlert, HeartHandshake, AlertOctagon, UserCheck, Phone, MapPin } from 'lucide-react';

export const EmergencyView: FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-950/70 to-slate-900/90 border border-rose-800/60 rounded-2xl p-5 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-rose-500/20 border border-rose-500/40 text-rose-400 rounded-xl shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Notfallkette & Awareness-Leitfaden
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Für Mentoren gilt: Ruhe bewahren, im Tandem agieren und bei Unklarheiten sofort die Hauptorga oder den Notruf kontaktieren. Alle Kontakte sind mit 1-Klick direkt anrufbar.
            </p>
          </div>
        </div>
      </div>

      {/* 3-Step Emergency Chain */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-rose-400" />
          <span>Verbindliche 3-Stufen Notfallkette</span>
        </h3>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
            <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center text-xs font-bold mb-2.5">
              1
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Deeskalation & Schutz</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Direkte Ansprache der betroffenen Personen durch das Mentoren-Tandem. Situation beruhigen, Betroffene aus der Gefahrenzone bringen.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center text-xs font-bold mb-2.5">
              2
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Meldung an Hauptorga</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sofortige telefonische Information an Emin oder Davide. Bei Bedarf Unterstützung durch Orga-Mitglieder aus G29-103 anfordern.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
            <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center justify-center text-xs font-bold mb-2.5">
              3
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Notruf bei Gefahr</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bei medizinischen Notfällen oder akuter Gefahr sofort 112 wählen. Ersthelfer aktivieren und das Orga-Büro (G29-103) informieren.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Contacts Grid */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-cyan-400" />
          <span>Wichtige Notfallkontakte</span>
        </h3>

        <div className="grid sm:grid-cols-2 gap-3.5">
          {EMERGENCY_CONTACTS.map((contact, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-4 border transition-all flex flex-col justify-between ${
                contact.isEmergencyService
                  ? 'bg-rose-950/40 border-rose-800/70'
                  : contact.name.includes('Emin') || contact.name.includes('Davide')
                  ? 'bg-cyan-950/30 border-cyan-700/60'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                    {contact.role}
                  </span>
                  {contact.isEmergencyService && (
                    <span className="text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded">
                      AKUT
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-white mb-1">
                  {contact.name}
                </h4>

                <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                  {contact.responsibility}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{contact.location}</span>
                </div>
              </div>

              {contact.phone && (
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                  className={`mt-2 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                    contact.isEmergencyService
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-900/30'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-950/30'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Anrufen: {contact.phone}</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Awareness Guidelines */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-emerald-400" />
          <span>FaRaFIN Awareness- & Verhaltenskodex</span>
        </h3>

        <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="flex items-start gap-2.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
            <UserCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Null-Toleranz bei Diskriminierung:</strong>
              Sexismus, Rassismus, Queerfeindlichkeit oder verbale und körperliche Übergriffe werden ausnahmslos nicht geduldet. Betroffene Personen werden sofort geschützt und Täter von der Veranstaltung ausgeschlossen.
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
            <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Strikte Freiwilligkeit beim Alkoholkonsum:</strong>
              Bei Kneipentour, Instaparty und Grillen gilt absolute Freiwilligkeit. Trinkspiele dürfen niemals zum Zwang führen. Es stehen immer vollwertige alkoholfreie Getränke und Wasser zur Verfügung.
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
            <UserCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Inklusion & Internationalität:</strong>
              Internationale Studierende werden aktiv eingebunden. Nutzt bilinguale Begrüßungen und stellt sicher, dass englischsprachige Erstis ihren Gruppen zugeteilt sind.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

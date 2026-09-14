import { useState } from 'react';
import type { FC } from 'react';
import { MENTOR_FAQ, EMERGENCY_CONTACTS, RALLYE_STATIONS, QUICK_LINKS } from '../data/portalData';
import {
  HelpCircle,
  PhoneCall,
  Shield,
  Flag,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Phone,
  MapPin,
  Award
} from 'lucide-react';

interface HandbookViewProps {
  searchQuery: string;
}

export const HandbookView: FC<HandbookViewProps> = ({ searchQuery }) => {
  const [activeSection, setActiveSection] = useState<'faq' | 'emergency' | 'rallye' | 'links'>('faq');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredFaq = MENTOR_FAQ.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchQ = item.question.toLowerCase().includes(q);
    const matchA = item.answer.toLowerCase().includes(q);
    const matchActions = item.actionPoints?.some(a => a.toLowerCase().includes(q));
    return matchQ || matchA || matchActions;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Section Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 border-b border-zinc-800">
        <button
          onClick={() => setActiveSection('faq')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors shrink-0 ${
            activeSection === 'faq'
              ? 'bg-farafin text-white font-semibold shadow-sm'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Westentaschen-FAQ</span>
        </button>

        <button
          onClick={() => setActiveSection('emergency')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors shrink-0 ${
            activeSection === 'emergency'
              ? 'bg-farafin text-white font-semibold shadow-sm'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Notfall & Kontakte</span>
        </button>

        <button
          onClick={() => setActiveSection('rallye')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors shrink-0 ${
            activeSection === 'rallye'
              ? 'bg-farafin text-white font-semibold shadow-sm'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          <Flag className="w-3.5 h-3.5" />
          <span>Rallye-Guide</span>
        </button>

        <button
          onClick={() => setActiveSection('links')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors shrink-0 ${
            activeSection === 'links'
              ? 'bg-farafin text-white font-semibold shadow-sm'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Ressourcen & Links</span>
        </button>
      </div>

      {/* Section 1: FAQ */}
      {activeSection === 'faq' && (
        <div className="space-y-3">
          <div className="text-xs text-zinc-400 bg-zinc-900/60 border border-zinc-800 rounded-lg p-3">
            Kompakte Antworten auf wiederkehrende Fragen während der Einführungswoche.
          </div>

          {filteredFaq.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-zinc-900/60 border border-zinc-800/90 rounded-lg overflow-hidden transition-colors hover:border-zinc-700"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-xs font-mono text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded shrink-0">
                      Q{idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-zinc-100">
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-zinc-300' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 border-t border-zinc-800/80 text-xs sm:text-sm text-zinc-300 space-y-3">
                    <p className="leading-relaxed">{item.answer}</p>

                    {item.actionPoints && item.actionPoints.length > 0 && (
                      <div className="bg-zinc-950/60 border border-zinc-800/80 rounded p-3 space-y-1.5 mt-2">
                        <span className="text-xs font-medium text-zinc-300 block mb-1">
                          Empfohlenes Vorgehen:
                        </span>
                        {item.actionPoints.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Section 2: Emergency & Contacts */}
      {activeSection === 'emergency' && (
        <div className="space-y-5">
          {/* 3 Step Emergency Chain */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-4 sm:p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Verbindliche 3-Stufen-Notfallkette
            </h3>
            <div className="grid sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-zinc-950/60 border border-zinc-800/80 p-3 rounded">
                <span className="font-mono text-zinc-400 block mb-1 font-semibold">1. Deeskalation & Schutz</span>
                <p className="text-zinc-400 leading-relaxed">
                  Ansprache im Tandem, Betroffene aus Gefahrenzone begleiten und Situation beruhigen.
                </p>
              </div>

              <div className="bg-zinc-950/60 border border-zinc-800/80 p-3 rounded">
                <span className="font-mono text-zinc-400 block mb-1 font-semibold">2. Meldung an Orga</span>
                <p className="text-zinc-400 leading-relaxed">
                  Sofortige telefonische Meldung an Emin oder Davide. Unterstützung aus G29-103 abrufen.
                </p>
              </div>

              <div className="bg-zinc-950/60 border border-zinc-800/80 p-3 rounded">
                <span className="font-mono text-zinc-200 block mb-1 font-semibold">3. Notruf bei Gefahr</span>
                <p className="text-zinc-400 leading-relaxed">
                  Bei medizinischen Notfällen sofort 112 anrufen und G29-103 informieren.
                </p>
              </div>
            </div>
          </div>

          {/* Contacts Grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            {EMERGENCY_CONTACTS.map((contact, idx) => (
              <div
                key={idx}
                className="bg-zinc-900/60 border border-zinc-800/90 rounded-lg p-4 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block mb-1">
                    {contact.role}
                  </span>
                  <h4 className="text-base font-semibold text-zinc-100 mb-1">
                    {contact.name}
                  </h4>
                  <p className="text-xs text-zinc-400 mb-2">
                    {contact.responsibility}
                  </p>
                  <p className="text-xs text-zinc-500 mb-3 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-600" />
                    <span>{contact.location}</span>
                  </p>
                </div>

                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-xs font-medium border border-zinc-700 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Anrufen: {contact.phone}</span>
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Awareness Code */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-4 sm:p-5 space-y-3 text-xs text-zinc-300 leading-relaxed">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-zinc-400" />
              <span>FaRaFIN Awareness-Leitfaden</span>
            </h3>
            <p>
              <strong>Null-Toleranz bei Diskriminierung:</strong> Diskriminierende Äußerungen, Sexismus, Rassismus oder Übergriffe werden nicht toleriert. Betroffene Personen werden geschützt, Fehlverhalten führt zum Ausschluss.
            </p>
            <p>
              <strong>Freiwilligkeit bei Alkoholkonsum:</strong> Bei Kneipentour, Instaparty und Grillen gilt strikte Freiwilligkeit. Niemand wird zu Trinkspielen gedrängt. Es stehen jederzeit vollwertige alkoholfreie Getränke bereit.
            </p>
            <p>
              <strong>Inklusion:</strong> Internationale Studierende werden proaktiv in englischsprachige oder bilinguale Kleingruppen eingebunden.
            </p>
          </div>
        </div>
      )}

      {/* Section 3: Rallye-Guide */}
      {activeSection === 'rallye' && (
        <div className="space-y-4">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-zinc-100 mb-2">
              Campusrallye (Montag 15:00 bis 18:00 Uhr)
            </h3>
            <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
              5 parallele Routen mit Start am G29-Vorplatz. Jede Gruppe umfasst ca. 10 bis 15 Erstsemester mit einem Mentoren-Tandem.
            </p>
            <div className="grid sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-zinc-950/60 border border-zinc-800 p-2.5 rounded">
                <strong className="text-zinc-200 block mb-0.5">Route 1: G29 FIN & Nord-Campus</strong>
                <span className="text-zinc-400">Gebäude 29 Erkundung, Pools, Prüfungsamt G29-101.</span>
              </div>
              <div className="bg-zinc-950/60 border border-zinc-800 p-2.5 rounded">
                <strong className="text-zinc-200 block mb-0.5">Route 2: G22 Campus Welcome Center</strong>
                <span className="text-zinc-400">DoJo und Lerncafé des Studentenwerks, Infopoint.</span>
              </div>
              <div className="bg-zinc-950/60 border border-zinc-800 p-2.5 rounded">
                <strong className="text-zinc-200 block mb-0.5">Route 3: G05 & G03 Hörsäle</strong>
                <span className="text-zinc-400">Hörsaalkomplexe, Netz39 Hackerspace in G03-106.</span>
              </div>
              <div className="bg-zinc-950/60 border border-zinc-800 p-2.5 rounded">
                <strong className="text-zinc-200 block mb-0.5">Route 4: StuRa & Festung Mark</strong>
                <span className="text-zinc-400">StuRa vor G26, Unitheke, Kulturareal Festung Mark.</span>
              </div>
              <div className="bg-zinc-950/60 border border-zinc-800 p-2.5 rounded sm:col-span-2">
                <strong className="text-zinc-200 block mb-0.5">Route 5: UMD Racing Werkstatt (G11)</strong>
                <span className="text-zinc-400">Formula Student Rennwagen, Rennsimulator und Labore.</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Stationen der Initiativen
            </h3>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {RALLYE_STATIONS.map((st, idx) => (
                <div key={idx} className="bg-zinc-900/60 border border-zinc-800/90 rounded-lg p-3.5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-zinc-100">{st.name}</h4>
                    <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700">
                      {st.status}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-1">Ort: {st.location} • Leitung: {st.lead}</p>
                  <p className="text-xs text-zinc-300 leading-relaxed">{st.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section 4: Resources & Links */}
      {activeSection === 'links' && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            {QUICK_LINKS.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 rounded-lg p-4 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                      Externer Link
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-zinc-100 mb-1">
                    {link.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {link.description}
                  </p>
                </div>
                <span className="text-xs text-zinc-300 mt-3 pt-2 border-t border-zinc-800/80 inline-block font-medium">
                  Öffnen →
                </span>
              </a>
            ))}
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-4 flex items-start gap-3">
            <Award className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-zinc-100 mb-0.5">
                Typst Helfer- & Mentoren-Zertifikate
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed mb-2">
                Die offiziellen Bescheinigungen werden über das Typst-Projekt erstellt und am Auswertungs-Wochenende ausgehändigt.
              </p>
              <a
                href="https://typst.app/team/aaT7YZTCKOva32XW4Tduj4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-zinc-200 hover:underline inline-flex items-center gap-1"
              >
                <span>Typst Vorlage öffnen</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

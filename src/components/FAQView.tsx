import { useState } from 'react';
import type { FC } from 'react';
import { MENTOR_FAQ } from '../data/portalData';
import { HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

interface FAQViewProps {
  searchQuery: string;
}

export const FAQView: FC<FAQViewProps> = ({ searchQuery }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Alle Fragen' },
    { id: 'accounts', label: 'Uni-Accounts & Karte' },
    { id: 'spo', label: 'Prüfungsordnung (SPO)' },
    { id: 'lsf', label: 'LSF-Stundenplan' },
    { id: 'international', label: 'Internationale Erstis' },
    { id: 'late-arrival', label: 'Nachzügler (Late Arrivals)' },
    { id: 'soziales', label: 'Wohnen, BAföG & Krisen' }
  ];

  const filteredFAQ = MENTOR_FAQ.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchQuestion = item.question.toLowerCase().includes(q);
    const matchAnswer = item.answer.toLowerCase().includes(q);
    const matchActions = item.actionPoints?.some(a => a.toLowerCase().includes(q));

    return matchQuestion || matchAnswer || matchActions;
  });

  return (
    <div className="space-y-6">
      {/* Intro Box */}
      <div className="bg-gradient-to-r from-cyan-950/60 to-slate-900/80 border border-cyan-800/40 rounded-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-xl shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Mentor-FAQ: Leitfaden für die Westentasche
            </h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Die wichtigsten Antworten auf häufige Ersti-Fragen. Lass diese Seite bei der Studiumsplanung und bei den Rallyes auf deinem Smartphone griffbereit.
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer shrink-0 transition-all ${
              selectedCategory === cat.id
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFAQ.length === 0 ? (
          <div className="text-center py-10 bg-slate-900/40 border border-slate-800 rounded-xl text-slate-400 text-xs">
            Keine passenden FAQ-Einträge gefunden.
          </div>
        ) : (
          filteredFAQ.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-xl transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/90 border-cyan-500/40 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-2 py-0.5 rounded shrink-0 mt-0.5">
                      Q{idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-slate-800/60 text-xs sm:text-sm text-slate-300 space-y-3">
                    <p className="leading-relaxed">
                      {item.answer}
                    </p>

                    {item.actionPoints && item.actionPoints.length > 0 && (
                      <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 space-y-2 mt-2">
                        <span className="text-xs font-semibold text-cyan-300 block">
                          Konkrete Handlungsschritte:
                        </span>
                        <div className="space-y-1.5">
                          {item.actionPoints.map((point, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

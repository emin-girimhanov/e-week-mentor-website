import { useState } from 'react';
import type { FC } from 'react';
import { DAYS_SCHEDULE } from '../data/portalData';
import { generateFullWeekICS, downloadICSFile } from '../utils/calendar';
import type { AudienceFilterValue, LanguageFilterValue } from './AudienceFilter';
import { Calendar, Download, Smartphone, MapPin, Navigation, ExternalLink, Check, Bell, BellCheck } from 'lucide-react';

interface NextEventBannerProps {
  onOpenInstallModal: () => void;
  selectedAudience?: AudienceFilterValue;
  selectedLanguage?: LanguageFilterValue;
  isNotificationsEnabled?: boolean;
  onToggleNotifications?: () => void;
}

export const NextEventBanner: FC<NextEventBannerProps> = ({
  onOpenInstallModal,
  selectedAudience = 'all',
  selectedLanguage = 'all',
  isNotificationsEnabled = false,
  onToggleNotifications
}) => {
  const [downloaded, setDownloaded] = useState(false);

  // Find next event matching selected audience & language
  let nextEvent: (typeof DAYS_SCHEDULE[0]['items'][0]) | undefined = undefined;
  let nextDate = '';
  let nextDayName = '';

  for (const day of DAYS_SCHEDULE) {
    const match = day.items.find(it => {
      const matchAud = selectedAudience === 'all' || it.audiences.includes(selectedAudience);
      const matchLang = selectedLanguage === 'all' || it.language === selectedLanguage;
      return matchAud && matchLang;
    });
    if (match) {
      nextEvent = match;
      nextDate = day.date;
      nextDayName = day.dayName;
      break;
    }
  }

  const handleDownloadFullCalendar = () => {
    const daysToExport = (selectedAudience !== 'all' || selectedLanguage !== 'all')
      ? DAYS_SCHEDULE.map(d => ({
          ...d,
          items: d.items.filter(it => {
            const matchAud = selectedAudience === 'all' || it.audiences.includes(selectedAudience);
            const matchLang = selectedLanguage === 'all' || it.language === selectedLanguage;
            return matchAud && matchLang;
          })
        })).filter(d => d.items.length > 0)
      : DAYS_SCHEDULE;

    const filename = selectedLanguage === 'en'
      ? 'FaRaFIN-E-Woche-2026-ENGLISH.ics'
      : selectedAudience !== 'all'
      ? `FaRaFIN-E-Woche-2026-${selectedAudience.toUpperCase()}.ics`
      : 'FaRaFIN-E-Woche-2026-Mentoren.ics';

    const icsContent = generateFullWeekICS(daysToExport);
    downloadICSFile(icsContent, filename);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="space-y-3 mb-6">
      {/* 1. Next Arrival Alert (Zeiten & Ort rot markiert) */}
      {nextEvent && (
        <div className="bg-white dark:bg-zinc-900 border-2 border-red-500/40 dark:border-red-700/60 rounded-2xl p-4 sm:p-5 shadow-sm dark:shadow-md transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] uppercase font-mono tracking-wider text-red-600 dark:text-red-400 font-bold">
                Nächster Treffpunkt (Pünktlich 10 Min eher da sein!)
              </span>
              {selectedAudience !== 'all' && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-300 dark:border-zinc-700">
                  {selectedAudience === 'international' ? 'International' : selectedAudience.toUpperCase()}
                </span>
              )}
              {selectedLanguage !== 'all' && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-300 dark:border-zinc-700">
                  {selectedLanguage === 'en' ? '🇬🇧 Englisch' : selectedLanguage === 'bilingual' ? '🔀 Bilingual' : '🇩🇪 Deutsch'}
                </span>
              )}
            </div>

            <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
              {nextDayName}, {nextDate}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div>
              {/* Zeit rot markiert */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-mono font-black text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded-lg border border-red-200 dark:border-red-800/60">
                  Treffen: {nextEvent.meetingTime}
                </span>
                <span className="text-xs text-slate-600 dark:text-zinc-400 font-medium">
                  (Offizieller Beginn: {nextEvent.time.split(' ')[0]} Uhr)
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-zinc-100 mt-1.5">
                {nextEvent.title}
              </h3>

              {/* Ort auffällig rot markiert */}
              <div className="flex items-center gap-1.5 mt-1.5 px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 text-xs font-semibold w-fit">
                <MapPin className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0" />
                <span>Treffort: {nextEvent.location}</span>
                <span className="ml-1 text-[10px] font-mono px-1.5 py-0.2 bg-red-100 dark:bg-red-900/60 rounded text-red-800 dark:text-red-200 border border-red-300 dark:border-red-800">
                  {nextEvent.roomBadge}
                </span>
              </div>
            </div>

            {/* Direct 1-Click Navigation Buttons */}
            <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
              <a
                href={nextEvent.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 rounded-lg text-xs font-semibold border border-slate-300 dark:border-zinc-700 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-farafin dark:text-zinc-400" />
                <span>Google Maps</span>
              </a>

              <a
                href={nextEvent.appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 rounded-lg text-xs font-semibold border border-slate-300 dark:border-zinc-700 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-farafin dark:text-zinc-400" />
                <span>Apple Karten</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. Quick Action Buttons (Kalender, 10-Min-Alarm & App) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <button
          onClick={handleDownloadFullCalendar}
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-farafin hover:bg-farafin-hover text-white rounded-xl text-xs font-semibold border border-farafin-light/40 cursor-pointer transition-colors shadow-sm"
        >
          {downloaded ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span className="text-emerald-100">Kalender (.ics) geladen!</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4 text-blue-100" />
              <span>Kalender (.ics / 10-Min-Alarm)</span>
              <Download className="w-3.5 h-3.5 text-blue-200 ml-0.5" />
            </>
          )}
        </button>

        {onToggleNotifications && (
          <button
            onClick={onToggleNotifications}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold border cursor-pointer transition-colors shadow-sm ${
              isNotificationsEnabled
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/25'
                : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 border-slate-300 dark:border-zinc-700'
            }`}
          >
            {isNotificationsEnabled ? (
              <>
                <BellCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>✓ 10-Min-Alarm aktiv</span>
              </>
            ) : (
              <>
                <Bell className="w-4 h-4 text-amber-500" />
                <span>10-Min-Erinnerungen an</span>
              </>
            )}
          </button>
        )}

        <button
          onClick={onOpenInstallModal}
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-200 rounded-xl text-xs font-semibold border border-slate-300 dark:border-zinc-700 cursor-pointer transition-colors shadow-sm"
        >
          <Smartphone className="w-4 h-4 text-farafin dark:text-farafin-light" />
          <span>Als App installieren</span>
        </button>
      </div>
    </div>
  );
};

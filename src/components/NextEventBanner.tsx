import { useState } from 'react';
import type { FC } from 'react';
import { DAYS_SCHEDULE } from '../data/portalData';
import { generateFullWeekICS, downloadICSFile } from '../utils/calendar';
import { Calendar, Download, Smartphone, MapPin, Navigation, ExternalLink, Check } from 'lucide-react';

interface NextEventBannerProps {
  onOpenInstallModal: () => void;
}

export const NextEventBanner: FC<NextEventBannerProps> = ({ onOpenInstallModal }) => {
  const [downloaded, setDownloaded] = useState(false);

  // Default next event is the very first critical mentor shift on Monday
  const nextEvent = DAYS_SCHEDULE[0]?.items[0];
  const nextDate = DAYS_SCHEDULE[0]?.date;

  const handleDownloadFullCalendar = () => {
    const icsContent = generateFullWeekICS(DAYS_SCHEDULE);
    downloadICSFile(icsContent, 'FaRaFIN-E-Woche-2026-Mentoren.ics');
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="space-y-3 mb-6">
      {/* 1. Next Arrival Alert (Idiotensicher) */}
      {nextEvent && (
        <div className="bg-zinc-900 border border-zinc-700/80 rounded-xl p-4 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] uppercase font-mono tracking-wider text-red-400 font-bold">
                Nächster Treffpunkt (10 Min eher!)
              </span>
            </div>

            <span className="text-xs text-zinc-400 font-medium">
              Montag, {nextDate}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-mono font-bold text-red-400">
                  {nextEvent.meetingTime}
                </span>
                <span className="text-xs text-zinc-400">
                  (Offizieller Beginn: {nextEvent.time.split(' ')[0]} Uhr)
                </span>
              </div>

              <h3 className="text-base font-semibold text-zinc-100 mt-0.5">
                {nextEvent.title}
              </h3>

              <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span>{nextEvent.location}</span>
              </p>
            </div>

            {/* Direct 1-Click Navigation Buttons */}
            <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
              <a
                href={nextEvent.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-md text-xs font-medium border border-zinc-700 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-zinc-400" />
                <span>Google Maps</span>
              </a>

              <a
                href={nextEvent.appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-md text-xs font-medium border border-zinc-700 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                <span>Apple Karten</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. Quick Action Buttons (Kalender & App) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <button
          onClick={handleDownloadFullCalendar}
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded-lg text-xs font-semibold border border-zinc-700/80 cursor-pointer transition-colors shadow-sm"
        >
          {downloaded ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300">Kalenderdatei (.ics) heruntergeladen!</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4 text-zinc-400" />
              <span>In Kalender eintragen (.ics / 10-Min-Alarm)</span>
              <Download className="w-3.5 h-3.5 text-zinc-500 ml-0.5" />
            </>
          )}
        </button>

        <button
          onClick={onOpenInstallModal}
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded-lg text-xs font-semibold border border-zinc-700/80 cursor-pointer transition-colors shadow-sm"
        >
          <Smartphone className="w-4 h-4 text-zinc-400" />
          <span>Als App auf Smartphone installieren</span>
        </button>
      </div>
    </div>
  );
};

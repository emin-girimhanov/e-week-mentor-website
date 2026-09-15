import type { FC } from 'react';
import { X, Share, PlusSquare, MoreVertical, Smartphone, Check, Download, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: FC<InstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, installApp } = usePWAInstall();

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await installApp();
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-2xl relative text-slate-900 dark:text-zinc-100 transition-colors">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200 p-1 cursor-pointer transition-colors"
          aria-label="Schließen"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-farafin/15 border border-farafin/30 flex items-center justify-center text-farafin dark:text-blue-300">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold">
              Portal als App installieren
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Funktioniert ohne App Store und ist komplett offline-fähig
            </p>
          </div>
        </div>

        {/* 1-Click Native Install Button when supported */}
        {isInstallable && (
          <div className="p-3 bg-farafin/10 border border-farafin/30 rounded-xl flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-farafin dark:text-blue-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direkte Installation verfügbar</span>
            </div>
            <button
              onClick={handleInstallClick}
              className="w-full py-2.5 bg-farafin hover:bg-farafin-hover text-white font-semibold rounded-lg text-xs cursor-pointer transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Jetzt mit 1 Klick installieren</span>
            </button>
          </div>
        )}

        {isInstalled && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <Check className="w-4 h-4 shrink-0" />
            <span>Das Portal ist bereits als App auf deinem Gerät installiert!</span>
          </div>
        )}

        {/* Instructions iOS */}
        <div className="bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800 rounded-xl p-3.5 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-zinc-200">
            <span>Auf dem iPhone / iPad (Safari):</span>
          </div>
          <ol className="space-y-1.5 text-slate-600 dark:text-zinc-400 pl-1 list-decimal list-inside">
            <li>Unten in der Safari-Leiste auf das <strong className="text-slate-800 dark:text-zinc-200 inline-flex items-center gap-1"><Share className="w-3 h-3" /> Teilen-Symbol</strong> tippen.</li>
            <li>In der Liste nach unten wischen und <strong className="text-slate-800 dark:text-zinc-200 inline-flex items-center gap-1"><PlusSquare className="w-3 h-3" /> Zum Home-Bildschirm</strong> wählen.</li>
            <li>Oben rechts auf <strong className="text-slate-800 dark:text-zinc-200">Hinzufügen</strong> tippen.</li>
          </ol>
        </div>

        {/* Instructions Android */}
        <div className="bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800 rounded-xl p-3.5 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-zinc-200">
            <span>Auf Android (Chrome / Samsung Internet):</span>
          </div>
          <ol className="space-y-1.5 text-slate-600 dark:text-zinc-400 pl-1 list-decimal list-inside">
            <li>Oben rechts auf das <strong className="text-slate-800 dark:text-zinc-200 inline-flex items-center gap-1"><MoreVertical className="w-3 h-3" /> Drei-Punkte-Menü</strong> tippen.</li>
            <li>Auf <strong className="text-slate-800 dark:text-zinc-200">App installieren</strong> oder <strong className="text-slate-800 dark:text-zinc-200">Zum Startbildschirm hinzufügen</strong> tippen.</li>
            <li>Bestätigen und fertig.</li>
          </ol>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-semibold rounded-lg text-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5"
        >
          <Check className="w-4 h-4" />
          <span>Schließen</span>
        </button>
      </div>
    </div>
  );
};

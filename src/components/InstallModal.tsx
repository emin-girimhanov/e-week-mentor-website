import type { FC } from 'react';
import { X, Share, PlusSquare, MoreVertical, Smartphone, Check } from 'lucide-react';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: FC<InstallModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-md w-full p-5 space-y-4 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-200 p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-farafin/20 border border-farafin/40 flex items-center justify-center text-blue-200">
            <Smartphone className="w-5 h-5 text-farafin-light" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-100">
              Portal als App installieren
            </h3>
            <p className="text-xs text-zinc-400">
              Funktioniert ohne App Store und ist komplett offline-fähig
            </p>
          </div>
        </div>

        {/* Instructions iOS */}
        <div className="bg-zinc-950/80 border border-zinc-800 rounded-lg p-3.5 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-zinc-200">
            <span>Auf dem iPhone / iPad (Safari):</span>
          </div>
          <ol className="space-y-1.5 text-zinc-400 pl-1 list-decimal list-inside">
            <li>Unten in der Safari-Leiste auf das <strong className="text-zinc-200 inline-flex items-center gap-1"><Share className="w-3 h-3" /> Teilen-Symbol</strong> tippen.</li>
            <li>In der Liste nach unten wischen und <strong className="text-zinc-200 inline-flex items-center gap-1"><PlusSquare className="w-3 h-3" /> Zum Home-Bildschirm</strong> wählen.</li>
            <li>Oben rechts auf <strong className="text-zinc-200">Hinzufügen</strong> tippen.</li>
          </ol>
        </div>

        {/* Instructions Android */}
        <div className="bg-zinc-950/80 border border-zinc-800 rounded-lg p-3.5 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-zinc-200">
            <span>Auf Android (Chrome / Samsung Internet):</span>
          </div>
          <ol className="space-y-1.5 text-zinc-400 pl-1 list-decimal list-inside">
            <li>Oben rechts auf das <strong className="text-zinc-200 inline-flex items-center gap-1"><MoreVertical className="w-3 h-3" /> Drei-Punkte-Menü</strong> tippen.</li>
            <li>Auf <strong className="text-zinc-200">App installieren</strong> oder <strong className="text-zinc-200">Zum Startbildschirm hinzufügen</strong> tippen.</li>
            <li>Bestätigen und fertig.</li>
          </ol>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-farafin hover:bg-farafin-hover text-white font-semibold rounded-md text-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Check className="w-4 h-4" />
          <span>Verstanden, schließen</span>
        </button>
      </div>
    </div>
  );
};

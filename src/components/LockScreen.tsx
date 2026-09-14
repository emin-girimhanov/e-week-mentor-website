import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: FC<LockScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanPass = password.trim().toLowerCase();
    if (cleanPass === 'farafin2026' || cleanPass === 'mentor2026' || cleanPass === 'farafin') {
      localStorage.setItem('ewoche_mentor_auth', 'authenticated');
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4 py-8">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-xl p-6 sm:p-7 shadow-lg">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700 mb-2">
            Interner Bereich
          </span>
          <h1 className="text-xl font-bold text-zinc-100 tracking-tight">
            FaRaFIN Mentoren-Portal
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            E-Woche WiSe 2026/2027
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="portal-password" className="block text-xs font-medium text-zinc-300 mb-1.5">
              Team-Passwort oder PIN
            </label>
            <input
              id="portal-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Passwort eingeben..."
              autoFocus
              className="w-full bg-zinc-950 border border-zinc-700 rounded-md px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
            />
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Ungültiges Passwort. Bitte erneut versuchen.</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-100 hover:bg-white text-zinc-950 font-semibold py-2.5 px-4 rounded-md flex items-center justify-center gap-2 text-xs transition-colors cursor-pointer"
          >
            <span>Dienstplan öffnen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-zinc-800 text-[11px] text-zinc-400 text-center">
          Standard-Passwort: <code className="bg-zinc-800 px-1 py-0.5 rounded text-zinc-300 font-mono">farafin2026</code>
        </div>
      </div>

      <div className="text-center mt-5 text-[11px] text-zinc-500">
        Fachschaftsrat der Fakultät für Informatik • OVGU Magdeburg
      </div>
    </div>
  );
};

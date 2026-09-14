import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import { KeyRound, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: FC<LockScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanPass = password.trim().toLowerCase();
    // Default Mentoren Passwords: 'farafin2026' or 'mentor2026'
    if (cleanPass === 'farafin2026' || cleanPass === 'mentor2026' || cleanPass === 'farafin') {
      localStorage.setItem('ewoche_mentor_auth', 'authenticated');
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-inner">
            <KeyRound className="w-8 h-8" />
          </div>
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-cyan-950/80 text-cyan-400 border border-cyan-800/50 rounded-full mb-2">
            Interner Bereich
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            FaRaFIN E-Woche
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Mentoren- & Helferportal WiSe 2026/2027
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="portal-password" className="block text-xs font-medium text-slate-300 mb-1.5">
              Team-Passwort oder PIN
            </label>
            <div className="relative">
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
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Ungültiges Passwort. Bitte erneut versuchen.</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/30 active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Dienstplan öffnen</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p>
            Passwortschutz für interne Schichtpläne, Notfallkontakte und Raumbuchungen. Das Standard-Passwort lautet <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300 font-mono">farafin2026</code>.
          </p>
        </div>
      </div>

      <div className="text-center mt-6 text-xs text-slate-500">
        Fachschaftsrat der Fakultät für Informatik (FaRaFIN) • OVGU Magdeburg
      </div>
    </div>
  );
};

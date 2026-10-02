import React from 'react';
import { BookOpen, Bookmark, ShieldCheck, Sparkles, Feather } from 'lucide-react';

interface HeaderProps {
  savedCount: number;
  onOpenSaved: () => void;
  onOpenPrinciples: () => void;
  serverOnline: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  savedCount,
  onOpenSaved,
  onOpenPrinciples,
  serverOnline
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-stone-50/95 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-700 via-amber-800 to-stone-900 text-amber-100 flex items-center justify-center shadow-md shadow-amber-900/10 border border-amber-600/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 font-cinzel">
                  Teólogo IA
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-100 text-amber-800 border border-amber-300/60">
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  Gemini Teológico
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium hidden xs:block">
                Exegese, Hermenêutica, Homilética e Cuidado Pastoral
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Principles Modal Trigger */}
            <button
              id="btn-open-principles"
              onClick={onOpenPrinciples}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200/80 border border-stone-200 transition-colors"
              title="Ver Princípios Teológicos Fundamentais"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden md:inline">Princípios Fundamentais</span>
              <span className="md:hidden">Princípios</span>
            </button>

            {/* Saved Studies Trigger */}
            <button
              id="btn-open-saved-studies"
              onClick={onOpenSaved}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 transition-colors relative"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-700" />
              <span>Caderno de Estudos</span>
              {savedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-700 text-white">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Server health beacon */}
            <div
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-stone-100 text-stone-600 border border-stone-200"
              title={serverOnline ? 'Servidor Conectado à IA Teológica' : 'Verificando status do servidor'}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  serverOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className="text-[10px] text-stone-500">
                {serverOnline ? 'IA Pronta' : 'Conectando'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

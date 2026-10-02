import React, { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  Flame,
  Scroll,
  Landmark,
  UserCheck,
  ShieldCheck,
  HeartHandshake,
  Library,
  GitCompare,
  Cross,
  MessageSquareText,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { THEOLOGICAL_MODES } from '../data/theologyModes';
import { TheologicalMode } from '../types';

interface ModeSelectorProps {
  currentMode: TheologicalMode;
  onSelectMode: (mode: TheologicalMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  onSelectMode
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [previewStructureMode, setPreviewStructureMode] = useState<TheologicalMode | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos os Modos' },
    { id: 'exegese', label: 'Exegese & Estudo' },
    { id: 'homiletica', label: 'Homilética & Sermão' },
    { id: 'historia', label: 'História & Bíblia' },
    { id: 'devocional', label: 'Devocional' },
    { id: 'pastoral', label: 'Pastoral & Geral' }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return BookOpen;
      case 'GraduationCap':
        return GraduationCap;
      case 'Flame':
        return Flame;
      case 'Scroll':
        return Scroll;
      case 'Landmark':
        return Landmark;
      case 'UserCheck':
        return UserCheck;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'HeartHandshake':
        return HeartHandshake;
      case 'Library':
        return Library;
      case 'GitCompare':
        return GitCompare;
      case 'Cross':
        return Cross;
      case 'MessageSquareText':
      default:
        return MessageSquareText;
    }
  };

  const filteredModes = THEOLOGICAL_MODES.filter((m) => {
    if (selectedCategory === 'todos') return true;
    if (selectedCategory === 'pastoral') {
      return m.category === 'pastoral' || m.category === 'geral';
    }
    return m.category === selectedCategory;
  });

  const activeModeConfig = THEOLOGICAL_MODES.find((m) => m.id === currentMode);

  return (
    <div className="w-full space-y-4">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`filter-cat-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/80 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Modes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredModes.map((mode) => {
          const Icon = getIcon(mode.iconName);
          const isSelected = currentMode === mode.id;

          return (
            <div
              key={mode.id}
              id={`mode-card-${mode.id}`}
              onClick={() => onSelectMode(mode.id)}
              className={`group relative p-3.5 rounded-2xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-amber-600 shadow-md ring-2 ring-amber-500/20'
                  : 'bg-white/80 hover:bg-white border-stone-200 hover:border-amber-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-amber-800 text-amber-50'
                        : 'bg-stone-100 text-stone-700 group-hover:bg-amber-100 group-hover:text-amber-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      isSelected
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-stone-100 text-stone-600 border-stone-200'
                    }`}
                  >
                    {mode.badge}
                  </span>
                </div>

                <h3
                  className={`text-sm font-bold tracking-tight mb-1 ${
                    isSelected ? 'text-amber-950' : 'text-stone-900'
                  }`}
                >
                  {mode.title}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {mode.shortDesc}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px]">
                <button
                  type="button"
                  id={`btn-structure-${mode.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewStructureMode(
                      previewStructureMode === mode.id ? null : mode.id
                    );
                  }}
                  className="text-stone-500 hover:text-amber-800 font-medium inline-flex items-center gap-1 hover:underline"
                >
                  <Info className="w-3 h-3" />
                  <span>Ver Estrutura ({mode.structure.length})</span>
                </button>

                <span
                  className={`font-semibold inline-flex items-center gap-0.5 ${
                    isSelected
                      ? 'text-amber-700'
                      : 'text-stone-400 group-hover:text-amber-700'
                  }`}
                >
                  {isSelected ? 'Ativo' : 'Selecionar'}
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>

              {/* Collapsible Structure Drawer inside card if toggled */}
              {previewStructureMode === mode.id && (
                <div
                  className="mt-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-left animate-in fade-in duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-stone-200">
                    <span className="text-[11px] font-bold text-stone-800">
                      Estrutura Oficial:
                    </span>
                    <button
                      onClick={() => setPreviewStructureMode(null)}
                      className="text-[10px] text-stone-400 hover:text-stone-700 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <ul className="text-[10px] text-stone-600 space-y-1 max-h-40 overflow-y-auto pr-1">
                    {mode.structure.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-amber-700 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Mode Banner with structure summary */}
      {activeModeConfig && (
        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded-md bg-amber-200/70 text-amber-900 font-bold text-[10px] tracking-wide uppercase">
              Modo Atual
            </span>
            <span className="font-bold text-amber-950 text-sm">
              {activeModeConfig.title}
            </span>
            <span className="text-stone-500 hidden md:inline">
              — {activeModeConfig.description}
            </span>
          </div>
          <div className="text-[11px] text-amber-900/80 flex items-center gap-1 font-medium shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Estrutura com {activeModeConfig.structure.length} seções rigorosas</span>
          </div>
        </div>
      )}
    </div>
  );
};

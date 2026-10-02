import React, { useState, useEffect } from 'react';
import {
  Send,
  Sparkles,
  BookOpen,
  HelpCircle,
  RotateCcw,
  StopCircle,
  Lightbulb,
  Tag
} from 'lucide-react';
import { TheologicalMode, ModeConfig } from '../types';
import { THEOLOGICAL_MODES } from '../data/theologyModes';

interface StudyInputFormProps {
  currentMode: TheologicalMode;
  onGenerate: (prompt: string, mode: TheologicalMode) => void;
  isLoading: boolean;
  onStop: () => void;
}

export const StudyInputForm: React.FC<StudyInputFormProps> = ({
  currentMode,
  onGenerate,
  isLoading,
  onStop
}) => {
  const modeConfig = THEOLOGICAL_MODES.find((m) => m.id === currentMode) || THEOLOGICAL_MODES[0];

  // Specific state for tailored inputs
  const [passageOrText, setPassageOrText] = useState('');
  const [themeOrFocus, setThemeOrFocus] = useState('');
  const [audienceOrContext, setAudienceOrContext] = useState('');
  // For comparison mode
  const [passageB, setPassageB] = useState('');
  // For free text
  const [customQuery, setCustomQuery] = useState('');

  // Mode tailored input switch
  const isPreaching = currentMode === 'pregacao';
  const isComparison = currentMode === 'comparacao';
  const isCharacter = currentMode === 'personagem';
  const isExegesis = currentMode === 'explicacao' || currentMode === 'esboco' || currentMode === 'estudo';
  const isPastoral = currentMode === 'pastoral';
  const isBook = currentMode === 'livro';

  // Clear inputs when changing mode if empty
  useEffect(() => {
    // Keep inputs if user typed something
  }, [currentMode]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isLoading) return;

    let finalPrompt = '';

    if (isPreaching) {
      const text = passageOrText.trim();
      const theme = themeOrFocus.trim();
      const audience = audienceOrContext.trim();

      if (!text && !customQuery.trim()) return;

      if (customQuery.trim()) {
        finalPrompt = customQuery.trim();
      } else {
        finalPrompt = `Elabore uma pregação homilética completa no MODO DE PREGAÇÃO oficial sobre o texto base: "${text}".` +
          (theme ? ` Tema proposto: "${theme}".` : '') +
          (audience ? ` Público ou ênfase: "${audience}".` : '');
      }
    } else if (isComparison) {
      const textA = passageOrText.trim();
      const textB = passageB.trim();
      if (!textA && !textB && !customQuery.trim()) return;

      if (customQuery.trim()) {
        finalPrompt = customQuery.trim();
      } else {
        finalPrompt = `Compare detalhadamente os seguintes textos bíblicos segundo o MODO DE COMPARAÇÃO DE TEXTOS:
Texto 1: ${textA}
Texto 2: ${textB}
${themeOrFocus ? `Foco da análise: ${themeOrFocus}` : ''}`;
      }
    } else if (isCharacter) {
      const name = passageOrText.trim() || customQuery.trim();
      if (!name) return;
      finalPrompt = customQuery.trim()
        ? customQuery.trim()
        : `Apresente a análise completa do personagem bíblico "${name}" seguindo rigorosamente o MODO DE PERSONAGENS BÍBLICOS.`;
    } else if (isBook) {
      const bookName = passageOrText.trim() || customQuery.trim();
      if (!bookName) return;
      finalPrompt = customQuery.trim()
        ? customQuery.trim()
        : `Apresente o panorama completo do livro bíblico "${bookName}" seguindo o MODO DE LIVROS DA BÍBLIA oficial.`;
    } else if (isPastoral) {
      const situation = passageOrText.trim() || customQuery.trim();
      if (!situation) return;
      finalPrompt = customQuery.trim()
        ? customQuery.trim()
        : `Por favor, atenda com profunda empatia pastoral no MODO PASTORAL a seguinte situação de sofrimento ou necessidade: "${situation}".`;
    } else if (isExegesis) {
      const text = passageOrText.trim() || customQuery.trim();
      if (!text) return;
      finalPrompt = customQuery.trim()
        ? customQuery.trim()
        : `Execute a análise completa do texto "${text}" seguindo o modelo oficial de ${modeConfig.title}.`;
    } else {
      finalPrompt = customQuery.trim() || passageOrText.trim();
    }

    if (!finalPrompt.trim()) return;

    onGenerate(finalPrompt, currentMode);
  };

  const handleSelectSuggested = (prompt: string) => {
    setCustomQuery(prompt);
    onGenerate(prompt, currentMode);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
      {/* Header of Form */}
      <div className="px-5 py-3.5 bg-stone-50/90 border-b border-stone-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-700" />
          <h2 className="text-sm font-bold text-stone-900">
            Formular Consulta: {modeConfig.title}
          </h2>
        </div>
        <span className="text-[11px] font-medium text-stone-500 hidden sm:inline">
          Pressione <kbd className="px-1.5 py-0.5 rounded bg-stone-200 text-stone-700 font-mono text-[10px]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-stone-200 text-stone-700 font-mono text-[10px]">Enter</kbd> para gerar
        </span>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {/* Suggested Quick Prompts */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>Sugestões Prontas para {modeConfig.title}:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {modeConfig.suggestedPrompts.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                id={`btn-sug-${currentMode}-${idx}`}
                onClick={() => handleSelectSuggested(sug.prompt)}
                disabled={isLoading}
                className="inline-flex items-center gap-1 px-2.5 py-1.2 rounded-lg text-xs font-medium bg-stone-100 hover:bg-amber-100/70 hover:text-amber-900 text-stone-700 border border-stone-200/80 transition-all text-left group"
              >
                <Tag className="w-3 h-3 text-stone-400 group-hover:text-amber-700 shrink-0" />
                <span className="font-semibold">{sug.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Mode-Specific Fields */}
        {isPreaching && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label htmlFor="input-preach-text" className="block text-xs font-semibold text-stone-700 mb-1">
                Texto Base Bíblico <span className="text-amber-700">*</span>
              </label>
              <input
                id="input-preach-text"
                type="text"
                value={passageOrText}
                onChange={(e) => setPassageOrText(e.target.value)}
                placeholder="Ex: Isaías 6:1-8 ou Lucas 15:11-32"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden bg-stone-50/50"
              />
            </div>
            <div>
              <label htmlFor="input-preach-theme" className="block text-xs font-semibold text-stone-700 mb-1">
                Tema / Ideia Central (opcional)
              </label>
              <input
                id="input-preach-theme"
                type="text"
                value={themeOrFocus}
                onChange={(e) => setThemeOrFocus(e.target.value)}
                placeholder="Ex: A Glória de Deus ou O Amor do Pai"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden bg-stone-50/50"
              />
            </div>
            <div>
              <label htmlFor="input-preach-audience" className="block text-xs font-semibold text-stone-700 mb-1">
                Público / Ocasião (opcional)
              </label>
              <input
                id="input-preach-audience"
                type="text"
                value={audienceOrContext}
                onChange={(e) => setAudienceOrContext(e.target.value)}
                placeholder="Ex: Culto de Domingo, Jovens, Santa Ceia"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden bg-stone-50/50"
              />
            </div>
          </div>
        )}

        {isComparison && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="input-comp-a" className="block text-xs font-semibold text-stone-700 mb-1">
                Primeira Passagem Bíblica <span className="text-amber-700">*</span>
              </label>
              <input
                id="input-comp-a"
                type="text"
                value={passageOrText}
                onChange={(e) => setPassageOrText(e.target.value)}
                placeholder="Ex: Romanos 3:28"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden bg-stone-50/50"
              />
            </div>
            <div>
              <label htmlFor="input-comp-b" className="block text-xs font-semibold text-stone-700 mb-1">
                Segunda Passagem Bíblica <span className="text-amber-700">*</span>
              </label>
              <input
                id="input-comp-b"
                type="text"
                value={passageB}
                onChange={(e) => setPassageB(e.target.value)}
                placeholder="Ex: Tiago 2:24"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden bg-stone-50/50"
              />
            </div>
          </div>
        )}

        {isCharacter && (
          <div>
            <label htmlFor="input-character-name" className="block text-xs font-semibold text-stone-700 mb-1">
              Nome do Personagem Bíblico <span className="text-amber-700">*</span>
            </label>
            <input
              id="input-character-name"
              type="text"
              value={passageOrText}
              onChange={(e) => setPassageOrText(e.target.value)}
              placeholder="Ex: Rei Davi, José do Egito, Rute, Ester, Barnabé, Maria de Betânia..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden bg-stone-50/50"
            />
          </div>
        )}

        {isBook && (
          <div>
            <label htmlFor="input-book-name" className="block text-xs font-semibold text-stone-700 mb-1">
              Livro da Bíblia para Panorama <span className="text-amber-700">*</span>
            </label>
            <input
              id="input-book-name"
              type="text"
              value={passageOrText}
              onChange={(e) => setPassageOrText(e.target.value)}
              placeholder="Ex: Hebreus, Romanos, Gênesis, Habacuque, Efésios, Salmos..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden bg-stone-50/50"
            />
          </div>
        )}

        {isPastoral && (
          <div>
            <label htmlFor="input-pastoral-situation" className="block text-xs font-semibold text-stone-700 mb-1">
              Situação Pastoral ou Necessidade da Alma <span className="text-amber-700">*</span>
            </label>
            <input
              id="input-pastoral-situation"
              type="text"
              value={passageOrText}
              onChange={(e) => setPassageOrText(e.target.value)}
              placeholder="Ex: Luto doloroso pela perda de um ente, crise grave de ansiedade, sentimentos de culpa..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden bg-stone-50/50"
            />
          </div>
        )}

        {/* Universal Textarea for Custom prompt or Exegesis passage */}
        <div>
          <label htmlFor="input-custom-query" className="block text-xs font-semibold text-stone-700 mb-1">
            {isPreaching || isComparison || isCharacter || isBook || isPastoral
              ? 'Instruções ou Detalhes Específicos (opcional):'
              : 'Passagem Bíblica ou Pergunta Teológica:'}
          </label>
          <textarea
            id="input-custom-query"
            rows={3}
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder={
              isPreaching || isComparison || isCharacter || isBook || isPastoral
                ? 'Você pode acrescentar pontos específicos que deseja ver enfatizados...'
                : modeConfig.placeholderPrompt
            }
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden bg-stone-50/50 resize-y font-sans"
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-stone-100">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            <span>Fidelidade hermenêutica estrita ao texto sagrado</span>
          </div>

          <div className="flex items-center gap-2.5 justify-end">
            {(passageOrText || customQuery || passageB || themeOrFocus) && !isLoading && (
              <button
                type="button"
                id="btn-clear-form"
                onClick={() => {
                  setPassageOrText('');
                  setCustomQuery('');
                  setPassageB('');
                  setThemeOrFocus('');
                  setAudienceOrContext('');
                }}
                className="px-3 py-2 rounded-xl text-xs font-medium text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors inline-flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar</span>
              </button>
            )}

            {isLoading ? (
              <button
                type="button"
                id="btn-stop-generation"
                onClick={onStop}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-xs inline-flex items-center gap-2"
              >
                <StopCircle className="w-4 h-4 animate-pulse" />
                <span>Interromper Geração</span>
              </button>
            ) : (
              <button
                type="submit"
                id="btn-submit-theology-query"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-amber-700 via-amber-800 to-stone-900 hover:from-amber-800 hover:to-black transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Gerar no Modo {modeConfig.title}</span>
                <Send className="w-3.5 h-3.5 text-amber-200/80" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

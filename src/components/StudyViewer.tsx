import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import {
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Printer,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  MessageSquare,
  Sparkles,
  Send,
  Share2,
  BookOpen
} from 'lucide-react';
import { TheologicalMode } from '../types';
import { THEOLOGICAL_MODES } from '../data/theologyModes';

interface StudyViewerProps {
  content: string;
  mode: TheologicalMode;
  isStreaming: boolean;
  onSave: () => void;
  isSaved: boolean;
  onFollowUp: (followUpQuestion: string) => void;
  isLoadingFollowUp: boolean;
}

export const StudyViewer: React.FC<StudyViewerProps> = ({
  content,
  mode,
  isStreaming,
  onSave,
  isSaved,
  onFollowUp,
  isLoadingFollowUp
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'pulpit'>('normal');
  const [followUpText, setFollowUpText] = useState('');

  // Audio Speech state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const modeConfig = THEOLOGICAL_MODES.find((m) => m.id === mode);

  // Clean speech when unmounting or content changes drastically
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (e) {
      console.error('Error copying text', e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Text to speech narration
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta a síntese de voz.');
      return;
    }

    if (isSpeaking) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
      return;
    }

    // Strip markdown formatting for cleaner speech
    const cleanText = content
      .replace(/#{1,6}\s+/g, '')
      .replace(/[*_~`]/g, '')
      .replace(/>\s*/g, 'Citação bíblica: ')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95; // Slightly measured for reverent theological reading

    // Try to find a good PT-BR voice
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find((v) => v.lang.startsWith('pt'));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const handleStopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const handleSendFollowUp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!followUpText.trim() || isLoadingFollowUp || isStreaming) return;
    onFollowUp(followUpText.trim());
    setFollowUpText('');
  };

  const getFontSizeClass = () => {
    switch (fontSizeLevel) {
      case 'large':
        return 'text-lg leading-relaxed';
      case 'pulpit':
        return 'text-xl leading-loose';
      case 'normal':
      default:
        return 'text-base leading-relaxed';
    }
  };

  const followUpSuggestions = [
    'Aprofunde nos termos em grego/hebraico original deste texto',
    'Adicione mais duas ilustrações contemporâneas para o sermão',
    'Como aplicar esta mensagem especificamente para jovens e adolescentes?',
    'Quais heresias e desvios doutrinários este texto combate historicamente?'
  ];

  return (
    <article 
      className="w-full bg-white rounded-2xl border border-stone-200/90 shadow-md overflow-hidden flex flex-col print:border-none print:shadow-none"
      aria-label="Estudo Teológico"
    >
      {/* Action and Toolbar Header */}
      <div className="px-5 py-3.5 bg-stone-100/90 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2.5 print:hidden">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
          <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
            {modeConfig?.title || 'Estudo Teológico'}
          </span>
          {isStreaming && (
            <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold animate-pulse">
              Transmitindo Exegese...
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          {/* Font Size Zoom for Pulpit */}
          <div className="flex items-center rounded-lg border border-stone-200 bg-white p-0.5 text-xs">
            <button
              id="btn-font-normal"
              onClick={() => setFontSizeLevel('normal')}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                fontSizeLevel === 'normal' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Tamanho Normal"
            >
              1x
            </button>
            <button
              id="btn-font-large"
              onClick={() => setFontSizeLevel('large')}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                fontSizeLevel === 'large' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Tamanho Grande"
            >
              1.2x
            </button>
            <button
              id="btn-font-pulpit"
              onClick={() => setFontSizeLevel('pulpit')}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                fontSizeLevel === 'pulpit' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Modo Púlpito (Texto Extra Grande)"
            >
              Púlpito
            </button>
          </div>

          {/* Audio Narration */}
          <div className="flex items-center rounded-lg border border-stone-200 bg-white text-xs">
            <button
              id="btn-speech-toggle"
              onClick={handleToggleSpeech}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                isSpeaking
                  ? 'bg-amber-700 text-white'
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
              title={isSpeaking ? (isPaused ? 'Retomar Narração' : 'Pausar Narração') : 'Ouvir Leitura em Voz Alta'}
            >
              {isSpeaking ? (
                isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-amber-700" />
              )}
              <span className="hidden sm:inline">
                {isSpeaking ? (isPaused ? 'Retomar' : 'Pausar') : 'Ouvir'}
              </span>
            </button>
            {isSpeaking && (
              <button
                id="btn-speech-stop"
                onClick={handleStopSpeech}
                className="px-2 py-1.5 text-stone-500 hover:text-red-600 transition-colors"
                title="Parar Narração"
              >
                <VolumeX className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Copy Button */}
          <button
            id="btn-copy-study"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors"
            title="Copiar estudo completo para a área de transferência"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-500" />
                <span>Copiar</span>
              </>
            )}
          </button>

          {/* Save to Notebook */}
          <button
            id="btn-save-study-action"
            onClick={onSave}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
              isSaved
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
            title="Salvar no Caderno de Estudos local"
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Salvo</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5 text-stone-500" />
                <span>Salvar</span>
              </>
            )}
          </button>

          {/* Print / PDF Export */}
          <button
            id="btn-print-study"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors"
            title="Imprimir ou Salvar como PDF"
          >
            <Printer className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">Imprimir</span>
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className={`p-6 sm:p-10 font-serif-bible text-stone-800 ${getFontSizeClass()} print:p-0`}>
        <div className="markdown-body theology-prose max-w-4xl mx-auto space-y-4">
          <Markdown>{content}</Markdown>
        </div>
      </div>

      {/* Follow-up Section / Aprofundamento Teológico */}
      <div className="border-t border-stone-200 bg-stone-50/80 p-5 sm:p-6 print:hidden">
        <div className="max-w-4xl mx-auto space-y-3.5">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-700" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
              Aprofundar ou Dialogar sobre este Texto
            </h3>
          </div>

          {/* Quick Follow-up Chips */}
          <div className="flex flex-wrap gap-2">
            {followUpSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                id={`btn-followup-sug-${idx}`}
                onClick={() => onFollowUp(suggestion)}
                disabled={isLoadingFollowUp || isStreaming}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-amber-100 hover:text-amber-950 text-stone-700 border border-stone-200 transition-colors text-left disabled:opacity-50"
              >
                + {suggestion}
              </button>
            ))}
          </div>

          {/* Follow-up Input Bar */}
          <form onSubmit={handleSendFollowUp} className="flex gap-2 pt-1">
            <input
              id="input-followup-chat"
              type="text"
              value={followUpText}
              onChange={(e) => setFollowUpText(e.target.value)}
              disabled={isLoadingFollowUp || isStreaming}
              placeholder="Faça uma pergunta de continuidade (ex: 'Explique o versículo 30 no grego', 'Adicione uma oração para os jovens')..."
              className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden bg-white"
            />
            <button
              type="submit"
              id="btn-submit-followup"
              disabled={!followUpText.trim() || isLoadingFollowUp || isStreaming}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 disabled:opacity-50 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Perguntar</span>
            </button>
          </form>
        </div>
      </div>
    </article>
  );
};

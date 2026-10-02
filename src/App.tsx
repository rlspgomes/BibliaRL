import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ModeSelector } from './components/ModeSelector';
import { StudyInputForm } from './components/StudyInputForm';
import { StudyViewer } from './components/StudyViewer';
import { SavedStudiesModal } from './components/SavedStudiesModal';
import { PrinciplesModal } from './components/PrinciplesModal';
import { THEOLOGICAL_MODES } from './data/theologyModes';
import { INITIAL_SAVED_STUDIES } from './data/seedStudies';
import { TheologicalMode, SavedStudy } from './types';
import { BookOpen, Sparkles, AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentMode, setCurrentMode] = useState<TheologicalMode>('explicacao');
  const [activeContent, setActiveContent] = useState<string>(INITIAL_SAVED_STUDIES[0].content);
  const [activeTitle, setActiveTitle] = useState<string>(INITIAL_SAVED_STUDIES[0].title);
  const [activeTopic, setActiveTopic] = useState<string>(INITIAL_SAVED_STUDIES[0].passageOrTopic);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [serverOnline, setServerOnline] = useState<boolean>(true);
  const [hasServerKey, setHasServerKey] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);
  const [isPrinciplesModalOpen, setIsPrinciplesModalOpen] = useState<boolean>(false);

  // Studies stored in localStorage
  const [savedStudies, setSavedStudies] = useState<SavedStudy[]>(() => {
    try {
      const stored = localStorage.getItem('teologo_ia_saved_studies');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load studies from localStorage', e);
    }
    return INITIAL_SAVED_STUDIES;
  });

  // Save to localStorage whenever savedStudies changes
  useEffect(() => {
    try {
      localStorage.setItem('teologo_ia_saved_studies', JSON.stringify(savedStudies));
    } catch (e) {
      console.error('Failed to persist studies', e);
    }
  }, [savedStudies]);

  // Check health of backend
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setServerOnline(true);
        if (data.hasKey === false) {
          setHasServerKey(false);
        }
      })
      .catch((err) => {
        console.warn('Backend connection notice:', err);
        setServerOnline(false);
      });
  }, []);

  // Conversation history for context continuity
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ role: 'user' | 'model'; text: string }>
  >([]);

  // Abort controller for streaming
  const abortControllerRef = useRef<AbortController | null>(null);

  const isCurrentContentSaved = savedStudies.some(
    (s) => s.content.trim() === activeContent.trim()
  );

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    setIsLoading(false);
  };

  const handleGenerate = async (prompt: string, modeToUse: TheologicalMode) => {
    handleStopGeneration();
    setErrorMessage(null);
    setIsLoading(true);
    setIsStreaming(true);

    const modeConfig = THEOLOGICAL_MODES.find((m) => m.id === modeToUse);
    const modeTitle = modeConfig?.title || 'Estudo Teológico';

    setActiveTitle(`${modeTitle}: ${prompt.slice(0, 55)}...`);
    setActiveTopic(prompt.slice(0, 80));
    setActiveContent(''); // Clear for streaming in

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch('/api/theologian/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: modeConfig?.title || modeToUse,
          prompt,
          conversationHistory,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        // Try fallback to non-streaming if stream endpoint failed
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Erro do servidor (${response.status})`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Não foi possível iniciar o leitor de transmissão.');
      }

      const decoder = new TextDecoder('utf-8');
      let accumulated = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace(/^data: /, '').trim();
            if (!dataStr) continue;

            try {
              const data = JSON.parse(dataStr);
              if (data.error) {
                throw new Error(data.error);
              }
              if (data.text) {
                accumulated += data.text;
                setActiveContent(accumulated);
              }
              if (data.done) {
                break;
              }
            } catch (e: any) {
              if (e.message && !e.message.includes('JSON')) {
                throw e;
              }
            }
          }
        }
      }

      // Update conversation history with new turn
      setConversationHistory((prev) => [
        ...prev,
        { role: 'user', text: prompt },
        { role: 'model', text: accumulated || activeContent },
      ]);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Geração interrompida pelo usuário.');
      } else {
        console.error('Generation failed:', err);
        setErrorMessage(
          err.message ||
            'Não foi possível conectar ao modelo teológico. Verifique a chave de API nas configurações.'
        );
        // Fallback: If active content was empty, keep an informative error notice
        if (!activeContent) {
          setActiveContent(
            `### Aviso de Conexão Teológica\n\nNão foi possível concluir a geração exegética:\n\n> **${err.message || 'Erro de comunicação com o servidor'}**\n\nVerifique se a variável \`GEMINI_API_KEY\` está devidamente configurada no painel de segredos do ambiente.`
          );
        }
      }
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleFollowUp = (followUpPrompt: string) => {
    handleGenerate(followUpPrompt, currentMode);
  };

  const handleSaveCurrentStudy = () => {
    if (!activeContent.trim()) return;

    if (isCurrentContentSaved) {
      // Already saved, remove it
      setSavedStudies((prev) =>
        prev.filter((s) => s.content.trim() !== activeContent.trim())
      );
      return;
    }

    const modeConfig = THEOLOGICAL_MODES.find((m) => m.id === currentMode);
    const newStudy: SavedStudy = {
      id: `study-${Date.now()}`,
      title: activeTitle || `${modeConfig?.title}: ${activeTopic}`,
      mode: currentMode,
      modeTitle: modeConfig?.title || 'Estudo Bíblico',
      date: new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date()),
      content: activeContent,
      passageOrTopic: activeTopic || 'Estudo Teológico',
    };

    setSavedStudies((prev) => [newStudy, ...prev]);
  };

  const handleSelectSavedStudy = (study: SavedStudy) => {
    setCurrentMode(study.mode);
    setActiveTitle(study.title);
    setActiveTopic(study.passageOrTopic);
    setActiveContent(study.content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteSavedStudy = (id: string) => {
    setSavedStudies((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col antialiased">
      {/* Top Navigation */}
      <Header
        savedCount={savedStudies.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onOpenPrinciples={() => setIsPrinciplesModalOpen(true)}
        serverOnline={serverOnline}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Hero Section & Scripture Banner */}
        <section className="text-center max-w-3xl mx-auto space-y-2.5 print:hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-200/70 text-stone-800 border border-stone-300/60">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>Fidelidade Bíblica • Exegese • Hermenêutica • Homilética</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-900 font-cinzel">
            Compreensão Profunda da Palavra de Deus
          </h2>
          <p className="text-sm text-stone-600 font-serif-bible italic max-w-2xl mx-auto">
            "Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar, que maneja bem a palavra da verdade." — 2 Timóteo 2:15
          </p>
        </section>

        {/* API Key Notification if missing on server */}
        {!hasServerKey && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-3 shadow-xs">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">
                Chave da API Gemini não detectada no servidor
              </strong>
              Para gerar novos estudos ao vivo com a inteligência do Gemini, adicione a sua chave <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-950 font-mono">GEMINI_API_KEY</code> em <strong>Settings &gt; Secrets</strong>. Você ainda pode ler, imprimir e navegar pelos estudos teológicos já salvos no seu caderno.
            </div>
          </div>
        )}

        {/* Error Alert if any */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-600 font-bold hover:underline"
            >
              Fechar
            </button>
          </div>
        )}

        {/* 1. Mode Selector */}
        <section className="print:hidden">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <span>Selecione o Modo de Trabalho Teológico</span>
            </h3>
            <span className="text-xs text-stone-500">
              11 Estruturas Formais + Diálogo Livre
            </span>
          </div>
          <ModeSelector
            currentMode={currentMode}
            onSelectMode={(mode) => setCurrentMode(mode)}
          />
        </section>

        {/* 2. Interactive Study Input Form */}
        <section className="print:hidden">
          <StudyInputForm
            currentMode={currentMode}
            onGenerate={handleGenerate}
            isLoading={isLoading || isStreaming}
            onStop={handleStopGeneration}
          />
        </section>

        {/* 3. Output Study & Sermon Viewer */}
        <section className="space-y-3">
          <div className="flex items-center justify-between print:hidden">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Exposição & Estrutura Exegética</span>
            </h3>
            {isCurrentContentSaved && (
              <span className="text-xs text-amber-800 font-medium inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                Arquivado no Caderno
              </span>
            )}
          </div>

          <StudyViewer
            content={activeContent}
            mode={currentMode}
            isStreaming={isStreaming}
            onSave={handleSaveCurrentStudy}
            isSaved={isCurrentContentSaved}
            onFollowUp={handleFollowUp}
            isLoadingFollowUp={isLoading}
          />
        </section>
      </main>

      {/* Modals */}
      <SavedStudiesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        studies={savedStudies}
        onSelectStudy={handleSelectSavedStudy}
        onDeleteStudy={handleDeleteSavedStudy}
      />

      <PrinciplesModal
        isOpen={isPrinciplesModalOpen}
        onClose={() => setIsPrinciplesModalOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-stone-200 bg-stone-100/70 py-6 text-center text-xs text-stone-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-1.5">
          <p className="font-cinzel font-semibold text-stone-700">
            Teólogo IA — Auxílio Ministerial e Doutrinário
          </p>
          <p className="text-[11px] text-stone-400">
            "Examinai tudo. Retende o bem." — 1 Tessalonicenses 5:21
          </p>
        </div>
      </footer>
    </div>
  );
}

import React, { useState } from 'react';
import {
  X,
  Bookmark,
  Search,
  Trash2,
  ExternalLink,
  BookOpen,
  Calendar,
  Download,
  FileText
} from 'lucide-react';
import { SavedStudy } from '../types';

interface SavedStudiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  studies: SavedStudy[];
  onSelectStudy: (study: SavedStudy) => void;
  onDeleteStudy: (id: string) => void;
}

export const SavedStudiesModal: React.FC<SavedStudiesModalProps> = ({
  isOpen,
  onClose,
  studies,
  onSelectStudy,
  onDeleteStudy
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredStudies = studies.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.passageOrTopic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.modeTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportAll = () => {
    const jsonStr = JSON.stringify(studies, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `teologo-ia-estudos-salvos-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-stone-50 border border-stone-300 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="saved-studies-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 bg-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-800 text-amber-100 flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h2 id="saved-studies-modal-title" className="text-lg font-bold text-stone-900 font-cinzel">
                Caderno de Estudos & Sermões
              </h2>
              <p className="text-xs text-stone-500">
                {studies.length} {studies.length === 1 ? 'estudo arquivado' : 'estudos arquivados'}
              </p>
            </div>
          </div>
          <button
            id="btn-close-saved-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200/80 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Bulk actions */}
        <div className="p-4 border-b border-stone-200 bg-white flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              id="input-search-saved-studies"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por passagem, tema ou título..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-stone-200 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden bg-stone-50/50"
            />
          </div>

          {studies.length > 0 && (
            <button
              id="btn-export-all-studies"
              onClick={handleExportAll}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200/80 border border-stone-200 transition-colors inline-flex items-center gap-1.5 w-full sm:w-auto justify-center"
            >
              <Download className="w-3.5 h-3.5 text-amber-700" />
              <span>Exportar Backup (JSON)</span>
            </button>
          )}
        </div>

        {/* Study List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {filteredStudies.length === 0 ? (
            <div className="py-12 text-center text-stone-400 space-y-2">
              <BookOpen className="w-10 h-10 mx-auto text-stone-300 stroke-[1.5]" />
              <p className="text-sm font-semibold text-stone-600">
                Nenhum estudo encontrado
              </p>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                {searchQuery
                  ? 'Nenhum resultado corresponde à sua busca.'
                  : 'Ao gerar um sermão ou estudo, clique em "Salvar" para arquivá-lo aqui no seu caderno.'}
              </p>
            </div>
          ) : (
            filteredStudies.map((study) => (
              <div
                key={study.id}
                id={`saved-item-${study.id}`}
                className="p-4 rounded-xl border border-stone-200 bg-white hover:border-amber-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                      {study.modeTitle}
                    </span>
                    <span className="text-[11px] text-stone-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {study.date}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 line-clamp-1">
                    {study.title}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-2 font-serif-bible">
                    {study.passageOrTopic}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    id={`btn-open-study-${study.id}`}
                    onClick={() => {
                      onSelectStudy(study);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors inline-flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Abrir</span>
                  </button>

                  <button
                    id={`btn-delete-study-${study.id}`}
                    onClick={() => onDeleteStudy(study.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Remover estudo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-100 flex justify-end">
          <button
            id="btn-close-saved-modal-footer"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-200 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

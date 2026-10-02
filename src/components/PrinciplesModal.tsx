import React from 'react';
import { X, BookCheck, Heart, Search, Scale, Shield, CheckCircle2 } from 'lucide-react';

interface PrinciplesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrinciplesModal: React.FC<PrinciplesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const principles = [
    {
      icon: BookCheck,
      title: 'Autoridade Suprema das Escrituras',
      desc: 'A Bíblia Sagrada é a fonte primordial e inerrante de autoridade doutrinária e moral para a fé e prática da Igreja.'
    },
    {
      icon: Heart,
      title: 'Amor, Respeito e Edificação',
      desc: 'Todas as respostas são formuladas de forma amorosa, construtiva e edificante, preservando o respeito pelas diferentes tradições do cristianismo histórico.'
    },
    {
      icon: Search,
      title: 'Interpretação Contextual e Exegética',
      desc: 'Prioridade absoluta à hermenêutica gramático-histórica, considerando o contexto histórico, literário, linguístico e canônico do texto.'
    },
    {
      icon: Shield,
      title: 'Profundidade sem Superficialidade',
      desc: 'Rejeição de respostas rasas ou clichês; compromisso com a densidade teológica, rigor bíblico e reverência.'
    },
    {
      icon: Scale,
      title: 'Equilíbrio entre Teologia e Prática',
      desc: 'A sã doutrina deságua invariavelmente na piedade cristã, na santificação, na adoração e no serviço ao próximo.'
    },
    {
      icon: CheckCircle2,
      title: 'Fidelidade Textual e Honestidade',
      desc: 'Diferenciação nítida entre o texto sagrado e comentários interpretativos. Não há invenção de dados, datas, autores ou passagens.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-stone-50 border border-stone-300 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="principles-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 bg-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-700 text-amber-100 flex items-center justify-center font-bold">
              ✝
            </div>
            <div>
              <h2 id="principles-modal-title" className="text-lg font-bold text-stone-900 font-cinzel">
                Princípios Fundamentais do Teólogo IA
              </h2>
              <p className="text-xs text-stone-500">
                Diretrizes de fidelidade bíblica, ortodoxia e compromisso cristão
              </p>
            </div>
          </div>
          <button
            id="btn-close-principles-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200/80 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
            <strong className="font-semibold block mb-1">Missão do Assistente:</strong>
            Ajudar cristãos, pastores, professores e líderes a compreenderem profundamente a Palavra de Deus, mantendo rigor com o texto original, respeito às tradições cristãs históricas e zelo pastoral.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {principles.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-3.5 rounded-xl border border-stone-200 bg-white hover:border-amber-300/80 transition-all shadow-2xs flex flex-col gap-1.5"
                >
                  <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm">
                    <Icon className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="border-t border-stone-200 pt-4 text-xs text-stone-500 italic text-center">
            "Toda a Escritura é divinamente inspirada, e proveitosa para ensinar, para redarguir, para corrigir, para instruir em justiça." — 2 Timóteo 3:16
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-100 flex justify-end">
          <button
            id="btn-dismiss-principles"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 transition-colors shadow-xs"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

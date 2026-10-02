export type TheologicalMode =
  | 'explicacao'
  | 'estudo'
  | 'pregacao'
  | 'esboco'
  | 'contexto_historico'
  | 'personagem'
  | 'apologetica'
  | 'devocional'
  | 'livro'
  | 'comparacao'
  | 'pastoral'
  | 'livre';

export interface ModeConfig {
  id: TheologicalMode;
  title: string;
  badge: string;
  category: 'exegese' | 'homiletica' | 'historia' | 'devocional' | 'pastoral' | 'geral';
  shortDesc: string;
  description: string;
  iconName: string;
  structure: string[];
  placeholderPrompt: string;
  suggestedPrompts: Array<{
    title: string;
    prompt: string;
    description: string;
  }>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  mode?: TheologicalMode;
  content: string;
  timestamp: number;
}

export interface SavedStudy {
  id: string;
  title: string;
  mode: TheologicalMode;
  modeTitle: string;
  date: string;
  content: string;
  passageOrTopic: string;
}

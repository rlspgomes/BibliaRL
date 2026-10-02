import { ModeConfig } from '../types';

export const THEOLOGICAL_MODES: ModeConfig[] = [
  {
    id: 'explicacao',
    title: 'Explicação Bíblica',
    badge: '13 Passos Exegéticos',
    category: 'exegese',
    shortDesc: 'Exegese aprofundada em 13 etapas com contexto histórico, literário e original.',
    description: 'Análise exegética rigorosa com 13 itens obrigatórios: texto, autor, data, destinatários, contextos histórico, político, cultural, religioso e literário, significado original e aplicações.',
    iconName: 'BookOpen',
    structure: [
      '1. Texto Bíblico',
      '2. Autor Humano',
      '3. Data Provável de Escrita',
      '4. Destinatários',
      '5. Contexto Histórico',
      '6. Contexto Político',
      '7. Contexto Cultural',
      '8. Contexto Religioso',
      '9. Contexto Literário',
      '10. Significado Original',
      '11. Aplicação para os Dias Atuais',
      '12. Referências Paralelas na Bíblia',
      '13. Conclusão'
    ],
    placeholderPrompt: 'Ex: Romanos 8:28-39 ou Filipenses 2:5-11...',
    suggestedPrompts: [
      {
        title: 'Romanos 8:28-39',
        prompt: 'Faça a explicação bíblica completa de Romanos 8:28-39 seguindo os 13 passos do modelo.',
        description: 'O amor de Deus em Cristo e a perseverança dos santos.'
      },
      {
        title: 'Filipenses 2:5-11',
        prompt: 'Explique Filipenses 2:5-11 (o hino cristológico do esvaziamento / Kenosis) pelos 13 passos.',
        description: 'A humildade e exaltação do Senhor Jesus Cristo.'
      },
      {
        title: 'Gálatas 2:19-20',
        prompt: 'Faça a explicação exegética completa de Gálatas 2:19-20 nos 13 passos.',
        description: 'Crucificado com Cristo e justificado pela fé.'
      },
      {
        title: 'Hebreus 11:1-6',
        prompt: 'Faça a explicação exegética e contextual de Hebreus 11:1-6 pelos 13 passos.',
        description: 'A natureza da fé bíblica que agrada a Deus.'
      }
    ]
  },
  {
    id: 'estudo',
    title: 'Estudo Bíblico',
    badge: 'Discipulado & Célula',
    category: 'exegese',
    shortDesc: 'Estrutura completa com objetivos, contextos, 3 tópicos, perguntas e oração.',
    description: 'Roteiro pedagógico ideal para escola bíblica, pequenos grupos e discipulado com introdução, 3 tópicos de desenvolvimento, reflexões e oração final.',
    iconName: 'GraduationCap',
    structure: [
      'TEMA',
      'TEXTO BASE',
      'OBJETIVO DO ESTUDO',
      'INTRODUÇÃO',
      'CONTEXTO HISTÓRICO',
      'CONTEXTO BÍBLICO',
      'DESENVOLVIMENTO (Tópicos 1, 2 e 3)',
      'APLICAÇÕES PRÁTICAS',
      'PERGUNTAS PARA REFLEXÃO',
      'CONCLUSÃO',
      'ORAÇÃO FINAL'
    ],
    placeholderPrompt: 'Ex: A Oração do Pai Nosso (Mateus 6:9-13) ou A Parábola do Filho Pródigo (Lucas 15:11-32)...',
    suggestedPrompts: [
      {
        title: 'A Graça que Transforma',
        prompt: 'Crie um estudo bíblico completo sobre Efésios 2:1-10: "Salvos pela Graça por meio da Fé".',
        description: 'A doutrina da regeneração e as boas obras preparadas de antemão.'
      },
      {
        title: 'Oração Modelar',
        prompt: 'Elabore um estudo bíblico em Mateus 6:5-15 sobre como Jesus ensinou seus discípulos a orar.',
        description: 'Prioridades do Reino na oração cotidiana.'
      },
      {
        title: 'Vencendo a Ansiedade',
        prompt: 'Crie um estudo bíblico em Filipenses 4:4-9 sobre a paz de Deus que excede todo o entendimento.',
        description: 'Guarda do coração e mente em Cristo Jesus.'
      }
    ]
  },
  {
    id: 'pregacao',
    title: 'Modo de Pregação',
    badge: 'Sermão Completo',
    category: 'homiletica',
    shortDesc: 'Homilética com ilustração inicial, 3 tópicos (explicação + aplicação), apelo e oração.',
    description: 'Sermão homilético completo e edificante para o púlpito, contendo objetivo pastoral, ilustração envolvente, divisão em 3 tópicos com explicação e aplicação, apelo e oração.',
    iconName: 'Flame',
    structure: [
      'TEMA',
      'TEXTO BASE',
      'OBJETIVO',
      'INTRODUÇÃO',
      'CONTEXTO HISTÓRICO',
      'CONTEXTO BÍBLICO',
      'ILUSTRAÇÃO INICIAL',
      'TÓPICO 1: Explicação e Aplicação',
      'TÓPICO 2: Explicação e Aplicação',
      'TÓPICO 3: Explicação e Aplicação',
      'CONCLUSÃO',
      'APELO FINAL',
      'ORAÇÃO FINAL'
    ],
    placeholderPrompt: 'Ex: Salmo 23 - O Bom Pastor Cuida de Nós ou Isaías 6:1-8 - A Visão da Glória de Deus...',
    suggestedPrompts: [
      {
        title: 'Isaías 6:1-8 (O Encontro com a Santidade)',
        prompt: 'Crie uma pregação completa sobre Isaías 6:1-8 com o tema "O Impacto da Glória e Santidade de Deus".',
        description: 'Visão, confissão, purificação e envio missionário.'
      },
      {
        title: 'Salmo 23 (O Senhor é o Meu Pastor)',
        prompt: 'Elabore uma mensagem de pregação no Salmo 23 com o tema "Descanso e Segurança sob o Pastoreio de Deus".',
        description: 'Cuidado nos vales e unção diante dos inimigos.'
      },
      {
        title: 'Marcos 4:35-41 (A Tempestade Acalmada)',
        prompt: 'Crie uma pregação sobre Marcos 4:35-41 com o tema "Quem é Este que até o Vento e o Mar lhe Obedecem?".',
        description: 'Fé e autoridade de Cristo em meio às tempestades.'
      }
    ]
  },
  {
    id: 'esboco',
    title: 'Esboço Expositivo',
    badge: 'Versículo a Versículo',
    category: 'homiletica',
    shortDesc: 'Divisão textual versículo por versículo com contexto imediato e ideia central.',
    description: 'Pregação expositiva clássica que desvenda o fluxo de pensamento do autor bíblico, expondo versículo por versículo com rigor textual e aplicação eclesial.',
    iconName: 'Scroll',
    structure: [
      'TEMA',
      'TEXTO',
      'IDEIA CENTRAL',
      'INTRODUÇÃO',
      'EXPOSIÇÃO (Versículo por Versículo detalhado)',
      'APLICAÇÃO',
      'CONCLUSÃO',
      'APELO'
    ],
    placeholderPrompt: 'Ex: Colossenses 1:15-20 (A Supremacia de Cristo) ou 1 Pedro 1:3-9 (A Esperança Viva)...',
    suggestedPrompts: [
      {
        title: 'Colossenses 1:15-20',
        prompt: 'Crie um esboço expositivo versículo por versículo de Colossenses 1:15-20 sobre a Supremacia Absoluta de Cristo.',
        description: 'Cristo como primogênito de toda criação e cabeça da Igreja.'
      },
      {
        title: '1 Pedro 1:3-9',
        prompt: 'Faça um esboço expositivo versículo a versículo de 1 Pedro 1:3-9 sobre a Viva Esperança e a Provação da Fé.',
        description: 'Uma herança incorruptível guardada nos céus.'
      },
      {
        title: 'Tito 2:11-14',
        prompt: 'Elabore um esboço expositivo de Tito 2:11-14: "A Graça Salvadora e Educadora de Deus".',
        description: 'A manifestação da graça que nos ensina a renunciar à impiedade.'
      }
    ]
  },
  {
    id: 'contexto_historico',
    title: 'Contexto Histórico',
    badge: 'Arqueologia & História',
    category: 'historia',
    shortDesc: 'Impérios dominantes, política, economia, costumes e geografia bíblica.',
    description: 'Reconstituição do pano de fundo das Escrituras: quem escreveu, sob qual império, situação social, moeda, costumes e relevância geográfica.',
    iconName: 'Landmark',
    structure: [
      'Autor e Data',
      'Império Dominante',
      'Situação Política',
      'Situação Econômica',
      'Situação Religiosa',
      'Costumes da Época',
      'Geografia Relevante',
      'Personagens Importantes',
      'Relação com Outros Acontecimentos Bíblicos'
    ],
    placeholderPrompt: 'Ex: O período intertestamentário (400 anos de silêncio) ou O contexto do exílio babilônico no livro de Daniel...',
    suggestedPrompts: [
      {
        title: 'O Império Romano no Novo Testamento',
        prompt: 'Explique detalhadamente o contexto histórico do Império Romano no primeiro século (Pax Romana, estradas, tributos e imperadores) e como isso facilitou a expansão do Evangelho.',
        description: 'Pano de fundo dos evangelhos e viagens missionárias de Paulo.'
      },
      {
        title: 'O Exílio Babilônico e Daniel',
        prompt: 'Apresente o contexto histórico completo de Daniel no cativeiro babilônico e persa.',
        description: 'Nabucodonosor, queda de Jerusalém e fidelidade em terra estrangeira.'
      },
      {
        title: 'O Contexto de Amós em Israel',
        prompt: 'Explique a conjuntura histórica, política e econômica de Amós no Reino do Norte durante o reinado próspero de Jeroboão II.',
        description: 'Opulência material e injustiça social condenada pelo profeta.'
      }
    ]
  },
  {
    id: 'personagem',
    title: 'Personagens Bíblicos',
    badge: 'Biografia Bíblica',
    category: 'historia',
    shortDesc: 'Significado do nome, ações, virtudes, falhas e lições espirituais.',
    description: 'Estudo biográfico honesto e profundo: o significado do nome hebraico/grego, contexto histórico, atos notáveis, falhas humanas e lições para a vida cristã hoje.',
    iconName: 'UserCheck',
    structure: [
      'Nome e Significado',
      'Primeira Aparição',
      'Contexto Histórico',
      'Principais Ações',
      'Qualidades e Virtudes',
      'Falhas e Pecados',
      'Lições Espirituais',
      'Aplicações para Hoje'
    ],
    placeholderPrompt: 'Ex: Abraão, José do Egito, Rute, Rei Davi, Maria Madalena, Apóstolo Pedro...',
    suggestedPrompts: [
      {
        title: 'José do Egito',
        prompt: 'Faça a análise completa do personagem bíblico José do Egito segundo a estrutura formal.',
        description: 'Fidelidade nas injustiças e a providência soberana de Deus.'
      },
      {
        title: 'O Rei Davi',
        prompt: 'Apresente o estudo de personagem sobre o Rei Davi (o homem segundo o coração de Deus, suas virtudes e suas falhas).',
        description: 'Adoração, liderança, queda moral, arrependimento sincero e graça.'
      },
      {
        title: 'A Rainha Ester',
        prompt: 'Analise a biografia e importância espiritual da Rainha Ester na corte persa.',
        description: 'Coragem em favor do povo de Deus: "para um momento como este".'
      },
      {
        title: 'O Apóstolo Pedro',
        prompt: 'Faça a análise do personagem bíblico Simão Pedro, do barco de pescador ao Pentecostes.',
        description: 'Impulsividade, negação, restauração e ousadia pelo Espírito.'
      }
    ]
  },
  {
    id: 'apologetica',
    title: 'Modo Apologético',
    badge: 'Defesa da Fé',
    category: 'exegese',
    shortDesc: 'Respostas fundamentadas para questões difíceis com lógica e amor.',
    description: 'Respostas profundas a objeções intelectuais, céticas ou teológicas com base bíblica sólida, contexto histórico, lógica respeitosa e apresentação das correntes cristãs sem ataques.',
    iconName: 'ShieldCheck',
    structure: [
      'Definição da Pergunta ou Objeção',
      'Fundamentação Bíblica Direta',
      'Contexto Histórico e Filosófico',
      'Argumentação Lógica e Teológica',
      'Diferentes Interpretações Cristãs (quando aplicável)',
      'Aplicação Pastoral e Evangelística'
    ],
    placeholderPrompt: 'Ex: Por que Deus permite o sofrimento? Como sabemos que os manuscritos da Bíblia são confiáveis?...',
    suggestedPrompts: [
      {
        title: 'O Problema do Sofrimento e do Mal',
        prompt: 'Responda apologeticamente: "Se Deus é todo-poderoso e bom, por que o sofrimento existe no mundo?". Use argumentos bíblicos, teológicos e pastorais.',
        description: 'Teodiceia cristã, queda, livre-arbítrio e redenção na cruz.'
      },
      {
        title: 'A Confiabilidade dos Manuscritos',
        prompt: 'Apresente a defesa da confiabilidade histórica e textual dos manuscritos do Novo Testamento.',
        description: 'Evidências bibliográficas, número de cópias e proximidade dos autógrafos.'
      },
      {
        title: 'A Ressurreição Histórica de Jesus',
        prompt: 'Quais são as principais evidências históricas e apologéticas para a ressurreição corporal de Jesus Cristo?',
        description: 'Túmulo vazio, aparições aos discípulos e transformação dos apóstolos.'
      }
    ]
  },
  {
    id: 'devocional',
    title: 'Modo Devocional',
    badge: 'Edificação Pessoal',
    category: 'devocional',
    shortDesc: 'Versículo do dia, reflexão profunda, aplicação prática, desafio e oração.',
    description: 'Alimento espiritual diário com reflexão meditativa, desafio prático para viver o evangelho hoje e uma oração sincera e bíblica.',
    iconName: 'HeartHandshake',
    structure: [
      'VERSÍCULO DO DIA',
      'REFLEXÃO',
      'APLICAÇÃO PRÁTICA',
      'DESAFIO DO DIA',
      'ORAÇÃO'
    ],
    placeholderPrompt: 'Ex: Lamentações 3:22-23 (As misericórdias do Senhor) ou Josué 1:9 (Sê forte e corajoso)...',
    suggestedPrompts: [
      {
        title: 'Lamentações 3:22-23',
        prompt: 'Crie um devocional edificante sobre Lamentações 3:22-23: "As misericórdias do Senhor se renovam a cada manhã".',
        description: 'Fidelidade de Deus no meio da dor e renovação diária.'
      },
      {
        title: 'Salmo 46:1-2 e 10',
        prompt: 'Crie um devocional bíblico sobre o Salmo 46:10: "Aquietai-vos e sabei que eu sou Deus".',
        description: 'Paz em meio às turbulências da vida moderna.'
      },
      {
        title: 'Mateus 11:28-30',
        prompt: 'Faça um devocional sobre o convite de Jesus: "Vinde a mim todos vós que estais cansados e sobrecarregados".',
        description: 'Descanso espiritual aos pés do Salvador.'
      }
    ]
  },
  {
    id: 'livro',
    title: 'Panorama de Livros',
    badge: 'Visão Panorâmica',
    category: 'historia',
    shortDesc: 'Autor, tema central, versículo-chave, estrutura, Cristo no livro e curiosidades.',
    description: 'Introdução canônica a qualquer um dos 66 livros da Bíblia: autor, propósito redentor, estrutura teológica, como Cristo é revelado no livro e lições contemporâneas.',
    iconName: 'Library',
    structure: [
      'Autor e Data',
      'Tema Principal e Propósito',
      'Versículo-Chave',
      'Estrutura do Livro',
      'Contexto Histórico',
      'Cristo no Livro (Tipologia / Revelação)',
      'Lições Práticas para a Igreja',
      'Curiosidades Teológicas'
    ],
    placeholderPrompt: 'Ex: Carta aos Hebreus, Gênesis, Livro de Romanos, Apocalipse, Habacuque...',
    suggestedPrompts: [
      {
        title: 'A Carta aos Hebreus',
        prompt: 'Apresente o panorama completo do Livro de Hebreus seguindo o modelo formal de livros da Bíblia.',
        description: 'A superioridade de Cristo sobre anjos, Moisés, Aarão e a antiga aliança.'
      },
      {
        title: 'O Livro de Romanos',
        prompt: 'Faça o panorama teológico e estrutural do Livro de Romanos segundo a estrutura oficial.',
        description: 'A magna carta do evangelho da graça e justificação pela fé.'
      },
      {
        title: 'O Livro de Habacuque',
        prompt: 'Apresente o panorama de Habacuque: da dúvida e questionamento à fé triunfante que canta no deserto.',
        description: '"O justo viverá pela sua fé" diante dos caldeus.'
      }
    ]
  },
  {
    id: 'comparacao',
    title: 'Comparação de Textos',
    badge: 'Harmonia Bíblica',
    category: 'exegese',
    shortDesc: 'Contexto de cada texto, semelhanças, aparentes tensões, síntese e aplicação.',
    description: 'Harmonização de passagens paralelas, alusões do Antigo no Novo Testamento ou aparentes tensões teológicas (ex: Paulo em Romanos e Tiago sobre as obras).',
    iconName: 'GitCompare',
    structure: [
      'Contexto de Cada Texto',
      'Semelhanças e Paralelismos',
      'Diferenças e Ênfases Próprias',
      'Lição Central e Síntese Teológica',
      'Aplicação Prática para Hoje'
    ],
    placeholderPrompt: 'Ex: Romanos 3:28 e Tiago 2:24 (Fé e Obras) ou Mateus 26:26-28 e 1 Coríntios 11:23-26 (A Ceia do Senhor)...',
    suggestedPrompts: [
      {
        title: 'Romanos 3:28 vs Tiago 2:24',
        prompt: 'Faça a comparação teológica e contextual rigorosa entre Romanos 3:28 (justificação pela fé sem obras) e Tiago 2:24 (o homem é justificado por obras e não só pela fé).',
        description: 'Harmonia entre a fé que justifica diante de Deus e as obras que evidenciam a fé viva diante dos homens.'
      },
      {
        title: 'Isaías 53 vs 1 Pedro 2:21-25',
        prompt: 'Compare a profecia messiânica do Servo Sofredor em Isaías 53 com o cumprimento e aplicação apostólica em 1 Pedro 2:21-25.',
        description: 'A substituição penal do Cordeiro pelas nossas transgressões.'
      },
      {
        title: 'A Criação em Gênesis 1 e João 1',
        prompt: 'Compare a narrativa da criação de Gênesis 1 com o prólogo do Evangelho de João (João 1:1-14).',
        description: 'Cristo, o Logos eterno por meio de quem tudo foi criado.'
      }
    ]
  },
  {
    id: 'pastoral',
    title: 'Modo Pastoral',
    badge: 'Acolhimento & Consolo',
    category: 'pastoral',
    shortDesc: 'Acolhimento amoroso, empatia, princípios bíblicos, versículos e cuidado.',
    description: 'Aconselhamento bíblico caloroso, respeitoso e empático para lidar com luto, ansiedade, medo, depressão, culpa, solidão ou crises existenciais.',
    iconName: 'Cross',
    structure: [
      'Palavra de Acolhimento e Empatia Sincera',
      'Princípios Bíblicos Aplicáveis à Situação',
      'Versículos Consoladores e Promessas de Deus',
      'Orientações Práticas para o Cuidado da Alma',
      'Oração Pastoral de Intercessão e Conforto'
    ],
    placeholderPrompt: 'Ex: Estou enfrentando um luto muito doloroso pela perda de um familiar... ou Estou paralisado pela ansiedade quanto ao futuro...',
    suggestedPrompts: [
      {
        title: 'Consolo no Luto e Perda',
        prompt: 'Escreva uma mensagem no Modo Pastoral para alguém que acaba de perder um familiar querido e sente uma dor insuportável no peito.',
        description: 'Esperança da ressurreição, permissão para chorar e presença do Consolador.'
      },
      {
        title: 'Crise de Ansiedade e Medo',
        prompt: 'Ajude pastoralmente um cristão que tem tido crises severas de ansiedade, insônia e medo constante do futuro.',
        description: 'Cuidado integral (espiritual, emocional e médico), graça e descanso em Cristo.'
      },
      {
        title: 'Culpa e Sentimento de Indignidade',
        prompt: 'Atenda pastoralmente um crente que pecou, já se arrependeu, mas continua se sentindo rejeitado e incapaz de receber o perdão divino.',
        description: 'O sangue de Jesus que purifica de todo pecado (1 João 1:9, Romanos 8:1).'
      }
    ]
  },
  {
    id: 'livre',
    title: 'Consulta Teológica',
    badge: 'Pergunta Livre',
    category: 'geral',
    shortDesc: 'Tire dúvidas sobre doutrinas, teologia sistemática, termos bíblicos ou tradições.',
    description: 'Espaço aberto para qualquer dúvida de teologia bíblica, sistemática, história da Igreja, termos originais em hebraico/grego ou hermenêutica cristã.',
    iconName: 'MessageSquareText',
    structure: [
      'Resumo Doutrinário',
      'Fundamentação Bíblica Ampla',
      'Perspectivas Históricas da Igreja',
      'Síntese Teológica Responsável',
      'Relevância para a Vida Diária'
    ],
    placeholderPrompt: 'Ex: O que significa a palavra "Shalom" no hebraico? Como a Igreja primitiva entendia a Trindade? O que é a Teologia da Aliança?...',
    suggestedPrompts: [
      {
        title: 'A Doutrina da Trindade',
        prompt: 'Explique com clareza bíblica e teológica a doutrina da Trindade: um só Deus em três Pessoas distintas e coeternas.',
        description: 'Fundamentos no Antigo e Novo Testamento e os concílios ecumênicos.'
      },
      {
        title: 'Significado de "Hesed" no Antigo Testamento',
        prompt: 'Qual o significado teológico e exegético da palavra hebraica "Hesed" (amor leal, misericórdia da aliança)?',
        description: 'O amor incondicional e a fidelidade da aliança de Deus.'
      },
      {
        title: 'Soberania de Deus e Responsabilidade Humana',
        prompt: 'Como a teologia bíblica equilibra a soberania absoluta de Deus e a real responsabilidade humana nas escolhas?',
        description: 'Perspectivas reformadas, arminianas e a sabedoria das Escrituras.'
      }
    ]
  }
];

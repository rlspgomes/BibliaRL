import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const SYSTEM_PROMPT = `Você é o Teólogo IA, um assistente cristão especializado em teologia bíblica, apologética, exegese, hermenêutica, história da Igreja e elaboração de sermões.

Sua missão é ajudar cristãos a compreenderem profundamente a Palavra de Deus, mantendo fidelidade ao texto bíblico, respeito às diferentes tradições cristãs e compromisso com a verdade das Escrituras.

PRINCÍPIOS FUNDAMENTAIS
- Considere a Bíblia como principal fonte de autoridade.
- Sempre responda de forma amorosa, respeitosa e edificante.
- Priorize a interpretação contextual das Escrituras.
- Evite respostas superficiais.
- Demonstre equilíbrio entre conhecimento teológico e aplicação prática.
- Sempre que possível utilize referências bíblicas.
- Diferencie claramente interpretação bíblica de opinião pessoal.
- Não invente fatos históricos, autores, eventos ou referências bíblicas.

Ao responder, formate sempre em Markdown claro e legível, com títulos, subtítulos destacados, citações bíblicas em bloco (> texto) e separadores quando necessário. Siga estritamente a estrutura solicitada de acordo com o modo de estudo ou pregação.

MODOS E ESTRUTURAS OBRIGATÓRIAS:

1. MODO DE EXPLICAÇÃO BÍBLICA:
Siga estritamente este modelo de 13 itens numerados:
1. Texto Bíblico
2. Autor Humano
3. Data Provável de Escrita
4. Destinatários
5. Contexto Histórico
6. Contexto Político
7. Contexto Cultural
8. Contexto Religioso
9. Contexto Literário
10. Significado Original
11. Aplicação para os Dias Atuais
12. Referências Paralelas na Bíblia
13. Conclusão

2. MODO DE ESTUDO BÍBLICO:
Estrutura:
TEMA
TEXTO BASE
OBJETIVO DO ESTUDO
INTRODUÇÃO
CONTEXTO HISTÓRICO
CONTEXTO BÍBLICO
DESENVOLVIMENTO:
- TÓPICO 1
- TÓPICO 2
- TÓPICO 3
APLICAÇÕES PRÁTICAS
PERGUNTAS PARA REFLEXÃO
CONCLUSÃO
ORAÇÃO FINAL

3. MODO DE PREGAÇÃO:
Estrutura obrigatória:
TEMA
TEXTO BASE
OBJETIVO
INTRODUÇÃO
CONTEXTO HISTÓRICO
CONTEXTO BÍBLICO
ILUSTRAÇÃO INICIAL
DESENVOLVIMENTO:
- TÓPICO 1 (Explicação e Aplicação)
- TÓPICO 2 (Explicação e Aplicação)
- TÓPICO 3 (Explicação e Aplicação)
CONCLUSÃO
APELO FINAL
ORAÇÃO FINAL

4. MODO DE ESBOÇO EXPOSITIVO:
- Analise o contexto imediato e do livro
- Identifique a ideia central do texto
- Divida por seus argumentos naturais versículo por versículo
- Aplicações práticas
Estrutura:
TEMA
TEXTO
IDEIA CENTRAL
INTRODUÇÃO
EXPOSIÇÃO (Versículo por versículo detalhado)
APLICAÇÃO
CONCLUSÃO
APELO

5. MODO DE CONTEXTO HISTÓRICO:
Explique:
- Autor
- Data
- Império dominante
- Situação política
- Situação econômica
- Situação religiosa
- Costumes da época
- Geografia relevante
- Personagens importantes
- Relação com outros acontecimentos bíblicos

6. MODO DE PERSONAGENS BÍBLICOS:
Apresente:
- Nome
- Significado do Nome
- Primeira Aparição
- Contexto Histórico
- Principais Ações
- Qualidades
- Falhas
- Lições Espirituais
- Aplicações para Hoje

7. MODO APOLOGÉTICO:
- Responda com base na Bíblia
- Utilize contexto histórico e lógica respeitosa
- Apresente diferentes interpretações cristãs quando necessário
- Evite ataques a crenças ou pessoas

8. MODO DE DEVOCIONAL:
Estrutura:
VERSÍCULO DO DIA
REFLEXÃO
APLICAÇÃO PRÁTICA
DESAFIO DO DIA
ORAÇÃO

9. MODO DE LIVROS DA BÍBLIA:
Apresente:
- Autor
- Data
- Tema Principal
- Propósito
- Versículo-chave
- Estrutura do Livro
- Contexto Histórico
- Cristo no Livro
- Lições Práticas
- Curiosidades

10. MODO DE COMPARAÇÃO DE TEXTOS:
Apresente:
- Contexto de cada texto
- Semelhanças
- Diferenças
- Lição central
- Aplicação prática

11. MODO PASTORAL:
Ao lidar com sofrimento, ansiedade, luto, medo ou crises:
- Seja acolhedor e profundamente empático
- Utilize princípios bíblicos consoladores
- Indique versículos apropriados
- Foque no cuidado pastoral e oração de conforto

12. RESPOSTAS GERAIS / DIÁLOGO TEOLÓGICO:
Sempre profundas, bem organizadas, fiéis às Escrituras, teologicamente responsáveis e práticas para a vida cristã.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Helper function to get GoogleGenAI client
  function getGenAI() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // Health check API
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      hasKey: Boolean(process.env.GEMINI_API_KEY),
      model: "gemini-3.8-flash",
    });
  });

  // Streaming generation endpoint (SSE)
  app.post("/api/theologian/stream", async (req, res) => {
    const { mode, prompt, conversationHistory = [] } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.status(503).json({
        error: "GEMINI_API_KEY não configurada no servidor. Configure em Settings > Secrets.",
      });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    try {
      // Build conversation contents
      const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

      // Include previous turns if present
      if (Array.isArray(conversationHistory)) {
        for (const turn of conversationHistory) {
          if (turn.role === "user" || turn.role === "model") {
            contents.push({
              role: turn.role,
              parts: [{ text: turn.text }],
            });
          }
        }
      }

      // Contextual prompt with mode instructions
      const modeInstruction = mode ? `[Modo Selecionado: ${mode}]\n\n` : "";
      contents.push({
        role: "user",
        parts: [{ text: `${modeInstruction}${prompt}` }],
      });

      const responseStream = await ai.models.generateContentStream({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.4, // Balanced for precision, reverence and rich depth
        },
      });

      for await (const chunk of responseStream) {
        const text = chunk.text;
        if (text) {
          res.write(`data: ${JSON.stringify({ text })}\n\n`);
        }
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (err: any) {
      console.error("Gemini stream error:", err);
      res.write(`data: ${JSON.stringify({ error: err.message || "Erro durante a geração teológica." })}\n\n`);
      res.end();
    }
  });

  // Non-streaming fallback endpoint
  app.post("/api/theologian/generate", async (req, res) => {
    const { mode, prompt, conversationHistory = [] } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.status(503).json({
        error: "GEMINI_API_KEY não configurada no servidor. Configure em Settings > Secrets.",
      });
    }

    try {
      const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];
      if (Array.isArray(conversationHistory)) {
        for (const turn of conversationHistory) {
          if (turn.role === "user" || turn.role === "model") {
            contents.push({
              role: turn.role,
              parts: [{ text: turn.text }],
            });
          }
        }
      }

      const modeInstruction = mode ? `[Modo Selecionado: ${mode}]\n\n` : "";
      contents.push({
        role: "user",
        parts: [{ text: `${modeInstruction}${prompt}` }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.4,
        },
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini generate error:", err);
      res.status(500).json({ error: err.message || "Erro na geração teológica" });
    }
  });

  // Vite middleware in dev or static serving in prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Teólogo IA server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

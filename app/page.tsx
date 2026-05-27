"use client";

import { useState } from "react";

type Lang = "pt" | "en";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const translations = {
  pt: {
    status: "API Serverless Online",
    titleStart: "Seus scrobbles do ",
    titleEnd: " direto no GitHub.",
    description:
      "Uma API rápida e sem manutenção para exibir seu histórico musical em tempo real no README do seu perfil, utilizando o poder do Next.js e Shields.io.",
    preview: "Live Preview",
    copyBtn: "Copiar",
    copiedBtn: "Copiado!",
    terminalComment: "# No README a ser utilizado, cole a linha abaixo:",
    btnTest: "Testar API Rest",
    btnSource: "Ver Código Fonte",
    footerDev: "Desenvolvido por",
  },
  en: {
    status: "Serverless API Online",
    titleStart: "Your ",
    titleEnd: " scrobbles right on your GitHub.",
    description:
      "A fast, maintenance-free API to display your musical history in real-time on your profile README, using the power of Next.js and Shields.io.",
    preview: "Live Preview",
    copyBtn: "Copy",
    copiedBtn: "Copied!",
    terminalComment: "# In the README file to be used, paste the line below:",
    btnTest: "Test REST API",
    btnSource: "View Source Code",
    footerDev: "Developed by",
  },
};

export default function Home() {
  const [isCopied, setIsCopied] = useState(false);
  const [lang, setLang] = useState<Lang>("pt");

  const t = translations[lang];

  const badgeUrl = `https://img.shields.io/endpoint?url=${BASE_URL}/api/scrobbles&logo=last.fm&logoColor=white`;

  const markdownText = `![Last.fm Scrobbles](${badgeUrl})`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownText);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Falha ao copiar o texto: ", err);
    }
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === "pt" ? "en" : "pt"));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-zinc-50 font-sans selection:bg-red-500/30">
      {/* Botão de Troca de Idioma */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
        <button
          onClick={toggleLanguage}
          className="flex cursor-pointer items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-semibold tracking-wider text-zinc-400 backdrop-blur-md transition-all hover:border-zinc-700 hover:text-zinc-100"
        >
          <span className={lang === "pt" ? "text-white" : ""}>PT</span>
          <span className="text-zinc-600">|</span>
          <span className={lang === "en" ? "text-white" : ""}>EN</span>
        </button>
      </div>

      <main className="flex flex-col flex-1 items-center justify-center px-6 py-24 text-center relative overflow-hidden">
        {/* Efeito de brilho de fundo (Glow) animado */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-600/15 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>

        {/* Status Tag */}
        <div className="mb-8 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-300 backdrop-blur-md shadow-sm transition-colors hover:bg-zinc-800/80 cursor-default z-10">
          <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2.5 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
          {t.status}
        </div>

        {/* Headline principal */}
        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl mb-6 z-10">
          {t.titleStart}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d51007] to-red-600 drop-shadow-sm">
            Last.fm
          </span>
          <br className="hidden sm:block" /> {t.titleEnd}
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl text-lg text-zinc-400 mb-10 leading-relaxed z-10">
          {t.description}
        </p>

        {/* Preview do Badge */}
        <div className="mb-12 p-[1px] rounded-2xl bg-gradient-to-b from-zinc-800 to-transparent z-10 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300">
          <div className="flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-4">
              {t.preview}
            </span>
            <img
              src="https://img.shields.io/badge/Last.fm-183.288-7209b7?logo=last.fm&logoColor=white&labelColor=240046&style=for-the-badge"
              alt="Preview do Badge Dinâmico"
              className="h-10 drop-shadow-[0_0_15px_rgba(114,9,183,0.3)]"
            />
          </div>
        </div>

        {/* Mockup de Terminal */}
        <div className="w-full max-w-2xl bg-[#0a0a0a] border border-zinc-800/80 rounded-xl overflow-hidden text-left shadow-2xl z-10 group">
          <div className="flex items-center justify-between px-4 py-3 bg-[#111111] border-b border-zinc-800/80">
            <div className="flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="ml-4 text-xs text-zinc-500 font-mono">
                README.md
              </span>
            </div>
            {/* Botão Copy com Feedback Visual dinâmico pelo idioma */}
            <button
              onClick={handleCopy}
              className={`text-xs font-mono transition-opacity flex items-center gap-1.5 ${
                isCopied
                  ? "text-green-500 opacity-100"
                  : "text-zinc-500 opacity-0 group-hover:opacity-100 hover:text-zinc-300"
              }`}
            >
              {isCopied ? (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {t.copiedBtn}
                </>
              ) : (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  {t.copyBtn}
                </>
              )}
            </button>
          </div>
          <div className="p-5 overflow-x-auto">
            <code className="text-sm font-mono leading-relaxed whitespace-nowrap">
              <span className="text-zinc-400">{t.terminalComment}</span>
              <br />
              <br />
              <span className="text-pink-400">![Last.fm Scrobbles]</span>
              <span className="text-zinc-300">
                (https://img.shields.io/endpoint?url=
              </span>
              <span className="text-emerald-400 font-bold">
                https://lastfm-shields-badge.vercel.app
              </span>
              <span className="text-zinc-300">
                /api/scrobbles&logo=last.fm&logoColor=white)
              </span>
            </code>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 z-10 w-full max-w-2xl justify-center">
          <a
            href="/api/scrobbles"
            target="_blank"
            className="px-6 py-3 rounded-lg bg-zinc-100 text-black font-semibold text-sm hover:bg-white hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            {t.btnTest}
          </a>
          <a
            href="https://github.com/strattegia-mp3/lastfm-shields-badge"
            target="_blank"
            className="px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-sm hover:bg-zinc-800 hover:text-white transition-all"
          >
            {t.btnSource}
          </a>
        </div>
      </main>

      {/* Footer minimalista */}
      <footer className="relative z-10 border-t border-zinc-900/80 bg-[#050505] py-8 text-center text-sm text-zinc-600">
        <p>
          {t.footerDev}{" "}
          <a
            href="https://strattegia.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block font-medium text-zinc-400 transition-all duration-300 hover:-translate-y-0.5 hover:text-zinc-50"
          >
            Victor Rocha
            <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-zinc-50 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </p>
      </footer>
    </div>
  );
}

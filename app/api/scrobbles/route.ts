import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY;
  const user = process.env.LASTFM_USER;

  if (!apiKey || !user) {
    return NextResponse.json(
      {
        schemaVersion: 1,
        label: "error",
        message: "Missing env vars",
        color: "red",
      },
      { status: 500 },
    );
  }

  // API do Last.fm para pegar informações do perfil (onde fica o total de scrobbles)
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${user}&api_key=${apiKey}&format=json`;

  try {
    // Faz o fetch definindo o revalidate para 300 segundos (5 minutos) para evitar spam na API do Last.fm
    const response = await fetch(url, { next: { revalidate: 300 } });

    if (!response.ok) throw new Error("Erro ao conectar com Last.fm");

    const data = await response.json();
    const totalScrobbles = data.user?.playcount;

    if (!totalScrobbles) {
      throw new Error("Usuário não encontrado ou dados inválidos");
    }

    // Formata o número (ex: 15450 vira "15.450" ou "15,450" dependendo da localidade)
    const formattedScrobbles = Number(totalScrobbles).toLocaleString("pt-BR");

    // Retorna no padrão que o endpoint do Shields.io exige
    return NextResponse.json(
      {
        schemaVersion: 1,
        label: "Last.fm", // Fica fixo no lado esquerdo
        message: formattedScrobbles, // O número dinâmico fica no lado direito
        color: "7209b7", // Roxo do lado direito (color)
        labelColor: "240046", // Roxo escuro do lado esquerdo (labelColor)
        style: "for-the-badge", // Estilo padrão (pode ser alterado na URL se preferir)
      },
      {
        headers: {
          // CRUCIAL: Diz ao proxy do GitHub para NÃO cachear isso para sempre
          "Cache-Control": "max-age=0, no-cache, no-store, must-revalidate",
        },
      },
    );
  } catch (error: unknown) {
    // Garantir tipagem segura do erro
    const message = error instanceof Error ? error.message : "offline";
    return NextResponse.json(
      {
        schemaVersion: 1,
        label: "last.fm",
        message: message ?? "offline",
        color: "gray",
      },
      {
        status: 200, // Retornamos 200 pro Shields.io conseguir renderizar o badge de erro em cinza
        headers: {
          "Cache-Control": "max-age=0, no-cache, no-store, must-revalidate",
        },
      },
    );
  }
}

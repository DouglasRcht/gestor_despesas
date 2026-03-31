"use client";

import { useState } from "react";

export function CameraScanPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [placeholderMessage, setPlaceholderMessage] = useState(
    "Aguardando implementacao da camera e do OCR pelos alunos.",
  );

  function handleOpenPanel() {
    setIsOpen(true);
  }

  function handleSimulatedCapture() {
    // TODO: ALUNOS - Implementar acesso à API de mediaDevices para ativar a câmera do dispositivo.
    // TODO: ALUNOS - Tratar permissões do navegador, iniciar o stream de vídeo e controlar o encerramento da captura.
    // TODO: ALUNOS - Implementar extração de valores da imagem.
    // TODO: ALUNOS - Mapear os dados extraídos para título, valor, data e categoria antes de salvar no Firestore.

    setPlaceholderMessage(
      "Esta area representa o ponto de extensao para captura em camera e OCR da nota fiscal.",
    );
  }

  return (
    <section className="glass-panel animate-enter rounded-[36px] border border-[color:var(--border)] px-5 py-6 sm:px-7 sm:py-7">
      <div className="flex flex-col gap-3">
        <div>
          <p className="section-eyebrow">Cadastro via camera</p>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
            Estrutura vazia para os alunos
          </h2>
        </div>
        <p className="text-sm leading-7 text-[color:var(--muted)]">
          O componente abaixo abre um espaco de simulacao para a futura
          integracao com camera e reconhecimento de texto.
        </p>
      </div>

      <button
        className="mt-8 w-full rounded-full border border-[rgba(31,138,112,0.18)] bg-[rgba(240,252,248,0.95)] px-5 py-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--accent-forest)] uppercase transition hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(31,138,112,0.16)]"
        onClick={handleOpenPanel}
        type="button"
      >
        Escanear Nota Fiscal (Camera)
      </button>

      {isOpen ? (
        <div
          aria-modal="true"
          className="mt-6 rounded-[32px] border border-[rgba(31,42,34,0.1)] bg-white/90 p-4 shadow-[0_20px_36px_rgba(31,42,34,0.08)] sm:p-5"
          role="dialog"
        >
          <div className="overflow-hidden rounded-[28px] border border-[rgba(31,42,34,0.12)] bg-[linear-gradient(135deg,#1a2320,#33524b)] p-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-eyebrow text-white/70">
                  Preview da camera
                </p>
                <h3 className="mt-3 text-xl font-semibold">
                  Painel reservado para captura da nota fiscal
                </h3>
              </div>
              <button
                className="rounded-full border border-white/18 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-white/80"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                Fechar
              </button>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.85fr]">
              <div className="flex aspect-video items-center justify-center rounded-[24px] border border-dashed border-white/25 bg-white/6 px-6 text-center text-sm leading-7 text-white/82">
                Aqui ficara o video da camera assim que a turma implementar o
                acesso ao dispositivo.
              </div>

              <div className="space-y-3 rounded-[24px] border border-white/10 bg-white/8 p-4 text-sm leading-7 text-white/80">
                <p className="font-medium text-white">Fluxo sugerido</p>
                <p>1. Pedir permissao de camera ao navegador.</p>
                <p>2. Exibir a nota em tempo real para o usuario.</p>
                <p>3. Processar a imagem com OCR.</p>
                <p>4. Popular automaticamente os campos do formulario.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[24px] border border-[rgba(31,42,34,0.08)] bg-[rgba(248,242,231,0.78)] p-4">
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              {placeholderMessage}
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              className="rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:-translate-y-0.5"
              onClick={handleSimulatedCapture}
              type="button"
            >
              Simular processamento
            </button>
            <button
              className="rounded-full border border-[rgba(31,42,34,0.12)] bg-white px-5 py-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--foreground)] uppercase transition hover:-translate-y-0.5"
              onClick={() => setPlaceholderMessage("Sem imagem processada no momento.")}
              type="button"
            >
              Limpar simulacao
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

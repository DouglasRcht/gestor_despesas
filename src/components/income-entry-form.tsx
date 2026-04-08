"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { getTodayDateString } from "@/services/expense-types";
import {
  incomeSources,
  type IncomeEntryInput,
} from "@/services/income-entry-types";

interface IncomeEntryFormProps {
  onSubmitIncomeEntry: (incomeEntry: IncomeEntryInput) => Promise<void>;
  isSubmitting?: boolean;
}

interface FormState {
  title: string;
  amount: string;
  source: string;
  date: string;
}

interface FormFeedback {
  message: string;
  tone: "error" | "neutral" | "success";
}

type FormErrors = Partial<Record<keyof FormState, string>>;

function createInitialFormState(): FormState {
  return {
    amount: "",
    date: getTodayDateString(),
    source: incomeSources[0],
    title: "",
  };
}

function validateForm(state: FormState): FormErrors {
  const nextErrors: FormErrors = {};
  const parsedAmount = Number(state.amount);

  if (!state.title.trim()) {
    nextErrors.title = "Informe a descricao da entrada.";
  }

  if (!state.amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
    nextErrors.amount = "Digite um valor maior que zero.";
  }

  if (!state.source.trim()) {
    nextErrors.source = "Selecione a origem da entrada.";
  }

  if (!state.date) {
    nextErrors.date = "Informe a data da entrada.";
  }

  return nextErrors;
}

export function IncomeEntryForm({
  isSubmitting = false,
  onSubmitIncomeEntry,
}: IncomeEntryFormProps) {
  const [formState, setFormState] = useState<FormState>(createInitialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState<FormFeedback | null>({
    message:
      "TODO implement: esta feature deve ser concluida pelos alunos com persistencia, testes e deploy controlado.",
    tone: "neutral",
  });

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateForm(formState);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFeedback({
        message: "Revise os campos destacados antes de cadastrar a entrada.",
        tone: "error",
      });
      return;
    }

    try {
      await onSubmitIncomeEntry({
        amount: Number(formState.amount),
        date: formState.date,
        source: formState.source,
        title: formState.title.trim(),
      });

      setFeedback({
        message: "Entrada cadastrada com sucesso.",
        tone: "success",
      });
      setErrors({});
      setFormState(createInitialFormState());
    } catch (error) {
      setFeedback({
        message:
          error instanceof Error
            ? error.message
            : "Nao foi possivel salvar a entrada no momento.",
        tone: "error",
      });
    }
  }

  return (
    <section className="glass-panel animate-enter rounded-[36px] border border-[color:var(--border)] px-5 py-6 sm:px-7 sm:py-7">
      <div className="flex flex-col gap-3">
        <div>
          <p className="section-eyebrow">Feature 01</p>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
            Cadastro de entradas
          </h2>
        </div>
        <p className="text-sm leading-7 text-[color:var(--muted)]">
          A interface e a estrutura do hook ja estao preparadas, mas a gravacao
          das entradas ainda esta marcada com `TODO implement` para a turma.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-[color:var(--foreground)]"
            htmlFor="income-title"
          >
            Descricao da entrada
          </label>
          <input
            aria-invalid={Boolean(errors.title)}
            className="w-full rounded-[22px] border border-[rgba(31,42,34,0.14)] bg-white/88 px-4 py-3 outline-none transition focus:border-[color:var(--accent-forest)] focus:ring-4 focus:ring-[rgba(31,138,112,0.12)]"
            id="income-title"
            name="title"
            onChange={handleInputChange}
            placeholder="Ex.: Pagamento do cliente"
            type="text"
            value={formState.title}
          />
          {errors.title ? (
            <p className="text-sm text-[color:var(--accent-clay)]">
              {errors.title}
            </p>
          ) : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-[color:var(--foreground)]"
              htmlFor="income-amount"
            >
              Valor da entrada (R$)
            </label>
            <input
              aria-invalid={Boolean(errors.amount)}
              className="w-full rounded-[22px] border border-[rgba(31,42,34,0.14)] bg-white/88 px-4 py-3 outline-none transition focus:border-[color:var(--accent-forest)] focus:ring-4 focus:ring-[rgba(31,138,112,0.12)]"
              id="income-amount"
              name="amount"
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.01"
              type="number"
              value={formState.amount}
            />
            {errors.amount ? (
              <p className="text-sm text-[color:var(--accent-clay)]">
                {errors.amount}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-[color:var(--foreground)]"
              htmlFor="income-date"
            >
              Data da entrada
            </label>
            <input
              aria-invalid={Boolean(errors.date)}
              className="w-full rounded-[22px] border border-[rgba(31,42,34,0.14)] bg-white/88 px-4 py-3 outline-none transition focus:border-[color:var(--accent-forest)] focus:ring-4 focus:ring-[rgba(31,138,112,0.12)]"
              id="income-date"
              name="date"
              onChange={handleInputChange}
              type="date"
              value={formState.date}
            />
            {errors.date ? (
              <p className="text-sm text-[color:var(--accent-clay)]">
                {errors.date}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-[color:var(--foreground)]"
            htmlFor="income-source"
          >
            Origem
          </label>
          <select
            aria-invalid={Boolean(errors.source)}
            className="w-full rounded-[22px] border border-[rgba(31,42,34,0.14)] bg-white/88 px-4 py-3 outline-none transition focus:border-[color:var(--accent-forest)] focus:ring-4 focus:ring-[rgba(31,138,112,0.12)]"
            id="income-source"
            name="source"
            onChange={handleInputChange}
            value={formState.source}
          >
            {incomeSources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
          {errors.source ? (
            <p className="text-sm text-[color:var(--accent-clay)]">
              {errors.source}
            </p>
          ) : null}
        </div>

        {feedback ? (
          <p
            className={`rounded-[22px] border px-4 py-3 text-sm leading-6 ${
              feedback.tone === "success"
                ? "border-[rgba(31,138,112,0.18)] bg-[rgba(240,252,248,0.95)] text-[color:var(--accent-forest)]"
                : feedback.tone === "error"
                  ? "border-[rgba(201,92,84,0.18)] bg-[rgba(255,244,243,0.95)] text-[color:var(--accent-clay)]"
                  : "border-[rgba(217,123,44,0.18)] bg-[rgba(255,247,238,0.95)] text-[color:var(--foreground)]"
            }`}
            role={feedback.tone === "error" ? "alert" : "status"}
          >
            {feedback.message}
          </p>
        ) : null}

        <button
          className="w-full rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:-translate-y-0.5 hover:bg-[rgba(31,42,34,0.92)] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Salvando..." : "Salvar entrada"}
        </button>
      </form>

      {/* TODO implement: adicionar testes da feature de entradas e conectar esta UI ao Firestore. */}
    </section>
  );
}

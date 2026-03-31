"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  expenseCategories,
  getTodayDateString,
  type ExpenseInput,
} from "@/services/expense-types";

interface ManualExpenseFormProps {
  onSubmitExpense: (expense: ExpenseInput) => Promise<void>;
  isSubmitting?: boolean;
}

interface FormState {
  title: string;
  amount: string;
  category: string;
  date: string;
}

interface FormFeedback {
  message: string;
  tone: "error" | "success";
}

type FormErrors = Partial<Record<keyof FormState, string>>;

function createInitialFormState(): FormState {
  return {
    amount: "",
    category: expenseCategories[0],
    date: getTodayDateString(),
    title: "",
  };
}

function validateForm(state: FormState): FormErrors {
  const nextErrors: FormErrors = {};
  const parsedAmount = Number(state.amount);

  if (!state.title.trim()) {
    nextErrors.title = "Informe o titulo da despesa.";
  }

  if (!state.amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
    nextErrors.amount = "Digite um valor maior que zero.";
  }

  if (!state.category.trim()) {
    nextErrors.category = "Selecione uma categoria.";
  }

  if (!state.date) {
    nextErrors.date = "Informe a data da compra.";
  }

  return nextErrors;
}

export function ManualExpenseForm({
  isSubmitting = false,
  onSubmitExpense,
}: ManualExpenseFormProps) {
  const [formState, setFormState] = useState<FormState>(createInitialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState<FormFeedback | null>(null);

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
        message: "Revise os campos destacados antes de salvar.",
        tone: "error",
      });
      return;
    }

    try {
      await onSubmitExpense({
        amount: Number(formState.amount),
        category: formState.category,
        date: formState.date,
        title: formState.title.trim(),
      });

      setFeedback({
        message: "Despesa cadastrada com sucesso.",
        tone: "success",
      });
      setErrors({});
      setFormState(createInitialFormState());
    } catch (error) {
      setFeedback({
        message:
          error instanceof Error
            ? error.message
            : "Nao foi possivel salvar a despesa no momento.",
        tone: "error",
      });
    }
  }

  return (
    <section className="glass-panel animate-enter rounded-[36px] border border-[color:var(--border)] px-5 py-6 sm:px-7 sm:py-7">
      <div className="flex flex-col gap-3">
        <div>
          <p className="section-eyebrow">Cadastro manual</p>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
            Registrar nova despesa
          </h2>
        </div>
        <p className="text-sm leading-7 text-[color:var(--muted)]">
          Digite os dados basicos da nota fiscal e envie para o Firestore.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-[color:var(--foreground)]"
            htmlFor="title"
          >
            Titulo da despesa
          </label>
          <input
            aria-invalid={Boolean(errors.title)}
            className="w-full rounded-[22px] border border-[rgba(31,42,34,0.14)] bg-white/88 px-4 py-3 outline-none transition focus:border-[color:var(--accent-forest)] focus:ring-4 focus:ring-[rgba(31,138,112,0.12)]"
            id="title"
            name="title"
            onChange={handleInputChange}
            placeholder="Ex.: Mercado semanal"
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
              htmlFor="amount"
            >
              Valor total (R$)
            </label>
            <input
              aria-invalid={Boolean(errors.amount)}
              className="w-full rounded-[22px] border border-[rgba(31,42,34,0.14)] bg-white/88 px-4 py-3 outline-none transition focus:border-[color:var(--accent-forest)] focus:ring-4 focus:ring-[rgba(31,138,112,0.12)]"
              id="amount"
              min="0"
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
              htmlFor="date"
            >
              Data da compra
            </label>
            <input
              aria-invalid={Boolean(errors.date)}
              className="w-full rounded-[22px] border border-[rgba(31,42,34,0.14)] bg-white/88 px-4 py-3 outline-none transition focus:border-[color:var(--accent-forest)] focus:ring-4 focus:ring-[rgba(31,138,112,0.12)]"
              id="date"
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
            htmlFor="category"
          >
            Categoria
          </label>
          <select
            aria-invalid={Boolean(errors.category)}
            className="w-full rounded-[22px] border border-[rgba(31,42,34,0.14)] bg-white/88 px-4 py-3 outline-none transition focus:border-[color:var(--accent-forest)] focus:ring-4 focus:ring-[rgba(31,138,112,0.12)]"
            id="category"
            name="category"
            onChange={handleInputChange}
            value={formState.category}
          >
            {expenseCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category ? (
            <p className="text-sm text-[color:var(--accent-clay)]">
              {errors.category}
            </p>
          ) : null}
        </div>

        {feedback ? (
          <p
            className={`rounded-[22px] border px-4 py-3 text-sm leading-6 ${
              feedback.tone === "success"
                ? "border-[rgba(31,138,112,0.18)] bg-[rgba(240,252,248,0.95)] text-[color:var(--accent-forest)]"
                : "border-[rgba(201,92,84,0.18)] bg-[rgba(255,244,243,0.95)] text-[color:var(--accent-clay)]"
            }`}
            role={feedback.tone === "success" ? "status" : "alert"}
          >
            {feedback.message}
          </p>
        ) : null}

        <button
          className="w-full rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:-translate-y-0.5 hover:bg-[rgba(31,42,34,0.92)] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Salvando..." : "Salvar despesa"}
        </button>
      </form>
    </section>
  );
}

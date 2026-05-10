"use client";

import { IncomeEntryForm } from "@/components/income-entry-form";
import { ManualExpenseForm } from "@/components/manual-expense-form";
import { OverviewChart } from "@/components/overview-chart";
import { RecentExpensesList } from "@/components/recent-expenses-list";
import { ReceiptUploadPanel } from "@/components/receipt-upload-panel";
import { SummaryCard } from "@/components/summary-card";
import { demoMonthlyIncome } from "@/services/expense-types";
import { formatCurrency } from "@/services/formatters";
import { useIncomeEntries } from "@/services/use-income-entries";
import { useExpenses } from "@/services/use-expenses";

export function ExpenseDashboardApp() {
  const {
    addIncomeEntry,
    incomeEntries,
    isSubmitting: isSubmittingIncomeEntry,
    loading: loadingIncomeEntries,
    totalIncome,
  } = useIncomeEntries();
  const {
    addExpense,
    deleteExpense,
    deletingExpenseId,
    error,
    expenses,
    isConfigured,
    isSubmitting,
    loading,
  } = useExpenses();

  const totalExpenses = expenses.reduce(
    (currentTotal, expense) => currentTotal + expense.amount,
    0,
  );
  const remainingBalance = totalIncome - totalExpenses;
  const latestExpenses = expenses.slice(0, 5);
  const totalTransactions = expenses.length + incomeEntries.length;
  const progressPercentage = Math.min(
    Math.round((totalExpenses / totalIncome) * 100),
    100,
  );

  return (
    <main className="relative flex-1 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-12 left-8 h-44 w-44 rounded-full bg-[rgba(217,123,44,0.14)] blur-3xl" />
        <div className="absolute right-0 bottom-8 h-56 w-56 rounded-full bg-[rgba(31,138,112,0.16)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="glass-panel animate-enter overflow-hidden rounded-[36px] border border-[color:var(--border)] px-5 py-6 sm:px-8 sm:py-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-4">
              <span className="section-eyebrow">Fluxo Financeiro</span>
              <div className="space-y-3">
                <h1 className="max-w-2xl text-4xl leading-tight font-semibold text-[color:var(--foreground)] sm:text-5xl">
                  Trabalho base com três desafios prontos para
                  Firebase, GitHub, Jenkins e Vercel.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
                  O dashboard organiza as três features do trabalho: entradas,
                  saídas manuais e saídas por leitura de nota fiscal em PDF ou
                  imagem. O projeto base foi preparado como scaffold e deixa as
                  entregas finais para os alunos concluírem.
                </p>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/70 bg-white/72 p-5">
              <div className="flex items-center justify-between text-sm text-[color:var(--muted)]">
                <span>Uso do orçamento de exemplo</span>
                <span>{progressPercentage}%</span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-[rgba(31,42,34,0.08)]">
                <div
                  className="animate-bar-rise h-full rounded-full bg-gradient-to-r from-[color:var(--accent-amber)] to-[color:var(--accent-forest)]"
                  style={{
                    width: `${Math.max(progressPercentage, expenses.length ? 12 : 4)}%`,
                  }}
                />
              </div>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Saldo estimado
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-[color:var(--foreground)]">
                    {formatCurrency(remainingBalance)}
                  </p>
                </div>
                <p className="max-w-[14rem] text-right text-sm leading-6 text-[color:var(--muted)]">
                  Enquanto a feature de entradas não for concluída, o painel
                  usa o fallback de {formatCurrency(demoMonthlyIncome)} para o
                  comparativo visual.
                </p>
              </div>
            </div>
          </div>

          {!isConfigured ? (
            <div className="mt-6 rounded-[28px] border border-[rgba(217,123,44,0.28)] bg-[rgba(255,255,255,0.86)] p-5 text-sm leading-7 text-[color:var(--foreground)]">
              <p className="font-medium">
                Configure as variáveis `NEXT_PUBLIC_FIREBASE_*` para ativar o
                Firestore.
              </p>
              <p className="mt-2 text-[color:var(--muted)]">
                A estrutura da aplicação, do hook e das operações de CRUD já
                está pronta. Falta apenas conectar as credenciais do projeto no
                ambiente local ou na Vercel.
              </p>
            </div>
          ) : null}

          {isConfigured && error ? (
            <div
              role="alert"
              className="mt-6 rounded-[28px] border border-[rgba(201,92,84,0.28)] bg-[rgba(255,255,255,0.84)] p-5 text-sm leading-7 text-[color:var(--accent-clay)]"
            >
              {error}
            </div>
          ) : null}

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <SummaryCard
              description="Fica em fallback até a turma concluir o cadastro real de entradas."
              tone="forest"
              title="Entradas"
              value={formatCurrency(totalIncome)}
            />
            <SummaryCard
              description="Soma das saídas cadastradas manualmente ou via leitura de nota."
              tone="amber"
              title="Despesas"
              value={formatCurrency(totalExpenses)}
            />
            <SummaryCard
              description="Total combinado de registros de entradas e saídas no dashboard."
              tone="clay"
              title="Lançamentos"
              value={`${totalTransactions} registro${totalTransactions === 1 ? "" : "s"}`}
            />
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-6">
            <OverviewChart
              expenses={totalExpenses}
              income={totalIncome}
              loading={loading || loadingIncomeEntries}
            />

            <RecentExpensesList
              deletingExpenseId={deletingExpenseId}
              expenses={latestExpenses}
              loading={loading}
              onDeleteExpense={deleteExpense}
            />
          </section>

          <aside className="space-y-6">
            <IncomeEntryForm
              isSubmitting={isSubmittingIncomeEntry}
              onSubmitIncomeEntry={addIncomeEntry}
            />
            <ManualExpenseForm
              isSubmitting={isSubmitting}
              onSubmitExpense={addExpense}
            />
            <ReceiptUploadPanel
              isSubmitting={isSubmitting}
              onSubmitExpense={addExpense}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ManualExpenseForm } from "@/components/manual-expense-form";

describe("ManualExpenseForm", () => {
  test("mostra validacao quando os campos obrigatorios estao vazios", async () => {
    const user = userEvent.setup();
    const onSubmitExpense = jest.fn<Promise<void>, []>().mockResolvedValue();

    render(<ManualExpenseForm onSubmitExpense={onSubmitExpense} />);

    await user.click(screen.getByRole("button", { name: /salvar despesa/i }));

    expect(
      screen.getByText("Revise os campos destacados antes de salvar."),
    ).toBeInTheDocument();
    expect(screen.getByText("Informe o titulo da despesa.")).toBeInTheDocument();
    expect(screen.getByText("Digite um valor maior que zero.")).toBeInTheDocument();
    expect(onSubmitExpense).not.toHaveBeenCalled();
  });

  test("envia os dados normalizados e limpa o formulario apos o cadastro", async () => {
    const user = userEvent.setup();
    const onSubmitExpense = jest.fn().mockResolvedValue(undefined);

    render(<ManualExpenseForm onSubmitExpense={onSubmitExpense} />);

    await user.type(
      screen.getByLabelText(/titulo da despesa/i),
      "Mercado semanal",
    );
    await user.type(screen.getByLabelText(/valor total/i), "123.45");
    await user.clear(screen.getByLabelText(/data da compra/i));
    await user.type(screen.getByLabelText(/data da compra/i), "2026-03-30");
    await user.selectOptions(screen.getByLabelText(/categoria/i), "Saude");
    await user.click(screen.getByRole("button", { name: /salvar despesa/i }));

    expect(onSubmitExpense).toHaveBeenCalledWith({
      amount: 123.45,
      category: "Saude",
      date: "2026-03-30",
      title: "Mercado semanal",
    });
    expect(
      await screen.findByText("Despesa cadastrada com sucesso."),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/titulo da despesa/i)).toHaveValue("");
    expect(screen.getByLabelText(/valor total/i)).toHaveValue(null);
    expect(screen.getByLabelText(/categoria/i)).toHaveValue("Alimentacao");
  });
});

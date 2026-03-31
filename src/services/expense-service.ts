import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { getFirestoreDatabase, getMissingFirebaseEnvironmentVariables } from "@/services/firebase";
import type { Expense, ExpenseInput } from "@/services/expense-types";

const expensesCollectionName = "expenses";

export class FirestoreConfigurationError extends Error {
  constructor() {
    const missingEnvironmentVariables =
      getMissingFirebaseEnvironmentVariables().join(", ");

    super(
      `Firestore indisponivel. Configure as variaveis ${missingEnvironmentVariables} para habilitar a persistencia.`,
    );
    this.name = "FirestoreConfigurationError";
  }
}

function getExpensesCollection() {
  const database = getFirestoreDatabase();

  if (!database) {
    throw new FirestoreConfigurationError();
  }

  return collection(database, expensesCollectionName);
}

export async function createExpense(expenseInput: ExpenseInput) {
  const expensesCollection = getExpensesCollection();
  const normalizedExpense = {
    amount: Number(expenseInput.amount),
    category: expenseInput.category.trim(),
    createdAt: Date.now(),
    date: expenseInput.date,
    title: expenseInput.title.trim(),
  };

  const createdExpense = await addDoc(expensesCollection, normalizedExpense);

  return {
    ...normalizedExpense,
    id: createdExpense.id,
  };
}

export async function deleteExpense(id: string) {
  const expensesCollection = getExpensesCollection();
  await deleteDoc(doc(expensesCollection, id));
}

export function subscribeToExpenses(
  onExpensesChange: (expenses: Expense[]) => void,
  onError: (error: Error) => void,
) {
  try {
    const expensesCollection = getExpensesCollection();
    const expensesQuery = query(expensesCollection, orderBy("createdAt", "desc"));

    return onSnapshot(
      expensesQuery,
      (snapshot) => {
        const expenses = snapshot.docs.map((snapshotDocument) => {
          const documentData = snapshotDocument.data();

          return {
            amount: Number(documentData.amount ?? 0),
            category: String(documentData.category ?? "Outros"),
            date: String(documentData.date ?? ""),
            id: snapshotDocument.id,
            title: String(documentData.title ?? ""),
          };
        });

        onExpensesChange(expenses);
      },
      (error) => {
        onError(error as Error);
      },
    );
  } catch (error) {
    onError(error as Error);
    return () => undefined;
  }
}

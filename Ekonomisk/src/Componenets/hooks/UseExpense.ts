import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient"; 



export interface Expense {
  income: number;
  category: string;
  amount: number;
  expenseId: number;
  description: string[];
}

export interface ExpensesProps {
  income: {
    income: number;
  };
  expenses: Expense[];
}


const UseExpenses= () => {
  const fetchExpenses = () =>
    apiClient.get<ExpensesProps>("/Expenses/IncomeExpenses?userId="+1).then((res) => res.data);

  return useQuery<ExpensesProps, Error>({
    queryKey: ["Expenses"],
    queryFn: fetchExpenses,
  });
};

export default UseExpenses;
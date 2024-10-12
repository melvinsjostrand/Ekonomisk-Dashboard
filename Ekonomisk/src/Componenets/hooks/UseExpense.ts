import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";
import { ExpensesProps } from "./Inferfaces";

const UseExpenses = (userId: number) => {
  const fetchExpenses = () =>
    apiClient
      .get<ExpensesProps>("/Expenses/IncomeExpenses?userId=" + userId)
      .then((res) => res.data);

  return useQuery<ExpensesProps, Error>({
    queryKey: ["Expenses"],
    queryFn: fetchExpenses,
    enabled:!!userId,
  });
};

export default UseExpenses;

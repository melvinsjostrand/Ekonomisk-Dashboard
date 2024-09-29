import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient"; 
import { ExpensesProps } from "./UseBaseTable";



const UseExpenses= () => {
  const fetchExpenses = () =>
    apiClient.get<ExpensesProps>("/Expenses/IncomeExpenses?userId="+1).then((res) => res.data);

  return useQuery<ExpensesProps, Error>({
    queryKey: ["Expenses"],
    queryFn: fetchExpenses,
  });
};

export default UseExpenses;
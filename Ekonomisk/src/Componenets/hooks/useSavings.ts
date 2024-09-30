import { useQuery } from "@tanstack/react-query";
import { Expense } from "./UseExpense";
import apiClient from "./apiClient";

interface SavingsData {
  savings:{
    totalSaved: number,
    saveGoal: number,
    prevsave: number, }
    expense: Expense[]
  }

const useSavings = () => {
  const fetchSavings = () =>
    apiClient.get<SavingsData>("/Expenses/SavingExpenses?userId="+1)
      .then((res) => res.data)


    return useQuery<SavingsData, Error>({
      queryKey: ["useSavings"],
      queryFn: fetchSavings
    })
};

export default useSavings;

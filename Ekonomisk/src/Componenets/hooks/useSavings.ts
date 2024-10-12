import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";
import { SavingsData } from "./Inferfaces";

const useSavings = (userId: number) => {
  const fetchSavings = () =>
    apiClient
      .get<SavingsData>("/Expenses/SavingExpenses?userId=" + userId)
      .then((res) => res.data);

  return useQuery<SavingsData, Error>({
    queryKey: ["useSavings"],
    queryFn: fetchSavings,
  });
};

export default useSavings;


import { useMutation, UseMutationResult } from "@tanstack/react-query";
import apiClient from "./apiClient";

interface IncomeData {
  userId: number;
  income: number;
  categoryLimits: Record<string, number>;
  saveGoal?: number;
}

const useMakeIncome = (): UseMutationResult<IncomeData, Error, IncomeData> => {
  const postIncomeData = (incomeData: IncomeData) =>
    apiClient.post<IncomeData>("url", incomeData).then((res) => res.data);

  return useMutation<IncomeData, Error, IncomeData>({
    mutationFn: postIncomeData,
    onSuccess: (data) => {
      console.log("Income data successfully posted:", data); // Log the data
    },
    onError: (data) => {
      console.log("Error posting income data:", data); // Log any errors
    },
  });
};

export default useMakeIncome;
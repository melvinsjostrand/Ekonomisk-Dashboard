import { useMutation, UseMutationResult } from "@tanstack/react-query";
import apiClient from "./apiClient";

interface IncomeData {
  userId: number;
  income: number;
  categoryLimits: Record<string, number>;
  saveGoal?: number;
}


const useMakeIncome = (): {
  postMutation: UseMutationResult<IncomeData, Error, IncomeData>;
  putMutation: UseMutationResult<IncomeData, Error, IncomeData>;
} => {

  const postIncomeData = (incomeData: IncomeData) =>
    apiClient.post<IncomeData>("url", incomeData).then((res) => res.data);


  const putIncomeData = (incomeData: IncomeData) =>
    apiClient
      .put<IncomeData>(`url/${incomeData.userId}`, incomeData)
      .then((res) => res.data);


  const postMutation = useMutation<IncomeData, Error, IncomeData>({
    mutationFn: postIncomeData, 
  });

  const putMutation = useMutation<IncomeData, Error, IncomeData>({
    mutationFn: putIncomeData, 
  });

  return { postMutation, putMutation };
};

export default useMakeIncome;

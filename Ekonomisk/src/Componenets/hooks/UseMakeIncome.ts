import axios from "axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

interface IncomeData {
  userId: number;
  income: number;
  categoryLimits: Record<string, number>;
  saveGoal?: number;
}

const useMakeIncome = (): UseMutationResult<IncomeData, Error, IncomeData> => {
  const postIncomeData = (incomeData: IncomeData) =>
    axios
      .post<IncomeData>("https://your-api-endpoint.com/income", incomeData)
      .then((res) => res.data);

  return useMutation<IncomeData, Error, IncomeData>({
    mutationFn: postIncomeData,
  });
};

export default useMakeIncome;
import { useQuery } from "@tanstack/react-query";

import apiClient from "./apiClient";

export interface limit {
  userId: number;
  category: string;
  spendLimit: number;
}

export interface IncomeProps {
  
  income: number;
  
  limits: limit[];
  saveGoal: number;
}

const UseGetIncome = () => {
  const fetchIncome = () =>
    apiClient.get<IncomeProps>("/Limits/LimitsIncome?userId="+1).then((res) => res.data);

  return useQuery<IncomeProps, Error>({
    queryKey: ["Income"],
    queryFn: fetchIncome,
  });
};

export default UseGetIncome;

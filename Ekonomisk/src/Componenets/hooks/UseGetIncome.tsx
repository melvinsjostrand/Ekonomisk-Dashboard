import { useQuery } from "@tanstack/react-query";

import apiClient from "./apiClient";

export interface limit {
  userId: number;
  category: string;
  spendLimit: number;
}

export interface IncomeProps {
  income: {
    income: number;
  };
  Limits: limit[];
  saveGoal: number;
}

const UseGetIncome = () => {
  const fetchIncome = () =>
    apiClient.get<IncomeProps>("API").then((res) => res.data);

  return useQuery<IncomeProps, Error>({
    queryKey: ["Income"],
    queryFn: fetchIncome,
  });
};

export default UseGetIncome;

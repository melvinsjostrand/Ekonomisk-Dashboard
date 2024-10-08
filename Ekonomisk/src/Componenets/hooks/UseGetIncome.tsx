import { useQuery } from "@tanstack/react-query";

import apiClient from "./apiClient";

import { IncomeProps } from "./Inferfaces";

const UseGetIncome = () => {
  const fetchIncome = () =>
    apiClient.get<IncomeProps>("/Limits/LimitsIncomeSaveGoal?userId="+1).then((res) => res.data);

  return useQuery<IncomeProps, Error>({
    queryKey: ["Income"],
    queryFn: fetchIncome,
  });
};

export default UseGetIncome;

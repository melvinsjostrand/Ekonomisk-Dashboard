import { useQuery } from "@tanstack/react-query";

import apiClient from "./apiClient";

import { IncomeProps } from "./Inferfaces";

const UseGetIncome = (userId: number) => {
  const guid = localStorage.getItem("Guid");
  const fetchIncome = () =>
    apiClient
      .get<IncomeProps>("/Limits/LimitsIncomeSaveGoal?userId=" + userId, {
        headers: {
          Authorization: guid,
        },
      })
      .then((res) => res.data);

  return useQuery<IncomeProps, Error>({
    queryKey: ["Income"],
    queryFn: fetchIncome,
  });
};

export default UseGetIncome;

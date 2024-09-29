import { useQuery } from "@tanstack/react-query";

import apiClient from "./apiClient";

interface IncomeProp {
  userId: number;
  income: number;
  limits: limit[];
  saveGoal:number;
}

export interface limit{
    userId:number,
    category:string,
    spendLimit:number
}

const UseGetIncome = () => {
  const fetchIncome = () =>
    apiClient.get<IncomeProp>("API").then((res) => res.data);

  return useQuery<IncomeProp, Error>({
    queryKey: ["Income"],
    queryFn: fetchIncome,
  });
};

export default UseGetIncome;

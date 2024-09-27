import { useQuery } from "@tanstack/react-query";

import apiClient from "./apiClient";

interface SavingsData {
  totalSaved: number;
  saveGoal: number;
  payments: { category: string; amount: number }[];
  prevsave: number; 
}

const useSavings = () => {
  const fetchSavings = () =>
    apiClient.get<SavingsData>("API_ENDPOINT_HERE")
      .then((res) => res.data)


    return useQuery<SavingsData, Error>({
      queryKey: ["useSavings"],
      queryFn: fetchSavings
    })
};

export default useSavings;

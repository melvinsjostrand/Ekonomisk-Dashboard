import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";
import { SavingsData } from "./Inferfaces";

const useSavings = (userId: number) => {
  const guid = localStorage.getItem("Guid");
  const fetchSavings = () =>
    apiClient
      .get<SavingsData>("/Expenses/SavingExpenses?userId=" + userId, {
        headers: {
          Authorization: guid,
        },
      })
      .then((res) => res.data);

  return useQuery<SavingsData, Error>({
    queryKey: ["useSavings"],
    queryFn: fetchSavings,
  });
};

export default useSavings;

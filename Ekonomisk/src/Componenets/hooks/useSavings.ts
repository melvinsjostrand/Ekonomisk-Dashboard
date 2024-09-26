import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface SavingsData {
  totalSaved: number;
  saveGoal: number;
  payments: { category: string; amount: number }[];
  prevsave: number; 
}

const useSavings = () => {
  const fetchSavings = async () => {
    const response = await axios.get<SavingsData>("API_ENDPOINT_HERE");
    return response.data;
  };

  return useQuery<SavingsData, Error>({
    queryKey: ["savings"], 
    queryFn: fetchSavings,
  });
};

export default useSavings;

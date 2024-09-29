import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient"; 
import { pay } from "./UseBaseTable";


export interface ExpenesProps{
  userId: number,
  id: number,
  income: number,
  payment:pay[],
  remaining:number
}


const UseExpenses= () => {
  const fetchExpenses = () =>
    apiClient.get<ExpenesProps>("API").then((res) => res.data);

  return useQuery<ExpenesProps, Error>({
    queryKey: ["Expenses"],
    queryFn: fetchExpenses,
  });
};

export default UseExpenses;
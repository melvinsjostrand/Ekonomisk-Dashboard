

import { pay } from "./UseBaseTable";
import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";
interface FetchPaymentsResponse {
  sum: number;
  payments: pay[];
  remaining: number;
}

const UseExpense = () => {
  const fetchuseExpense = () =>
    apiClient.get<FetchPaymentsResponse>("/").then((res) => res.data);

  return useQuery<FetchPaymentsResponse, Error>({
    queryKey: ["useExpense"],
    queryFn: fetchuseExpense,
  });
};


export default UseExpense;
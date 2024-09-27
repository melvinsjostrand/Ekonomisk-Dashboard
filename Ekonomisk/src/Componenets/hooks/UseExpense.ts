
import axios from "axios";
import { pay } from "./UseBaseTable";
import { useQuery } from "@tanstack/react-query";

interface FetchPaymentsResponse {
  sum: number;
  payments: pay[];
}

const UseExpense = () => {
  const fetchuseExpense = () =>
    axios.get<FetchPaymentsResponse>("API").then((res) => res.data);

  return useQuery<FetchPaymentsResponse, Error>({
    queryKey: ["useExpense"],
    queryFn: fetchuseExpense,
  });
};


export default UseExpense;
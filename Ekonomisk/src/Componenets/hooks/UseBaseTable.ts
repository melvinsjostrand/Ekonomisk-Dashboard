import { useQuery } from "@tanstack/react-query";

import apiClient from "./apiClient";

export interface BaseTableProps {
  userId:number,
  id:number
  income: number;
  payments: pay[];
  remaining: number;
}

export interface pay {
  category: string;
  amount: number;
  desc?: string[];
  image?: string;
}

const useBaseTable = () => {
  const fetchBaseTable = () =>
    apiClient
      .get<BaseTableProps>("API") 
      .then((res) => res.data);

  return useQuery<BaseTableProps, Error>({
    queryKey: ["BaseTable"],
    queryFn: fetchBaseTable,
  });
};

export default useBaseTable;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface BaseTableProps {
  sum: number;
  payments: pay[];
  remaining: number;
  renderExtraColumn?: (payment: pay, index: number) => React.ReactNode;
}
export interface pay {
  category: string;
  amount: number;
  desc?: string[];
  image?: string;
}


const useBaseTable = () => {
  const fetchBaseTable = () =>
    axios
      .get<BaseTableProps>("API") 
      .then((res) => res.data);

  return useQuery<BaseTableProps, Error>({
    queryKey: ["BaseTable"],
    queryFn: fetchBaseTable,
  });
};

export default useBaseTable;
import { useQuery } from "@tanstack/react-query";

import apiClient from "./apiClient";


export interface Expense {
  income: number;
  category: string;
  amount: number;
  expenseId: number;
  description: string[];
}

export interface ExpensesProps {
  reduce(arg0: (acc: any, payment: any) => any, arg1: number): unknown;
  payments: ExpensesProps | undefined;
  income: {
    income: number;
  };
  expenses: Expense[];
}



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
  description?: string[];
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

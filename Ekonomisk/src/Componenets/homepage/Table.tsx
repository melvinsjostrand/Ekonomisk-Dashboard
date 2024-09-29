import { useEffect, useState } from "react";
import BaseTable from "../BaseTable";
import useBaseTable, { BaseTableProps } from "../hooks/UseBaseTable";
import { pay } from "../hooks/UseBaseTable";

interface CashState {
  income: number;
  payments: pay[];
  totalSpent: number;
  remaining: number;
}

const Tables = ({Table}: {Table: BaseTableProps}) => {
  const [cash, setCash] = useState<CashState>({
    income: 0,
    payments: [],
    totalSpent: 0,
    remaining: 0,
  });

  useEffect(() => {
    if (Table) {
      const totalSpent = Array.isArray(Table.payments)
        ? Table.payments.reduce((acc, payment) => acc + payment.amount, 0)
        : 0;

      const remainingAmount = Table.income - totalSpent;

      setCash({
        income: Table.income,
        payments: Table.payments || [],
        totalSpent: totalSpent,
        remaining: remainingAmount,
      });
    }
  }, [Table]);

  return (
    <BaseTable
      income={cash.income}
      payments={cash.payments}
      remaining={cash.remaining} 
      userId={0} 
      id={0}    />
  );
};

export default Tables;

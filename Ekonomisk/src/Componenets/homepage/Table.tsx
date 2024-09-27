import { useEffect, useState } from "react";
import BaseTable from "../BaseTable";
import useBaseTable from "../hooks/UseBaseTable";
import { pay } from "../hooks/UseBaseTable";

interface CashState {
  sum: number;
  payments: pay[];
  totalSpent: number;
  remaining: number;
}

const Tables = () => {
  const { data: baseTable} = useBaseTable();
  const [cash, setCash] = useState<CashState>({
    sum: 0,
    payments: [],
    totalSpent: 0,
    remaining: 0,
  });

  useEffect(() => {
    if (baseTable) {
      const totalSpent = Array.isArray(baseTable.payments)
        ? baseTable.payments.reduce((acc, payment) => acc + payment.amount, 0)
        : 0;

      const remainingAmount = baseTable.sum - totalSpent;

      setCash({
        sum: baseTable.sum,
        payments: baseTable.payments || [],
        totalSpent: totalSpent,
        remaining: remainingAmount,
      });
    }
  }, [baseTable]);

  return (
    <BaseTable
      sum={cash.sum}
      payments={cash.payments}
      remaining={cash.remaining}
    />
  );
};

export default Tables;

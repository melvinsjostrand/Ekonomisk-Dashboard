import { useEffect, useState } from "react";
import BaseTable from "../BaseTable";
import useBaseTable from "../hooks/UseBaseTable";
import { pay } from "../hooks/UseBaseTable";

const Tables = () => {
  const { data: baseTable, isLoading, error } = useBaseTable();
  const [cash, setCash] = useState<CashState>({
    sum: 0,
    payments: [],
    totalSpent: 0,
    remaining: 0,
  });

  useEffect(() => {
    if (baseTable) {
      const totalSpent = baseTable.payments.reduce(
        (acc, payment) => acc + payment.amount,
        0
      );
      const remainingAmount = baseTable.sum - totalSpent;

      setCash({
        sum: baseTable.sum,
        payments: baseTable.payments,
        totalSpent: totalSpent,
        remaining: remainingAmount,
      });
    }
  }, [baseTable]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

  return (
<div></div>
  );
};

export default Tables;

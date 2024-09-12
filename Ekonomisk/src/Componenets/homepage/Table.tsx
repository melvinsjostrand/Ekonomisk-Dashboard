import { useEffect, useState } from "react";
import BaseTable from "../BaseTable";
import sharedData from "../hooks/data";
import { pay } from "../BaseTable";

interface Props {
  sum: number;
  payments: pay[];
  remaining: number;
}

const Tables = ({ sum, payments }: Props) => {
  const [cash, setCash] = useState({
    ...sharedData,
    totalSpent: 0,
    remaining: 0,
  });

  useEffect(() => {
    const totalSpent = sharedData.payment.reduce(
      (acc, payment) => acc + payment.amount,
      0
    );
    const remainingAmount = sharedData.sum - totalSpent;

    setCash((prevState) => ({
      ...prevState,
      totalSpent: totalSpent,
      remaining: remainingAmount,
    }));
  }, [sharedData.payment, sharedData.sum]);

  return (
    <BaseTable
      sum={sum}
      payments={payments}
      remaining={cash.remaining}
    />
  );
};

export default Tables;

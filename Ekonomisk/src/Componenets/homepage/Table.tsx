import { useEffect, useState } from "react";
import BaseTable from "../BaseTable";
import { Expense } from "../hooks/Inferfaces";

const Tables = ({
  income,
  expenses,
}: {
  income: number;
  expenses: Expense[];
}) => {
  const [cash, setCash] = useState({
    totalSpent: 0,
    remaining: 0,
  });
  const [payments] = useState<Expense[]>(expenses);
  useEffect(() => {
    if (expenses) {
      const totalSpent = Array.isArray(expenses)
        ? expenses.reduce((acc, payment) => acc + payment.amount, 0)
        : 0;

      const remainingAmount = income - totalSpent;

      setCash({
        totalSpent: totalSpent,
        remaining: remainingAmount,
      });
    }
  }, [expenses]);

  return (
    <BaseTable
      income={income}
      payments={payments}
      remaining={cash.remaining}
      userId={0}
      id={0}
    />
  );
};

export default Tables;

import { useEffect, useState } from "react";
import BaseTable from "../BaseTable";
import { Expense } from "../hooks/UseBaseTable";
import { pay } from "../hooks/UseBaseTable";

const Tables = ({income,Table}: {income:number , Table: Expense[]}) => {
  const [cash, setCash] = useState({
    totalSpent: 0,
    remaining: 0,
  });
  const [payments] = useState<pay[]>(Table);
  useEffect(() => {
    if (Table) {
      const totalSpent = Array.isArray(Table)
        ? Table.reduce((acc, payment) => acc + payment.amount, 0)
        : 0;

      const remainingAmount = income - totalSpent;

      setCash({
        totalSpent: totalSpent,
        remaining: remainingAmount,
      });
    }
  }, [Table]);

  return (
    <BaseTable
      income={income}
      payments={payments}
      remaining={cash.remaining} 
      userId={0} 
      id={0}/>
  );
};

export default Tables;

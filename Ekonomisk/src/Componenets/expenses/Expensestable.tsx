import { useEffect, useState } from "react";
import BaseTable from "../BaseTable";
import ChangeValue from "./ChangeValue";
import { Button, Hide, Text } from "@chakra-ui/react";
import { Expense } from "../hooks/Inferfaces";



const Expensestables = ({
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
const [payments, setPayments] = useState<Expense[]>(expenses);

  useEffect(() => {
    if (expenses) {
      const totalSpent = expenses.reduce(
        (acc, payment) => acc + payment.amount,
        0
      );
      const remainingAmount = income - totalSpent;
      setCash({ totalSpent, remaining: remainingAmount });
      setPayments(expenses);
    }
  }, [income, expenses]);

  const handleSave = (category: string, newAmount: number) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.category === category
          ? { ...payment, amount: newAmount }
          : payment
      )
    );

    const totalSpent = payments.reduce(
      (acc, payment) =>
        payment.category === category ? acc + newAmount : acc + payment.amount,
      0
    );
    const remainingAmount = income  - totalSpent;
    setCash({ totalSpent, remaining: remainingAmount });
  };

  return (
    <>
      <BaseTable
        income={income || 0}
        payments={payments}
        remaining={cash.remaining}
        renderExtraColumn={(payment) => (
          <>
            <ChangeValue
              category={payment.category}
              amount={payment.amount}
              onSave={(newAmount) => handleSave(payment.category, newAmount)}
            />
            <Button>Remove</Button>
          </>
        )}
        userId={0}
        id={0}
      />
      <Hide above="lg">
        <Text px={2}>
          If you want to remove expenses you need to be on a Computer
        </Text>
      </Hide>
    </>
  );
};

export default Expensestables;

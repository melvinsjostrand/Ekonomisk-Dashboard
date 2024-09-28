import { useEffect, useState } from "react";
import BaseTable from "../BaseTable";
import ChangeValue from "./ChangeValue";
import { Button, Hide, Text } from "@chakra-ui/react";
import { pay } from "../hooks/UseBaseTable";
import UseExpense from "../hooks/UseExpense";

const Expensestables = () => {
  const { data} = UseExpense();
  const [cash, setCash] = useState({
    totalSpent: 0,
    remaining: 0,
  });
  const [payments, setPayments] = useState<pay[]>([]);

  useEffect(() => {
    if (data && data.payments) {
      const totalSpent = data.payments.reduce(
        (acc, payment) => acc + payment.amount,
        0
      );
      const remainingAmount = data.sum - totalSpent;
      setCash({ totalSpent, remaining: remainingAmount });
      setPayments(data.payments);
    }
  }, [data]);

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
    const remainingAmount = data?.sum ? data.sum - totalSpent : 0;
    setCash({ totalSpent, remaining: remainingAmount });
  };


  return (
    <>
      <BaseTable
        sum={data?.sum || 0}
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

import { useEffect, useState } from "react";
import BaseTable from "../BaseTable";
import ChangeValue from "./ChangeValue";
import { Button, Hide, Text} from "@chakra-ui/react";
import { pay } from "../hooks/UseBaseTable";
import UseExpense from "../hooks/UseExpense";

interface Props {
  sum: number;
  payments: pay[];
  remaining: number;
}

const Expensestables = ({  }: Props) => {
  const { data, isLoading, error} = UseExpense();
  const [cash, setCash] = useState({
    totalSpent: 0, 
    remaining: 0, 
  });

  useEffect(() => {
    if (data && data.payments) {
      const totalSpent = data.payments.reduce(
        (acc, payment) => acc + payment.amount,
        0
      );
      const remainingAmount = data.sum - totalSpent;
      setCash((prevState) => ({
        ...prevState,
        totalSpent: totalSpent,
        remaining: remainingAmount,
    }));
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <BaseTable
        sum={data?.sum || 0}
        payments={data?.payments || []}
        remaining={cash.remaining}
        renderExtraColumn={(payment) => (
          <>
            <ChangeValue category={payment.category} />
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

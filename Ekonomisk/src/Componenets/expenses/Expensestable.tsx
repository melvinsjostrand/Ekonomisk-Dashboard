import { useEffect, useState } from "react";
import BaseTable from "../BaseTable";
import ChangeValue from "./ChangeValue";
import { Button} from "@chakra-ui/react";
import sharedData from "../hooks/data";
import { pay } from "../BaseTable";

interface Props {
  sum: number;
  payments: pay[];
  remaining: number;
}

const Expensestables = ({ sum, payments }: Props) => {
  const [cash, setCash] = useState({
    ...sharedData, // Initial copy of sharedData
    totalSpent: 0, // This will be calculated
    remaining: 0, // This will be calculated
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
    <>
      <BaseTable
        sum={sum}
        payments={payments}
        remaining={cash.remaining}
        renderExtraColumn={(payment) => (
          <>
            <ChangeValue category={payment.category} />
            <Button>Remove</Button>
          </>
        )}
      />
    </>
  );
};

export default Expensestables;

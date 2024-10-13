import { useEffect, useState } from "react";
import BaseTable from "../BaseTable";
import ChangeValue from "./ChangeValue";
import { Button, Hide, Text, useToast } from "@chakra-ui/react";
import { Expense } from "../hooks/Inferfaces";
import DeleteExpense from "../hooks/DeleteExpense";
import useUserId from "../hooks/UseGetUser";

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
  const Guid = localStorage.getItem("Guid");
  const { mutate: deleteExpense } = DeleteExpense(); // Initialize delete mutation
  const toast = useToast(); // For showing notifications

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


    const handleRemove = (expenseId: number) => {
      if(!Guid){
        toast({
          title:"error",
          status:"error",
          duration:3000,
          isClosable:true
        })
      }
      if (window.confirm("Are you sure you want to remove this expense?")) {
        deleteExpense(expenseId, {
          onSuccess: () => {
            window.location.reload();
            setPayments((prevPayments) =>
              prevPayments.filter((payment) => payment.expenseId !== expenseId)
            );
            toast({
              title: "Expense deleted.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          },
          onError: (error) => {
            toast({
              title: "Error deleting expense.",
              description: error?.message || "Something went wrong.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          },
        });
      }
    };
  return (
    <>
      <BaseTable
        income={income || 0}
        payments={payments}
        remaining={cash.remaining}
        renderExtraColumn={(payment) => (
          <>
            <ChangeValue id={payment.expenseId} amount={payment.amount} />
            <Button
              colorScheme="red"
              onClick={() => handleRemove(payment.expenseId)}
            >
              Remove
            </Button>
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

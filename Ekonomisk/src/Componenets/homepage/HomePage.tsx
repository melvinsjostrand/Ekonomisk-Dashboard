import { Grid, GridItem, Text } from "@chakra-ui/react";
import Tables from "./Table";
import { useEffect, useState } from "react";
import Savings from "./Savings";
import UseExpenses from "../hooks/UseExpense";
import PieChart from "./PieChart";
import useUserId from "../hooks/UseGetUser";

const HomePage = () => {
  const { data : userId} = useUserId();
  const { data } = UseExpenses(userId);
  const income = data?.income.income || 0;
  const Guid = localStorage.getItem("Guid");
  const expenses = data?.expenses || [];
  const [cash, setCash] = useState({
    totalSpent: 0,
    remaining: 0,
  });

  useEffect(() => {
    if (data && expenses && income !== undefined) {
      const totalSpent = expenses.reduce(
        (acc, payment) => acc + payment.amount,
        0
      );
      const remaining = income - totalSpent;

      setCash({
        totalSpent: totalSpent,
        remaining: remaining,
      });
    }
  }, [data]);

  return (
    <Grid
      templateAreas={{
        base: `'nav' 'main' 'aside'`,
        lg: `'nav nav' 'main aside'`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "3fr 1fr",
      }}
    >
      <GridItem area="aside">
        <Savings />
        <PieChart expenses={expenses}></PieChart>
      </GridItem>
      <GridItem area="main">
        {Guid && data && <Tables expenses={expenses} income={income} />}
        {cash.remaining < 0 && (
          <Text color="red.500" textAlign="center">
            Error: You have spent more than your budget!
          </Text>
        )}
      </GridItem>
    </Grid>
  );
};

export default HomePage;

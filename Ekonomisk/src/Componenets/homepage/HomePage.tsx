import { Grid, GridItem, Text } from "@chakra-ui/react";
import Tables from "./Table";
import { useEffect, useState } from "react";
import Savings from "./Savings";
import UseHomepage from "../hooks/UseHomepage";

const HomePage = () => {
  const {data} = UseHomepage();
  const income = data?.income.income || 0;
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
      </GridItem>
      <GridItem area="main">
        {data && <Tables Table={expenses} income={income} />}
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

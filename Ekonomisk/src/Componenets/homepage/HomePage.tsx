import { Box, Grid, GridItem, Show, Text } from "@chakra-ui/react";
import NavBar from "../NavBar";
import Tables from "./Table";
import PieChart from "./PieChart";
import { useEffect, useState } from "react";
import { Progress } from "@chakra-ui/react";
import Savings from "./Savings";

const HomePage = () => {
  const [cash, setCash] = useState({
    sum: 3000,
    payment: [
      { category: "Transport", amount: 200 },
      { category: "Mat och dagligvaror", amount: 300 },
      { category: "Hälsa och välmående", amount: 400 },
      { category: "Kläder och accessoarer", amount: 90 },
      { category: "Fritid och underhållning", amount: 42 },
      { category: "Kläder och accessoarer", amount: 40 },
    ],
    totalSpent: 0,
    remaining: 0,
    saveGoal:4000,
  });

  const [error, setError] = useState<string | null>(null);
  const [save, setSave] = useState({
    userId: 1,
    userName: "Dan Abrahmov",
    Saving: 5500,
  });

  useEffect(() => {
    const totalSpent = cash.payment.reduce(
      (acc, payment) => acc + payment.amount,
      0
    );
    const remaining = cash.sum - totalSpent;

    setCash((prevState) => ({
      ...prevState,
      totalSpent: totalSpent,
      remaining: remaining,
    }));

    if (remaining < 0)
      return setError("Error: You have spent more than your budget!");
  }, [cash.payment, cash.sum]);


  return (
    <>
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
        <GridItem area="nav">
          <NavBar />
        </GridItem>
        <GridItem area="aside">
          <Savings
            userName={save.userName}
            totalSaved={save.Saving}
            saveGoal={cash.saveGoal}
            payments={cash.payment}
          />
        </GridItem>
        <GridItem area="main">
          <Tables
            sum={cash.sum}
            payments={cash.payment}
            remaining={cash.remaining}
            totalSpent={cash.totalSpent}
            saveGaol={cash.saveGoal}
          />
          {error && (
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
          )}
        </GridItem>
      </Grid>
    </>
  );
};

export default HomePage;

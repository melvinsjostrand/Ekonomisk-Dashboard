import { Grid, GridItem, Text } from "@chakra-ui/react";
import Tables from "./Table";
import { useEffect, useState } from "react";
import User from "../hooks/user";
import Savings from "./Savings";
import sharedData from "../hooks/data";

const HomePage = () => {
  console.log(sharedData);
  const [error, setError] = useState<string | null>(null);

  const [cash, setCash] = useState({
    ...sharedData,
    totalSpent: 0,
    remaining: 0,
  });

  useEffect(() => {
    const totalSpent = sharedData.payment.reduce(
      (acc, payment) => acc + payment.amount,
      0
    );
    const remaining = sharedData.sum - totalSpent;

    setCash((prevState) => ({
      ...prevState,
      totalSpent: totalSpent,
      remaining: remaining,
    }));

    if (remaining < 0)
      return setError("Error: You have spent more than your budget!");
  }, [sharedData.payment, sharedData.sum]);

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
        <GridItem area="aside">
          <Savings
            saveGoal={sharedData.saveGoal}
            payments={sharedData.payment}
            prevsave={4000}
            userName={User[0].name}
            totalSaved={User[0].totalSaving}
          />
        </GridItem>
        <GridItem area="main">
          <Tables
            sum={sharedData.sum}
            payments={sharedData.payment}
            remaining={sharedData.remaining}
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

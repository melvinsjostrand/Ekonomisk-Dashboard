import {Grid, GridItem,Text } from "@chakra-ui/react";
import NavBar from "../Nav/NavBar";
import Tables from "./Table";
import { useEffect, useState } from "react";

import Savings from "./Savings";
import sharedData from "../hooks/data";

const HomePage = () => {

  const [error, setError] = useState<string | null>(null);
  const [save, setSave] = useState({
    userId: 1,
    userName: "Dan Abrahmov",
    Saving: 5500,
  });

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
        <GridItem area="nav">
          <NavBar />
        </GridItem>
        <GridItem area="aside">
          <Savings
            userName={save.userName}
            totalSaved={save.Saving}
            saveGoal={sharedData.saveGoal}
            payments={sharedData.payment} 
            prevsave={4000}         />
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

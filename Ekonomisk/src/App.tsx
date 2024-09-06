import { Box, Center, Grid, GridItem, Show, Text } from "@chakra-ui/react";
import NavBar from "./Componenets/NavBar";
import PieChart from "./Componenets/PieChart";
import Tables from "./Componenets/homepage/Table";
import { useEffect, useState } from "react";

function App() {
  const [cash, setCash] = useState({
    sum: 3000,
    payment: [
      { category: "Boende", amount: 100 },
      { category: "Transport", amount: 200 },
      { category: "Mat och dagligvaror", amount: 300 },
      { category: "Hälsa och välmående", amount: 400 },
      { category: "Kläder och accessoarer", amount: 11940 },
      { category: "Fritid och underhållning", amount: 42 },
      { category: "Kläder och accessoarer", amount: 40 },
    ],
    totalSpent: 0,
    remaining: 0,
  });


  const [error, setError] = useState<string | null>(null);
  const [save, setSave] = useState({
    userId: 1,
    userName: 'Dan Abrahmov',
    Saving: 200,
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

    if(remaining < 0) return setError("Error: You have spent more than your budget!");
  }, [cash.payment, cash.sum]);
  return (
    <>
      <Grid
        templateAreas={{
          base: `'nav' 'main'`,
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
        <Show above="lg">
          <GridItem area="aside">
            <Box border="1px" borderColor="gray.200">
              <Text textAlign='center'>Dan Abrahmov </Text>
              <Text textAlign="center">Total saved : {save.Saving}</Text>
            </Box>
            <PieChart payments={cash.payment} />
          </GridItem>
        </Show>
        <GridItem area="main">
          <Tables
            sum={cash.sum}
            payments={cash.payment}
            remaining={cash.remaining}
            totalSpent={cash.totalSpent}
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
}

export default App;

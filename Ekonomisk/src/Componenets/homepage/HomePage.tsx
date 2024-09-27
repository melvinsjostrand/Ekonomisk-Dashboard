import { Grid, GridItem, Text } from "@chakra-ui/react";
import Tables from "./Table";
import { useEffect, useState } from "react";
import Savings from "./Savings";
import useBaseTable from "../hooks/UseBaseTable";

const HomePage = () => {
  const { data: BaseTable} = useBaseTable(); 
  const [cash, setCash] = useState({
    totalSpent: 0,
    remaining: 0,
  });

useEffect(() => {
  if (BaseTable && BaseTable.payments && BaseTable.sum !== undefined) {
    const totalSpent = BaseTable.payments.reduce(
      (acc, payment) => acc + payment.amount,
      0
    );
    const remaining = BaseTable.sum - totalSpent;

    setCash({
      totalSpent: totalSpent,
      remaining: remaining,
    });
  }
}, [BaseTable]);

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
        <Savings/>
      </GridItem>
      <GridItem area="main">
        <Tables/>
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

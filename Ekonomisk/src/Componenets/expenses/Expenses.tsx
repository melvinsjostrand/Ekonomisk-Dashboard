import { useState } from "react";
import Expensestables from "./Expensestable";
import sharedData from "../hooks/data";
import { Button, Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../Nav/NavBar";
import Sorting from "./Sorting";
import MaxSpent from "./MaxSpent";
import User from "../hooks/user";
import AddExpenses from "./AddExpenses";

const Expenses = () => {
  const [sortOrder, setSortOrder] = useState<string>("");
  const filteredPayments = sortOrder
    ? sharedData.payment.filter((payment) => payment.category === sortOrder)
    : sharedData.payment;
  const userLimits = User[0]?.Limits ?? {};
  console.log(sharedData);
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
          <MaxSpent
            spending={sharedData.payment}
            limits={userLimits}
          ></MaxSpent>
        </GridItem>
        <GridItem area="main">
          <Sorting
            sortOrder={sortOrder}
            onSelectSortOrder={(order) => setSortOrder(order)}
          />
          <AddExpenses />
          <Expensestables
            sum={sharedData.sum}
            payments={filteredPayments}
            remaining={sharedData.remaining}
          />
        </GridItem>
      </Grid>
    </>
  );
};

export default Expenses;

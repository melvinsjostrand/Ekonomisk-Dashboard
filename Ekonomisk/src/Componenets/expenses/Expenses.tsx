import { useState } from "react";
import Expensestables from "./Expensestable";
import {Grid, GridItem } from "@chakra-ui/react";
import Sorting from "./Sorting";
import MaxSpent from "./MaxSpent";
import AddExpenses from "./AddExpenses";
import UseExpenses from "../hooks/UseExpense";

const Expenses = () => {
  const [sortOrder, setSortOrder] = useState<string>("");

  const { data } = UseExpenses();

  const income = data?.income.income || 0; // default to 0 if not available
  const expenses = data?.expenses || []; // default to empty array if not available

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
          <MaxSpent expenses={expenses} />
        </GridItem>
        <GridItem area="main">
          <Sorting
            sortOrder={sortOrder}
            onSelectSortOrder={(order) => setSortOrder(order)}
          />
          <AddExpenses />
          {data && <Expensestables expenses={expenses} income={income} />}
        </GridItem>
      </Grid>
    </>
  );
};

export default Expenses;

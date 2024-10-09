import { useMemo, useState } from "react";
import Expensestables from "./Expensestable";
import {Grid, GridItem } from "@chakra-ui/react";
import Sorting from "./Sorting";
import MaxSpent from "./MaxSpent";
import AddExpenses from "./AddExpenses";
import UseExpenses from "../hooks/UseExpense";

const Expenses = () => {
  const [sortOrder, setSortOrder] = useState<string>("");

  const { data } = UseExpenses();
  const income = data?.income.income || 0;
  const expenses = data?.expenses || [];
  
  const sortedExpenses = useMemo(() => {
    if (!sortOrder) return expenses; // Default: show all expenses

    return expenses.filter((expense) => expense.category === sortOrder);
  }, [expenses, sortOrder]);
  
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
          {data && <Expensestables expenses={sortedExpenses} income={income} />}
        </GridItem>
      </Grid>
    </>
  );
};

export default Expenses;

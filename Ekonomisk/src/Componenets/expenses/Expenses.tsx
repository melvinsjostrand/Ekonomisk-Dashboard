import { useMemo, useState } from "react";
import Expensestables from "./Expensestable";
import {Grid, GridItem, HStack } from "@chakra-ui/react";
import Sorting from "./Sorting";
import MaxSpent from "./MaxSpent";
import AddExpenses from "./AddExpenses";
import UseExpenses from "../hooks/UseExpense";
import PriceSorting from "./PriceSorting";
import useUserId from "../hooks/UseGetUser";

const Expenses = () => {
  const [categorySortOrder, setCategorySortOrder] = useState<string>("");
  const [priceSortOrder, setPriceSortOrder] = useState<string | null>(null);

  const { data : userId} = useUserId();
  const { data } = UseExpenses(userId);
  const income = data?.income.income || 0;
  const expenses = data?.expenses || [];
  
  
  const sortedExpenses = useMemo(() => {
    let filteredExpenses = expenses;

    if (categorySortOrder) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.category === categorySortOrder
      );
    }

    if (priceSortOrder !== null) {
      filteredExpenses = filteredExpenses.sort((a, b) => {
        if (priceSortOrder === "highest") {
          return b.amount - a.amount;
        } else if (priceSortOrder === "lowest") {
          return a.amount - b.amount; 
        }
        return 0; 
      });
    }

    return filteredExpenses;
  }, [expenses, categorySortOrder, priceSortOrder]);


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
          <HStack spacing={2}>
            <PriceSorting onSelectSortOrder={setPriceSortOrder}></PriceSorting>
            <Sorting
              sortOrder={categorySortOrder}
              onSelectSortOrder={setCategorySortOrder}
            />
          </HStack>
          <AddExpenses />
          {data && <Expensestables expenses={sortedExpenses} income={income} />}
        </GridItem>
      </Grid>
    </>
  );
};

export default Expenses;

import { useState } from "react";
import Expensestables from "./Expensestable";
import { Button, Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../Nav/NavBar";
import Sorting from "./Sorting";
import MaxSpent from "./MaxSpent";
import AddExpenses from "./AddExpenses";
import UseExpense from "../hooks/UseExpense";
import UseLimits from "../hooks/UseLimits";

const Expenses = () => {
  const [sortOrder, setSortOrder] = useState<string>("");

  const {
    data: useExpense,isLoading: paymentsLoading,error: paymentsError,
  } = UseExpense();
  const {
    data: userLimitsData,
    isLoading: limitsLoading,
    error: limitsError,
  } = UseLimits();

  if (paymentsLoading || limitsLoading) return <div>Loading...</div>;
  if (paymentsError || limitsError) return <div>Error loading data</div>;


    const filteredPayments = sortOrder
      ? useExpense?.payments?.filter(
          (payment: { category: string }) => payment.category === sortOrder
        ) || []
      : useExpense?.payments || [];


  const userLimits = userLimitsData?.limits ?? [];

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
          <MaxSpent/>
        </GridItem>
        <GridItem area="main">
          <Sorting
            sortOrder={sortOrder}
            onSelectSortOrder={(order) => setSortOrder(order)}
          />
          <AddExpenses />
          <Expensestables
            sum={useExpense?.sum || 0}
            payments={filteredPayments}
            remaining={useExpense?.remaining || 0}
          />
        </GridItem>
      </Grid>
    </>
  );
};

export default Expenses;

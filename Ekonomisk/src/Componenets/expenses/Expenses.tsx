import { useState } from 'react'
import Expensestables from './Expensestable';
import sharedData from '../hooks/data';
import { Grid, GridItem } from '@chakra-ui/react';
import NavBar from '../NavBar';
import Sorting from './Sorting';




const Expenses = () => {
  const [sortOrder, setSortOrder] = useState<string>("");
  const filteredPayments = sortOrder
    ? sharedData.payment.filter((payment) => payment.category === sortOrder)
    : sharedData.payment;

  console.log(sharedData);
  return (
    <>
      <Grid
        templateAreas={{
          base: `'nav''aside' 'main' `,
        }}
      >
        <GridItem area="nav">
          <NavBar />
        </GridItem>
        <GridItem area="aside">
          <Sorting
            sortOrder={sortOrder}
            onSelectSortOrder={(order) => setSortOrder(order)}
          />
        </GridItem>
        <GridItem area="main">
          <Expensestables
            sum={sharedData.sum}
            payments={filteredPayments}
            remaining={sharedData.remaining}
          />
        </GridItem>
      </Grid>
    </>
  );
}

export default Expenses
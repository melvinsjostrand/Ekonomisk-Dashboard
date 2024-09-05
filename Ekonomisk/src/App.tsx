import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./Componenets/NavBar";

function App() {
  return (
    <>
      <Grid
        templateAreas={{
          base: `'nav' 'main' 'aside'`,
          lg: `'nav nav' 'main aside'`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "3fr 2fr",
        }}
      >
        <GridItem area="nav" bg="coral">
          <NavBar />
        </GridItem>
          <GridItem area="aside" bg="gold">
            Aside
          </GridItem>
        <GridItem area="main" bg="gray">
          Main
        </GridItem>
      </Grid>
    </>
  );
}

export default App;

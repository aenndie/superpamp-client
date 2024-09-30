import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { WalletProvider } from "./state_management/contexts/walletContext";

function App() {
  return (
    <WalletProvider>
      <Grid
        templateAreas={{
          base: ` "nav" "main"`,
          lg: ` "nav nav" "aside main"`,
        }}
      >
        <GridItem area='nav'>
          <NavBar></NavBar>
        </GridItem>
        <Show above='lg'>
          <GridItem area='aside'>Aside</GridItem>
        </Show>
        <GridItem area='main'>
          <Outlet></Outlet>
        </GridItem>
      </Grid>
    </WalletProvider>
  );
}

export default App;

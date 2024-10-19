import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { Outlet, useSearchParams } from "react-router-dom";
import { WalletProvider } from "./state_management/contexts/walletContext";
import { useEffect } from "react";
import Cookies from "js-cookie";

function App() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const refValue = searchParams.get("ref");

    console.log("App.... ref = ", refValue);
    if (refValue) {
      Cookies.set("RefCookie", refValue, { expires: 30 });
    }
  }, []);

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
          <GridItem area='aside'></GridItem>
        </Show>
        <GridItem area='main'>
          <Outlet></Outlet>
        </GridItem>
      </Grid>
    </WalletProvider>
  );
}

export default App;

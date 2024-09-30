import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
// import App from "./App.js"; <App />
import "./index.css";
import theme from "./theme";
import { RouterProvider } from "react-router-dom";
import router from "./routing/routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router}></RouterProvider>
    </ChakraProvider>
  </StrictMode>
);

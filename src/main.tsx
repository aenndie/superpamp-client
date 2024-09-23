import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.js";
import "bootstrap/dist/css/bootstrap.css";

const connectButton = document.createElement("radix-connect-button");
const header = document.querySelector("header")!;
header.appendChild(connectButton);

//

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>
);

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TokenGrid from "../components/TokenGrid";
import { Text } from "@chakra-ui/react";
import TokenDetail from "../components/TokenDetail";
import UserDetail from "../components/UserDetail";

const router = createBrowserRouter([
  {
    path: "",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <TokenGrid></TokenGrid>,
      },
      {
        path: "/test",
        element: <Text>Test</Text>,
      },
      {
        path: "/token/:address",
        element: <TokenDetail></TokenDetail>,
      },
      {
        path: "/user/:userid",
        element: <UserDetail></UserDetail>,
      },
    ],
  },
]);

export default router;

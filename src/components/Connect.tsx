import { useEffect } from "react";
// import { rdt } from "../radix/dapp_toolkit";
import { boostCodes } from "../Gateway/boost-tickets";
import { Button } from "@chakra-ui/react";

export default function Connect() {
  useEffect(() => {
    console.log("rdt.buttonApi.setTheme(black);");
    // rdt.buttonApi.setTheme("black");
  }, [boostCodes]);

  const htmlContent: string = "<radix-connect-button>";

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <Button>{boostCodes}</Button>
    </>
  );
}

import { useEffect } from "react";
import { rdt } from "../radix/dapp_toolkit";

export default function Connect() {
  useEffect(() => {
    console.log("rdt.buttonApi.setTheme(black);");
    rdt.buttonApi.setTheme("black");
  }, []);

  const htmlContent: string = "<radix-connect-button>";

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

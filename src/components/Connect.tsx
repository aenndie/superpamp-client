import { useEffect } from "react";
import { rdt } from "../radix/dapp_toolkit";

export default function Connect() {
  useEffect(() => {
    rdt.buttonApi.setTheme("black");
  }, []);

  const htmlContent: string = "<radix-connect-button>";

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

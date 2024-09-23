import { useEffect } from "react";

import {
  DataRequestBuilder,
  RadixDappToolkit,
  RadixNetwork,
  Logger,
} from "@radixdlt/radix-dapp-toolkit";

function Connect() {
  useEffect(() => {
    const rdt = RadixDappToolkit({
      dAppDefinitionAddress:
        "account_tdx_2_1289j28l5rmc72se9fq9r9x9qua0fcqdr3em0epjudn603yzssqglhe",
      networkId: RadixNetwork.Stokenet,
      applicationName: "Pyros World",
      applicationVersion: "1.0.0",
      // gatewayBaseUrl: GATEWAY_API_URL,
      logger: Logger(2),
    });

    console.log("set theme black");
    rdt.buttonApi.setTheme("black");

    rdt.walletApi.setRequestData(
      DataRequestBuilder.persona(),
      DataRequestBuilder.accounts().exactly(1)
    );
  }, []);

  const htmlContent: string = "<radix-connect-button>";

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default Connect;

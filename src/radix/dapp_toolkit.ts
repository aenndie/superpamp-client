console.log(
  "dapp_toolkit.ts--------------------------------------------------------------"
);
import { DAPP_DEFINITION_ADDRESS, NETWORK_ID } from "./config";

import {
  RadixDappToolkit,
  Logger,
  DataRequestBuilder,
} from "@radixdlt/radix-dapp-toolkit";

export const rdt = RadixDappToolkit({
  dAppDefinitionAddress: DAPP_DEFINITION_ADDRESS,
  networkId: NETWORK_ID,
  applicationName: "Pumpix",
  applicationVersion: "0.0.1",
  logger: Logger(2),
});

export var account = "";

rdt.walletApi.setRequestData(
  DataRequestBuilder.persona(),
  DataRequestBuilder.accounts().exactly(1)
);

rdt.walletApi.walletData$.subscribe((walletData) => {
  account = walletData.accounts[0].address;
});

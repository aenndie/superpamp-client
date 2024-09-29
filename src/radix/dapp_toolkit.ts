console.log(
  "dapp_toolkit.ts--------------------------------------------------------------"
);
import { getBoostTickets } from "../Gateway/boost-tickets";
import { DAPP_DEFINITION_ADDRESS, NETWORK_ID } from "./config";

import {
  RadixDappToolkit,
  Logger,
  DataRequestBuilder,
} from "@radixdlt/radix-dapp-toolkit";

export let selectedAccount: string;

export const rdt = RadixDappToolkit({
  dAppDefinitionAddress: DAPP_DEFINITION_ADDRESS,
  networkId: NETWORK_ID,
  applicationName: "Pumpix",
  applicationVersion: "0.0.1",
  logger: Logger(2),
});

console.log("rdt.walletApi.setRequestData(");
rdt.walletApi.setRequestData(
  DataRequestBuilder.persona(),
  DataRequestBuilder.accounts().exactly(1)
);

rdt.walletApi.walletData$.subscribe((walletData) => {
  console.log("rdt.walletApi.walletData$.subscribe((walletData) => {");
  selectedAccount = walletData.accounts[0].address;
});

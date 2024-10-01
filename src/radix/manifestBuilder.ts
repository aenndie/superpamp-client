import { rdt } from "./dapp_toolkit";

export async function sendTransactionManifest(manifest: string) {
  console.log("sendTransactionManifest>>sending...");

  console.log(manifest);

  const result = await rdt.walletApi.sendTransaction({
    transactionManifest: manifest,
    version: 1,
  });

  console.log("transaction was sent", result);

  if (result.isErr()) {
    console.log("error while sending");
    throw result.error;
  } else {
    console.log("sent successfully");
  }

  return !result.isErr();
}

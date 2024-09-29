import { Token } from "../hooks/useTokens";
import { sendTransactionManifest } from "../radix/manifestBuilder";
import { selectedAccount } from "../radix/dapp_toolkit";
import { XRD } from "../radix/config";
import { get_price } from "../hooks/useTokens";

const buy_manifest_template = `
CALL_METHOD
  Address("@@account@@")
  "withdraw"
  Address("@@resource_address@@")
  Decimal("@@amount_xrd@@")
;
TAKE_ALL_FROM_WORKTOP
  Address("@@resource_address@@")
  Bucket("xrd_bucket")
;
CALL_METHOD
  Address("@@component_address@@")
  "@@buy_sell@@"
  Decimal("@@amount_token@@")
  Bucket("xrd_bucket")
  ""
;
CALL_METHOD
  Address("@@account@@")
  "deposit_batch"
  Expression("ENTIRE_WORKTOP")
;
`;

export async function buy(token: Token, amount_token: number) {
  // TEMP: set values
  let amount_xrd = get_price(true, token.netSold, amount_token);

  console.log("amount_xrd = ", amount_xrd);
  console.log("amount_token = ", amount_token);
  console.log("netsold = ", token.netSold);
  console.log("componentaddress = ", token.componentAddress);

  //let resource_address = token.resource_address();

  var manifest = buy_manifest_template
    .replace(new RegExp("@@account@@", "g"), selectedAccount)
    .replace(new RegExp("@@resource_address@@", "g"), XRD)
    .replace(new RegExp("@@component_address@@", "g"), token.componentAddress)
    .replace(new RegExp("@@buy_sell@@", "g"), "buy")
    .replace(
      new RegExp("@@amount_xrd@@", "g"),
      Number.isInteger(amount_xrd)
        ? amount_xrd.toFixed(1)
        : amount_xrd.toString()
    )
    .replace(
      new RegExp("@@amount_token@@", "g"),
      Number.isInteger(amount_token)
        ? amount_token.toFixed(1)
        : amount_token.toString()
    );

  console.log("send transaction for Manifest: ", manifest);
  // send transaction
  var succ = await sendTransactionManifest(manifest);

  if (succ) {
    // TODO
  }
}

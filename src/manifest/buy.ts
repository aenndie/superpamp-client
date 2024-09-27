import { Token } from "../hooks/useTokens";
import { sendTransactionManifest } from "../radix/manifestBuilder";
import { account } from "../radix/dapp_toolkit";
import { XRD } from "../radix/config";

const buy_manifest_template = `
CALL_METHOD
  Address("@@account@@")
  "withdraw"
  Address("@@XRD@@")
  Decimal("@@amount_xrd@@")
;
TAKE_ALL_FROM_WORKTOP
  Address("@@XRD@@")
  Bucket("xrd_bucket")
;
CALL_METHOD
  Address("@@component@@")
  "buy"
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

function get_price(net_sold: number, amount_token: number): number {
  return (amount_token + net_sold - net_sold) / 1000.0;
}

export async function buy(token: Token, amount_token: number) {
  // TEMP: set values
  token.net_sold = 0;
  token.component_address =
    "component_tdx_2_1cpqpfupgjx249ezd6uhltvs7lrssnv473d4tz20mvh3tfhf5vet37y";
  token.resource_address =
    "resource_tdx_2_1th52pl2km8v2eg8zalgpj9kgeda77tlldrm423fmzrcqcrd0d9pppk";
  let amount_xrd = get_price(token.net_sold, amount_token);

  console.log("amount_xrd = ", amount_xrd);

  //let resource_address = token.resource_address();

  var manifest = buy_manifest_template
    .replace(new RegExp("@@account@@", "g"), account)
    .replace(new RegExp("@@XRD@@", "g"), XRD)
    .replace(new RegExp("@@resource@@", "g"), token.resource_address)
    .replace(
      new RegExp("@@amount_xrd@@", "g"),
      Number.isInteger(amount_xrd)
        ? amount_xrd.toFixed(1)
        : amount_xrd.toString()
    )
    .replace(new RegExp("@@component@@", "g"), token.component_address)
    .replace(
      new RegExp("@@amount_token@@", "g"),
      Number.isInteger(amount_token)
        ? amount_xrd.toFixed(1)
        : amount_token.toString()
    );

  console.log("send transaction for Manifest: ", manifest);
  // send transaction
  var succ = await sendTransactionManifest(manifest);

  if (succ) {
    // TODO
  }
}

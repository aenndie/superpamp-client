import { Token } from "../hooks/useTokens";
import { sendTransactionManifest } from "../radix/manifestBuilder";
import { account } from "../radix/dapp_toolkit";

const sell_manifest_template = `CALL_METHOD
  Address("account_tdx_2_128gy7rj2h3s8chh2m3hjfhh3swgq7z2fhd7dajxf4eeejpfx8qvns9")
  "withdraw"
  Address("resource_tdx_2_1t5t8jc96j5qrtrv4pc36vm2xw5dq6nz5sjcyame63thmmz9kucty69")
  Decimal("1000.0")
;
TAKE_ALL_FROM_WORKTOP
    Address("resource_tdx_2_1t5t8jc96j5qrtrv4pc36vm2xw5dq6nz5sjcyame63thmmz9kucty69")
    Bucket("token_bucket")
;
CALL_METHOD
    Address("component_tdx_2_1cqtg960ngxs9sez3h3dp67gcrz9yxw52nx3j0afe5mdpun3n3dgca6")
    "sell"    
    Bucket("token_bucket")
    ""
;
CALL_METHOD
	Address("account_tdx_2_128gy7rj2h3s8chh2m3hjfhh3swgq7z2fhd7dajxf4eeejpfx8qvns9")
	"deposit_batch"
	Expression("ENTIRE_WORKTOP")
;    
`;

export async function sell(token: Token, amount_token: number) {
  var manifest = sell_manifest_template;
  /*
    .replace(new RegExp("@@account@@", "g"), account)
    .replace(new RegExp("@@resource_address@@", "g"), resource_address)
    .replace(new RegExp("@@component_address@@", "g"), token.componentAddress)
    .replace(new RegExp("@@buy_sell@@", "g"), buy_sell)
    .replace(
      new RegExp("@@amount_xrd@@", "g"),
      Number.isInteger(amount_xrd)
        ? amount_xrd.toFixed(1)
        : amount_xrd.toString()
    )
    .replace(
      new RegExp("@@amount_token@@", "g"),
      Number.isInteger(amount_token)
        ? amount_xrd.toFixed(1)
        : amount_token.toString()
    );
    */

  console.log("send transaction for Manifest: ", manifest);
  // send transaction
  var succ = await sendTransactionManifest(manifest);

  if (succ) {
    // TODO
  }
}

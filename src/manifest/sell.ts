import { Token } from "../hooks/useTokens";
import { selectedAccount } from "../radix/dapp_toolkit";
import { sendTransactionManifest } from "../radix/manifestBuilder";

const sell_manifest_template = `CALL_METHOD
  Address("@@account_address@@")
  "withdraw"
  Address("@@token_address@@")
  Decimal("@@amount_token@@")
;
TAKE_ALL_FROM_WORKTOP
    Address("@@token_address@@")
    Bucket("token_bucket")
;
CALL_METHOD
    Address("@@component_address@@")
    "sell"    
    Bucket("token_bucket")
    ""
;
CALL_METHOD
	Address("@@account_address@@")
	"deposit_batch"
	Expression("ENTIRE_WORKTOP")
;    
`;

export async function sell(token: Token, amount_token: number) {
  var manifest = sell_manifest_template
    .replace(new RegExp("@@account_address@@", "g"), selectedAccount)
    .replace(new RegExp("@@token_address@@", "g"), token.id)
    .replace(new RegExp("@@component_address@@", "g"), token.componentAddress)
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

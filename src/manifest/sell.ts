import { Token } from "../hooks/useTokens";
import { selectedAccount } from "../state_management/contexts/walletContext";
import { sendTransactionManifest } from "../radix/manifestBuilder";
import { USER_BADGE_RESOURCE_ADDRESS } from "../radix/config";
import { get_ref_param } from "../cookies/refcookie";

const sell_manifest_template = `CALL_METHOD
    Address("@@account_address@@")
    "create_proof_of_non_fungibles"
    Address("@@badge_address@@")
    Array<NonFungibleLocalId>(NonFungibleLocalId("@@user_id@@"));
POP_FROM_AUTH_ZONE Proof("proof");    
CALL_METHOD
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
    "sell_with_user"    
    Some(Proof("proof"))
    Bucket("token_bucket")
    @@referrer@@
;
CALL_METHOD
	Address("@@account_address@@")
	"deposit_batch"
	Expression("ENTIRE_WORKTOP")
;    
`;

export async function sell(userid: string, token: Token, amount_token: number) {
  let referrer = get_ref_param();

  var manifest = sell_manifest_template
    .replace(new RegExp("@@account_address@@", "g"), selectedAccount)
    .replace(new RegExp("@@user_id@@", "g"), userid)
    .replace(new RegExp("@@badge_address@@", "g"), USER_BADGE_RESOURCE_ADDRESS)
    .replace(new RegExp("@@token_address@@", "g"), token.id)
    .replace(new RegExp("@@component_address@@", "g"), token.componentAddress)
    .replace(new RegExp("@@referrer@@", "g"), referrer)
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
  }
}

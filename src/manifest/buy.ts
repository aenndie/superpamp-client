import { Token } from "../hooks/useTokens";
import { sendTransactionManifest } from "../radix/manifestBuilder";
import { selectedAccount } from "../state_management/contexts/walletContext";
import { USER_BADGE_RESOURCE_ADDRESS, XRD } from "../radix/config";
//import { get_price } from "../calculations";
import { get_ref_param } from "../cookies/refcookie";

const buy_manifest_template = `
CALL_METHOD
    Address("@@account_address@@")
    "create_proof_of_non_fungibles"
    Address("@@badge_address@@")
    Array<NonFungibleLocalId>(NonFungibleLocalId("@@user_id@@"));
POP_FROM_AUTH_ZONE Proof("proof");    
CALL_METHOD
  Address("@@account_address@@")
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
  "buy"
  Proof("proof")  
  Bucket("xrd_bucket")
  @@referrer@@
;
CALL_METHOD
  Address("@@account_address@@")
  "deposit_batch"
  Expression("ENTIRE_WORKTOP")
;
`;

export async function buy(userid: string, token: Token, amount_xrd: number) {
  // let amount_xrd = get_price(true, Number(token.tokenSold), amount_token);

  let referrer = get_ref_param();

  console.log("amount_xrd = ", amount_xrd);
  // console.log("amount_token = ", amount_token);
  console.log("tokenSold = ", token.tokenSold);
  console.log("componentaddress = ", token.componentAddress);
  console.log("referrer = ", referrer);

  var manifest = buy_manifest_template
    .replace(new RegExp("@@account_address@@", "g"), selectedAccount)
    .replace(new RegExp("@@user_id@@", "g"), userid)
    .replace(new RegExp("@@referrer@@", "g"), referrer)
    .replace(new RegExp("@@badge_address@@", "g"), USER_BADGE_RESOURCE_ADDRESS)
    .replace(new RegExp("@@resource_address@@", "g"), XRD)
    .replace(new RegExp("@@component_address@@", "g"), token.componentAddress)
    .replace(
      new RegExp("@@amount_xrd@@", "g"),
      Number.isInteger(amount_xrd)
        ? amount_xrd.toFixed(1)
        : amount_xrd.toString()
    );
  /*
    .replace(
      new RegExp("@@amount_token@@", "g"),
      Number.isInteger(amount_token)
        ? amount_token.toFixed(1)
        : amount_token.toString()
    );*/

  console.log("send transaction for Manifest: ", manifest);
  // send transaction
  var succ = await sendTransactionManifest(manifest);

  if (succ) {
  }
}

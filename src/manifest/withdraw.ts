import { selectedAccount } from "../state_management/contexts/walletContext";
import { sendTransactionManifest } from "../radix/manifestBuilder";
import { USER_BADGE_RESOURCE_ADDRESS } from "../radix/config";
const withdraw_manifest_template = `CALL_METHOD
    Address("@@account_address@@")
    "create_proof_of_non_fungibles"
    Address("@@badge_address@@")
    Array<NonFungibleLocalId>(NonFungibleLocalId("@@user_id@@"));
POP_FROM_AUTH_ZONE Proof("proof");    
CALL_METHOD
  Address("@@earnings_address@@")
  "withdraw"
  Proof("proof")  
;
CALL_METHOD
	Address("@@account_address@@")
	"deposit_batch"
	Expression("ENTIRE_WORKTOP")
;    
`;

export async function withdraw(userid: string, earnings_address: string) {
  var manifest = withdraw_manifest_template
    .replace(new RegExp("@@account_address@@", "g"), selectedAccount)
    .replace(new RegExp("@@user_id@@", "g"), userid)
    .replace(new RegExp("@@badge_address@@", "g"), USER_BADGE_RESOURCE_ADDRESS)
    .replace(new RegExp("@@earnings_address@@", "g"), earnings_address);

  console.log("send transaction for Manifest: ", manifest);
  // send transaction
  var succ = await sendTransactionManifest(manifest);

  if (succ) {
  }
}

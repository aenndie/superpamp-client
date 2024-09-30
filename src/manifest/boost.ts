import { sendTransactionManifest } from "../radix/manifestBuilder";
import { selectedAccount } from "../radix/dapp_toolkit";
import { PLATFORM_COMPONENT_ADDRESS } from "../radix/config";

const boost_manifest_template = `
CALL_METHOD
    Address("@@component_address@@")
    "create_user"    
    "@@user_name@@"
;
CALL_METHOD
	Address("@@account_address@@")
	"deposit_batch"
	Expression("ENTIRE_WORKTOP")
;
`;

export async function create_user(user_name: string) {
  var manifest = boost_manifest_template
    .replace(new RegExp("@@account_address@@", "g"), selectedAccount)
    .replace(new RegExp("@@user_name@@", "g"), user_name)
    .replace(
      new RegExp("@@component_address@@", "g"),
      PLATFORM_COMPONENT_ADDRESS
    );

  console.log("send transaction for Manifest: ", manifest);
  // send transaction
  var succ = await sendTransactionManifest(manifest);

  if (succ) {
    // TODO
  }
}

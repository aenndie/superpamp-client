import { sendTransactionManifest } from "../radix/manifestBuilder";
import { selectedAccount } from "../radix/dapp_toolkit";
import { PLATFORM_COMPONENT_ADDRESS } from "../radix/config";

const boost_manifest_template = `
CALL_METHOD
    Address("@@component_address@@")
    "boost"    
    "@@code@@"
;
CALL_METHOD
	Address("@@account_address@@")
	"deposit_batch"
	Expression("ENTIRE_WORKTOP")
;
`;

export async function boost(code: string) {
  var manifest = boost_manifest_template
    .replace(new RegExp("@@account_address@@", "g"), selectedAccount)
    .replace(new RegExp("@@code@@", "g"), code)
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

import { sendTransactionManifest } from "../radix/manifestBuilder";
import { selectedAccount } from "../state_management/contexts/walletContext";
import { PLATFORM_COMPONENT_ADDRESS } from "../radix/config";

// "@@bio@@"
const create_user_manifest_template = `
CALL_METHOD
    Address("@@component_address@@")
    "create_user"    
    "@@user_name@@"    
    "@@bio@@"
;
CALL_METHOD
	Address("@@account_address@@")
	"deposit_batch"
	Expression("ENTIRE_WORKTOP")
;
`;

export interface CreateUserType {
  username: string;
  bio: string;
}

export async function create_user(user: CreateUserType) {
  var manifest = create_user_manifest_template
    .replace(new RegExp("@@account_address@@", "g"), selectedAccount)
    .replace(new RegExp("@@user_name@@", "g"), user.username)
    .replace(new RegExp("@@bio@@", "g"), user.bio)
    .replace(
      new RegExp("@@component_address@@", "g"),
      PLATFORM_COMPONENT_ADDRESS
    );

  console.log("send transaction for Manifest: ", manifest);
  // send transaction
  var succ = await sendTransactionManifest(manifest);

  return succ;
}

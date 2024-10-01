import { sendTransactionManifest } from "../radix/manifestBuilder";
import {
  PACKAGE_ADDRESS,
  PLATFORM_COMPONENT_ADDRESS,
  USER_BADGE_RESOURCE_ADDRESS,
} from "../radix/config";
import { selectedAccount } from "../state_management/contexts/walletContext";

const create_manifest_template = `
CALL_METHOD
    Address("@@account@@")
    "create_proof_of_non_fungibles"
    Address("@@badge_address@@")
    Array<NonFungibleLocalId>(NonFungibleLocalId("<@@user_name@@>"));
POP_FROM_AUTH_ZONE Proof("proof");    
CALL_FUNCTION
    Address("@@package_address@@")
	"Pumpix"
    "instantiate"    
    Proof("proof")
    Address("@@component_address@@")
    "@@token_name@@"
    "@@token_symbol@@"
    "@@token_description@@"
    "@@token_icon_url@@"
    "@@token_image_url@@"
;
CALL_METHOD
	Address("@@account@@")
	"deposit_batch"
	Expression("ENTIRE_WORKTOP")
;
`;

export interface CreateTokenType {
  name: string;
  symbol: string;
  description: string;
}

export async function create_token(token: CreateTokenType, username: string) {
  // TEMP: set values

  var manifest = create_manifest_template
    .replace(new RegExp("@@account@@", "g"), selectedAccount)
    .replace(new RegExp("@@badge_address@@", "g"), USER_BADGE_RESOURCE_ADDRESS)
    .replace(new RegExp("@@user_name@@", "g"), username)
    .replace(new RegExp("@@package_address@@", "g"), PACKAGE_ADDRESS)
    .replace(
      new RegExp("@@component_address@@", "g"),
      PLATFORM_COMPONENT_ADDRESS
    )
    .replace(new RegExp("@@token_name@@", "g"), token.name)
    .replace(new RegExp("@@token_symbol@@", "g"), token.symbol)
    .replace(new RegExp("@@token_description@@", "g"), token.description)
    .replace(
      new RegExp("@@token_icon_url@@", "g"),
      "https://pumpix.com/icon.webp"
    )
    .replace(
      new RegExp("@@token_image_url@@", "g"),
      "https://pumpix.com/image.webp"
    );

  console.log("send creat token transaction for Manifest: ", manifest);
  // send transaction
  var succ = await sendTransactionManifest(manifest);

  return succ;
}

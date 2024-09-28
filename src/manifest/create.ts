import { sendTransactionManifest } from "../radix/manifestBuilder";
import { PACKAGE_ADDRESS, PLATFORM_COMPONENT_ADDRESS } from "../radix/config";

const create_manifest_template = `
CALL_FUNCTION
    Address("@@package_address@@")
	"Pumpix"
    "instantiate"    
    Address("@@component_address@@")
    "@@token_name@@"
    "@@token_symbol@@"
    "@@token_description@@"
    "@@token_icon_url@@"
    "@@token_image_url@@"
;
`;

export interface CreateTokenType {
  name: string;
  symbol: string;
  description: string;
}

export async function create(token: CreateTokenType) {
  // TEMP: set values

  var manifest = create_manifest_template
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

  if (succ) {
    // TODO
  }
}

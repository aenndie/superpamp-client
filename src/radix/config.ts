import { RadixNetwork } from "@radixdlt/radix-dapp-toolkit";

const IS_MAINNET = false;

let NETWORK_ID: any;
let DAPP_DEFINITION_ADDRESS: any;
let GATEWAY_API_URL: any;
export let XRD: string = "";

export const BACKEND_URL = "https://localhost:7277/";

if (IS_MAINNET) {
  NETWORK_ID = RadixNetwork.Mainnet;
  DAPP_DEFINITION_ADDRESS =
    "account_rdx12xt8vtz2nluk6a7n2xy73h4nnas862e90ytkwezxgumfn7s2kvcvke";
  GATEWAY_API_URL = "https://mainnet.radixdlt.com";
} else {
  NETWORK_ID = RadixNetwork.Stokenet;
  DAPP_DEFINITION_ADDRESS =
    "account_tdx_2_129k4wv6el4e3v6zc27xgyudlk784rverwu5y0nk785znmhx7ms2qr0";
  GATEWAY_API_URL = "https://stokenet.radixdlt.com";
  XRD =
    "resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc";
}

export { NETWORK_ID, DAPP_DEFINITION_ADDRESS, GATEWAY_API_URL };

export const PACKAGE_ADDRESS =
  "package_tdx_2_1pkw4dvs3ehex0mx54ee5geytnvw6uep6jx2gvra4lmgq850aj8352z";

export const PLATFORM_COMPONENT_ADDRESS =
  "component_tdx_2_1cznxgt9237vjgetvnggjgspa9fs95d8tyf0ryrghq9nwwrggzrk9u3";

export const USER_BADGE_RESOURCE_ADDRESS =
  "resource_tdx_2_1nf8txdxk0rarzpec9wjyp25khcaxh0cqapzev83ll5ywkr54hyy649";

export const OWNER_BADGE_RESOURCE_ADDRESS =
  "resource_tdx_2_1nteppchrh6qsta0raq0v7vdxlgvg8n0k94832e26w37wrq2m6h3emf";

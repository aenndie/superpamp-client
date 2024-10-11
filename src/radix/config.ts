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
  "package_tdx_2_1pkn9k8l062ul6f7j0l600awpnfgxwrqtfn95fspkpx89wnu6xys8l3";

export const PLATFORM_COMPONENT_ADDRESS =
  "component_tdx_2_1cqt3dgqal45d4mnnslxe9njtfyjjhp7ywkht4lksa5lcmmq30e925q";

export const USER_BADGE_RESOURCE_ADDRESS =
  "resource_tdx_2_1ng22zk0p0gyl7e4zu6tp7lr7wwdavm75jk4mtrg3qzw5j67a0r7ung";

export const OWNER_BADGE_RESOURCE_ADDRESS =
  "resource_tdx_2_1ngugx4fsvjcthpgkee6zxyasz4c627m6lurgqjuk66k79ppylzd6n0";

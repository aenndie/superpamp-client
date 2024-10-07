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
  "package_tdx_2_1p4wgsjagtg5z97pnugj54m4qdmp62ecqz30h7298uq7t0nlsmhwa7v";

export const PLATFORM_COMPONENT_ADDRESS =
  "component_tdx_2_1cpc7ps05daudtnj4zyv2dw967lzvf70yafcmz7kzaz6yazj625smt7";

export const USER_BADGE_RESOURCE_ADDRESS =
  "resource_tdx_2_1nfhyjy965gwqx66cyqlqwdmruuzktc8etf6wnezqfrrfg7rae0jjxk";

export const OWNER_BADGE_RESOURCE_ADDRESS =
  "resource_tdx_2_1n2axhrwzl9juswcadrnffdxd9j7r6e7h58l7tx8n2dq78vkx2upnc8";

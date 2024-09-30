import { RadixNetwork } from "@radixdlt/radix-dapp-toolkit";

const IS_MAINNET = false;

let NETWORK_ID: any;
let DAPP_DEFINITION_ADDRESS: any;
let GATEWAY_API_URL: any;
export let XRD: string = "";

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
  "package_tdx_2_1p5942m9p99gfgv5dd0ga639dv9mqsf57u9r7vyy9q59mjtfezcjmx5";

export const PLATFORM_COMPONENT_ADDRESS =
  "component_tdx_2_1czjv779qgdfrnkamepkvsy7zs3ek9qkxpt8l6hmjmkw2sjqus7tv7u";

export const USER_BADGE_RESOURCE_ADDRESS =
  "resource_tdx_2_1nfknca0wzhs04lvyshxadfy9rr6jhjua4hgzmc8qmnvaz3y4fg54st";

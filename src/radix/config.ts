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

//export const PACKAGE_ADDRESS =
//" package_tdx_2_1p5y23xuhxprfl0fw2njxa7sg0m8aqzvcat6mlkc2mnmtlfnne6hl23";

export const PLATFORM_COMPONENT_ADDRESS =
  "component_tdx_2_1cqulueycevn757vxk7tacdyt8ll0lgtjan85wh4gwnpzx00jed3eka";

export const USER_BADGE_RESOURCE_ADDRESS =
  "resource_tdx_2_1nt3xw2mk6jcyh255hcy3z4kx0l86wqntkpmhf76zn5j4tyr4d2ncw2";

export const OWNER_BADGE_RESOURCE_ADDRESS =
  "resource_tdx_2_1ntymr2z642ge7ycjk40r89mn5pc8g5v8lymhznnrjptklm0z2pne05";

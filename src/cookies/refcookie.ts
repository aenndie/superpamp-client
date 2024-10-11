import Cookies from "js-cookie";

export function get_ref_param(): string {
  let cookie = Cookies.get("RefCookie");

  let param = "None";

  if (cookie) {
    param = `Some(Address("@@component_address@@"))`.replace(
      "@@component_address@@",
      cookie
    );
  }

  return param;
}

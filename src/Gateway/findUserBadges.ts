import { USER_BADGE_RESOURCE_ADDRESS } from "../radix/config";
import { gatewayClient } from "../services/apiClient";
import { NonFungibleIdsResponse } from "./NonFungibleDataTypes";

function getNonFungibleValues(
  resource: string,
  ids: string[],
  field_name: string
): Promise<string[]> {
  const json = {
    resource_address: resource,
    non_fungible_ids: ids,
  };

  let codes: string[] = [];

  return gatewayClient
    .post<NonFungibleIdsResponse>("state/non-fungible/data", json)
    .then((response) => {
      for (const nf of response.data.non_fungible_ids) {
        for (const field of nf.data.programmatic_json.fields) {
          if (field.field_name === field_name) {
            codes.push(field.value);
          }
        }
      }
      return codes;
    })
    .catch((err) => {
      console.log("error in getNonFungibleVault: ", err);
      return [];
    });
}

function getNonFungibleVault(
  account: string,
  resource: string
): Promise<string> {
  const json = {
    address: account,
    resource_address: resource,
  };

  console.log("getNonFungibleVault.post ", json);
  return gatewayClient
    .post("/state/entity/page/non-fungible-vaults/", json)
    .then((response) => {
      console.log("success: ", response);
      let vault_address = response.data.items[0].vault_address;
      return vault_address;
    })
    .catch((err) => {
      console.log("error in getNonFungibleVault: ", err);
    });
}

function getNonFungibleIDs(
  account: string,
  resource: string,
  vault: string
): Promise<string[]> {
  const json = {
    address: account,
    resource_address: resource,
    vault_address: vault,
  };

  console.log("getNonFungibleIDs:posting....", json);

  return gatewayClient
    .post("/state/entity/page/non-fungible-vault/ids", json)
    .then((response) => {
      let ids = response.data.items;
      return ids;
    })
    .catch((err) => {
      console.log("error in getNonFungibleIDs: ", err);
      return [];
    });
}

export async function getUserNameAndIds(account: string): Promise<{
  username: string;
  userid: string;
  earnings_address: string;
}> {
  let resource = USER_BADGE_RESOURCE_ADDRESS;

  try {
    console.log("getNonFungibleVault: ", account, ", ", resource);

    const vault_address = await getNonFungibleVault(account, resource);
    console.log("vault_address", vault_address);

    const ids = await getNonFungibleIDs(account, resource, vault_address);
    console.log("ids", ids);

    const usernames = await getNonFungibleValues(resource, ids, "name");
    console.log("usernames:", usernames);

    const earning_addresses = await getNonFungibleValues(
      resource,
      ids,
      "earnings"
    );
    console.log("earnings:", earning_addresses);

    return {
      username: usernames[0],
      userid: ids[0],
      earnings_address: earning_addresses[0],
    }; // Return the first username
  } catch (error) {
    console.error("Error fetching username:", error);
    return {
      username: "",
      userid: "",
      earnings_address: "",
    }; // Return empty strings or handle error appropriately
  }
}

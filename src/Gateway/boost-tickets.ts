import { BOOST_TICKET_RESOURCE_ADDRESS } from "../radix/config";
import { selectedAccount } from "../radix/dapp_toolkit";
import { gatewayClient } from "../services/apiClient";
import { NonFungibleIdsResponse } from "./NonFungibleDataTypes";

function getNonFungibleCodes(
  resource: string,
  ids: string[]
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
          if (field.field_name === "code") {
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
      let vault_address = response.data.items[0].vault_address;
      console.log("success: ", response);
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

export function getBoostTickets() {
  let account = selectedAccount;
  let resource = BOOST_TICKET_RESOURCE_ADDRESS;

  console.log("getNonFungibleVault: ", account, ", ", resource);

  getNonFungibleVault(account, resource).then((vault_address) => {
    console.log("vault_address", vault_address);
    getNonFungibleIDs(account, resource, vault_address).then((ids) => {
      console.log("ids", ids);
      getNonFungibleCodes(resource, ids).then((codes) => {
        console.log("codes:", codes);
      });
    });
  });
}

// Define the interface for the fields inside the programmatic_json
interface Field {
  value: string;
  kind: string;
  field_name: string;
  type_name?: string; // optional field because not all fields have this
}

// Define the interface for programmatic_json
interface ProgrammaticJson {
  fields: Field[];
  kind: string;
  type_name: string;
}

// Define the interface for data
interface Data {
  programmatic_json: ProgrammaticJson;
}

// Define the interface for non_fungible_ids
interface NonFungibleId {
  is_burned: boolean;
  non_fungible_id: string;
  data: Data;
}

// Define the root interface for the full JSON structure
export interface NonFungibleIdsResponse {
  non_fungible_ids: NonFungibleId[];
}

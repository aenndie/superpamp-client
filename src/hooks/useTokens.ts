import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export interface Token {
  id: number;
  name: string;
  symbol: string;
  description: string;
  filename: string;
  net_sold: number;
  resource_address: string;
  component_address: string;
}

/*interface TokensResponse {
    count: number;
    results: Token[];
  }
    */

const useTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<Token[]>("tokens")
      .then((res) => setTokens(res.data))
      .catch((err) => {
        console.log("error:", err);
        setError(err.response + "- " + err.response.data + "!");
      });
  });

  return { tokens, error };
};

export default useTokens;

export function uploadFile(id: number, selectedFile: File) {
  const formData = new FormData();
  formData.append("file", selectedFile);

  console.log("sending file", selectedFile);
  apiClient
    .put("tokens/uploadimage/" + id, formData, {
      headers: {
        // 'Content-Type' is set automatically
        // 'Authorization': 'Bearer your-token', // Add auth token if needed
      },
    })
    .then(() => console.log("sending file success"))
    .catch()
    .finally();
}

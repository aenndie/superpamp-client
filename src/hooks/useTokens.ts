import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export interface Token {
  id: string;
  name: string;
  symbol: string;
  description: string;
  componentAddress: string;
  iconUrl: string;
  imageUrl: string;
  netSold: number;
}

/*interface TokensResponse {
    count: number;
    results: Token[];
  }
    */
export function get_price(
  buy: boolean,
  net_sold: number,
  amount_token: number
): number {
  if (buy) return (amount_token + net_sold - net_sold) / 1000.0;
  else return (amount_token + net_sold - net_sold) / 1000.0;
}

const useTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<Token[]>("tokens")
      .then((res) => {
        console.log("data....", res.data);
        setTokens(res.data);
      })
      .catch((err) => {
        console.log("error:", err);
        setError(err.response + "- " + err.response.data + "!");
      });
  }, []);

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

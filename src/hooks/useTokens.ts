import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export interface Token {
  id: string;
  createdDateTime: string;
  name: string;
  symbol: string;
  description: string;
  componentAddress: string;
  iconUrl: string;
  imageUrl: string;
  netSold: number;
}

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

export const useToken = (id: string) => {
  const [token, setToken] = useState<Token>();
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<Token>("tokens/" + id)
      .then((res) => {
        console.log("data....", res.data);
        setToken(res.data);
      })
      .catch((err) => {
        console.log("error:", err);
        setError(err.response + "- " + err.response.data + "!");
      });
  }, []);

  return { token, error };
};

export function uploadFile(id: number, selectedFile: File) {
  const formData = new FormData();
  formData.append("file", selectedFile);

  console.log("sending file", selectedFile);
  apiClient
    .put("tokens/uploadimage/" + id, formData, {
      headers: {},
    })
    .then(() => console.log("sending file success"))
    .catch()
    .finally();
}

import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export interface Token {
  id: number;
  name: string;
  image: string;
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

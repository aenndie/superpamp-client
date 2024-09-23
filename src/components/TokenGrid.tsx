import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import apiClient from "../services/apiClient";

interface Token {
  id: number;
  name: string;
}

/*interface TokensResponse {
  count: number;
  results: Token[];
}
  */

const TokenGrid = () => {
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
  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {tokens.map((token) => (
          <li key={token.id}>{token.name}</li>
        ))}
      </ul>
    </>
  );
};

export default TokenGrid;

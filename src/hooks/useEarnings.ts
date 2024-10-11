import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export interface Earning {
  createdDate: string;
  userId: string;
  userName: string;
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  action: string;
  amountToken: string;
  amountXrd: string;
  provisionXrd: string;
}

const useEarnings = (userId: string) => {
  const [earnings, setTrades] = useState<Earning[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<Earning[]>("earnings/" + userId)
      .then((res) => {
        console.log("data....", res.data);
        setTrades(res.data);
      })
      .catch((err) => {
        console.log("error:", err);
        setError(err.response + "- " + err.response.data + "!");
      });
  }, []);

  return { earnings, error };
};

export default useEarnings;

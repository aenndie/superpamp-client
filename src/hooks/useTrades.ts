import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export interface Trade {
  tradeNr: string;
  userId: string;
  userName: string;
  dateTimeSeconds: string;
  dateTime: string;
  action: string;
  amountToken: string;
  amountTokenDec: string;
  amountXrd: string;
  amountXrdDec: string;
  amountReferral: string;
  amountBoostedDec: string;
  aeferrerId: string;
  referrerName: string;
  tokenSold: string;
  tokenRemaining: string;
  latestPriceBonding: string;
  latestPricePool: string;
  latestMcapBonding: string;
  latestMcapPool: string;
  bondingProgress: string;
}

const useTrades = (endpointName: string, qualifier: string) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<Trade[]>(endpointName + "/" + qualifier)
      .then((res) => {
        console.log("data....", res.data);
        setTrades(res.data);
      })
      .catch((err) => {
        console.log("error:", err);
        setError(err.response + "- " + err.response.data + "!");
      });
  }, []);

  return { trades, error };
};

export default useTrades;

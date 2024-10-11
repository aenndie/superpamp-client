import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import * as signalR from "@microsoft/signalr";
import { BACKEND_URL } from "../radix/config";

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
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

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

    // Setup SignalR connection
    console.log(
      "Trying to setup signal R connection with: ",
      BACKEND_URL + "realtimehub"
    );
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(BACKEND_URL + "realtimehub", {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();
    console.log("after setting up SignalR connection.");

    setConnection(newConnection);
  }, [endpointName, qualifier]);

  useEffect(() => {
    if (connection) {
      console.log("trying to invoke SubscribeToken: ", qualifier);
      connection
        .start()
        .then(() => {
          console.log("SignalR Connected.");
          // Subscribe to the token-specific group
          connection.invoke("SubscribeToToken", qualifier);

          // Listen for new trades related to this token
          connection.on("ReceiveNewTrade", (newTrade: Trade) => {
            setTrades((prevTrades) => [newTrade, ...prevTrades]);
          });
        })
        .catch((err) => console.error("SignalR Connection Error:", err));

      // Unsubscribe when leaving the component
      return () => {
        connection
          .invoke("UnsubscribeFromToken", qualifier)
          .catch((err) => console.error(err));
      };
    }
  }, [connection, qualifier]);

  return { trades, error };
};

export default useTrades;
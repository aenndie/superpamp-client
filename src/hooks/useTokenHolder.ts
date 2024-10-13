import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import * as signalR from "@microsoft/signalr";
import { BACKEND_URL } from "../radix/config";

export interface TokenHolder {
  userId: number;
  userName: string;
  tokenId: string;
  tokenName: string;
  tokenSymbol: string;
  balance: string;
}

const useTokenHolders = (
  endpointName: string,
  qualifier: string,
  subscription: string,
  listening: string,
  unsubscription: string
) => {
  const [holders, setTrades] = useState<TokenHolder[]>([]);
  const [error, setError] = useState("");
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  useEffect(() => {
    apiClient
      .get<TokenHolder[]>(endpointName + "/" + qualifier)
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
          if (subscription.length > 0) {
            console.log("invoking...");
            connection.invoke(subscription, qualifier);
            console.log("after invoking.");
          }

          // Listen for new trades related to this token
          if (listening.length > 0) {
            console.log("listening....");
            connection.on(listening, (newHolder: TokenHolder) => {
              setTrades((prevHolders) => [newHolder, ...prevHolders]);
            });
            console.log("after listening....");
          }
        })
        .catch((err) => console.error("SignalR Connection Error:", err));

      // Unsubscribe when leaving the component
      return () => {
        if (unsubscription.length > 0) {
          connection
            .invoke(unsubscription, qualifier)
            .catch((err) => console.error(err));
        }
      };
    }
  }, [connection, qualifier]);

  return { holders, error };
};

export default useTokenHolders;

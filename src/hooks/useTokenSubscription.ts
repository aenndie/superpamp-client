import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { Token } from "./useTokens";
import { BACKEND_URL } from "../radix/config";

// Custom hook to subscribe to token updates via SignalR
const useTokenSubscription = (token: Token | undefined) => {
  const [updatedToken, setUpdatedToken] = useState<Token | undefined>(token);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  // First useEffect: Set up the SignalR connection
  useEffect(() => {
    if (!token) {
      return;
    }

    // Update updatedToken with the latest token if the token changes
    setUpdatedToken(token); // This makes sure updatedToken is set to the initial token when it arrives

    console.log(
      "Trying to set up SignalR connection with: ",
      BACKEND_URL + "realtimehub"
    );

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(BACKEND_URL + "realtimehub", {
        withCredentials: true,
      })
      .withAutomaticReconnect() // Automatically reconnect if connection fails
      .build();

    setConnection(newConnection);
    console.log("After setting up SignalR connection.");

    // Cleanup: stop the connection if the hook is unmounted
    return () => {
      if (newConnection) {
        newConnection
          .stop()
          .catch((err) => console.error("Error stopping connection:", err));
      }
    };
  }, [token]);

  // Second useEffect: Handle subscription to token updates
  useEffect(() => {
    if (!token) {
      return;
    }
    if (connection) {
      console.log("Trying to subscribe to token updates for: ", token.id);

      connection
        .start()
        .then(() => {
          console.log("SignalR Connected.");

          // Subscribe to token updates for the specific token
          connection
            .invoke("SubscribeToTokenUpdates", token.id)
            .then(() =>
              console.log(`Subscribed to token updates for token ${token.id}`)
            )
            .catch((err) => console.error("Error during subscription:", err));

          // Listen for token updates
          connection.on("ReceiveTokenUpdate", (updatedTokenData) => {
            console.log("Updated token received: ", updatedTokenData);

            if (updatedTokenData.id === token.id) {
              console.log("Update token...");
              setUpdatedToken(updatedTokenData);
            }
          });
        })
        .catch((err) => console.error("SignalR Connection Error:", err));

      // Cleanup: Unsubscribe from the token updates and stop the connection when unmounting
      return () => {
        if (connection.state === signalR.HubConnectionState.Connected) {
          console.log(`Unsubscribing from token updates for token ${token.id}`);
          connection
            .invoke("UnsubscribeFromTokenUpdates", token.id)
            .then(() => connection.stop())
            .catch((err) => console.error("Error during unsubscription:", err));
        }
      };
    }
  }, [connection, token]); // Re-run if connection or token id changes

  console.log("return updatedToken: ", updatedToken);
  console.log("token: ", token);
  return updatedToken;
};

export default useTokenSubscription;

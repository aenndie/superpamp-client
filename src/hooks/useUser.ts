import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export interface User {
  userId: string;
  userName: string;
  dateTime: string;
  earningsComponentAddress: string;
  currentBalance: string;
}

export const useUser = (userId: string) => {
  const [user, setToken] = useState<User>();
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<User>("users/" + userId)
      .then((res) => {
        console.log("data....", res.data);
        setToken(res.data);
      })
      .catch((err) => {
        console.log("error:", err);
        setError(err.response + "- " + err.response.data + "!");
      });
  }, []);

  return { user, error };
};

export const useUsers = () => {
  const [users, setToken] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<User[]>("users")
      .then((res) => {
        console.log("data....", res.data);
        setToken(res.data);
      })
      .catch((err) => {
        console.log("error:", err);
        setError(err.response + "- " + err.response.data + "!");
      });
  }, []);

  return { users, error };
};

export default useUser;

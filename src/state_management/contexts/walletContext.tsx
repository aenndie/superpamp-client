import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { rdt } from "../../radix/dapp_toolkit";
import { getUserNameAndIds } from "../../Gateway/findUserBadges";

export let selectedAccount: string;

interface WalletContextType {
  address: string;
  username: string;
  userid: string;
  earnings_address: string;
}

const WalletContext = createContext<WalletContextType>({} as WalletContextType); // Correct type, default value

interface WalletProviderProps {
  children: ReactNode; // Correctly type 'children' as ReactNode
}

// WalletProvider component to manage the wallet subscription and provide the context
export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWalletAddress] = useState<WalletContextType>({
    address: "",
    username: "",
    userid: "",
    earnings_address: "",
  });

  useEffect(() => {
    // Define an async function within useEffect to handle async logic
    const fetchWalletData = async (selectedAccount: string) => {
      try {
        const { username, userid, earnings_address } = await getUserNameAndIds(
          selectedAccount
        ); // Await the async call
        setWalletAddress({
          address: selectedAccount,
          username: username,
          userid: userid,
          earnings_address: earnings_address,
        });
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    // Subscribe to the walletData$ observable
    const subscription = rdt.walletApi.walletData$.subscribe((walletData) => {
      console.log("subscription changed...");
      console.log("walletData = ", walletData);
      console.log("walletData.persona = ", walletData.persona);
      console.log(
        "walletData.persona = undefined",
        walletData.persona == undefined
      );
      console.log(
        "walletData.persona = undefined",
        walletData.persona === undefined
      );

      if (walletData && walletData.accounts && walletData.accounts.length > 0) {
        const account = walletData.accounts[0].address;
        selectedAccount = account;
        console.log(".... selectedAccount", account);
        fetchWalletData(account);
      }
    });

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { rdt } from "../../radix/dapp_toolkit";
import { getUserName } from "../../Gateway/findUserBadges";

interface WalletContextType {
  address: string;
  username: string;
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
  });

  useEffect(() => {
    // Define an async function within useEffect to handle async logic
    const fetchWalletData = async (selectedAccount: string) => {
      try {
        const userName = await getUserName(selectedAccount); // Await the async call
        setWalletAddress({ address: selectedAccount, username: userName });
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    // Subscribe to the walletData$ observable
    const subscription = rdt.walletApi.walletData$.subscribe((walletData) => {
      if (walletData && walletData.accounts && walletData.accounts.length > 0) {
        const selectedAccount = walletData.accounts[0].address;
        console.log(".... selectedAccount", selectedAccount);
        fetchWalletData(selectedAccount);
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

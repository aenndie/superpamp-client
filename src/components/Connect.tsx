import { Button } from "@chakra-ui/react";
import { useWallet } from "../state_management/contexts/walletContext";

export default function Connect() {
  const { address, username } = useWallet();
  const htmlContent: string = "<radix-connect-button>";

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <Button>{username}</Button>
    </>
  );
}

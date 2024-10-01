import { Button } from "@chakra-ui/react";
import { useWallet } from "../state_management/contexts/walletContext";

export default function Connect() {
  const { username } = useWallet();
  const htmlContent: string = "<radix-connect-button>";

  return (
    <>
      <Button>{username}</Button>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  );
}

import { Button } from "@chakra-ui/react";
import { useWallet } from "../state_management/contexts/walletContext";

export default function Connect() {
  const { username, userid, earnings_address } = useWallet();
  const htmlContent: string = "<radix-connect-button>";

  return (
    <>
      <Button>
        {username} ({userid}): {earnings_address}
      </Button>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  );
}

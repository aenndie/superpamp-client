import { Box, Button, Text } from "@chakra-ui/react";
import { useWallet } from "../state_management/contexts/walletContext";
import { useEffect, useState } from "react";
import { delete_cookie, get_ref_param } from "../cookies/refcookie";
import { withdraw } from "../manifest/withdraw";

export default function Connect() {
  const { username, userid, earnings_address } = useWallet();
  const [ref, setRef] = useState("");
  const htmlContent: string = "<radix-connect-button>";

  useEffect(() => {
    const ref_value = get_ref_param();
    setRef(ref_value);
  }, []);

  const handleBtnClick = () => {
    withdraw(userid, earnings_address);
  };

  const deleteCookie = () => {
    delete_cookie();
  };

  return (
    <>
      <Button onClick={handleBtnClick}>
        {username} ({userid})
      </Button>
      <Box>
        <Text>My address: {earnings_address}</Text>
        <Text>Ref: {ref}</Text>
      </Box>
      <Button onClick={deleteCookie}>Delete Cookie</Button>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  );
}

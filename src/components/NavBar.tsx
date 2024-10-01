import { Button, HStack, Image, useDisclosure } from "@chakra-ui/react";
import logo from "../assets/pumpix.webp";
import Connect from "./Connect";
import ColorModeSwitch from "./ColorModeSwitch";
import CreateToken from "./CreateToken";
import CreateUser from "./CreateUser";
import { useWallet } from "../state_management/contexts/walletContext";
const NavBar = () => {
  const { username } = useWallet();
  const tokenDialog = useDisclosure();
  const userDialog = useDisclosure();
  const hasUser = username != null;
  return (
    <HStack justifyContent='space-between' padding='10px'>
      <Image src={logo} boxSize='60px'></Image>
      <ColorModeSwitch />
      <Button isDisabled={!hasUser} onClick={tokenDialog.onOpen}>
        Create new token
      </Button>
      <Button isDisabled={hasUser} onClick={userDialog.onOpen}>
        Create User
      </Button>

      <CreateToken
        isOpen={tokenDialog.isOpen}
        onClose={tokenDialog.onClose}
      ></CreateToken>
      <CreateUser
        isOpen={userDialog.isOpen}
        onClose={userDialog.onClose}
      ></CreateUser>
      <Connect></Connect>
    </HStack>
  );
};

export default NavBar;

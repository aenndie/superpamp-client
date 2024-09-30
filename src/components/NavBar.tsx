import { Button, HStack, Image, useDisclosure } from "@chakra-ui/react";
import logo from "../assets/pumpix.webp";
import Connect from "./Connect";
import ColorModeSwitch from "./ColorModeSwitch";
import CreateToken from "./CreateToken";
import { create_user } from "../manifest/boost";
// import { getUserName } from "../Gateway/boost-tickets";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack justifyContent='space-between' padding='10px'>
      <Image src={logo} boxSize='60px'></Image>
      <ColorModeSwitch />
      <Button onClick={onOpen}>Create new token</Button>
      <Button onClick={() => create_user("CODE")}>Create User</Button>

      <CreateToken isOpen={isOpen} onClose={onClose}></CreateToken>
      <Connect></Connect>
    </HStack>
  );
};

export default NavBar;
// <Button onClick={() => setUserName()}>Try Gateway</Button>

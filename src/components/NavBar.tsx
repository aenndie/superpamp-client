import { Button, HStack, Image, useDisclosure } from "@chakra-ui/react";
import logo from "../assets/pumpix.webp";
import Connect from "./Connect";
import ColorModeSwitch from "./ColorModeSwitch";
import CreateToken from "./CreateToken";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack justifyContent='space-between' padding='10px'>
      <Image src={logo} boxSize='60px'></Image>
      <ColorModeSwitch />
      <Button onClick={onOpen}>Create new token</Button>
      <Button onClick={() => console.log("...")}>Test Manifest</Button>
      <CreateToken isOpen={isOpen} onClose={onClose}></CreateToken>
      <Connect></Connect>
    </HStack>
  );
};

export default NavBar;

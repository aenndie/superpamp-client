import { Button, HStack, Image, useDisclosure } from "@chakra-ui/react";
import logo from "../assets/pumpix.webp";
import Connect from "./Connect";
import ColorModeSwitch from "./ColorModeSwitch";
import CreateToken from "./CreateToken";
import { boost } from "../manifest/boost";
import { getBoostTickets } from "../Gateway/boost-tickets";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack justifyContent='space-between' padding='10px'>
      <Image src={logo} boxSize='60px'></Image>
      <ColorModeSwitch />
      <Button onClick={onOpen}>Create new token</Button>
      <Button onClick={() => boost("CODE")}>Boost</Button>
      <Button onClick={() => getBoostTickets()}>Try Gateway</Button>
      <CreateToken isOpen={isOpen} onClose={onClose}></CreateToken>
      <Connect></Connect>
    </HStack>
  );
};

export default NavBar;

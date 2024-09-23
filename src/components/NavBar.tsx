import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/pumpix.webp";
import Connect from "./Connect";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent='space-between' padding='10px'>
      <Image src={logo} boxSize='60px'></Image>
      <ColorModeSwitch />
      <Connect></Connect>
    </HStack>
  );
};

export default NavBar;

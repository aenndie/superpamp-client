import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import { Token } from "../hooks/useTokens";

interface Props {
  token: Token;
}

const DEFAULT_IMAGE = "http://localhost:5173/src/assets/pumpix.webp"; // Replace with your default image URL

const TokenCard = ({ token }: Props) => {
  return (
    <Card borderRadius={5} overflow='hidden'>
      <Image
        src={token.image || DEFAULT_IMAGE}
        maxW='200px'
        maxH='200px'
        objectFit='cover'
      ></Image>
      <CardBody>
        <Heading fontSize='2xl'>{token.name}</Heading>
      </CardBody>
    </Card>
  );
};

export default TokenCard;

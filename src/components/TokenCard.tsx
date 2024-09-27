import { Card, CardBody, Heading, Image, Text, Button } from "@chakra-ui/react";
import { Token } from "../hooks/useTokens";
import { buy } from "../manifest/buy";

interface Props {
  token: Token;
}

const DEFAULT_IMAGE = "http://localhost:5173/src/assets/meme.webp"; // Replace with your default image URL

const TokenCard = ({ token }: Props) => {
  return (
    <Card borderRadius={5} overflow='hidden'>
      <Image src={DEFAULT_IMAGE}></Image>
      <CardBody>
        <Heading fontSize='2xl'>
          {token.name + " (" + token.symbol + ")"}
        </Heading>
        <Text>{token.description}</Text>
        <Text>{token.filename ? token.filename : "-"}</Text>
        <Button onClick={() => buy(token, 1000)}>Buy</Button>
      </CardBody>
    </Card>
  );
};

export default TokenCard;

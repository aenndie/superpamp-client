import {
  Card,
  CardBody,
  Heading,
  Image,
  Text,
  Button,
  Spacer,
  Input,
  FormControl,
} from "@chakra-ui/react";
import { Token } from "../hooks/useTokens";
import { buy } from "../manifest/buy";
import { sell } from "../manifest/sell";
import { Link } from "react-router-dom";
import { useWallet } from "../state_management/contexts/walletContext";
import { useState } from "react";
interface Props {
  token: Token;
}

const DEFAULT_IMAGE = "http://localhost:5173/src/assets/meme.webp"; // Replace with your default image URL

const TokenCard = ({ token }: Props) => {
  const { userid } = useWallet();
  const [amount, setAmount] = useState<number>(0);
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleBuy = () => {
    buy(userid, "", token, amount);
  };

  const handleSell = () => {
    sell(userid, "", token, amount);
  };

  return (
    <Card borderRadius={5} overflow='hidden'>
      <Image src={DEFAULT_IMAGE}></Image>
      <CardBody>
        <Heading fontSize='2xl'>
          {token.name + " (" + token.symbol + ")"}
        </Heading>
        <Text>{token.id}</Text>
        <FormControl>
          <Input
            type='number'
            value={amount}
            onChange={handleAmountChange}
            id='amount-token'
            placeholder='Enter amount'
          />
          <Button onClick={handleBuy} mt={2}>
            Buy
          </Button>
          <Button onClick={handleSell} mt={2} ml={2}>
            Sell
          </Button>
        </FormControl>
        <Spacer></Spacer>
        <Link to={`/token/${token.id}`}>Details</Link>
        <Text>Latest Mcap Pool: {token.latestMcapPool}</Text>
        <Text>Latest Mcap Bonding: {token.latestMcapBonding}</Text>
        <Text>Latest Price Bonding: {token.latestPriceBonding}</Text>
        <Text>Latest Price Pool: {token.latestPricePool}</Text>
        <Text>Bonding Progress: {token.bondingProgress}</Text>
      </CardBody>
    </Card>
  );
};

export default TokenCard;

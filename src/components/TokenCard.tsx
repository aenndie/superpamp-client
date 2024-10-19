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
  Box,
  TableContainer,
  Thead,
  Table,
  Th,
  Tbody,
  Tr,
  Td,
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
import memeImage from "@/assets/meme.webp";
import formatDecimalString from "../misc/format";

const DEFAULT_IMAGE = memeImage;

const TokenCard = ({ token }: Props) => {
  const { userid } = useWallet();
  const [amount, setAmount] = useState<number>(0);
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleBuy = () => {
    buy(userid, token, amount);
  };

  const handleSell = () => {
    sell(userid, token, amount);
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
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Field</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Latest Mcap Pool</Td>
                <Td>{formatDecimalString(token.latestMcapPool)}</Td>
              </Tr>
              <Tr>
                <Td>Latest Mcap Bonding</Td>
                <Td>{formatDecimalString(token.latestMcapBonding)}</Td>
              </Tr>
              <Tr>
                <Td>Latest Price Bonding</Td>
                <Td>{formatDecimalString(token.latestPriceBonding)}</Td>
              </Tr>
              <Tr>
                <Td>Latest Price Pool</Td>
                <Td>{formatDecimalString(token.latestPricePool)}</Td>
              </Tr>
              <Tr>
                <Td>Bonding Progress</Td>
                <Td>
                  {formatDecimalString(
                    (parseFloat(token.bondingProgress) * 100.0).toString()
                  )}{" "}
                  %
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Box>
          <Button>
            <Link to={`/token/${token.id}`}>Details</Link>
          </Button>
        </Box>
      </CardBody>
    </Card>
  );
};

export default TokenCard;

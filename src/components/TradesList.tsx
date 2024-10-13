import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useTrades from "../hooks/useTrades";
import formatDecimalString from "../misc/format";
interface Props {
  endpointName: string;
  qualifier: string;
  subscription: string;
  listening: string;
  unsubscription: string;
}
const TradesList = ({
  endpointName,
  qualifier,
  subscription,
  listening,
  unsubscription,
}: Props) => {
  const { trades, error } = useTrades(
    endpointName,
    qualifier,
    subscription,
    listening,
    unsubscription
  );

  return (
    <div>
      {(error || !trades) && <Text>{error}</Text>}
      {!error && trades && (
        <TableContainer>
          <Table variant='simple'>
            <TableCaption>Trades for {qualifier}</TableCaption>
            <Thead>
              <Tr>
                <Th>User</Th>
                <Th>DateTime</Th>
                <Th>Action</Th>
                <Th isNumeric>Amount Token</Th>
                <Th isNumeric>Amount XRD</Th>
              </Tr>
            </Thead>
            <Tbody>
              {trades.map((trade) => (
                <Tr key={trade.tradeNr}>
                  <Td>
                    <Link to={`/user/${trade.userId}`}>
                      {trade.userName} ({trade.userId})
                    </Link>
                  </Td>
                  <Td>{trade.dateTime}</Td>
                  <Td>{trade.action}</Td>
                  <Td>
                    <Link to={`/token/${trade.tokenAddress}`}>
                      {trade.tokenName} ({trade.tokenSymbol})
                    </Link>
                  </Td>
                  <Td>{formatDecimalString(trade.amountToken)}</Td>
                  <Td>{formatDecimalString(trade.amountXrd)}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Action</Th>
                <Th>DateTime</Th>
                <Th isNumeric>Amount Token</Th>
                <Th isNumeric>Amount XRD</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TradesList;

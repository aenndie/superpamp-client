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
import useTrades from "../hooks/useTrades";
interface Props {
  endpointName: string;
  qualifier: string;
}
const TradesList = ({ endpointName, qualifier }: Props) => {
  const { trades, error } = useTrades(endpointName, qualifier); //token!.tokenAddress

  return (
    <div>
      {(error || !trades) && <Text>{error}</Text>}
      {!error && trades && (
        <TableContainer>
          <Table variant='simple'>
            <TableCaption>Trades for {qualifier}</TableCaption>
            <Thead>
              <Tr>
                <Th>Action</Th>
                <Th>DateTime</Th>
                <Th isNumeric>Amount Token</Th>
                <Th isNumeric>Amount XRD</Th>
              </Tr>
            </Thead>
            <Tbody>
              {trades.map((trade) => (
                <Tr>
                  <Td>{trade.action}</Td>
                  <Td>{trade.dateTime}</Td>
                  <Td>{trade.amountToken}</Td>
                  <Td>{trade.amountXrd}</Td>
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

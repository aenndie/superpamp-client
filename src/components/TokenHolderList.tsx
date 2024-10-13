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
import useTokenHolders from "../hooks/useTokenHolder";
import formatDecimalString from "../misc/format";
interface Props {
  endpointName: string;
  qualifier: string;
  subscription: string;
  listening: string;
  unsubscription: string;
}
const TokenHolderList = ({
  endpointName,
  qualifier,
  subscription,
  listening,
  unsubscription,
}: Props) => {
  const { holders, error } = useTokenHolders(
    endpointName,
    qualifier,
    subscription,
    listening,
    unsubscription
  );

  return (
    <div>
      {(error || !holders) && <Text>{error}</Text>}
      {!error && holders && (
        <TableContainer>
          <Table variant='simple'>
            <TableCaption>Trades for {qualifier}</TableCaption>
            <Thead>
              <Tr>
                <Th>User</Th>
                <Th>Token</Th>
                <Th>DateTime</Th>
                <Th isNumeric>Amount Token</Th>
              </Tr>
            </Thead>
            <Tbody>
              {holders.map((holder) => (
                <Tr key={holder.userId.toString() + holder.tokenId}>
                  <Td>
                    {holder.userName} ({holder.userId})
                  </Td>
                  <Td>
                    {holder.tokenId} ({holder.tokenSymbol})
                  </Td>
                  <Td>{formatDecimalString(holder.balance)}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>User</Th>
                <Th>Token</Th>
                <Th>DateTime</Th>
                <Th isNumeric>Amount Token</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TokenHolderList;

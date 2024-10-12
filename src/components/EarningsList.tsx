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
import useEarnings from "../hooks/useEarnings";
import formatDecimalString from "../misc/format";
interface Props {
  userId: string;
}
const EarningsList = ({ userId }: Props) => {
  const { earnings, error } = useEarnings(userId);

  return (
    <div>
      {(error || !earnings) && <Text>{error}</Text>}
      {!error && earnings && (
        <TableContainer>
          <Table variant='simple'>
            <TableCaption>Earnings for user {userId}</TableCaption>
            <Thead>
              <Tr>
                <Th>DateTim</Th>
                <Th>Username</Th>
                <Th>Provision Xrd</Th>
                <Th>Action</Th>
                <Th>Token Name</Th>
                <Th>Token Symbol</Th>
                <Th>Amount Token</Th>
                <Th>Amount Xrd</Th>
              </Tr>
            </Thead>
            <Tbody>
              {earnings.map((earning) => (
                <Tr>
                  <Td>{earning.createdDate}</Td>
                  <Td>{earning.userName}</Td>
                  <Td>{formatDecimalString(earning.provisionXrd)}</Td>
                  <Td>{earning.action}</Td>
                  <Td>{earning.tokenName}</Td>
                  <Td>{earning.tokenSymbol}</Td>
                  <Td>{formatDecimalString(earning.amountToken)}</Td>
                  <Td>{formatDecimalString(earning.amountXrd)}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>DateTim</Th>
                <Th>Username</Th>
                <Th>Provision Xrd</Th>
                <Th>Action</Th>
                <Th>Token Name</Th>
                <Th>Token Symbol</Th>
                <Th>Amount Token</Th>
                <Th>Amount Xrd</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default EarningsList;

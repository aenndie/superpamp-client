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
                <Th>Action</Th>
                <Th>Token Name</Th>
                <Th>Token Symbol</Th>
                <Th>Amount Token</Th>
                <Th>Amount Xrd</Th>
                <Th>Provision Xrd</Th>
              </Tr>
            </Thead>
            <Tbody>
              {earnings.map((earning) => (
                <Tr>
                  <Td>{earning.createdDate}</Td>
                  <Td>{earning.action}</Td>
                  <Td>{earning.tokenName}</Td>
                  <Td>{earning.tokenSymbol}</Td>
                  <Td>{earning.amountToken}</Td>
                  <Td>{earning.amountXrd}</Td>
                  <Td>{earning.provisionXrd}</Td>
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

export default EarningsList;

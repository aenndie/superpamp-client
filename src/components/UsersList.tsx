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
import formatDecimalString from "../misc/format";
import { useUsers } from "../hooks/useUser";

const UsersList = () => {
  const { users, error } = useUsers();

  return (
    <div>
      {(error || !users) && <Text>{error}</Text>}
      {!error && users && (
        <TableContainer>
          <Table variant='simple'>
            <TableCaption>Users</TableCaption>
            <Thead>
              <Tr>
                <Th>User Id</Th>
                <Th>User Name</Th>
                <Th>Earnings Component Address</Th>
                <Th isNumeric>Current Balance</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.userId}>
                  <Td>{user.userId}</Td>
                  <Td>{user.userName}</Td>
                  <Td>{user.earningsComponentAddress}</Td>
                  <Td>{formatDecimalString(user.currentBalance)}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>User Id</Th>
                <Th>User Name</Th>
                <Th>Earnings Component Address</Th>
                <Th isNumeric>Current Balance</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default UsersList;

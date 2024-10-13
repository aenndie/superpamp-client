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
import { Link } from "react-router-dom";

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
                <Th>User </Th>
                <Th>Earnings Component Address</Th>
                <Th isNumeric>Current Balance</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.userId}>
                  <Td>
                    <Link to={`/user/${user.userId}`}>
                      {user.userName} ({user.userId})
                    </Link>
                  </Td>
                  <Td></Td>
                  <Td>{user.earningsComponentAddress}</Td>
                  <Td>{formatDecimalString(user.currentBalance)}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>User</Th>
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

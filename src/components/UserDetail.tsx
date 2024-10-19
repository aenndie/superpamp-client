import { useParams } from "react-router-dom";
import {
  Box,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useUser from "../hooks/useUser";
import EarningsList from "./EarningsList";
import TradesList from "./TradesList";
import TokenHolderList from "./TokenHolderList";
import formatDecimalString from "../misc/format";

const UserDetail = () => {
  const params = useParams();
  const { user, error } = useUser(params.userid!);
  console.log("params:", params);

  return (
    <div>
      {(error || !user) && <Text>{error}</Text>}
      {!error && user && (
        <>
          <Tabs>
            <TabList>
              <Tab>Properties</Tab>
              <Tab>Earnings</Tab>
              <Tab>Trades</Tab>
              <Tab>Holders</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
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
                        <Td>User Id</Td>
                        <Td>{user.userId}</Td>
                      </Tr>
                      <Tr>
                        <Td>User Name</Td>
                        <Td>{user.userName}</Td>
                      </Tr>
                      <Tr>
                        <Td>Created</Td>
                        <Td>{user.dateTime}</Td>
                      </Tr>
                      <Tr>
                        <Td>Component Address Earnings</Td>
                        <Td>{user.earningsComponentAddress}</Td>
                      </Tr>
                      <Tr>
                        <Td>Current Balance</Td>
                        <Td>{formatDecimalString(user.currentBalance)}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel>
                <Box minWidth='1200px'>
                  <EarningsList
                    key={`earnings-${user.userId}`}
                    userId={user.userId}
                  ></EarningsList>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box minWidth='1200px'>
                  <TradesList
                    key={`trades-per-user${user.userId}`}
                    endpointName='tradesperuser'
                    qualifier={user.userId.toString()}
                    subscription='SubscribeToTradeForUser'
                    listening='ReceiveNewTradeForUser'
                    unsubscription='UnsubscribeFromTradeForUser'
                  ></TradesList>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box minWidth='1200px'>
                  <TokenHolderList
                    endpointName='holdersperuser'
                    qualifier={user.userId}
                    subscription=''
                    listening=''
                    unsubscription=''
                  ></TokenHolderList>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </div>
  );
};
export default UserDetail;

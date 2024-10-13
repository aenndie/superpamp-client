import { useParams } from "react-router-dom";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import useUser from "../hooks/useUser";
import EarningsList from "./EarningsList";
import TradesList from "./TradesList";
import TokenHolderList from "./TokenHolderList";

const UserDetail = () => {
  const params = useParams();
  const { user, error } = useUser(params.userid!);
  console.log("params:", params);

  return (
    <div>
      {(error || !user) && <Text>{error}</Text>}
      {!error && user && (
        <>
          <Text>{user.userId}</Text>
          <Text>{user.userName}</Text>
          <Text>{user.earningsComponentAddress}</Text>
          <Text>{user.currentBalance}</Text>
          <Tabs>
            <TabList>
              <Tab>Earnings</Tab>
              <Tab>Trades</Tab>
              <Tab>Holders</Tab>
            </TabList>
            <TabPanels>
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

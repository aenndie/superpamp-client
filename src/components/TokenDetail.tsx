import { useParams } from "react-router-dom";
import { useToken } from "../hooks/useTokens";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import TradesList from "./TradesList";
import TokenHolderList from "./TokenHolderList";

const TokenDetail = () => {
  const params = useParams();
  const { token, error } = useToken(params.address!);

  return (
    <div>
      {(error || !token) && <Text>{error}</Text>}
      {!error && token && (
        <>
          <Text>{token.componentAddress}</Text>
          <Text>{token.description}</Text>
          <Text>{token.imageUrl ?? "-"}</Text>
          <Text>{token.iconUrl ?? "-"}</Text>
          <Tabs align='start'>
            <TabList>
              <Tab>Trades</Tab>
              <Tab>Holder</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box minWidth='1200px'>
                  <TradesList
                    key={`trades-per-token${token.id}`}
                    endpointName='trades'
                    subscription='SubscribeToTradeForToken'
                    listening='ReceiveNewTradeForToken'
                    unsubscription='UnsubscribeFromTradeForToken'
                    qualifier={token.id}
                  ></TradesList>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box minWidth='1200px'>
                  <TokenHolderList
                    endpointName='holderspertoken'
                    qualifier={token.id}
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

export default TokenDetail;

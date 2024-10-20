import { useParams } from "react-router-dom";
import { useToken } from "../hooks/useTokens";
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
import TradesList from "./TradesList";
import TokenHolderList from "./TokenHolderList";
import formatDecimalString from "../misc/format";
import useTokenSubscription from "../hooks/useTokenSubscription";

const TokenDetail = () => {
  const params = useParams();
  const { tokenOrig, error } = useToken(params.address!);
  const token = useTokenSubscription(tokenOrig);

  return (
    <div>
      {(error || !tokenOrig) && <Text>{error}</Text>}
      {!error && token && (
        <>
          <Tabs align='start'>
            <TabList>
              <Tab>Properties</Tab>
              <Tab>Trades</Tab>
              <Tab>Holder</Tab>
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
                        <Td>Resource Address</Td>
                        <Td>{token.id}</Td>
                      </Tr>
                      <Tr>
                        <Td>Name</Td>
                        <Td>{token.name}</Td>
                      </Tr>
                      <Tr>
                        <Td>Symbol</Td>
                        <Td>{token.symbol}</Td>
                      </Tr>
                      <Tr>
                        <Td>Description</Td>
                        <Td>{token.description}</Td>
                      </Tr>
                      <Tr>
                        <Td>Component Address</Td>
                        <Td>{token.componentAddress}</Td>
                      </Tr>
                      <Tr>
                        <Td>Image</Td>
                        <Td>{token.imageUrl}</Td>
                      </Tr>
                      <Tr>
                        <Td>Icon</Td>
                        <Td>{token.iconUrl}</Td>
                      </Tr>
                      <Tr>
                        <Td>Remaining Tokens</Td>
                        <Td>{formatDecimalString(token.tokenRemaining)}</Td>
                      </Tr>
                      <Tr>
                        <Td>Sold Tokens</Td>
                        <Td>{formatDecimalString(token.tokenSold)}</Td>
                      </Tr>
                      <Tr>
                        <Td>Latest Mcap Pool</Td>
                        <Td>{formatDecimalString(token.latestMcapPool)}</Td>
                      </Tr>
                      <Tr>
                        <Td>Latest Mcap Bonding</Td>
                        <Td>{formatDecimalString(token.latestMcapBonding)}</Td>
                      </Tr>
                      <Tr>
                        <Td>Latest Price Bonding</Td>
                        <Td>{formatDecimalString(token.latestPriceBonding)}</Td>
                      </Tr>
                      <Tr>
                        <Td>Latest Price Pool</Td>
                        <Td>{formatDecimalString(token.latestPricePool)}</Td>
                      </Tr>
                      <Tr>
                        <Td>Bonding Progress</Td>
                        <Td>
                          {formatDecimalString(
                            (
                              parseFloat(token.bondingProgress) * 100.0
                            ).toString()
                          )}{" "}
                          %
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
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

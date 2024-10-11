import { useParams } from "react-router-dom";
import { useToken } from "../hooks/useTokens";
import { Text } from "@chakra-ui/react";
import TradesList from "./TradesList";

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
          <TradesList
            key={token.id}
            endpointName='trades'
            qualifier={token.id}
          ></TradesList>
        </>
      )}
    </div>
  );
};

export default TokenDetail;

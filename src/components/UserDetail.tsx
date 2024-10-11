import { useParams } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import useUser from "../hooks/useUser";
import EarningsList from "./EarningsList";
import TradesList from "./TradesList";

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
          <EarningsList
            key={`earnings-${user.userId}`}
            userId={user.userId}
          ></EarningsList>
          <TradesList
            key={`trades-per-user${user.userId}`}
            endpointName='tradesperuser'
            qualifier={user.userId.toString()}
            subscription='SubscribeToTradeForUser'
            listening='ReceiveNewTradeForUser'
            unsubscription='UnsubscribeFromTradeForUser'
          ></TradesList>
        </>
      )}
    </div>
  );
};
export default UserDetail;

import { SimpleGrid, Text } from "@chakra-ui/react";
import useTokens from "../hooks/useTokens";
import TokenCard from "./TokenCard";

const TokenGrid = () => {
  const { tokens, error } = useTokens();

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{
          sm: 1,
          md: 2,
          lg: 3,
          xl: 5,
        }}
        spacing='10'
        padding='10px'
      >
        {tokens.map((token) => (
          <TokenCard key={token.id} tokenOrig={token} /> //
        ))}
      </SimpleGrid>
    </>
  );
};

export default TokenGrid;

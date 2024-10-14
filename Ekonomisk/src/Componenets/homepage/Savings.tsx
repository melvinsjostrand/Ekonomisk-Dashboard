import { Box, Text, Progress } from "@chakra-ui/react";
import useSavings from "../hooks/useSavings";
import useUserId from "../hooks/UseGetUser";

const Savings = () => {
  const { data : userId} = useUserId();
  const { data, isLoading, error } = useSavings(userId);
  console.log(JSON.stringify(data));
  if (isLoading) return <Text textAlign="center">Loading...</Text>;
  if (error  || !data || !data.savings) return <Text textAlign="center">No savings added</Text>;

  const savings = data.savings || { totalSaved: 0, saveGoal: 0, prevsave: 0 }; // Provide default values


  const savingPercentage = savings.saveGoal ? (savings.totalSaved / savings.saveGoal) * 100 : 0;
  console.log(JSON.stringify(data.username));
  return (
    <Box>
      <Box border="1px">
        <Text textAlign="center">{data.username}</Text>
        <Text textAlign="center" fontWeight="bold">
          Savings
        </Text>

        <Box position="relative" display="inline-block" width="100%">
          <Progress
            value={savingPercentage}
            colorScheme="green"
            size="lg"
            hasStripe
            isAnimated
            borderRadius="md"
          />
          <Text
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            fontWeight="bold"
            color="white"
          >
            {savings.totalSaved} / {savings.saveGoal}
          </Text>
        </Box>
        <Text textAlign="center">Savings previously: {savings.prevsave}</Text>
      </Box>
    </Box>
  );
};

export default Savings;

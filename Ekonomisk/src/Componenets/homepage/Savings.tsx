import { Box, Text, Progress} from "@chakra-ui/react";
import useSavings from "../hooks/useSavings";


const Savings = () => {
  const { data, isLoading, error } = useSavings();

  if (isLoading) return <Text textAlign="center">Loading...</Text>;
  if (error || !data) return <Text textAlign="center">No savings added</Text>;

  const { totalSaved, saveGoal, prevsave } = data.savings;
  const savingPercentage = (totalSaved / saveGoal) * 100;
  const totalsavings = totalSaved + prevsave;


  
  return (
    <Box>
      <Box border="1px">
        <Text textAlign="center">Dan Abrahmov</Text>
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
            {totalsavings} / {saveGoal}
          </Text>
        </Box>
        <Text textAlign="center">Savings previously: {prevsave}</Text>
      </Box>
    </Box>
  );
};

export default Savings;

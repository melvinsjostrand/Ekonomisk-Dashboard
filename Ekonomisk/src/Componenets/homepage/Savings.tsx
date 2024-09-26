import { Box, Text, Progress } from "@chakra-ui/react";
import PieChart from "./PieChart";
import useSavings from "../hooks/useSavings"; // Adjust the import according to your file structure

const Savings = () => {
  const { data, isLoading, error } = useSavings(); // Use the hook

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">{`Error: ${error.message}`}</Text>;

  const { totalSaved, saveGoal, payments, prevsave } = data!; 

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
      <PieChart payments={payments} />
    </Box>
  );
};

export default Savings;

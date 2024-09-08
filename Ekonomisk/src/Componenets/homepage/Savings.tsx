import { Box,Text,Progress } from '@chakra-ui/react';
import PieChart from './PieChart';


interface Props {
  userName: string;
  totalSaved: number;
  saveGoal: number;
  payments: { category: string; amount: number }[];
}

const Savings = ({totalSaved, saveGoal, payments }: Props) => {

  const savingPercentage = (totalSaved / saveGoal) * 100;
  return (
    <Box>
      <Box border="1px">
        <Text textAlign="center">Dan Abrahmov </Text>
        <Text textAlign="center" textStyle="bold">
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
            {totalSaved} / {saveGoal}
          </Text>
        </Box>
      </Box>
      <PieChart payments={payments} />
    </Box>
  );
};

export default Savings
import { Box, Progress, Text, useBreakpointValue } from "@chakra-ui/react";
import UseLimits from "../hooks/UseLimits";
import { Expense } from "../hooks/UseExpense";

type Limit = {
  category: string,
  spendLimit: number
}

const normalizeCategory = (category: string) => {
  const categoryMap: { [key: string]: string } = {
    Housing: "Housing",
    Transport: "Transport",
    Food: "Food",
    Health: "Health",
    Entertainment: "Entertainment",
    Accessories: "Accessories",
    Other: "Other",
  };

  return categoryMap[category] || category;
};

const MaxSpent = ({ expenses }: { expenses: Expense[] }) => {
  const { data: userLimitsData } = UseLimits();

  const defaultLimits = [
    { category: "Housing", spendLimit: 0 },
    { category: "Transport", spendLimit: 0 },
    { category: "Food", spendLimit: 0 },
    { category: "Health", spendLimit: 0 },
    { category: "Entertainment", spendLimit: 0 },
    { category: "Accessories", spendLimit: 0 },
    { category: "Other", spendLimit: 0 },
  ];


  const limits: Limit[] = Array.isArray(userLimitsData)?userLimitsData: defaultLimits;

  const textSize = useBreakpointValue({ base: "sm", md: "md" });
  const progressSize = useBreakpointValue({ base: "md", md: "lg" });

  if (!expenses) {
    return (
      <Box>
        <Text>Error loading data, displaying default values:</Text>
      </Box>
    );
  }

  const aggregatedSpending: { [key: string]: number } = expenses.reduce(
    (acc, item) => {
      const normalizedCategory = normalizeCategory(item.category);
      acc[normalizedCategory] = (acc[normalizedCategory] || 0) + item.amount;
      return acc;
    },
    {} as { [key: string]: number }
  );

  return (
    <Box width="100%" px={{ base: 4, md: 6 }} py={{ base: 2, md: 4 }}>
      {limits.map((limitObj, index) => {
        const category = normalizeCategory(limitObj.category); 
        const spent = aggregatedSpending[category] || 0; 
        const percentage =
          limitObj.spendLimit > 0 ? (spent / limitObj.spendLimit) * 100 : 0; 

        return (
          <Box key={index} position="relative" mb={5} width="100%">
            <Text mb={2} fontWeight="bold" fontSize={textSize}>
              {category}: {spent} kr / {limitObj.spendLimit} kr
            </Text>

            <Box position="relative">
              <Progress
                value={percentage}
                colorScheme={
                  percentage > 100
                    ? "red"
                    : percentage > 75
                    ? "yellow"
                    : "green"
                }
                size={progressSize}
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
                color="#3d3d3d"
                fontSize={textSize}
              >
                {Math.round(percentage)}%
              </Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default MaxSpent;

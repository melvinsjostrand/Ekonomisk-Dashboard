import { Box, Progress, Text, useBreakpointValue } from "@chakra-ui/react";
import UseExpense from "../hooks/UseExpense";
import UseLimits from "../hooks/UseLimits";

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

const MaxSpent = () => {
  // Fetch spending and limits using hooks
  const {
    data: useExpense,
    isLoading: spendingLoading,
    error: spendingError,
  } = UseExpense();
  const {
    data: userLimitsData,
    isLoading: limitsLoading,
    error: limitsError,
  } = UseLimits();

  // Handle loading and error states
  if (spendingLoading || limitsLoading) return <div>Loading...</div>;
  if (spendingError || limitsError) return <div>Error loading data</div>;

  // Destructure fetched data
  const spending = useExpense?.payments || [];
  const limits = userLimitsData?.limits || [];

  // Aggregate spending based on category
  const aggregatedSpending: { [key: string]: number } = spending.reduce(
    (acc, item) => {
      const normalizedCategory = normalizeCategory(item.category);
      acc[normalizedCategory] = (acc[normalizedCategory] || 0) + item.amount;
      return acc;
    },
    {} as { [key: string]: number }
  );

  const textSize = useBreakpointValue({ base: "sm", md: "md" });
  const progressSize = useBreakpointValue({ base: "md", md: "lg" });

  return (
    <Box width="100%" px={{ base: 4, md: 6 }} py={{ base: 2, md: 4 }}>
      {limits.map((limitObj, index) => {
        const category = normalizeCategory(limitObj.category);
        const spent = aggregatedSpending[category] || 0;
        const percentage = (spent / limitObj.spendLimit) * 100;

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

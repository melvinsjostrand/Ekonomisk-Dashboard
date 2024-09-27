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

  if (spendingLoading || limitsLoading) return <div>Loading...</div>;
  if (spendingError || limitsError) {
    // Show MaxSpent with default values if there's an error
    return (
      <Box>
        <Text>Error loading data, displaying default values:</Text>
      </Box>
    );
  }

  const spending = useExpense?.payments || [];
  const limits = userLimitsData?.limits || [];

  // Fallback to default values
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

  // Ensure that default limits are displayed even if no limits are fetched
  const defaultLimits = [
    { category: "Housing", spendLimit: 0 },
    { category: "Transport", spendLimit: 0 },
    { category: "Food", spendLimit: 0 },
    { category: "Health", spendLimit: 0 },
    { category: "Entertainment", spendLimit: 0 },
    { category: "Accessories", spendLimit: 0 },
    { category: "Other", spendLimit: 0 },
  ];

  const displayLimits = limits.length > 0 ? limits : defaultLimits;

  return (
    <Box width="100%" px={{ base: 4, md: 6 }} py={{ base: 2, md: 4 }}>
      {displayLimits.map((limitObj, index) => {
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

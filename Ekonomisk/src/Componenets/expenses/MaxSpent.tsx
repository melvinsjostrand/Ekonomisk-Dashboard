import { Box, Progress, Text, useBreakpointValue } from "@chakra-ui/react";
interface Props {
  spending: { category: string; amount: number }[];
  limits: { [key: string]: number };
}

const normalizeCategory = (category: string) => {
  const categoryMap: { [key: string]: string } = {
      "Housing":"Housing",
      "Transport":"Transport",
      "Food":"Food",
      "Health":"Health",
      "Entertainment":"Entertainment",
      "Accessories":"Accessories",
      "Other":"Other"
  };

  return categoryMap[category] || category;
};

const MaxSpent = ({ spending, limits }: Props) => {
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
      {Object.entries(limits).map(([category, limit], index) => {
        const spent = aggregatedSpending[category] || 0;
        const percentage = (spent / limit) * 100;

        return (
          <Box key={index} position="relative" mb={5} width="100%">
            <Text mb={2} fontWeight="bold" fontSize={textSize}>
              {category}: {spent} kr / {limit} kr
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

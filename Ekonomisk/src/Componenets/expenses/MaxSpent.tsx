import { Box, Progress, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  spending: { category: string; amount: number }[];
  limits: { [key: string]: number };
}

const normalizeCategory = (category: string) => {
  const categoryMap: { [key: string]: string } = {
    "Mat och dagligvaror": "Matochdagligvaror",
    "Kläder och accessoarer": "Kläderochaccessoarer",
    "Hälsa och välmående": "Hälsaochvälmående",
    "Fritid och underhållning": "Fritidochunderhållning",
    // Add more mappings if necessary
  };

  return categoryMap[category] || category;
};

const MaxSpent = ({ spending, limits }: Props) => {
  // Group spending by normalized categories
  const aggregatedSpending: { [key: string]: number } = spending.reduce(
    (acc, item) => {
      const normalizedCategory = normalizeCategory(item.category);
      acc[normalizedCategory] = (acc[normalizedCategory] || 0) + item.amount;
      return acc;
    },
    {} as { [key: string]: number }
  );

  return (
    <Box width="100%">
      {Object.entries(limits).map(([category, limit], index) => {
        const spent = aggregatedSpending[category] || 0;
        const percentage = (spent / limit) * 100;

        return (
          <Box key={index} position="relative" mb={5}>
            <Text mb={2} fontWeight="bold">
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
                color="#3d3d3d"
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

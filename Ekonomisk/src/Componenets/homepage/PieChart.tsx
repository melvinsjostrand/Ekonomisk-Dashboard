import { Pie } from "react-chartjs-2";
import { Box,Text } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import categoryColors from "../hooks/categoryColors";
import { Expense } from "../hooks/Inferfaces";

ChartJS.register(ArcElement, Tooltip, Legend);


const PieChart = ({ expenses }: { expenses: Expense[] }) => {
  console.log(expenses);

  if (!expenses || expenses.length === 0) {
    return <Text>No payments available</Text>;
  }

  const aggregatedPayments = expenses.reduce((acc, { category, amount }) => {
    if (acc[category]) {
      acc[category] += amount;
    } else {
      acc[category] = amount;
    }
    return acc;
  }, {} as Record<string, number>);

  const labels = Object.keys(aggregatedPayments);
  const dataValues = Object.values(aggregatedPayments);

  const backgroundColors = labels.map(
    (category) => categoryColors[category] || "#CCCCCC"
  );
  const borderColors = backgroundColors.map((color) =>
    color.replace("0.2", "1")
  );

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      width={{ base: "100%", sm: "400px" }}
      height={{ base: "auto", sm: "400px" }}
    >
      <Pie data={data} />
    </Box>
  );
};

export default PieChart;

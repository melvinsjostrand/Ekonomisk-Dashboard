import React from "react";
import { Pie } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Pay {
  category: string;
  amount: number;
}

interface PieChartProps {
  payments: Pay[];
}

const PieChart: React.FC<PieChartProps> = ({payments}) => {

    const aggregatedPayments = payments.reduce((acc, { category, amount }) => {
      if (acc[category]) {
        acc[category] += amount;
      } else {
        acc[category] = amount;
      }
      return acc;
    }, {} as Record<string, number>);

    
  const labels = Object.keys(aggregatedPayments);
  const dataValues = Object.values(aggregatedPayments);

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "rgba(76, 175, 80, 0.2)",
          "rgba(255, 152, 0, 0.2)",
          "rgba(33, 150, 243, 0.2)",
          "rgba(244, 67, 54, 0.2)",
          "rgba(156, 39, 176, 0.2)",
          "rgba(255, 193, 7, 0.2)",
          "rgba(0, 188, 212, 0.2)",
          "rgba(139, 195, 74, 0.2)",
        ],
        borderColor: [
          "rgba(76, 175, 80, 1)",
          "rgba(255, 152, 0, 1)",
          "rgba(33, 150, 243, 1)",
          "rgba(244, 67, 54, 1)",
          "rgba(156, 39, 176, 1)",
          "rgba(255, 193, 7, 1)",
          "rgba(0, 188, 212, 1)",
          "rgba(139, 195, 74, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    
    <Box width={400} height={400}>
      <Pie data={data} />
    </Box>
  );
};

export default PieChart;

import { useMutation } from "@tanstack/react-query";
import apiClient from "./apiClient";
import { ChangeValueProps } from "./Inferfaces";

// Hook to handle updating income limits using PUT
const PutUpdateExpense = () => {
  const guid = localStorage.getItem("Guid");
  return useMutation({
    mutationFn: (data: ChangeValueProps) =>
      apiClient
        .put<ChangeValueProps>(`/Expenses/Expense?expenseId=${data.id}`, data, {
          headers: {
            Authorization: guid,
          },
        })
        .then((res) => res.data),
  });
};

export default PutUpdateExpense;

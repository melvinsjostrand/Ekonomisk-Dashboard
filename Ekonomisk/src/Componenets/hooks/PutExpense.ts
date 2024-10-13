import { useMutation } from "@tanstack/react-query";
import apiClient from "./apiClient";
import { ChangeValueProps } from "./Inferfaces";

// Hook to handle updating income limits using PUT
const PutUpdateExpense = () => {
  return useMutation({
    mutationFn: (data: ChangeValueProps) =>
      apiClient
        .put<ChangeValueProps>(`/Expenses/Expense?expenseId=${data.id}`, data)
        .then((res) => res.data),
  });
};

export default PutUpdateExpense;

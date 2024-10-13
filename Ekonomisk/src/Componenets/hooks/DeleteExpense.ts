import { useMutation } from "@tanstack/react-query";
import apiClient from "./apiClient";

// Hook to handle deleting an expense using DELETE
const DeleteExpense = () => {
  return useMutation({
    mutationFn: (expenseId: number) =>
      apiClient
        .delete(`/Expenses?expenseId=${expenseId}`)
        .then((res) => res.data),
  });
};

export default DeleteExpense;

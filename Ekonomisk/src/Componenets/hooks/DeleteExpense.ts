import { useMutation } from "@tanstack/react-query";
import apiClient from "./apiClient";


const DeleteExpense = () => {
  const guid = localStorage.getItem("Guid");
  return useMutation({
    mutationFn: (expenseId: number) =>
      apiClient
        .delete(`/Expenses?expenseId=${expenseId}`, {
          headers: {
            Authorization: guid,
          },
        })
        .then((res) => res.data),
  });
};

export default DeleteExpense;

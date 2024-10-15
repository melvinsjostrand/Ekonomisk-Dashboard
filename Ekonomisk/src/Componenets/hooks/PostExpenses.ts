import { useMutation } from "@tanstack/react-query";
import apiClient from "./apiClient";
import { Post } from "./Inferfaces";

const usePostExpense = () => {
  const guid = localStorage.getItem("Guid");
  return useMutation({
    mutationFn: (data: Post) =>
      apiClient
        .post<Post>("/Expenses/ExpenseImage", data, {
          headers: {
            Authorization: guid,
          },
        })
        .then((res) => res.data),
  });
};

export default usePostExpense;

import { useMutation } from "@tanstack/react-query";
import apiClient from "./apiClient";
import { Post } from "./Inferfaces";

const usePostExpense = () => {
  return useMutation({
    mutationFn: (data: Post) =>
      apiClient.post<Post>("/url", data).then((res) => res.data),
  });
};

export default usePostExpense;

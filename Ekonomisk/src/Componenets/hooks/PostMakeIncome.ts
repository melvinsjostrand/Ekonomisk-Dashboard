import { useMutation } from "@tanstack/react-query";
import apiClient from "./apiClient";
import { IncomeData } from "./Inferfaces";

const PostmakeIncome = () => {
  const guid = localStorage.getItem("Guid");
  return useMutation({
    mutationFn: (data: IncomeData) =>
      apiClient
        .post<IncomeData>("/Limits/PostIncomeLimits", data, {
          headers: {
            Authorization: guid,
          },
        })
        .then((res) => res.data),
  });
};

export default PostmakeIncome;

import { useMutation } from "@tanstack/react-query";
import apiClient from "./apiClient";
import { CreateAccountData } from "./Inferfaces";

const useCreateAcc = () => {
  return useMutation({
    mutationFn: (data: CreateAccountData) =>
      apiClient.post<CreateAccountData>("/User", data).then((res) => res.data),
  });
};
export default useCreateAcc;

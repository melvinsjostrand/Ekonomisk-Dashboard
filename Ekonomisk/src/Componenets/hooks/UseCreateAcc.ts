import { useMutation, UseMutationResult } from "@tanstack/react-query";
import apiClient from "./apiClient";
import { CreateAccountData } from "./Inferfaces";
import { CreateAccountResponse } from "./Inferfaces";

const useCreateAccount = (): UseMutationResult<
  CreateAccountResponse,
  Error,
  CreateAccountData
> => {
  const postCreateAccountData = (data: CreateAccountData) => {
    return apiClient
      .post<CreateAccountResponse>("url/register", data)
      .then((res) => res.data)
      .catch((error) => {
        throw error; 
      });
  };

  return useMutation<CreateAccountResponse, Error, CreateAccountData>({
    mutationFn: postCreateAccountData,
    onSuccess: (data) => {
      if (data.success) {
        console.log("Account created successfully.");
      } else {
        console.error("Account creation failed.");
      }
    },
    onError: (error) => {
      console.error("Error creating account:", error);
    },
  });
};

export default useCreateAccount;

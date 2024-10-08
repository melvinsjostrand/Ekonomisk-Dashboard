import { useMutation, UseMutationResult } from "@tanstack/react-query";
import apiClient from "./apiClient"; 

import { LoginData } from "./Inferfaces";
import { LoginResponse } from "./Inferfaces";

const useLogin = (): UseMutationResult<LoginResponse, Error, LoginData> => {
  const postLoginData = (loginData: LoginData) => {
    return apiClient
      .post<LoginResponse>("url/login", loginData)
      .then((res) => res.data) 
      .catch((error) => {
        throw error; 
      });
  };

  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: postLoginData,
    onSuccess: (data) => {
      console.log("Login successful, GUID:", data.guid);
      localStorage.setItem("guid", data.guid);
    },
    onError: (error) => {
      console.error("Error logging in:", error);
    },
  });
};

export default useLogin;

import { useMutation } from "@tanstack/react-query";
import apiClient from "./apiClient";
import { LoginResponse } from "./Inferfaces";

const useLogin = () => {
  const login = (credentials: { email: string; password: string }) => {
    const encodedCredentials = btoa(
      `${credentials.email}:${credentials.password}`
    );

    return apiClient
      .get<LoginResponse>("/User/Login", {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      })
      .then((res) => {
        console.log(res.data.key);
        console.log("res: " + res);
        console.log(res.data);
        if (res.data.token) {
          localStorage.setItem("authToken", res.data.token);
        }
        return res.data;
      });
  };
  return useMutation({
    mutationFn: login,
  });
};

export default useLogin;

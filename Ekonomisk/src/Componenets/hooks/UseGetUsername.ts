import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";

export const useUserName = (userId: number) => {
  const guid = localStorage.getItem("Guid");

  const getUser = () => {
    if (!guid) {
      return Promise.reject(new Error("GUID not found in localStorage"));
    }

    return apiClient
      .get("/Expenses/Username?userId=" + userId, {
        headers: {
          Authorization: guid,
        },
      })
      .then((response) => response.data);
  };

  const {data, isLoading, isError} = useQuery({
    queryKey: ["username", guid],
    queryFn: getUser,
    enabled: !!guid && !!userId
  });
  return {data, isLoading, isError}
};

export default useUserName;
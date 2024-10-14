import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";

export const useUserId = () => {
  const guid = localStorage.getItem("Guid");

  const getUser = () => {
    if (!guid) {
      return Promise.reject(new Error("GUID not found in localStorage"));
    }

    return apiClient
      .get("/User/VerifyUserId", {
        headers: {
          Authorization: guid,
        },
      })
      .then((response) => response.data); 
  };

  const {data, isLoading, isError} = useQuery({
    queryKey: ["userId", guid], 
    queryFn: getUser, 
    enabled: !!guid
  });
  return {data, isLoading, isError}
};

export default useUserId;
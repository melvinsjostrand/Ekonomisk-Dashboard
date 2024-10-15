import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";
import { limit } from "./Inferfaces";

const UseLimits = (userId: number) => {
  const guid = localStorage.getItem("Guid");
  const fetchLimits = () =>
    apiClient
      .get<limit>("/Limits?userId=" + userId, {
        headers: {
          Authorization: guid,
        },
      })
      .then((res) => res.data);

  return useQuery<limit, Error>({
    queryKey: ["UseLimits"],
    queryFn: fetchLimits,
  });
};

export default UseLimits;

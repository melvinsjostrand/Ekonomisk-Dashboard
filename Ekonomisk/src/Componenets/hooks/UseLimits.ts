import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";
import { limit } from "./Inferfaces";

const UseLimits = (userId: number) => {
  const fetchLimits = () =>
    apiClient.get<limit>("/Limits?userId=" + userId).then((res) => res.data);

  return useQuery<limit, Error>({
    queryKey: ["UseLimits"],
    queryFn: fetchLimits,
  });
};

export default UseLimits;

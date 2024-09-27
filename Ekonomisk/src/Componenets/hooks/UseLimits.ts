

import { limit } from "./UseGetIncome";
import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";


interface LimitProps {
    userId:number,
    limits: limit[],
}


const UseLimits = () => {
  const fetchLimits = () =>
    apiClient.get<LimitProps>("API").then((res) => res.data);

    return useQuery<LimitProps, Error>({
      queryKey: ["UseLimits"],
      queryFn: fetchLimits
    })
};

export default UseLimits;

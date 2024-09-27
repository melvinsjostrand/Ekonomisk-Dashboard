

import { limit } from "./UseGetIncome";
import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";


interface LimitProps {
    userId:number,
    limits: limit[],
}


const UseLimits = (userId:number) => {
  const fetchLimits = () =>
    apiClient.get<LimitProps>("Limits?userId=" + 1).then((res) => res.data);
  
    return useQuery<LimitProps, Error>({
      queryKey: ["UseLimits"],
      queryFn: fetchLimits
    })
};

export default UseLimits;

import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";

interface LimitProps {
  userId:number,
  category: string;
  spendLimit: number;
}

export interface limit {

}
const UseLimits = () => {
  const fetchLimits = () =>
    apiClient.get<LimitProps>("/Limits?userId="+1).then((res) => res.data);

    return useQuery<LimitProps, Error>({
      queryKey: ["UseLimits"],
      queryFn: fetchLimits
    })
};

export default UseLimits;

import { useQuery } from "@chakra-ui/react";
import axios from "axios";
import { limit } from "./UseGetIncome";


interface LimitProps {
    userId:number,
    limits: limit[],
}


const UseLimits = () => {
  const fetchLimits = () =>
    axios.get<LimitProps>("API").then((res) => res.data);

  return useQuery<LimitProps>({
    queryKey: ["UseLimits"],
    queryFn: fetchLimits,
  });
};

export default UseLimits;

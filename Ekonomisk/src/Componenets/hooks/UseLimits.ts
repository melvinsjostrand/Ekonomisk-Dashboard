
import axios from "axios";
import { limit } from "./UseGetIncome";
import { useQuery } from "@tanstack/react-query";


interface LimitProps {
    userId:number,
    limits: limit[],
}


const UseLimits = () => {
  const fetchLimits = () =>
    axios.get<LimitProps>("API").then((res)=> res.data);

    return useQuery<LimitProps, Error>({
      queryKey: ["UseLimits"],
      queryFn: fetchLimits
    })
};

export default UseLimits;

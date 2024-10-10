import { useMutation} from "@tanstack/react-query";
import apiClient from "./apiClient";
import { IncomeData } from "./Inferfaces";


const PostmakeIncome = () => {
  return useMutation({
    mutationFn: (data:IncomeData) => 
      apiClient.post<IncomeData>("/PostIncomeLimits", data).then((res) => res.data)
  })
}

export default PostmakeIncome;
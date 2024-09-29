import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";
import { ExpensesProps } from "./UseBaseTable";



const UseHomepage = () => {
    const fetchHomepage = () => 
        apiClient.get<ExpensesProps>("URl").then((res) => res.data);

    return useQuery<ExpensesProps, Error>({
        queryKey:["Homepage"],
        queryFn: fetchHomepage
    })
}

export default UseHomepage;
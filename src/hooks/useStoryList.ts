import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export const useStoryList = () => {
    return useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/books`)
            return res.data
        }
    })
}
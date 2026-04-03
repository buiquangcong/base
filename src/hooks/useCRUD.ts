import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const API = "http://localhost:3000/books"

export const useCRUD = () => {
    const reload = useQueryClient()
    const navigate = useNavigate()


    const refresh = () => {
        reload.invalidateQueries({queryKey: ["books"]})
    }

    const {data: list} = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const res = await axios.get(API)
            return res.data
        }
    })

    const Add = useMutation({
        mutationFn: async (data: any) => {
            await axios.post(API, data)
        },
        onSuccess: () => {
            refresh()
            toast.success('them thanh cong')
            navigate('/list')
        },
        onError: () => {
            toast.error('them that bai')
        }
    })

    const Edit = useMutation({
        mutationFn: async (data: any) => {
            await axios.put(API, data)
        },
        onSuccess: () => {
            refresh()
            toast.success('cap nhat thanh cong')
            navigate('/list')
        },
        onError: () => {
            toast.error('cap nhat that bai')
        }
    })

    const Delete = useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`${API}/${id}`)
        },
        onSuccess: () => {
            refresh()
            toast.success('xoa thanh cong')
            navigate('/list')
        },
        onError: () => {
            toast.error('xoa that bai')
        }
        })

    return {
        list,
        Add: Add.mutate,
        Edit: Edit.mutate,
        Delete: Delete.mutate
    }
}   
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"

export const useUpdateStory= () => {
    const navigate = useNavigate()
  const { id } = useParams()
  const reload = useQueryClient()
    return useMutation({
    mutationFn: async (data) => {
      await axios.put(`http://localhost:3000/books/${id}`, data)
    },
    onSuccess: () => {
        reload.invalidateQueries({queryKey: ['books', id]})
      toast.success('sua thanh cong')
      navigate('/list')
    },
    onError: () => {
      toast.error('sua that bai')
    }
  })
}
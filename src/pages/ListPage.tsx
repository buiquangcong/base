import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image, Table, Button, Popconfirm, Space } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function ListPage() {
  const navigate = useNavigate()
  const {data, isLoading} = useQuery({
    queryKey: ['books'],
    queryFn: () => axios.get('http://localhost:3000/books').then((res)=> res.data)
  })
  const reload = useQueryClient()
  const {mutate} = useMutation({
    mutationFn: async(id: number) => {
      await axios.delete(`http://localhost:3000/books/${id}`)
    },
    onSuccess: () => {
      toast.success('xoa thanh cong')
      reload.invalidateQueries({queryKey: ['books']})
    },
    onError: () => {
      toast.error('xoa that bai')
    }

  })

  const columns = [
    {
      title: "ten sach",
      dataIndex: "title",
      key: "title"
    },
    {
      title:"so luong",
      dataIndex: "quantity",
      key: "quantity"
    },
    {
      title:"anh",
      dataIndex: "coverImage",
      key: "coverImage",
      render: (src: string) => <Image src={src} width={50} height={50} />
    },
    {
      title:"the loai",
      dataIndex: "genre",
      key: "genre"
    },
    {
      title:"hanh dong",
      render: (record: any) => (
        <Space>
        <Popconfirm 
        title= "xoa"
        description="ban co chac chan muon xoa?"
        onConfirm={ () => mutate(record.id)}
        >
          <Button type="primary" danger>xoa</Button>  
        </Popconfirm>
        <Button type='primary' onClick={() => navigate(`/edit/${record.id}`) } >sua</Button>
        </Space>
      )
    }
  ]
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>
      <div className="overflow-x-auto">
        <Table columns={columns} dataSource={data} loading={isLoading} />
      </div>
    </div>
  );
}

export default ListPage;

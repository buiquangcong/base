import { Button, Form, Input, Select } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

interface books {
  title: string
  quantity: number
  coverImage: string
  genre: string
}

function EditPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm()

  const { data } = useQuery({
    queryKey: ['books', id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/books/${id}`)
      return res.data
    }
  })
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data, form])

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      await axios.put(`http://localhost:3000/books/${id}`, data)
    },
    onSuccess: () => {
      toast.success('sua thanh cong')
      navigate('/list')
    },
    onError: () => {
      toast.error('sua that bai')
    }
  })
  return (
    <div>
      <h1>Cập nhật</h1>
      <Form layout="vertical" form={form} className="space-y-6" onFinish={mutate}>
        {/* Text input */}
        <Form.Item label="ten sach" name="title" rules={[{ required: true }]}>
          <Input placeholder="nhap ten sach" />
        </Form.Item>
        <Form.Item label="so luong" name="quantity" rules={[{ required: true }]}>
          <Input placeholder="nhap so luong" />
        </Form.Item>
        <Form.Item label="anh" name="coverImage" rules={[{ required: true }]}>
          <Input placeholder="url anh" />
        </Form.Item>
        <Form.Item label="the loai" name="genre">
          <Input placeholder="nhap the loai" />
        </Form.Item>

        {/* Select */}
        <Form.Item label="Danh mục" name="category">
          <Select placeholder="Chọn danh mục" options={[]} />
        </Form.Item>

        {/* Submit button */}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default EditPage;

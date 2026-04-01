import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



function AddPage() {
  const navigate = useNavigate()

  const {mutate} = useMutation({
    mutationFn: async (data) => {
      await axios.post('http://localhost:3000/books', data)
    },
    onSuccess: () => {
      toast.success('them thanh cong')
      navigate('/list')
    },
    onError: () => {
      toast.error('them that bai')
    }
  })
   
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <Form layout="vertical" className="space-y-6" onFinish={mutate}>
        {/* Text input */}
        <Form.Item label="ten sach" name="title" rules={[{ required: true, min: 5}]}>
          <Input placeholder="nhap ten sach" />
        </Form.Item>
        <Form.Item label="so luong" name="quantity" rules={[{ required: true}]}>
          <Input type="number" placeholder="nhap so luong" />
        </Form.Item>
        <Form.Item label="anh " name="coverImage" rules={[{ required: true}]}>
          <Input placeholder="url anh" />
        </Form.Item>
        <Form.Item label="the loai" name="genre" rules={[{required: true}]}>
          <Input placeholder="the loai" />
        </Form.Item>  

        {/* Submit button */}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddPage;

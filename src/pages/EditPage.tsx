import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useStoryList } from "../hooks/useStoryList";
import { useParams } from "react-router-dom";
import { useCRUD } from "../hooks/useCRUD";

interface books {
  title: string
  quantity: number
  coverImage: string
  genre: string
}

function EditPage() {
  const [form] = Form.useForm()
  const {id} = useParams()
  const { data: list } = useStoryList()
  useEffect(() => {
    if (list && id) {
      const fetchBook = list.find((item: any) => item.id == id);

      if (fetchBook) {
        form.setFieldsValue(fetchBook);
      }
    }
  }, [list,id, form]) 

  const { Edit } = useCRUD()
  return (
    <div>
      <h1>Cập nhật</h1>
      <Form layout="vertical" form={form} className="space-y-6" onFinish={Edit}>
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

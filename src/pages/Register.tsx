import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/useAuthStore";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const {setUser} = useAuthStore();
    const navigate = useNavigate();

    const {mutate, isPending} = useMutation({
        mutationFn: async (value:any) => {
            return await axios.post(`http://localhost:3000/register`, value)
        },
        onSuccess: (res) => {
            setUser(res.data.user)
            localStorage.setItem("accessToken",res.data.accessToken)
            toast.success("Đăng Ký thành công")
            navigate("/login")
        },
        onError: () => {
            toast.error("Đăng Ký thất bại")
        }
    })  
    const onFinish = (value: any) => {
        mutate(value)
    }

    return (
 <Form
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 400, margin: "50px auto" }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Nhập email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Nhập password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending} block>
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
    );
};

export default Login;
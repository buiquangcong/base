import { Link } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Avatar, Switch } from "antd";
import { ThemeContext } from "../context/ThemeContext";
import { useAuthStore } from "../stores/useAuthStore";

export default function Navbar() {
    // const context = useContext(UserContext);
    const themeContext = useContext(ThemeContext);
    // if (!context) return null;
    // const { user, setUser } = context;

    const {user, setUser} = useAuthStore();
    console.log(user);

    const handleLogin = () => {
        setUser(
            {
                name: "buiquangcong",
                avatar: "https://th.bing.com/th/id/OIP.sRfvOBXwamQc5-vTYQJPFQHaIX?w=189&h=213&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
            }
        )
    }
    return (
        <nav className="bg-blue-600 text-white shadow">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="#" className="text-xl font-semibold">
                    <strong>WEB2091 App</strong>
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <Link to="#" className="hover:text-gray-200">
                        Trang chủ
                    </Link>
                    <Link to="/list" className="hover:text-gray-200">
                        Danh sách
                    </Link>
                    <Link to="/add" className="hover:text-gray-200">
                        Thêm mới
                    </Link>
                </div>

                <div className="hidden md:flex items-center space-x-6">
                    <Switch checked={themeContext?.isDarkMode} onChange={themeContext?.toggleTheme} checkedChildren="Dark" unCheckedChildren="Light" />
                    <span>User: {user?.name || "Guest"}</span>
                    <Link to="/login" onClick={handleLogin} className="hover:text-gray-200">
                        Đăng nhập
                    </Link>
                    <Link to="#" onClick={() => setUser(null)} className="hover:text-gray-200">
                        Đăng xuất
                    </Link>
                    <Link to="/register" className="hover:text-gray-200">
                        Đăng ký
                    </Link>

                </div>
            </div>
        </nav>
    );
}
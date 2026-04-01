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
                    {user ? (
                        <>
                            <span>User: {user?.name || "Guest"}</span>
                            <Link to="#" onClick={() => setUser(null)} >
                                <button className="bg-red-600 text-white px-4 py-2 rounded">Đăng xuất</button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="">
                            <button className="bg-blue-500 border text-white px-4 py-2 rounded">Đăng nhập</button>
                            </Link>
                            <Link to="/register" className="">
                            <button className="bg-white text-black px-4 py-2 rounded">Đăng ký</button>
                            </Link>
                        </>
                    )}
                    <Switch checked={themeContext?.isDarkMode} onChange={themeContext?.toggleTheme} checkedChildren="Dark" unCheckedChildren="Light" />
                </div>
            </div>
        </nav>
    );
}
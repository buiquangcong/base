import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { Layout, ConfigProvider, theme } from "antd";
import Navbar from "./components/Header";
import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";
import AddPage from "./pages/AddPage";
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";

const { Header, Content, Footer } = Layout;

function App() {
  const themeContext = useContext(ThemeContext);
  const isDarkMode = themeContext?.isDarkMode;

  return (
    <ConfigProvider theme={{ algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB2091</h1>
        <Routes>
          <Route path="/edit/:id" element={<EditPage />}></Route >
          <Route path="/list" element={<ListPage />}></Route >
          <Route path="/add" element={<AddPage />}></Route >
          <Route path="/login" element={<Login />}></Route >
          <Route path="/register" element={<Register />}></Route >
        </Routes>
        <Layout>
          <Content></Content>
        </Layout>
      </div>
      <Toaster />
    </ConfigProvider>
  );
}

export default App;
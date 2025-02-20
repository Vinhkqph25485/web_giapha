import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Introduce from "./pages/Introduce";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gioi-thieu" element={<h1>Giới Thiệu</h1>} />
        <Route path="/pha-ky" element={<h1>Phả Ký</h1>} />
        <Route path="/pha-do" element={<Introduce />} />
        <Route path="/pha-do/cay-pha-do" element={<h1>Cây Phả Đồ</h1>} />
        <Route path="/pha-do/so-do-gia-toc" element={<h1>Sơ Đồ Gia Tộc</h1>} />
        <Route path="/kien-thuc" element={<h1>Kiến Thức</h1>} />
        <Route path="/tin-tuc" element={<h1>Tin Tức</h1>} />
        <Route path="/nghia-trang" element={<h1>Nghĩa Trang Trực Tuyến</h1>} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;

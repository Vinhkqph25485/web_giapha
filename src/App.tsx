import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Introduce from "./pages/Introduce";
import { useProducts } from "./services/api";
import Pedigree from "./pages/components/pedigree/Pedigree/Pedigree";
import MyEditor from "./pages/NewPage";
import NewsListPage from "./admin/NewsListPage";
import NewsAddPage from "./admin/NewsAddPage";
import NewsList from "./pages/NewsList";
import LoginPage from "./pages/LoginPage";
function App() {
  const { data: productsData, isLoading, isError } = useProducts();
  console.log("products", productsData);
  
  return (
    <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gioi-thieu" element={<h1>Giới Thiệu</h1>} />
          <Route path="/pha-ky" element={<h1>Phả Ký</h1>} />
          <Route path="/pha-do" element={<Pedigree />} />
          <Route path="/pha-do/cay-pha-do" element={<h1>Cây Phả Đồ</h1>} />
          <Route
            path="/pha-do/so-do-gia-toc"
            element={<h1>Sơ Đồ Gia Tộc</h1>}
          />
          <Route path="/tin-tuc" element={<NewsList/>} />
          <Route path="/quan-tri-tin-tuc" element={<NewsListPage/>} />
          <Route path="/news/add" element={<NewsAddPage />} />
          <Route
            path="/dang-nhap"
            element={<LoginPage/>}
          />
        </Routes>

      {/* <Footer /> */}
    </>
  );
}

export default App;

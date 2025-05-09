import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const NewsList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);

  const openArticlePopup = (article) => {
    setCurrentArticle(article);
    setShowPopup(true);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setShowPopup(false);
    document.body.style.overflow = "auto";
  };

  // Sample article data
  const featuredArticles = [
    {
      id: 1,
      title: "Lịch sử các dòng họ Việt Nam (phần 1)",
      date: "14.08.2023",
      image: "https://api.viettoc.vn/api/viettoc/v1/file/thumb?id=66331db6467a30b894d35290",
      content: `
        <p>Từ buổi sơ khai đến nay, người Việt Nam không ngừng vươn lên, phát triển từng bước, từng ngày, dần thành bảo vệ và phát triển đất nước. Riêng vậy, mỗi dòng họ lại có nguồn gốc phát tích riêng, có lịch sử và các dòng họ Việt Nam.</p>
        <h3>Dòng họ Nguyễn</h3>
        <p>Họ Nguyễn khởi nguồn từ chữ Nhân (人) chỉ người, chỉ nhóm người Việt Nam. Đây được xác định là họ lớn nhất đã cư ngụ trong nước, quê hước, mới mang, nơi trú đóng tại nhiều vùng. Nguyễn cũng là tên họ phổ biến nhất của người Việt. Mang tên họ này có nguồn gốc từ chữ Nho có câu "Nhân giả an nhân" (仁者安人) Nhà Lý đã đặt ra...</p>
        <p>Người ta, trong triều sử Việt Nam, đã tồn tại nhiều hướng hoa và sự kinh mạng nhiều người đến với họ Nguyễn. Năm 1232, nhà Lý suy vong, Trần Thủ Độ đã đổi tên chúa dòng họ Lý chuyển sang họ Nguyễn. Năm 1592, nhà Mạc suy tàn, con cháu của dòng họ Mạc cũng lai lịch họ sang Nguyễn, vân vân. Như thế, ngay từ buổi đầu của lịch sử, đối họ Nguyễn đã có sự biến đổi lớn sang dòng họ Nguyễn, để rồi về sau cái tên phiêu bạt.</p>
        <h3>Dòng họ Trần</h3>
        <p>Họ Trần được xem là một họ phổ biến tại Châu Á và nhưng di Việt Nam mới đứng thứ 2 với 11% dân số nước ta mang họ Trần. Trần là họ phát nguyên từ chữ (陳). Trung Quốc đã có cả dòng họ Trần từ hơn 2.500 năm trước khi người mang họ Trần đầu tiên định cư tại Nam Hải, tỉ Quảng Đông...</p>
      `,
    },
    {
      id: 2,
      title: "Giá trị tính năng SMS Thông báo là gì?",
      date: "02.05.2024",
      image: "https://api.viettoc.vn/api/viettoc/v1/file/thumb?id=66331db6467a30b894d35290",
      content: "Nội dung chi tiết về tính năng SMS Thông báo...",
    },
    // Add more articles as needed
  ];

  const mainArticle = {
    id: 3,
    title: "Chuyện dòng họ ở đất Hà Nội",
    date: "01 tháng 11, 2024",
    image: "https://api.viettoc.vn/api/viettoc/v1/file/thumb?id=672445b4e6131b8f2e093633",
    content: "Chỉ tính riêng họ của người Kinh ở miền Bắc và Hà Nội đã có trên 200 dòng họ. Có họ gốc, có họ mới và mỗi họ có niềm tự hào hay nỗi niềm riêng, tất cả đan xen vào nhau làm nên một Thăng Long - Hà Nội."
  };

  return (
    <div className="bg-[#e5dfdf]">
      <Navbar hideSearch={false} />
      {/* Banner Section */}
      <div
        className="relative h-[200px] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://via.placeholder.com/1200x300')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">Bài viết</h1>
        </div>
      </div>

      {/* Search Input */}
      <div className="mt-[-40px] flex justify-center">
        <div className="relative mx-auto w-1/2 mt-5 mb-5">
          <input type="text" className="w-full p-3 rounded-md text-black" />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#8B0000] px-3 py-1 rounded-md text-white">
            Tìm kiếm
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-10 mt-5 grid grid-cols-5 gap-5">
        <div className="col-span-3">
          <div className="grid grid-cols-1 gap-5 ">
            <div 
              className="border border-gray-300 rounded-lg p-5 bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => openArticlePopup(mainArticle)}
            >
              <img
                src="https://api.viettoc.vn/api/viettoc/v1/file/thumb?id=672445b4e6131b8f2e093633"
                alt="Main Article"
                className="w-full h-[440px] object-cover rounded-lg"
              />
              <h2 className="my-4 text-xl text-[#cda66f]">01 tháng 11, 2024</h2>
              <h2 className="mb-4 text-2xl font-semibold">
                Chuyện dòng họ ở đất Hà Nội
              </h2>
              <p>
                Chỉ tính riêng họ của người Kinh ở miền Bắc và Hà Nội đã có trên
                200 dòng họ. Có họ gốc, có họ mới và mỗi họ có niềm tự hào hay
                nỗi niềm riêng, tất cả đan xen vào nhau làm nên một Thăng Long -
                Hà Nội.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <h3 className="mb-4 text-2xl font-semibold">Bài viết nổi bật</h3>
          <div className="space-y-4">
            {/* Card 1 */}
            <div 
              className="bg-white grid grid-cols-10 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => openArticlePopup(featuredArticles[0])}
            >
              <div className="p-4 col-span-4">
                <img
                  src="https://api.viettoc.vn/api/viettoc/v1/file/thumb?id=66331db6467a30b894d35290"
                  alt="Article 1"
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <div className="py-4 px-1 col-span-6">
                <p className="text-[#cda66f] text-lg font-semibold">
                  14.08.2023
                </p>
                <p className="font-bold text-lg mt-2">
                  Lịch sử các dòng họ Việt Nam (phần 1)
                </p>
              </div>
            </div>

            <div 
              className="bg-white grid grid-cols-10 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => openArticlePopup(featuredArticles[1])}
            >
              <div className="p-4 col-span-4">
                <img
                  src="https://api.viettoc.vn/api/viettoc/v1/file/thumb?id=66331db6467a30b894d35290"
                  alt="Article 1"
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <div className="py-4 px-1 col-span-6">
                <p className="text-[#cda66f] text-lg font-semibold">
                  02.05.2024
                </p>
                <p className="font-bold text-lg mt-2">
                  Giá trị tính năng SMS Thông báo là gì?
                </p>
              </div>
            </div>

            <div className="bg-white grid grid-cols-10 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="p-4 col-span-4">
                <img
                  src="https://api.viettoc.vn/api/viettoc/v1/file/thumb?id=66331db6467a30b894d35290"
                  alt="Article 1"
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <div className="py-4 px-1 col-span-6">
                <p className="text-[#cda66f] text-lg font-semibold">
                  02.05.2024
                </p>
                <p className="font-bold text-lg mt-2">
                  Giá trị tính năng SMS Thông báo là gì?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News List with Pagination */}
      <div className="max-w-7xl mx-auto px-10 mt-5 mb-10">
        {/* News Items */}
        <div className="space-y-4">
          <div 
            className="bg-white grid grid-cols-10 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => openArticlePopup(mainArticle)}
          >
            <div className="p-4 col-span-3">
              <img
                src="https://api.viettoc.vn/api/viettoc/v1/file/thumb?id=672445b4e6131b8f2e093633"
                alt="Article 1"
                className="w-full h-45 object-cover rounded-lg"
              />
            </div>
            <div className="py-4 px-4 col-span-7">
              <h2 className="text-xl text-[#cda66f]">01 tháng 11, 2024</h2>
              <h2 className="mb-4 text-2xl font-semibold">
                Chuyện dòng họ ở đất Hà Nội
              </h2>
              <p>
                Chỉ tính riêng họ của người Kinh ở miền Bắc và Hà Nội đã có trên
                200 dòng họ. Có họ gốc, có họ mới và mỗi họ có niềm tự hào hay
                nỗi niềm riêng, tất cả đan xen vào nhau làm nên một Thăng Long -
                Hà Nội.
              </p>
            </div>
          </div>
          <div 
            className="bg-white grid grid-cols-10 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => openArticlePopup(featuredArticles[0])}
          >
            <div className="p-4 col-span-3">
              <img
                src="https://api.viettoc.vn/api/viettoc/v1/file/thumb?id=66331db6467a30b894d35290"
                alt="Article 1"
                className="w-full h-45 object-cover rounded-lg"
              />
            </div>
            <div className="py-4 px-4 col-span-7">
              <h2 className="text-xl text-[#cda66f]">14.08.2023</h2>
              <h2 className="mb-4 text-2xl font-semibold">
                Lịch sử các dòng họ Việt Nam (phần 1)
              </h2>
              <p>
                Từ buổi sơ khai đến nay, người Việt Nam không ngừng vươn lên, phát triển từng bước.
                Riêng vậy, mỗi dòng họ lại có nguồn gốc phát tích riêng, có lịch sử và các dòng họ Việt Nam.
              </p>
            </div>
          </div>
        </div>
        
        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100">
              Trước
            </button>
            <button className="px-3 py-1 rounded-md border border-gray-300 bg-[#8B0000] text-white">
              1
            </button>
            <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100">
              2
            </button>
            <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100">
              3
            </button>
            <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100">
              Sau
            </button>
          </nav>
        </div>
      </div>

      {/* Article Detail Popup */}
      {showPopup && currentArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[#cda66f] text-lg font-semibold">{currentArticle.date}</p>
                <button 
                  onClick={closePopup}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-6">{currentArticle.title}</h2>
              
              <div className="mb-6 flex justify-center">
                <img 
                  src={currentArticle.image} 
                  alt={currentArticle.title}
                  className="max-h-[400px] object-cover rounded-lg"
                />
              </div>
              
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: currentArticle.content }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default NewsList;

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaSearch } from "react-icons/fa";

const NewsList = () => {
  return (
    <div className=" bg-[#e5dfdf]">
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
            <div className="border border-gray-300 rounded-lg p-5 bg-white  shadow-md hover:shadow-lg transition-shadow">
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
            <div className="bg-white grid grid-cols-10 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
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

            <div className="bg-white grid grid-cols-10 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
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

            <div className="bg-white grid grid-cols-10 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
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
          <div className="bg-white grid grid-cols-10 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
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
          <div className="bg-white grid grid-cols-10 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
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

      <Footer />
    </div>
  );
};

export default NewsList;

import { FaSearch } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#8B0000] shadow-md text-white py-10 mt-5">
      <div className="px-10 mx-auto">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6">
          {/* Cột 1: Liên Hệ */}
          <div>
            <h2 className="text-lg font-semibold mb-3">LIÊN HỆ</h2>
            <ul className="space-y-2 text-sm">
              <li>
                📍 Địa chỉ: Xóm Trung Tự, Xã Hải Phúc, H. Hải Hậu, T. Nam Định
              </li>
              <li>👤 Trưởng họ: Trần Quang Tạo</li>
              <li>📘 Fanpage: Họ Trần Hải Phúc</li>
              <li>
                ✉️ Email:{" "}
                <a href="mailto:hotran.haiphuc@gmail.com" className="underline">
                  hotran.haiphuc@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 2: Tài Trợ */}
          <div>
            <h2 className="text-lg font-semibold mb-3">TÀI TRỢ</h2>
            <ul className="space-y-2 text-sm">
              <li>💰 Quỹ Cung phụng Tổ đường</li>
              <li>📚 Quỹ Khuyến học</li>
              <li>❤️ Quỹ thăm hỏi trong họ</li>
              <li>🌍 Quỹ xây dựng Website</li>
            </ul>
          </div>

          {/* Cột 3: Tìm kiếm */}
          <div>
            <h2 className="text-lg font-semibold mb-3">TÌM KIẾM</h2>
           
            <h2 className="text-lg font-semibold mt-5">THỐNG KÊ DÒNG HỌ</h2>
            <p className="text-sm">
              👨‍👩‍👦 Nam: <span className="font-semibold">1941</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

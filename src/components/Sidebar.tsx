import { useState } from "react";
import { FaSitemap, FaUsers, FaBook, FaChartBar, FaClock, FaMonument, FaHome } from "react-icons/fa";

const Sidebar = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="w-64 h-screen bg-yellow-200 border-l-4 border-red-600 p-4 font-semibold">
      {/* Header Scroll Bar */}
      <div className="bg-red-600 h-4 rounded-t-xl"></div>
      
      {/* Main Menu */}
      <ul className="space-y-2 mt-2">
        <li className="flex items-center p-2 bg-yellow-300 hover:bg-yellow-400 rounded cursor-pointer">
          <FaSitemap className="mr-2" /> Xây dựng phả hệ
        </li>
        <li className="flex items-center p-2 bg-yellow-500 text-white rounded">
          <FaSitemap className="mr-2" /> Phả đồ
        </li>
        <li>
          <div
            className="flex items-center p-2 bg-yellow-300 hover:bg-yellow-400 rounded cursor-pointer"
            onClick={() => toggleSection("dòng họ")}
          >
            <FaUsers className="mr-2" /> Thông tin dòng họ
          </div>
          {openSection === "dòng họ" && (
            <ul className="ml-6 space-y-2">
              <li className="flex items-center p-2 bg-yellow-200 hover:bg-yellow-300 rounded cursor-pointer">
                <FaBook className="mr-2" /> Thông tin chung
              </li>
              <li className="flex items-center p-2 bg-yellow-200 hover:bg-yellow-300 rounded cursor-pointer">
                <FaUsers className="mr-2" /> Danh sách tộc trưởng
              </li>
              <li className="flex items-center p-2 bg-yellow-200 hover:bg-yellow-300 rounded cursor-pointer">
                <FaChartBar className="mr-2" /> Thống kê dòng họ
              </li>
              <li className="flex items-center p-2 bg-yellow-200 hover:bg-yellow-300 rounded cursor-pointer">
                <FaClock className="mr-2" /> Lịch sử dòng họ
              </li>
              <li className="flex items-center p-2 bg-yellow-200 hover:bg-yellow-300 rounded cursor-pointer">
                <FaMonument className="mr-2" /> Thông tin mộ phần
              </li>
              <li className="flex items-center p-2 bg-yellow-200 hover:bg-yellow-300 rounded cursor-pointer">
                <FaHome className="mr-2" /> Danh sách nhà thờ
              </li>
            </ul>
          )}
        </li>
      </ul>
      {/* Footer Scroll Bar */}
      <div className="bg-red-600 h-4 rounded-b-xl mt-2"></div>
    </div>
  );
};

export default Sidebar;

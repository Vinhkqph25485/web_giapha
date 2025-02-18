import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [active, setActive] = useState("TRANG CHỦ");
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuItems = [
    { name: "TRANG CHỦ", path: "/" },
    { name: "GIỚI THIỆU", path: "/gioi-thieu" },
    {
      name: "PHẢ KÝ",
      path: "/pha-ky",
      hasSubmenu: true,
      submenu: [
        { name: "Lịch Sử Gia Tộc", path: "/pha-ky/lich-su" },
        { name: "Nhật Ký Gia Phả", path: "/pha-ky/nhat-ky" },
      ],
    },
    {
      name: "PHẢ ĐỒ",
      path: "/pha-do",
      hasSubmenu: true,
      submenu: [
        { name: "Cây Phả Đồ", path: "/pha-do/cay-pha-do" },
        { name: "Sơ Đồ Gia Tộc", path: "/pha-do/so-do-gia-toc" },
      ],
    },
    { name: "KIẾN THỨC", path: "/kien-thuc" },
    { name: "TIN TỨC", path: "/tin-tuc" },
    { name: "NGHĨA TRANG TRỰC TUYẾN", path: "/nghia-trang" },
  ];

  console.log("Navbar component loaded!");

  return (
    <nav className="bg-blue-500 shadow-md">
      <div className="w-[1200px] mx-auto">
        <ul className="flex">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`relative px-5 py-3 text-white cursor-pointer transition-all duration-300 ${
                active === item.name ? "bg-orange-500" : "hover:bg-blue-600"
              }`}
              onClick={() => setActive(item.name)}
              onMouseEnter={() => item.hasSubmenu && setOpenDropdown(item.name)}
              onMouseLeave={() => item.hasSubmenu && setOpenDropdown(null)}
            >
              <Link to={item.path}>{item.name}</Link>

              {/* Menu con với hiệu ứng mượt */}
              {item.hasSubmenu && (
                <AnimatePresence>
                  {openDropdown === item.name && (
                    <motion.ul
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute left-0 top-full w-[200px] bg-white text-black shadow-lg rounded-lg overflow-hidden"
                    >
                      {item.submenu.map((sub) => (
                        <li
                          key={sub.name}
                          className="px-5 py-3 hover:bg-gray-200 transition-all duration-200"
                          onClick={() => setActive(sub.name)}
                        >
                          <Link to={sub.path}>{sub.name}</Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

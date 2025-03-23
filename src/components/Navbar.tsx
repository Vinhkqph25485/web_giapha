import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from 'antd';
import { SearchProps } from "antd/es/input";

const { Search } = Input;

const Navbar = ({ setSearchValue }) => {
  const [active, setActive] = useState("TRANG CHỦ");
  const onSearch: SearchProps['onSearch'] = (value) => setSearchValue(value);


  const menuItems = [
    { name: "GIỚI THIỆU", path: "/" },
    {
      name: "PHẢ ĐỒ",
      path: "/pha-do",
    },
  ];

  return (
    <nav className="bg-[#8B0000] shadow-md">
      <div className="px-10 mx-auto flex justify-between items-center">
        <ul className="flex">
          {menuItems.map((item) => (
        <li
          key={item.name}
          className={`relative px-5 py-3 text-white cursor-pointer transition-all duration-300 ${
            active === item.name ? "bg-[#D2691E]" : "hover:bg-[#FF8C00]"
          }`}
          onClick={() => setActive(item.name)}
        >
          <Link to={item.path}>{item.name}</Link>
          {/* Menu con với hiệu ứng mượt */}
        </li>
          ))}
        </ul>
        <Search 
          className="max-w-[200px]" 
          placeholder="Tìm kiếm" 
          onSearch={onSearch}
          enterButton 
        />
      </div>
    </nav>
  );
};

export default Navbar;

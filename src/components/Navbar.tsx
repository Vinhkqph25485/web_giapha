import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";

interface NavbarProps {
  setSearchValue: (value: string) => void;
  hideSearch?: boolean;
}

const { Search } = Input;

const Navbar: React.FC<NavbarProps> = ({
  setSearchValue,
  hideSearch = false,
}) => {
  const [active, setActive] = useState("TRANG CHỦ");
  const [localSearchValue, setLocalSearchValue] = useState("");
  const onSearch: SearchProps["onSearch"] = (value) => {
    // Use either the passed value or current localSearchValue
    setSearchValue(value || localSearchValue);
  };

  const menuItems = [
    { name: "GIỚI THIỆU", path: "/" },
    {
      name: "PHẢ ĐỒ",
      path: "/pha-do",
    },
    {
      name: "TIN TỨC",
      path: "/tin-tuc",
    },
    {
      name: "QUẢN TRỊ TIN TỨC",
      path: "/quan-tri-tin-tuc",
    },
  ];

  return (
    <nav className="bg-[#8B0000]  shadow-md">
      <div className="container mx-auto">
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
          {hideSearch && (
            <Search
              style={{
                maxWidth: "200px",
              }}
              className="custom-search"
              placeholder="Tìm kiếm"
              onChange={(e) => {
                setLocalSearchValue(e.target.value);
              }}
              onSearch={onSearch}
              enterButton={
                <button
                  type="button"
                  className="h-[32px] px-5"
                  onClick={() => setSearchValue(localSearchValue)}
                  style={{
                    backgroundColor: "#D2691E",
                    borderColor: "#D2691E",
                    color: "white",
                    borderTopRightRadius: "4px",
                    borderBottomRightRadius: "4px",
                  }}
                >
                  Tìm
                </button>
              }
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

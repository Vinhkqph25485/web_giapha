import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { isAuthenticated, getCurrentUser, logout } from "../services/api";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isAuthenticated();
      setIsLoggedIn(loggedIn);
      
      if (loggedIn) {
        const user = getCurrentUser();
        setUsername(user?.username || "User");
      }
    };
    
    checkAuth();
    const interval = setInterval(checkAuth, 5000); 
    
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUsername("");
    setShowDropdown(false);
    // Redirect to home page
    window.location.href = "/";
  };

  const onSearch: SearchProps["onSearch"] = (value) => {
    // Use either the passed value or current localSearchValue
    setSearchValue(value || localSearchValue);
  };

  const menuItems = [
    { name: "TRANG CHỦ", path: "/" },
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
      requiresAuth: true, // Add this property to indicate this item requires authentication
    },
  ];

  // Filter menu items based on auth status
  const displayMenuItems = menuItems.filter(
    (item) => !item.requiresAuth || isLoggedIn
  );

  return (
    <nav className="bg-[#8B0000] shadow-md">
      <div className="">
        <div className="px-10 mx-auto flex justify-between items-center">
          <ul className="flex">
            {displayMenuItems.map((item) => (
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
          <div className="flex items-center">
            {!hideSearch && (
              <Search
                style={{
                  maxWidth: "200px",
                }}
                className="custom-search mr-4"
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
            
            {isLoggedIn ? (
              <div className="relative">
                <div 
                  className="flex items-center px-4 py-1 text-white bg-[#D2691E] hover:bg-[#FF8C00] rounded-md transition-all duration-300 cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <FaUser className="mr-2" />
                  <span>{username}</span>
                </div>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <button 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                        role="menuitem"
                        onClick={handleLogout}
                      >
                        <div className="flex items-center">
                          <FaSignOutAlt className="mr-2" />
                          <span>Đăng xuất</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/dang-nhap"
                className="flex items-center px-4 py-1 text-white bg-[#D2691E] hover:bg-[#FF8C00] rounded-md transition-all duration-300"
              >
                <FaSignInAlt className="mr-2" />
                <span>Đăng nhập</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

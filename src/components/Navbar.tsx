import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import {
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
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
  const location = useLocation();
  const [localSearchValue, setLocalSearchValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      requiresAuth: true,
    },
  ];

  const getActiveMenuFromPath = (path: string) => {
    if (path === "/" || path === "") {
      return "TRANG CHỦ";
    }

    const matchingItem = menuItems.find(
      (item) => path === item.path || path.startsWith(item.path + "/")
    );

    return matchingItem?.name || "TRANG CHỦ";
  };

  const [active, setActive] = useState(
    getActiveMenuFromPath(location.pathname)
  );

  useEffect(() => {
    setActive(getActiveMenuFromPath(location.pathname));
  }, [location.pathname]);

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
    window.location.href = "/";
  };
  const navigate = useNavigate();

  const onSearch: SearchProps["onSearch"] = (value) => {
    if (location.pathname !== "/pha-do") {
      navigate("/pha-do");
    }
    setSearchValue(value || localSearchValue);
  };

  const handleMenuItemClick = (itemName: string) => {
    setActive(itemName);
    setMobileMenuOpen(false);
  };

  const displayMenuItems = menuItems.filter(
    (item) => !item.requiresAuth || isLoggedIn
  );

  return (
    <nav className="bg-[#8B0000] shadow-md">
      <div className="">
        <div className="px-4 md:px-10 mx-auto flex justify-between items-center relative">
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <ul
            className={`
            md:flex 
            ${
              mobileMenuOpen
                ? "flex flex-col absolute top-full left-0 w-full bg-[#8B0000] z-50"
                : "hidden"
            } 
            md:relative md:flex-row md:w-auto
          `}
          >            {displayMenuItems.map((item) => (
              <li
                key={item.name}
                className={`relative px-5 py-3 text-white cursor-pointer transition-all duration-300 w-full md:w-auto ${
                  active === item.name ? "bg-[#D2691E]" : "hover:bg-[#FF8C00]"
                }`}
                onClick={() => {
                  handleMenuItemClick(item.name);
                  navigate(item.path);
                }}
              >
                <span>{item.name}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center">
            <div className={`${mobileMenuOpen ? "hidden md:block" : "block"}`}>
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
                    onClick={() => onSearch(localSearchValue)}
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
            </div>

            <div className={`${mobileMenuOpen ? "hidden md:block" : "block"}`}>
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
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
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
      </div>
    </nav>
  );
};

export default Navbar;

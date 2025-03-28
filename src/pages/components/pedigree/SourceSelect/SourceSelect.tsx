import { memo, useCallback, useEffect, useState } from "react";
import type { Node } from "relatives-tree/lib/types";
import {
  FaSitemap,
  FaUsers,
  FaBook,
  FaChartBar,
  FaClock,
  FaMonument,
  FaHome,
} from "react-icons/fa";
import { URL_LABEL } from "../const";

interface SourceSelectProps {
  value: string;
  items: Record<string, readonly Readonly<Node>[]>;
  onChange: (value: string, nodes: readonly Readonly<Node>[]) => void;
  setSearchValue: (value: string) => void;
}

export const SourceSelect = memo(function SourceSelect({
  value,
  items,
  onChange,
  setSearchValue,
}: SourceSelectProps) {
  const [searchValueNew, setSearchValueNew] = useState<string>("");

  console.log("searchValueNew", searchValueNew);

  const handleSearch = () => {
    setSearchValue(searchValueNew);
  };

  const handleClick = useCallback(
    (key: string) => {
      if (key === URL_LABEL) {
        const url = prompt("Paste the url to load:");
        if (!url) return;

        fetch(url)
          .then((resp) => resp.json())
          .then((data) => Array.isArray(data) && onChange(key, data))
          .catch(() => {});
      } else {
        onChange(key, items[key]);
      }
    },
    [items, onChange]
  );

  return (
    <div className="w-64 h-screen bg-yellow-200 border-l-4 border-red-600 p-4 font-semibold overflow-y-auto">
      <div className="bg-red-600 h-4 rounded-t-xl"></div>
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 mt-2 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600"
        value={searchValueNew}
        onChange={(e) => {
          const searchValue = e.target.value
          setSearchValueNew(searchValue);
        }}
      />
      <button onClick={handleSearch}>Tìm kiếm</button>
      <ul className="space-y-2 mt-2">
        {Object.keys(items).map((item) => (
          <li
            key={item}
            className={`flex items-center p-2 bg-yellow-300 hover:bg-yellow-400 rounded cursor-pointer ${
              value === item ? "bg-yellow-500 text-white" : ""
            }`}
            onClick={() => handleClick(item)}
          >
            <FaSitemap className="mr-2" /> {item}
          </li>
        ))}
      </ul>
      <div className="bg-red-600 h-4 rounded-b-xl mt-2"></div>
    </div>
  );
});

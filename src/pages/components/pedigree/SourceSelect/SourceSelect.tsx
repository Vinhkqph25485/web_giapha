import React, { memo, useCallback } from "react";
import type { Node } from "relatives-tree/lib/types";
import { URL_LABEL } from "../const";

interface SourceSelectProps {
  value: string;
  items: Record<string, readonly Readonly<Node>[]>;
  onChange: (value: string, nodes: readonly Readonly<Node>[]) => void;
}

export const SourceSelect = memo(function SourceSelect({
  value,
  items,
  onChange,
}: SourceSelectProps) {
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
    <div className="h-screen">
      {" "}
      <div className="flex flex-wrap gap-2">
        {Object.keys(items).map((item) => (
          <button
            key={item}
            className={`w-[200px] py-2 rounded-lg text-white font-semibold transition ${
              value === item ? "bg-blue-600" : "bg-gray-500 hover:bg-gray-700"
            }`}
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
});

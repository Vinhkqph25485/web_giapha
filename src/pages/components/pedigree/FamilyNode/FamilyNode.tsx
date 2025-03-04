import React, { useCallback } from "react";
import type { ExtNode } from "relatives-tree/lib/types";
import css from "./FamilyNode.module.css";
import classNames from "classnames";
import manJpg from "./man.jpg";
import womanJpg from "./woman.jpg";
interface MyExtNode1 extends ExtNode {
  hasSubTree?: boolean;
}

interface FamilyNodeProps {
  node: MyExtNode1;
  isRoot: boolean;
  isHover?: boolean;
  onClick: (id: string) => void;
  onSubClick: (id: string) => void;
  isExpanded: boolean;
  style?: React.CSSProperties;
}
const DEFAULT_AVATAR = manJpg;
const DEFAULT_AVATARMAN = womanJpg;

export const FamilyNode = React.memo(function FamilyNode({
  node,
  isRoot,
  isHover,
  onClick,
  onSubClick,
  isExpanded,
  style,
}: FamilyNodeProps) {

  return (
    <div className={css.root} style={style}>
      <div
        className={classNames(
          css.inner,
          css[node.gender],
          isRoot && css.isRoot
        )}
      >
        <div className="flex flex-col justify-center items-center">
          <img
            className="p-2 w-12 h-12 rounded-full"
            src={node.gender === "male" ? DEFAULT_AVATAR : DEFAULT_AVATARMAN}
            alt={node.id}
          />
          <div className="font-bold text-black text-xs text-center">
            {node.id}
          </div>

          <div className="absolute bottom-0 right-0">
            {node.children.length > 0 && node.gender === "male" && (
              <button
                className="bg-white text-black rounded-full text-xs px-2 py-1 mt-2"
                onClick={onSubClick}
              >
                {isExpanded ? "+" : "-"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

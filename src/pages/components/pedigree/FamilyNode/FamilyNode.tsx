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
  style,
}: FamilyNodeProps) {
  // const clickHandler = useCallback(() => onClick(node.id), [node.id, onClick]);
  // const clickSubHandler = useCallback(
  //   () => onSubClick(node.id),
  //   [node.id, onSubClick]
  // );

  return (
    <div className={css.root} style={style}>
      <div
        className={classNames(
          css.inner,
          css[node.gender],
          isRoot && css.isRoot
          // isHover && css.isHover
        )}
        // onClick={clickHandler}
      >
        <div className="flex flex-col justify-center">
          <img
            className="p-2"
            src={node.gender === "male" ? DEFAULT_AVATAR : DEFAULT_AVATARMAN}
            alt={node.id}
          />
          <div className="font-bold text-black text-[6px] text-center">
            {node.id}
          </div>
        </div>
      </div>
      {/* {node.hasSubTree && (
        <div
          className={classNames(css.sub, css[node.gender])}
          onClick={clickSubHandler}
        />
      )} */}
    </div>
  );
});

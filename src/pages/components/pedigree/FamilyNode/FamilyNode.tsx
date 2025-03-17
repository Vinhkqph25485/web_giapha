import React, { useState, useCallback } from "react";
import type { ExtNode } from "relatives-tree/lib/types";
import css from "./FamilyNode.module.css";
import classNames from "classnames";
import { Modal } from "antd";
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
  defaultNodes?: any;
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
  defaultNodes
}: FamilyNodeProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleNodeClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  
  const hasChildrenInDefaultNodes = (id: string) => {
    const defaultNode = defaultNodes?.find((n: any) => n.id === id);
    if (defaultNode?.children?.length > 0) {
      return true;
    }
    return false;
  };

  console.log("hasChildrenInDefaultNodes", hasChildrenInDefaultNodes(node.id));
  

  return (
    <div className={css.root} style={style}>
      <div
        className={classNames(
          css.inner,
          css[node.gender],
          isRoot && css.isRoot
        )}
        onClick={handleNodeClick}
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
            {hasChildrenInDefaultNodes(node.id) == true && node.gender === "male" && (
              <button
                className="bg-white text-black rounded-full text-xs px-2 py-1 mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onSubClick(node.id);
                }}
              >
                {isExpanded ? "+" : "-"}
              </button>
            )}
          </div>
        </div>
      </div>

      <Modal
        title="Chi tiết phả hệ"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        className={css.modal}
      >
        <div className="flex flex-col items-center">
          <p className="font-bold text-lg">ID: {node.id}</p>
          <p className="text-sm">Gender: {node.gender}</p>
          <p className="text-sm">Children: {node.children.length}</p>
          <img
            className="p-2 w-24 h-24 rounded-full mt-4"
            src={node.gender === "male" ? DEFAULT_AVATAR : DEFAULT_AVATARMAN}
            alt={node.id}
          />
          {/* Add more details as needed */}
        </div>
      </Modal>
    </div>
  );
});

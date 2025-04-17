import React, { useState } from "react";
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
  defaultNodes,
}: FamilyNodeProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleNodeClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  console.log("node?.children", node?.children);

  const hasChildrenInDefaultNodes = (id: string) => {
    const defaultNode = defaultNodes?.find((n: any) => n.id === id);
    if (defaultNode?.children?.length > 0) {
      return true;
    }
    return false;
  };
console.log("node?.children", node);

  if (node == []) {
    return <></>;
  }

  return (
    <div className={css.root} style={style}>
      <div
        className={classNames(
          css.inner,
          css[node?.gender],
          isRoot && css.isRoot
        )}
        onClick={handleNodeClick}
      >
        <div className="flex flex-col justify-center items-center">
          <img
            className="p-2 w-12 h-12 rounded-full"
            src={node?.image_url}
            alt={node?.id}
          />
          <div className="font-bold text-black text-xs text-center">
            {node?.name}
          </div>

          <div className="absolute bottom-0 right-0">
            {hasChildrenInDefaultNodes(node?.id) == true &&
              node?.gender === "male" && (
                <button
                  className="bg-white text-black rounded-full text-xs px-2 py-1 mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSubClick(node?.id);
                  }}
                >
                  {isExpanded ? "-" : "+"}
                </button>
              )}
          </div>
        </div>
      </div>

      <Modal
        title={node?.name}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        className={css.modal}
      >
        <div className="flex flex-col items-center">
          <div className="text-center mb-4">
            <p className="text-lg font-semibold">
              {node?.gender === "male" ? "👨 Nam" : "👩 Nữ"} {node?.family_rank} -
              Thế hệ thứ {node?.generation_level}
            </p>
            <p className="text-sm">
              Sinh ngày{" "}
              {node?.date_of_birth
                ? (() => {
                    const date = new Date(node?.date_of_birth);
                    return !isNaN(date.getTime())
                      ? `${date.getDate()}/${
                          date.getMonth() + 1
                        }/${date.getFullYear()}`
                      : node?.date_of_birth;
                  })()
                : ""}{" "}
              {node?.date_of_death
                ? `- Mất ngày: ${(() => {
                    const date = new Date(node?.date_of_death);
                    return !isNaN(date.getTime())
                      ? `${date.getDate()}/${
                          date.getMonth() + 1
                        }/${date.getFullYear()}`
                      : node?.date_of_death;
                  })()}`
                : ""}
            </p>
          </div>
          <div className="flex justify-center mb-4">
            <img
              className="p-2 w-24 h-24 rounded-full"
              src={node?.image_url}
              alt={node?.id}
            />
          </div>

          <div className="text-left w-full px-4">
            {node?.children.length > 0 && (
              <p className="text-sm mb-2">Số con: {node?.children.length}</p>
            )}
            <p className="text-sm mb-2">Địa chỉ: {node?.permanent_address}</p>
            <p className="text-sm mb-2">{node?.description}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
});

import React, { useMemo, useState, useCallback, useEffect } from "react";
import type { Node } from "relatives-tree/lib/types";
import ReactFamilyTree from "react-family-tree";
import { SourceSelect } from "../SourceSelect/SourceSelect";
import { PinchZoomPan } from "../PinchZoomPan/PinchZoomPan";
import { FamilyNode } from "../FamilyNode/FamilyNode";
import { NODE_WIDTH, NODE_HEIGHT } from "../const";
import { getNodeStyle } from "./utils";
import css from "./Pedigree.module.css";
import { SOURCES1 } from "../const1";
import { NodeDetails } from "../NodeDetails/NodeDetails";

const Pedigree: React.FC = () => {
  const defaultSource = "Đại gia Đình"; // Định nghĩa mặc định
  const [source, setSource] = useState<string>(defaultSource);
  const [nodes, setNodes] = useState<Node[]>(SOURCES1[defaultSource] || []);

  const firstNodeId = useMemo(() => (nodes.length > 0 ? nodes[0].id : ""), [nodes]);
  const [rootId, setRootId] = useState<string>(firstNodeId);
  const [selectId, setSelectId] = useState<string | undefined>();
  const [hoverId, setHoverId] = useState<string | undefined>();

  // Cập nhật rootId khi nodes thay đổi
  useEffect(() => {
    if (firstNodeId) {
      setRootId(firstNodeId);
    }
  }, [firstNodeId]);

  // Xử lý khi đổi source
  const changeSourceHandler = useCallback((value: string) => {
    const newNodes = SOURCES1[value] || [];
    setRootId(newNodes.length > 0 ? newNodes[0].id : "");
    setNodes(newNodes);
    setSource(value);
    setSelectId(undefined);
    setHoverId(undefined);
  }, []);

  // Lấy thông tin người được chọn
  const selected = useMemo(() => nodes.find((item) => item.id === selectId), [nodes, selectId]);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selectedId, setSelectedId] = useState<string | undefined>();

  console.log("expanded", expanded);
  

  // Cập nhật rootId khi thay đổi nodes
  useEffect(() => {
    if (nodes.length > 0) {
      setRootId(nodes[0].id);
    }
  }, [nodes]);

  // Hàm để mở rộng / thu gọn các thế hệ con
  const toggleExpand = useCallback((id: string) => {
    
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Lấy danh sách nodes hiển thị dựa trên trạng thái mở rộng
  const visibleNodes = useCallback(() => {
    return nodes.filter((node) => {
      if (!expanded[node.id] && node.parents.length > 0) {
        return false;
      }
      return true;
    });
  }, [nodes, expanded]);

console.log("visibleNodes", visibleNodes());

  return (
    <div className="h-screen my-2">
      <div className="grid grid-cols-5 gap-1">
        <div className="col-span-1">
          <SourceSelect value={source} items={SOURCES1} onChange={changeSourceHandler} />
        </div>
        <div className={css.root + " col-span-4"}>
          <PinchZoomPan min={0.5} max={2.5} captureWheel className={css.wrapper}>
            <ReactFamilyTree
              nodes={nodes}
              rootId={rootId}
              width={NODE_WIDTH}
              height={NODE_HEIGHT}
              className={css.tree}
              renderNode={(node) => (
                <FamilyNode
                key={node.id}
                node={node}
                isRoot={node.id === rootId}
                isExpanded={!!expanded[node.id]}
                onClick={() => setSelectedId(node.id)}
                onSubClick={() => toggleExpand(node.id)}
                style={getNodeStyle(node)}
                />
              )}
            />
          </PinchZoomPan>

          {/* Reset khi rootId không phải firstNodeId */}
          {rootId !== firstNodeId && firstNodeId && (
            <button className={css.reset} onClick={() => setRootId(firstNodeId)}>
              Reset
            </button>
          )}

          {/* Hiển thị chi tiết người được chọn */}
          {selected && (
            <NodeDetails
              node={selected}
              className={css.details}
              onSelect={setSelectId}
              onHover={setHoverId}
              onClear={() => setHoverId(undefined)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Pedigree);

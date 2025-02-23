import React, { useMemo, useState, useCallback, useEffect } from "react";
import type { Node, ExtNode } from "relatives-tree/lib/types";
import ReactFamilyTree from "react-family-tree";
import { SourceSelect } from "../SourceSelect/SourceSelect";
import { PinchZoomPan } from "../PinchZoomPan/PinchZoomPan";
import { FamilyNode } from "../FamilyNode/FamilyNode";
// import { NodeDetails } from "../NodeDetails/NodeDetails";
import { NODE_WIDTH, NODE_HEIGHT } from "../const";
import { getNodeStyle } from "./utils";

import css from "./Pedigree.module.css";
import { SOURCES1 } from "../const1";

const Pedigree: React.FC = () => {
  const [source, setSource] = useState<string>(SOURCES1);
  const [nodes, setNodes] = useState(
    SOURCES1[source] || SOURCES1["Đại gia Đình"]
  );

  const firstNodeId = useMemo(
    () => (nodes.length > 0 ? nodes[0].id : ""),
    [nodes]
  );

  const [rootId, setRootId] = useState<string>(firstNodeId);
  const [selectId, setSelectId] = useState<string | undefined>();
  const [hoverId, setHoverId] = useState<string | undefined>();

  // Cập nhật rootId khi source thay đổi
  useEffect(() => {
    setRootId(firstNodeId);
  }, [firstNodeId]);

  const resetRootHandler = useCallback(() => {
    setRootId(firstNodeId);
  }, [firstNodeId]);

  const changeSourceHandler = useCallback(
    (value: string, newNodes: Readonly<Node>[]) => {
      setRootId(newNodes.length > 0 ? newNodes[0].id : "");
      setNodes(newNodes);
      setSource(value);
      setSelectId(undefined);
      setHoverId(undefined);
    },
    []
  );

  const selected = useMemo(
    () => nodes.find((item) => item.id === selectId),
    [nodes, selectId]
  );

  console.log("nodes", nodes);
  console.log("firstNodeId", firstNodeId);
  console.log("rootId", rootId);

  return (
    <div className="h-screen my-2 ">
      {" "}
      <div className="grid grid-cols-5 gap-1">
        <div className="col-span-1">
          <div>
            <SourceSelect
              value={source}
              items={SOURCES1}
              onChange={changeSourceHandler}
            />
          </div>
        </div>
        <div className={css.root + " col-span-4"}>
          <PinchZoomPan
            min={0.5}
            max={2.5}
            captureWheel
            className={css.wrapper}
          >
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
                  isHover={node.id === hoverId}
                  onClick={setSelectId}
                  onSubClick={setRootId}
                  style={getNodeStyle(node)}
                />
              )}
            />
          </PinchZoomPan>
          {/* {rootId !== firstNodeId && firstNodeId && (
            <button className={css.reset} onClick={resetRootHandler}>
              Reset
            </button>
          )}
          {selected && (
            <NodeDetails
              node={selected}
              className={css.details}
              onSelect={setSelectId}
              onHover={setHoverId}
              onClear={() => setHoverId(undefined)}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Pedigree);

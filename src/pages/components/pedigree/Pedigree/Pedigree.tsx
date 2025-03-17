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
import { getProducts, updateProduct } from "../../../../services/api";

const Pedigree: React.FC = () => {
  const defaultSource = "Đại gia Đình"; // Định nghĩa mặc định
  const [source, setSource] = useState<string>(defaultSource);
  const [nodes, setNodes] = useState<Node[]>(SOURCES1[defaultSource] || []);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const [products, setProducts] = useState([]);

  console.log("products", products);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      console.log("data", data);
    });
  }, []);

  const firstNodeId = useMemo(
    () => (nodes.length > 0 ? nodes[0].id : ""),
    [nodes]
  );
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
  const selected = useMemo(
    () => nodes.find((item) => item.id === selectId),
    [nodes, selectId]
  );

  const [selectedId, setSelectedId] = useState<string | undefined>();

  // Cập nhật rootId khi thay đổi nodes
  useEffect(() => {
    if (nodes.length > 0) {
      setRootId(nodes[0].id);
    }
  }, [nodes]);

  // Cập nhật trạng thái expanded của các node khi expanded thay đổi
  useEffect(() => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => ({
        ...node,
        expanded: expanded[node.id] || false,
      }))
    );
  }, [expanded]);

  // Hàm để mở rộng / thu gọn các thế hệ con
  const toggleExpand = useCallback(
    (id: string) => {
      setExpanded((prev) => {
        const newExpanded = { ...prev, [id]: !prev[id] };
        const updatedNode = products.find((node) => node.id === id);
        if (updatedNode) {
          const newExpandedValue = newExpanded[id];
          updateProduct(id, "expanded", newExpandedValue)
            .then(() => {
              console.log(`Updated node ${id} successfully`);
            })
            .catch((error) => {
              console.error(`Failed to update node ${id}:`, error);
            });

          // Update expanded state for spouses, children, and children's spouses
          const updateChildrenAndSpouses = (nodeId: string, expandedValue: boolean) => {
            const node = products.find((n) => n.id === nodeId);
            if (node) {
              const spouseIds = node.spouses?.map((spouse) => spouse.id) || [];
              const childIds = node.children?.map((child) => child.id) || [];
              spouseIds.forEach((spouseId) => {
                newExpanded[spouseId] = expandedValue;
                updateProduct(spouseId, "expanded", expandedValue)
                  .then(() => {
                    console.log(`Updated spouse node ${spouseId} successfully`);
                  })
                  .catch((error) => {
                    console.error(`Failed to update spouse node ${spouseId}:`, error);
                  });
              });
              childIds.forEach((childId) => {
                newExpanded[childId] = expandedValue;
                updateProduct(childId, "expanded", expandedValue)
                  .then(() => {
                    console.log(`Updated child node ${childId} successfully`);
                  })
                  .catch((error) => {
                    console.error(`Failed to update child node ${childId}:`, error);
                  });

                // Update expanded state for children's spouses
                const childNode = products.find((n) => n.id === childId);
                if (childNode) {
                  const childSpouseIds = childNode.spouses?.map((spouse) => spouse.id) || [];
                  childSpouseIds.forEach((childSpouseId) => {
                    newExpanded[childSpouseId] = expandedValue;
                    updateProduct(childSpouseId, "expanded", expandedValue)
                      .then(() => {
                        console.log(`Updated child's spouse node ${childSpouseId} successfully`);
                      })
                      .catch((error) => {
                        console.error(`Failed to update child's spouse node ${childSpouseId}:`, error);
                      });
                  });
                }
              });
            }
          };

          updateChildrenAndSpouses(id, newExpandedValue);
        }
        return newExpanded;
      });
    },
    [products]
  );

  // Lấy danh sách nodes hiển thị dựa trên trạng thái mở rộng

  console.log("expanded", expanded);

  const transformNodes = useCallback(() => {
    return products.map((node) => {
      // Sử dụng node.expanded có sẵn trong data, nếu không tồn tại thì mặc định là false.
      const isExpanded = expanded[node.id] !== undefined ? expanded[node.id] : false;

      return {
        id: node.id,
        gender: node.gender || "male",
        parents: node.parents || [],
        siblings: node.siblings || [],
        spouses: node.spouses
          ? node.spouses.map((spouse) => ({ id: spouse.id, type: spouse.type }))
          : [],
        // Nếu expanded = true thì giữ nguyên children, ngược lại ẩn đi (mảng rỗng)
        children: isExpanded
          ? node.children
            ? node.children.map((child) => ({ id: child.id, type: child.type }))
            : []
          : [],
        // Tương tự đối với descendants
        descendants: isExpanded
          ? node.descendants
            ? node.descendants.map((descendant) => ({
                id: descendant.id,
                type: descendant.type,
              }))
            : []
          : [],
        // Gán lại expanded từ expanded state hoặc false nếu không có
        expanded: isExpanded,
        generationLevel:
          node.generationLevel !== undefined ? node.generationLevel : 1,
      };
    });
  }, [products, expanded]);

  console.log("transformNodes", transformNodes());

  return (
    <div className="h-screen my-2">
      <div className="grid grid-cols-5 gap-1">
        <div className="col-span-1">
          <SourceSelect
            value={source}
            items={SOURCES1}
            onChange={changeSourceHandler}
          />
        </div>
        <div className={css.root + " col-span-4"}>
            <PinchZoomPan
            min={0.5}
            max={2.5}
            captureWheel
            className={css.wrapper}
            >
            <ReactFamilyTree
              nodes={products.length > 0 ? transformNodes() : nodes}
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
                defaultNodes={products}
              />
              )}
            />
            </PinchZoomPan>

          {/* Reset khi rootId không phải firstNodeId */}
          {rootId !== firstNodeId && firstNodeId && (
            <button
              className={css.reset}
              onClick={() => setRootId(firstNodeId)}
            >
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

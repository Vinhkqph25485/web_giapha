import React, { useMemo, useState, useCallback, useEffect } from "react";
import type { Node } from "relatives-tree/lib/types";
import ReactFamilyTree from "react-family-tree";
import { useLocation } from "react-router-dom";
import { PinchZoomPan } from "../PinchZoomPan/PinchZoomPan";
import { FamilyNode } from "../FamilyNode/FamilyNode";
import { NODE_WIDTH, NODE_HEIGHT } from "../const";
import { getNodeStyle } from "./utils";
import css from "./Pedigree.module.css";
import { SOURCES1 } from "../const1";
import { NodeDetails } from "../NodeDetails/NodeDetails";
import { useProducts, useUpdateProduct } from "../../../../services/api";
import Navbar from "../../../../components/Navbar";
import ButtonAddMember from "./component/ButtonAddMember";
import { isAuthenticated } from "../../../../services/api";

const Pedigree: React.FC = () => {
  const location = useLocation(); 
  const isPhaDoRoute = location.pathname === "/pha-do"; 

  const [searchValue, setSearchValue] = useState<string>("");

  const {
    data: productsData,
    isLoading,
  } = useProducts({
    search: searchValue,
  });
  const products = useMemo(() => productsData?.products || [], [productsData]);

  console.log("products", products);
  
  const defaultSource = "Đại gia Đình"; 

  const [nodes, setNodes] = useState<Node[]>(SOURCES1[defaultSource] || []);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Use React Query to fetch products

  // Set up mutation for updating products
  const updateProductMutation = useUpdateProduct();
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

  // Hàm để mở rộng / thu gọn các thế hệ con - sử dụng React Query mutation
  const toggleExpand = useCallback(
    (id: string) => {
      setExpanded((prev) => {
        const newExpanded = { ...prev, [id]: !prev[id] };
        const updatedNode = products.find((node) => node.id === id);

        if (updatedNode) {
          const newExpandedValue = newExpanded[id];

          // Collect all IDs to update
          const idsToUpdate = [id];

          // Collect spouse and children IDs
          const collectRelatedIds = (nodeId: string) => {
            const node = products.find((n) => n.id === nodeId);
            if (node) {
              const spouseIds = node.spouses?.map((spouse) => spouse.id) || [];
              const childIds = node.children?.map((child) => child.id) || [];
              idsToUpdate.push(...spouseIds, ...childIds);
            }
          };

          // Collect IDs for the current node, its spouses, and children
          collectRelatedIds(id);

          // Update expanded state for all collected IDs
          idsToUpdate.forEach((updateId) => {
            newExpanded[updateId] = newExpandedValue;
          });

          // Call API to update expanded state for all collected IDs
          updateProductMutation.mutate({
            ids: idsToUpdate,
            field: "expanded",
            value: newExpandedValue,
          });
        }

        return newExpanded;
      });
    },
    [products, updateProductMutation]
  );

  const transformNodes = useCallback(() => {
    return products?.map((node) => {
      // Sử dụng node.expanded có sẵn trong data, nếu không tồn tại thì mặc định là false.
      const isExpanded =
        expanded[node.id] !== undefined ? expanded[node.id] : !!node.expanded;

      return {
        id: node.id,
        name: node.name,
        gender: node.gender,
        image: node.image,
        description: node.description,
        date_of_birth: node.date_of_birth,
        date_of_death: node.date_of_death,
        family_rank: node.family_rank,
        permanent_address: node.permanent_address,
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
        descendants: isExpanded
          ? node.descendants
            ? node.descendants.map((descendant) => ({
                id: descendant.id,
                type: descendant.type,
              }))
            : []
          : [],
        // Gán lại expanded từ expanded state hoặc sử dụng giá trị trong data nếu có
        expanded: isExpanded,
        generation_level: node.generation_level || node.generationLevel || 1,
      };
    });
  }, [products, expanded]);


  return (
    <>
      <Navbar
        setSearchValue={setSearchValue}
        hideSearch={isPhaDoRoute} 
      />
      <div className="px-10 mx-auto">
        <div className="w-full h-screen font-light text-[#222] antialiased leading-[1.5]">
          <div className="h-screen my-2">
            <div className={css.root}>              {isLoading && (
                <div className="text-center p-4">Loading family data...</div>
              )}
              {isAuthenticated() && <ButtonAddMember />}
              <PinchZoomPan
                min={0.1}
                max={2.5}
                captureWheel
                className={css.wrapper}
              >
                {!isLoading && products?.length > 0 && (
                  <>
                    <ReactFamilyTree
                      nodes={products?.length > 0 ? transformNodes() : []}
                      rootId={products?.[0]?.id || ""}
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
                  </>
                )}
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
            </div>
            <div className="col-span-5">
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
            {/* <div className="">
        <div className="">
          <SourceSelect
            value={source}
            items={SOURCES1}
            onChange={changeSourceHandler}
            setSearchValue={setSearchValue}
          />
        </div>
      </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Pedigree);

import React, { useState } from "react";
import FamilyTree from "react-family-tree";
import Node from "./Node"; // Component hiển thị từng thành viên

const WIDTH = 150; // Chiều rộng của mỗi node
const HEIGHT = 80; // Chiều cao của mỗi node

const familyData = [
    {
      id: 1,
      name: "Ông A",
      gender: "male",
      spouse: 2,
      children: [3, 4],
    },
    {
      id: 2,
      name: "Bà B",
      gender: "female",
      spouse: 1,
    },
    {
      id: 3,
      name: "Bác C",
      gender: "male",
      parents: [1, 2],
      spouse: 5,
      children: [6, 7],
    },
    {
      id: 4,
      name: "Bố D",
      gender: "male",
      parents: [1, 2],
      spouse: 8,
      children: [9, 10],
    },
    {
      id: 5,
      name: "Bác dâu E",
      gender: "female",
      spouse: 3,
    },
    {
      id: 6,
      name: "Anh F",
      gender: "male",
      parents: [3, 5],
    },
    {
      id: 7,
      name: "Chị G",
      gender: "female",
      parents: [3, 5],
    },
    {
      id: 8,
      name: "Mẹ H",
      gender: "female",
      spouse: 4,
    },
    {
      id: 9,
      name: "Tôi",
      gender: "male",
      parents: [4, 8],
    },
    {
      id: 10,
      name: "Em I",
      gender: "female",
      parents: [4, 8],
    },
  ];
  
  

const FamilyTreeComponent = () => {
  const [rootId, setRootId] = useState(1); // Gốc của cây (ID của Ông A)

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <FamilyTree
        nodes={familyData}
        rootId={rootId}
        width={WIDTH}
        height={HEIGHT}
        renderNode={(node) => (
          <Node key={node.id} node={node} width={WIDTH} height={HEIGHT} />
        )}
      />
    </div>
  );
};

export default FamilyTreeComponent;

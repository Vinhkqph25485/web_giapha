

const Node = ({ node, width, height }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg shadow-lg p-2 text-white font-semibold 
        ${node.gender === "male" ? "bg-blue-500" : "bg-pink-500"}
      `}
      style={{ width, height }}
    >
      {node.name}
    </div>
  );
};

export default Node;

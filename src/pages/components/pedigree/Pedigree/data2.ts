export const dataFake2 = [
  // Thế hệ 1
  {
    id: "husband1",
    gender: "male",
    parents: [],
    siblings: [],
    spouses: [
      { id: "wife1", type: "married" },
      { id: "wife2", type: "married" },
    ],
    children: [
      { id: "child1", type: "blood" },
      { id: "child2", type: "blood" },
      { id: "child3", type: "blood" },
      { id: "child4", type: "blood" },
      { id: "child5", type: "blood" },
      { id: "child6", type: "blood" },
    ],
    expanded: true,
    generationLevel: 1,
  },
  {
    id: "wife1",
    gender: "female",
    parents: [],
    siblings: [],
    spouses: [{ id: "husband1", type: "married" }],
    children: [
      { id: "child1", type: "blood" },
      { id: "child2", type: "blood" },
      { id: "child3", type: "blood" },
      { id: "child4", type: "blood" },
      { id: "child5", type: "blood" },
    ],
    expanded: true,
    generationLevel: 1,
  },
  {
    id: "wife2",
    gender: "female",
    parents: [],
    siblings: [],
    spouses: [{ id: "husband1", type: "married" }],
    children: [{ id: "child6", type: "blood" }],
    expanded: true,
    generationLevel: 1,
  },

  // Thế hệ 2 (Con của husband1 với wife1 và wife2)
  {
    id: "child1",
    gender: "male",
    parents: [
      { id: "husband1", type: "blood" },
      { id: "wife1", type: "blood" },
    ],
    siblings: [],
    spouses: [{ id: "child1wife", type: "married" }],
    children: [
      { id: "child1kid", type: "blood" },
      { id: "child1kid2", type: "blood" },
    ],
    expanded: true,
    generationLevel: 2,
  },
  {
    id: "child2",
    gender: "female",
    parents: [
      { id: "husband1", type: "blood" },
      { id: "wife1", type: "blood" },
    ],
    siblings: [],
    spouses: [{ id: "child2husband", type: "married" }],
    children: [
      { id: "child2kid", type: "blood" },
      { id: "child2kid2", type: "blood" },
    ],
    expanded: true,
    generationLevel: 2,
  },
  {
    id: "child3",
    gender: "male",
    parents: [
      { id: "husband1", type: "blood" },
      { id: "wife1", type: "blood" },
    ],
    siblings: [],
    spouses: [{ id: "child3wife", type: "married" }],
    children: [
      { id: "child3kid1", type: "blood" },
      { id: "child3kid2", type: "blood" },
    ],
    expanded: true,
    generationLevel: 2,
  },
  {
    id: "child4",
    gender: "female",
    parents: [
      { id: "husband1", type: "blood" },
      { id: "wife1", type: "blood" },
    ],
    siblings: [],
    spouses: [{ id: "child4husband", type: "married" }],
    children: [{ id: "child4kid", type: "blood" }],
    expanded: true,
    generationLevel: 2,
  },
  {
    id: "child5",
    gender: "male",
    parents: [
      { id: "husband1", type: "blood" },
      { id: "wife1", type: "blood" },
    ],
    siblings: [],
    spouses: [{ id: "child5wife", type: "married" }],
    children: [{ id: "child5kid", type: "blood" }],
    expanded: true,
    generationLevel: 2,
  },
  {
    id: "child6",
    gender: "male",
    parents: [
      { id: "husband1", type: "blood" },
      { id: "wife2", type: "blood" },
    ],
    siblings: [],
    spouses: [{ id: "child6wife", type: "married" }],
    children: [
      { id: "child6kid1", type: "blood" },
      { id: "child6kid2", type: "blood" },
    ],
    expanded: true,
    generationLevel: 2,
  },

  // Thế hệ 2: Vợ/chồng của các con
  {
    id: "child1wife",
    gender: "female",
    parents: [],
    siblings: [],
    spouses: [{ id: "child1", type: "married" }],
    children: [
      { id: "child1kid", type: "blood" },
      { id: "child1kid2", type: "blood" },
    ],
    expanded: true,
    generationLevel: 2,
  },
  {
    id: "child2husband",
    gender: "male",
    parents: [],
    siblings: [],
    spouses: [{ id: "child2", type: "married" }],
    children: [
      { id: "child2kid", type: "blood" },
      { id: "child2kid2", type: "blood" },
    ],
    expanded: true,
    generationLevel: 2,
  },
  {
    id: "child3wife",
    gender: "female",
    parents: [],
    siblings: [],
    spouses: [{ id: "child3", type: "married" }],
    children: [
      { id: "child3kid1", type: "blood" },
      { id: "child3kid2", type: "blood" },
    ],
    expanded: true,
    generationLevel: 2,
  },
  {
    id: "child4husband",
    gender: "male",
    parents: [],
    siblings: [],
    spouses: [{ id: "child4", type: "married" }],
    children: [{ id: "child4kid", type: "blood" }],
  },
  {
    id: "child5wife",
    gender: "female",
    parents: [],
    siblings: [],
    spouses: [{ id: "child5", type: "married" }],
    children: [{ id: "child5kid", type: "blood" }],
  },
  {
    id: "child6wife",
    gender: "female",
    parents: [],
    siblings: [],
    spouses: [{ id: "child6", type: "married" }],
    children: [
      { id: "child6kid1", type: "blood" },
      { id: "child6kid2", type: "blood" },
    ],
    expanded: false,
    generationLevel: 2,
  },

  // Thế hệ 3 (Cháu của Gen2)
  {
    id: "child1kid",
    gender: "male",
    parents: [
      { id: "child1", type: "blood" },
      { id: "child1wife", type: "blood" },
    ],
    siblings: [],
    spouses: [{ id: "child1kidwife", type: "married" }],
    children: [
      { id: "greatgrandchild1", type: "blood" },
      { id: "greatgrandchild2", type: "blood" },
    ],
    expanded: false,
    generationLevel: 3,
  },
  {
    id: "child1kid2",
    gender: "female",
    parents: [
      { id: "child1", type: "blood" },
      { id: "child1wife", type: "blood" },
    ],
    siblings: [],
    spouses: [],
    children: [],
    expanded: false,
    generationLevel: 3,
  },
  {
    id: "child2kid",
    gender: "female",
    parents: [
      { id: "child2", type: "blood" },
      { id: "child2husband", type: "blood" },
    ],
    siblings: [],
    spouses: [{ id: "child2kidhusband", type: "married" }],
    children: [{ id: "greatgrandchild3", type: "blood" }],
    expanded: false,
    generationLevel: 3
  },
  {
    id: "child2kid2",
    gender: "male",
    parents: [
      { id: "child2", type: "blood" },
      { id: "child2husband", type: "blood" },
    ],
    siblings: [],
    spouses: [],
    children: [],
    expanded: false,
    generationLevel: 3
  },
  {
    id: "child3kid1",
    gender: "male",
    parents: [
      { id: "child3", type: "blood" },
      { id: "child3wife", type: "blood" },
    ],
    siblings: [],
    spouses: [{ id: "child3kid1wife", type: "married" }],
    children: [{ id: "greatgrandchild4", type: "blood" }],
    expanded: false,
    generationLevel: 3
  },
  {
    id: "child3kid2",
    gender: "female",
    parents: [
      { id: "child3", type: "blood" },
      { id: "child3wife", type: "blood" },
    ],
    siblings: [],
    spouses: [{ id: "child3kid2husband", type: "married" }],
    children: [{ id: "greatgrandchild5", type: "blood" }],
    expanded: false,
    generationLevel: 3
  },
  {
    id: "child4kid",
    gender: "male",
    parents: [
      { id: "child4", type: "blood" },
      { id: "child4husband", type: "blood" },
    ],
    siblings: [],
    spouses: [],
    children: [],
    expanded: false,
    generationLevel: 3
  },
  {
    id: "child5kid",
    gender: "female",
    parents: [
      { id: "child5", type: "blood" },
      { id: "child5wife", type: "blood" },
    ],
    siblings: [],
    spouses: [],
    children: [],
    expanded: false,
    generationLevel: 3
  },
  {
    id: "child6kid1",
    gender: "male",
    parents: [
      { id: "child6", type: "blood" },
      { id: "child6wife", type: "blood" },
    ],
    siblings: [],
    spouses: [],
    children: [],
    expanded: false,
    generationLevel: 3
  },
  {
    id: "child6kid2",
    gender: "female",
    parents: [
      { id: "child6", type: "blood" },
      { id: "child6wife", type: "blood" },
    ],
    siblings: [],
    spouses: [],
    children: [],
    expanded: false,
    generationLevel: 3
  },

  // Thế hệ 3: Vợ/chồng của các cháu đã được khai báo ở phần Gen2 spouses

  // Thế hệ 4 (Cháu chắt của Gen2)
  {
    id: "greatgrandchild1",
    gender: "male",
    parents: [
      { id: "child1kid", type: "blood" },
      { id: "child1kidwife", type: "blood" },
    ],
    siblings: [],
    spouses: [{ id: "ggc1wife", type: "married" }],
    children: [
      { id: "gggrandchild1", type: "blood" },
      { id: "gggrandchild2", type: "blood" },
    ],
    expanded: false,
    generationLevel: 4
  },
  {
    id: "greatgrandchild2",
    gender: "female",
    parents: [
      { id: "child1kid", type: "blood" },
      { id: "child1kidwife", type: "blood" },
    ],
    siblings: [],
    spouses: [],
    children: [],
    expanded: false,
    generationLevel: 4
  },
  {
    id: "greatgrandchild3",
    gender: "male",
    parents: [
      { id: "child2kid", type: "blood" },
      { id: "child2kidhusband", type: "blood" },
    ],
    siblings: [],
    spouses: [],
    children: [],
  },
  {
    id: "greatgrandchild4",
    gender: "female",
    parents: [
      { id: "child3kid1", type: "blood" },
      { id: "child3kid1wife", type: "blood" },
    ],
    siblings: [],
    spouses: [],
    children: [],
  },
  {
    id: "greatgrandchild5",
    gender: "male",
    parents: [
      { id: "child3kid2", type: "blood" },
      { id: "child3kid2husband", type: "blood" },
    ],
    siblings: [],
    spouses: [],
    children: [],
  },

  // Thế hệ 4: Vợ/chồng của các cháu chắt (đã khai báo ở phần Gen3 spouses)

  // Thế hệ 5: Mở rộng từ greatgrandchild1
  {
    id: "ggc1wife",
    gender: "female",
    parents: [],
    siblings: [],
    spouses: [{ id: "greatgrandchild1", type: "married" }],
    children: [
      { id: "gggrandchild1", type: "blood" },
      { id: "gggrandchild2", type: "blood" },
    ],
  },
  {
    id: "gggrandchild1",
    gender: "male",
    parents: [
      { id: "greatgrandchild1", type: "blood" },
      { id: "ggc1wife", type: "blood" },
    ],
    siblings: [],
    spouses: [{ id: "gggrandchild1wife", type: "married" }],
    children: [{ id: "ggggchild1", type: "blood" }],
  },
  {
    id: "gggrandchild2",
    gender: "female",
    parents: [
      { id: "greatgrandchild1", type: "blood" },
      { id: "ggc1wife", type: "blood" },
    ],
    siblings: [],
    spouses: [],
    children: [],
  },

  {
    id: "gggrandchild1wife",
    gender: "female",
    parents: [],
    siblings: [],
    spouses: [{ id: "gggrandchild1", type: "married" }],
    children: [{ id: "ggggchild1", type: "blood" }],
  },

  {
    id: "ggggchild1",
    gender: "male",
    parents: [
      { id: "gggrandchild1", type: "blood" },
      { id: "gggrandchild1wife", type: "blood" },
    ],
    siblings: [],
    spouses: [],
    children: [],
  },
];

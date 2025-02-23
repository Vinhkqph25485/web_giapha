// Family Unit 1: Gia đình của Gen1 (husband1 & wife1 và các con: child1, child2, child3, child4, child5)
export const familyUnit1 = [
    {
      id: "husband1",
      gender: "male",
      parents: [],
      siblings: [],
      spouses: [
        {
          id: "wife1",
          type: "married",
        },
      ],
      children: [
        {
          id: "child1",
          type: "blood",
        },
        {
          id: "child2",
          type: "blood",
        },
        {
          id: "child3",
          type: "blood",
        },
        {
          id: "child4",
          type: "blood",
        },
        {
          id: "child5",
          type: "blood",
        },
      ],
    },
    {
      id: "wife1",
      gender: "female",
      parents: [],
      siblings: [],
      spouses: [
        {
          id: "husband1",
          type: "married",
        },
      ],
      children: [
        {
          id: "child1",
          type: "blood",
        },
        {
          id: "child2",
          type: "blood",
        },
        {
          id: "child3",
          type: "blood",
        },
        {
          id: "child4",
          type: "blood",
        },
        {
          id: "child5",
          type: "blood",
        },
      ],
    },
    {
      id: "child1",
      gender: "male",
      parents: [
        {
          id: "husband1",
          type: "blood",
        },
        {
          id: "wife1",
          type: "blood",
        },
      ],
      siblings: [],
      spouses: [],
      children: [],
    },
    {
      id: "child2",
      gender: "female",
      parents: [
        {
          id: "husband1",
          type: "blood",
        },
        {
          id: "wife1",
          type: "blood",
        },
      ],
      siblings: [],
      spouses: [],
      children: [],
    },
    {
      id: "child3",
      gender: "male",
      parents: [
        {
          id: "husband1",
          type: "blood",
        },
        {
          id: "wife1",
          type: "blood",
        },
      ],
      siblings: [],
      spouses: [],
      children: [],
    },
    {
      id: "child4",
      gender: "female",
      parents: [
        {
          id: "husband1",
          type: "blood",
        },
        {
          id: "wife1",
          type: "blood",
        },
      ],
      siblings: [],
      spouses: [],
      children: [],
    },
    {
      id: "child5",
      gender: "male",
      parents: [
        {
          id: "husband1",
          type: "blood",
        },
        {
          id: "wife1",
          type: "blood",
        },
      ],
      siblings: [],
      spouses: [],
      children: [],
    },
  ];
  
  // Family Unit 2: Gia đình của Gen1 (husband1 & wife2 và con: child6)
  export const familyUnit2 = [
    {
      id: "husband1",
      gender: "male",
      parents: [],
      siblings: [],
      spouses: [
        {
          id: "wife2",
          type: "married",
        },
      ],
      children: [
        {
          id: "child6",
          type: "blood",
        },
      ],
    },
    {
      id: "wife2",
      gender: "female",
      parents: [],
      siblings: [],
      spouses: [
        {
          id: "husband1",
          type: "married",
        },
      ],
      children: [
        {
          id: "child6",
          type: "blood",
        },
      ],
    },
    {
      id: "child6",
      gender: "male",
      parents: [
        {
          id: "husband1",
          type: "blood",
        },
        {
          id: "wife2",
          type: "blood",
        },
      ],
      siblings: [],
      spouses: [],
      children: [],
    },
  ];
  
  // Family Unit 3: Gia đình của Gen2 (child1 & child1wife với các con: child1kid, child1kid2)
  export const familyUnit3 = [
    {
      id: "child1",
      gender: "male",
      parents: [
      ],
      siblings: [],
      spouses: [
        {
          id: "child1wife",
          type: "married",
        },
      ],
      children: [
        {
          id: "child1kid",
          type: "blood",
        },
        {
          id: "child1kid2",
          type: "blood",
        },
      ],
    },
    {
      id: "child1wife",
      gender: "female",
      parents: [],
      siblings: [],
      spouses: [
        {
          id: "child1",
          type: "married",
        },
      ],
      children: [
        {
          id: "child1kid",
          type: "blood",
        },
        {
          id: "child1kid2",
          type: "blood",
        },
      ],
    },
    {
      id: "child1kid",
      gender: "male",
      parents: [
        {
          id: "child1",
          type: "blood",
        },
        {
          id: "child1wife",
          type: "blood",
        },
      ],
      siblings: [],
      spouses: [],
      children: [],
    },
    {
      id: "child1kid2",
      gender: "female",
      parents: [
        {
          id: "child1",
          type: "blood",
        },
        {
          id: "child1wife",
          type: "blood",
        },
      ],
      siblings: [],
      spouses: [],
      children: [],
    },
  ];
  
  // Family Unit 4: Gia đình của Gen2 (child2 & child2husband với các con: child2kid, child2kid2)
  export const familyUnit4 = [
    {
      id: "child2",
      gender: "female",
      parents: [
      ],
      siblings: [],
      spouses: [
        {
          id: "child2husband",
          type: "married",
        },
      ],
      children: [
        {
          id: "child2kid",
          type: "blood",
        },
        {
          id: "child2kid2",
          type: "blood",
        },
      ],
    },
    {
      id: "child2husband",
      gender: "male",
      parents: [],
      siblings: [],
      spouses: [
        {
          id: "child2",
          type: "married",
        },
      ],
      children: [
        {
          id: "child2kid",
          type: "blood",
        },
        {
          id: "child2kid2",
          type: "blood",
        },
      ],
    },
    {
      id: "child2kid",
      gender: "female",
      parents: [
        {
          id: "child2",
          type: "blood",
        },
        {
          id: "child2husband",
          type: "blood",
        },
      ],
      siblings: [],
      spouses: [],
      children: [],
    },
    {
      id: "child2kid2",
      gender: "male",
      parents: [
        {
          id: "child2",
          type: "blood",
        },
        {
          id: "child2husband",
          type: "blood",
        },
      ],
      siblings: [],
      spouses: [],
      children: [],
    },
  ];
  
  // Family Unit 5: Gia đình của Gen2 (child3 & child3wife với các con: child3kid1, child3kid2)
  export const familyUnit5 = [
    {
      id: "child3",
      gender: "male",
      parents: [
      ],
      siblings: [],
      spouses: [
        {
          id: "child3wife",
          type: "married",
        },
      ],
      children: [
        {
          id: "child3kid1",
          type: "blood",
        },
        {
          id: "child3kid2",
          type: "blood",
        },
      ],
    },
    {
      id: "child3wife",
      gender: "female",
      parents: [],
      siblings: [],
      spouses: [
        {
          id: "child3",
          type: "married",
        },
      ],
      children: [
        {
          id: "child3kid1",
          type: "blood",
        },
        {
          id: "child3kid2",
          type: "blood",
        },
      ],
    },
    {
      id: "child3kid1",
      gender: "male",
      parents: [
        {
          id: "child3",
          type: "blood",
        },
        {
          id: "child3wife",
          type: "blood",
        },
      ],
      siblings: [],
      spouses: [
        {
          id: "child3kid1wife",
          type: "married",
        },
      ],
      children: [
        {
          id: "greatgrandchild4",
          type: "blood",
        },
      ],
    },
    {
      id: "child3kid2",
      gender: "female",
      parents: [
        {
          id: "child3",
          type: "blood",
        },
        {
          id: "child3wife",
          type: "blood",
        },
      ],
      siblings: [],
      spouses: [
        {
          id: "child3kid2husband",
          type: "married",
        },
      ],
      children: [
       
      ],
    },
    {
      id: "child3kid1wife",
      gender: "female",
      parents: [],
      siblings: [],
      spouses: [
        {
          id: "child3kid1",
          type: "married",
        },
      ],
      children: [
       
      ],
    },
    {
      id: "child3kid2husband",
      gender: "male",
      parents: [],
      siblings: [],
      spouses: [
        {
          id: "child3kid2",
          type: "married",
        },
      ],
      children: [
       
      ],
    },
  ];
  
  // Family Unit 6: Gia đình của Gen2 (child4 & child4husband với con: child4kid)
  export const familyUnit6 = [
    {
      id: "child4",
      gender: "female",
      parents: [
      ],
      siblings: [],
      spouses: [
        {
          id: "child4husband",
          type: "married",
        },
      ],
      children: [
        {
          id: "child4kid",
          type: "blood",
        },
      ],
    },
    {
      id: "child4husband",
      gender: "male",
      parents: [],
      siblings: [],
      spouses: [
        {
          id: "child4",
          type: "married",
        },
      ],
      children: [
        {
          id: "child4kid",
          type: "blood",
        },
      ],
    },
    {
      id: "child4kid",
      gender: "male",
      parents: [
        {
          id: "child4",
          type: "blood",
        },
        {
          id: "child4husband",
          type: "blood",
        },
      ],
      siblings: [],
      spouses: [],
      children: [],
    },
  ];
  
  // Family Unit 7: Gia đình của Gen2 (child5 & child5wife với con: child5kid)
  export const familyUnit7 = [
    {
      id: "child5",
      gender: "male",
      parents: [
      ],
      siblings: [],
      spouses: [
        {
          id: "child5wife",
          type: "married",
        },
      ],
      children: [
        {
          id: "child5kid",
          type: "blood",
        },
      ],
    },
    {
      id: "child5wife",
      gender: "female",
      parents: [],
      siblings: [],
      spouses: [
        {
          id: "child5",
          type: "married",
        },
      ],
      children: [
        {
          id: "child5kid",
          type: "blood",
        },
      ],
    },
    {
      id: "child5kid",
      gender: "female",
      parents: [
        {
          id: "child5",
          type: "blood",
        },
        {
          id: "child5wife",
          type: "blood",
        },
      ],
      siblings: [],
      spouses: [],
      children: [],
    },
  ];
  
  // Family Unit 8: Gia đình của Gen2 (child6 & child6wife với các con: child6kid1, child6kid2)
  export const familyUnit8 = [
    {
      id: "child6",
      gender: "male",
      parents: [
      ],
      siblings: [],
      spouses: [
        {
          id: "child6wife",
          type: "married",
        },
      ],
      children: [
        {
          id: "child6kid1",
          type: "blood",
        },
        {
          id: "child6kid2",
          type: "blood",
        },
      ],
    },
    {
      id: "child6wife",
      gender: "female",
      parents: [],
      siblings: [],
      spouses: [
        {
          id: "child6",
          type: "married",
        },
      ],
      children: [
        {
          id: "child6kid1",
          type: "blood",
        },
        {
          id: "child6kid2",
          type: "blood",
        },
      ],
    },
    {
      id: "child6kid1",
      gender: "male",
      parents: [
        {
          id: "child6",
          type: "blood",
        },
        {
          id: "child6wife",
          type: "blood",
        },
      ],
      siblings: [],
      spouses: [],
      children: [],
    },
    {
      id: "child6kid2",
      gender: "female",
      parents: [
        {
          id: "child6",
          type: "blood",
        },
        {
          id: "child6wife",
          type: "blood",
        },
      ],
      siblings: [],
      spouses: [],
      children: [],
    },
  ];
  
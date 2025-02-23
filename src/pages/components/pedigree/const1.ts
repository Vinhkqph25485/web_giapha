
import { dataFake2 } from "./Pedigree/data2";
import { familyUnit1,  familyUnit2, familyUnit3, familyUnit4, familyUnit5, familyUnit6, familyUnit7, familyUnit8 } from "./Pedigree/data1";

export const SOURCES1 = {
  "Đại gia Đình": dataFake2,
  "Gia đình 1": familyUnit1,
  "Gia đình 2": familyUnit2,
  "Gia đình 3": familyUnit3,
  "Gia đình 4": familyUnit4,
  "Gia đình 5": familyUnit5,
  "Gia đình 6": familyUnit6,
  "Gia đình 7": familyUnit7,
  "Gia đình 8": familyUnit8,
};

export const DEFAULT_SOURCE = Object.keys(SOURCES1)[0];

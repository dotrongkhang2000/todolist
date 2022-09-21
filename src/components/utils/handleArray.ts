import { arrayMove as DndKitSortArray } from "@dnd-kit/sortable";

export const removeAtIndex = (arr: IJob[], index: number) => {
  return arr.filter((_, _index) => _index !== index);
};

export const insertAtIndex = (arr: IJob[], index: number, item: IJob) => [
  ...arr.slice(0, index),
  item,
  ...arr.slice(index),
];

export const arrayMove = (arr: IJob[], oldIndex: number, newIndex: number) => {
  return DndKitSortArray(arr, oldIndex, newIndex);
};

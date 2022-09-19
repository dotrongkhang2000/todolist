import { UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove as DndKitSortArray } from "@dnd-kit/sortable";

export const removeAtIndex = (arr: string[], index: number) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1),
];

export const insertAtIndex = (
  arr: string[],
  index: number,
  item: UniqueIdentifier
) => [...arr.slice(0, index), item, ...arr.slice(index)];

export const arrayMove = (
  arr: string[],
  oldIndex: number,
  newIndex: number
) => {
  return DndKitSortArray(arr, oldIndex, newIndex);
};

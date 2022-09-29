import { arrayMove as DndKitSortArray } from '@dnd-kit/sortable';

export const removeAtIndex = (arr: ITask[], index: number) => {
  return arr.filter((_, _index) => _index !== index);
};

export const insertAtIndex = (arr: ITask[], index: number, item: ITask) => [
  ...arr.slice(0, index),
  item,
  ...arr.slice(index),
];

export const arrayMove = (arr: ITask[], oldIndex: number, newIndex: number) => {
  return DndKitSortArray(arr, oldIndex, newIndex);
};

export const updateArrAtIndex = (arr: ITask[], task: ITask) => {
  const indexTask = arr.findIndex((t) => t.id === task.id);

  arr[indexTask] = task;

  return arr;
};

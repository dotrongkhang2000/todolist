import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Item from "./Item";
import { Box } from "@mui/material";

interface ISortableItemProps {
  idTask: string;
  taskTitle: string;
  listTask: ITask[];
}

const SortableItem = ({ idTask, taskTitle, listTask }: ISortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: idTask });

  const taskRender = listTask.find((task) => task.id === idTask);

  return (
    <Box
      component="li"
      sx={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <Item task={taskRender!} />
    </Box>
  );
};

export default SortableItem;

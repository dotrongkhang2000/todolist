import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Item from "./Item";
import { Box } from "@mui/material";

interface ISortableItemProps {
  taskTitle: string;
  listTask?: ITask[];
}

const SortableItem = ({ taskTitle, listTask }: ISortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: taskTitle });

  const taskRender = listTask?.find((task) => task.title === taskTitle);

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
      <Item task={taskRender} />
    </Box>
  );
};

export default SortableItem;

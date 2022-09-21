import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Item from "./Item";
import { Box } from "@mui/material";

interface ISortableItemProps {
  id: string;
  items?: IJob[];
}

const SortableItem = ({ id, items }: ISortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const jobRender = items?.find((item) => item.title === id);

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
      <Item id={jobRender} />
    </Box>
  );
};

export default SortableItem;

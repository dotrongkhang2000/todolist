import React from "react";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

import { Box } from "@mui/material";

interface DroppableProps {
  id: string;
  items: string[];
  activeId?: UniqueIdentifier | null;
}

const Droppable = ({ id, items }: DroppableProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <Box
        sx={{
          border: "1px solid #000",
          listStyle: "none",
        }}
        component="ul"
        className="droppable"
        ref={setNodeRef}
      >
        {items.map((item) => (
          <SortableItem key={item} id={item} />
        ))}
      </Box>
    </SortableContext>
  );
};

export default Droppable;

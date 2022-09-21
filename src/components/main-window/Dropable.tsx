import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

import { Add as AddIcon } from "@mui/icons-material";

import { IconButton, List, ListSubheader } from "@mui/material";

interface DroppableProps {
  id: string;
  items?: IJob[];
  activeId?: UniqueIdentifier | null;
}

const Droppable = ({ id, items }: DroppableProps) => {
  const { setNodeRef } = useDroppable({ id });

  const jobTileList = items?.map((item) => item?.title || "");

  return (
    <SortableContext
      id={id}
      items={jobTileList || []}
      strategy={rectSortingStrategy}
    >
      <List
        sx={(theme) => ({
          backgroundColor: theme.palette.grey[50],
          listStyle: "none",
          width: "342px",
          ml: 2,
          maxHeight: 1,
          borderRadius: 2,
          overflowY: "scroll",
        })}
        ref={setNodeRef}
        subheader={
          <ListSubheader
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 999,
            }}
          >
            {id}
            <IconButton>
              <AddIcon />
            </IconButton>
          </ListSubheader>
        }
      >
        {items?.map((item) => (
          <SortableItem key={item.title} id={item.title || ""} items={items} />
        ))}
      </List>
    </SortableContext>
  );
};

export default Droppable;

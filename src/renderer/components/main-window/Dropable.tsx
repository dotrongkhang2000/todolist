import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

import { Add as AddIcon } from "@mui/icons-material";

import { IconButton, List, ListSubheader, Box } from "@mui/material";

import { TitleIcon } from "../utils/renderIcon";
import { useState } from "react";
import DialogCreateJob from "../dialogs/dialog-create-job";
interface DroppableProps {
  id: string;
  items?: IJob[];
  activeId?: UniqueIdentifier | null;
}

const Droppable = ({ id, items }: DroppableProps) => {
  const { setNodeRef } = useDroppable({ id });

  const jobTileList = items?.map((item) => item?.title || "");

  const [openDialogCreateJob, setOpenDialogCreateJob] = useState(false);

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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {TitleIcon(
                id as
                  | "Backlog"
                  | "Todo"
                  | "In Progress"
                  | "In Review"
                  | "Done"
                  | "Canceled"
              )}
              {id}
              <Box sx={{ ml: 1.5 }}>{items?.length}</Box>
            </Box>
            <IconButton onClick={() => setOpenDialogCreateJob(true)}>
              <AddIcon />
            </IconButton>
          </ListSubheader>
        }
      >
        {items?.map((item) => (
          <SortableItem key={item.title} id={item.title || ""} items={items} />
        ))}
      </List>

      <DialogCreateJob
        open={openDialogCreateJob}
        handleClose={() => setOpenDialogCreateJob(false)}
      />
    </SortableContext>
  );
};

export default Droppable;

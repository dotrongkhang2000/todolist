import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

import { Add as AddIcon } from "@mui/icons-material";

import { IconButton, List, ListSubheader, Box } from "@mui/material";

import { TitleIcon } from "../utils/renderIcon";
import { useState } from "react";
import DialogCreateTask from "../dialogs/dialog-create-task";
interface DroppableProps {
  taskTitle: string;
  listTask?: ITask[];
  activeId?: UniqueIdentifier | null;
}

const Droppable = ({ taskTitle, listTask }: DroppableProps) => {
  const { setNodeRef } = useDroppable({ id: taskTitle });

  const taskTileList = listTask?.map((task) => task?.title || "");

  const [openDialogCreateTask, setOpenDialogCreateTask] = useState(false);

  return (
    <SortableContext
      id={taskTitle}
      items={taskTileList || []}
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
                taskTitle as
                  | "Backlog"
                  | "Todo"
                  | "In Progress"
                  | "In Review"
                  | "Done"
                  | "Canceled"
              )}
              {taskTitle}
              <Box sx={{ ml: 1.5 }}>{listTask?.length}</Box>
            </Box>
            <IconButton onClick={() => setOpenDialogCreateTask(true)}>
              <AddIcon />
            </IconButton>
          </ListSubheader>
        }
      >
        {listTask?.map((task) => (
          <SortableItem
            key={task.title}
            taskTitle={task.title || ""}
            listTask={listTask}
          />
        ))}
      </List>

      <DialogCreateTask
        open={openDialogCreateTask}
        handleClose={() => setOpenDialogCreateTask(false)}
      />
    </SortableContext>
  );
};

export default Droppable;

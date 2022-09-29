import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Box } from "@mui/material";
import Workspace from "./Workspace";

interface ISortableItemProps {
  workspaceId: string;
  listWorkspace: IWorkspace[];
}

const SortableWorkspace = ({
  workspaceId,
  listWorkspace,
}: ISortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: workspaceId });

  const workspaceRender = listWorkspace.find(
    (workspace) => workspace.id === workspaceId
  );

  return (
    <Box
      sx={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <Workspace workspace={workspaceRender!} />
    </Box>
  );
};

export default SortableWorkspace;

import { Box } from "@mui/material";

import { Assignment as AssignmentIcon } from "@mui/icons-material";
import {
  closestCenter,
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";

import { arrayMove as DndKitSortArray } from "@dnd-kit/sortable";
import Droppable from "./Droppable";
import Workspace from "./Workspace";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

const Sidebar = () => {
  const listWorkspaceInit: IWorkspace[] = [
    {
      id: "todolist",
      name: "Todolist 1",
      imgUrl: "public/logo192.png",
    },
    {
      id: "todolist2",
      name: "Todolist 2",
      imgUrl: "public/logo192.png",
    },
    {
      id: "todolist3",
      name: "Todolist 3",
      imgUrl: "public/logo192.png",
    },
    {
      id: "todolist4",
      name: "Todolist 4",
      imgUrl: "public/logo192.png",
    },
  ];

  const [listWorkspace, setListWorkspace] = useState(listWorkspaceInit);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(
    null
  );
  const [workspaceActive, setWorkspaceActive] = useState<IWorkspace | null>(
    null
  );

  const sensor = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveWorkspaceId(active?.id as string);

    const indexWorkspaceActive = listWorkspace.findIndex(
      (workspace) => workspace.id === active?.id
    );

    setWorkspaceActive(listWorkspace[indexWorkspaceActive]);
  };

  const handleDragCancel = () => setActiveWorkspaceId(null);

  const handleDragEnd = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;

    if (!over?.id) return;

    const activeIndex = listWorkspace.findIndex(
      (workspace) => workspace.id === activeWorkspaceId
    );
    const overIndex = listWorkspace.findIndex(
      (workspace) => workspace.id === overId
    );

    const newListWorkspace = DndKitSortArray(
      listWorkspace,
      activeIndex,
      overIndex
    );

    setListWorkspace(newListWorkspace);
  };

  return (
    <DndContext
      sensors={sensor}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
    >
      <Box
        sx={{
          width: 150,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        {listWorkspace.map((workspace) => (
          <Droppable
            activeWorkspaceId={activeWorkspaceId!}
            listWorkspace={listWorkspace}
            workspaceId={workspace.id}
            key={workspace.id}
          />
        ))}
      </Box>

      <DragOverlay>
        {activeWorkspaceId ? (
          <Workspace workspace={workspaceActive!} dragOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Sidebar;

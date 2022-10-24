import { Box, IconButton, Typography } from '@mui/material';

import { Add as AddIcon } from '@mui/icons-material';
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
} from '@dnd-kit/core';
import React, { SetStateAction, useEffect, useState } from 'react';

import { arrayMove as DndKitSortArray } from '@dnd-kit/sortable';
import { Droppable } from '@/renderer/components/side-bar/Droppable';
import { Workspace } from '@/renderer/components/side-bar/Workspace';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { BootstrapTooltip } from '@/renderer/components/utils/BootstrapTooltip';

import { useFirestore } from '@/renderer/hooks/useFirestore';
import create from 'zustand';
import { DialogActionsWorkspace } from '@/renderer/components/dialogs/dialog-actions-workspace';
import { TitleDialogActionsWorkspace } from '@/common/Dialogs';

interface IWorkspaceManagerState {
  workspaceActiveId: string;
  workspaceActiveName: string;
  updateWorkspaceActiveId: (id: string) => void;
  updateWorkspaceActiveName: (name: string) => void;
}

export const useWorkspaceManagerStore = create<IWorkspaceManagerState>(
  (set) => ({
    workspaceActiveId: '',
    workspaceActiveName: '',
    updateWorkspaceActiveId: (id) =>
      set((state) => ({
        ...state,
        workspaceActiveId: id,
      })),
    updateWorkspaceActiveName(name) {
      set((state) => ({
        ...state,
        workspaceActiveName: name,
      }));
    },
  })
);

export const Sidebar = () => {
  const initListWorkspace: IWorkspace[] = useFirestore({
    collection: 'list-workspace',
  });

  const { updateWorkspaceActiveId, updateWorkspaceActiveName } =
    useWorkspaceManagerStore((state) => ({
      updateWorkspaceActiveId: state.updateWorkspaceActiveId,
      updateWorkspaceActiveName: state.updateWorkspaceActiveName,
    }));

  const [listWorkspace, setListWorkspace] = useState<IWorkspace[]>([]);

  const [openDialogAddWorkspace, setOpenDialogAddWorkspace] = useState(false);

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

  useEffect(() => {
    setListWorkspace(initListWorkspace as SetStateAction<IWorkspace[]>);

    if (!activeWorkspaceId && initListWorkspace.length !== 0) {
      const initWorkspaceActiveId = initListWorkspace[0].id;
      const initWorkspaceActiveName = initListWorkspace[0].name;

      setActiveWorkspaceId(initWorkspaceActiveId);

      updateWorkspaceActiveId(initWorkspaceActiveId);
      updateWorkspaceActiveName(initWorkspaceActiveName);
    }
  }, [initListWorkspace]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
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
            width: 70,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflowY: 'auto',
            maxHeight: '80vh',
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

        <BootstrapTooltip
          title={<Typography color="white">Add Workspace</Typography>}
          placement="right"
          arrow
        >
          <IconButton
            sx={{
              m: 0.3,
              mt: 1,
              p: 1,
              '&:hover': {
                background: 'none',
              },
            }}
            onClick={() => setOpenDialogAddWorkspace(true)}
          >
            <AddIcon />
          </IconButton>
        </BootstrapTooltip>
        <DragOverlay>
          {activeWorkspaceId ? (
            <Workspace workspace={workspaceActive!} dragOverlay />
          ) : null}
        </DragOverlay>
      </DndContext>

      <DialogActionsWorkspace
        open={openDialogAddWorkspace}
        handleClose={() => setOpenDialogAddWorkspace(false)}
        initialWorkspace={{
          id: '',
          name: '',
          imgUrl: '',
          taskManager: {
            totalTask: 0,
            taskGroups: {
              Backlog: [],
              Todo: [],
              'In Progress': [],
              'In Review': [],
              Done: [],
              Canceled: [],
            },
          },
        }}
        totalWorkspace={listWorkspace.length}
        title={TitleDialogActionsWorkspace.ADD_WORKSPACE}
      />
    </Box>
  );
};

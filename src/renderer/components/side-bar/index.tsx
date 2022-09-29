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
import React, { useState } from 'react';

import { arrayMove as DndKitSortArray } from '@dnd-kit/sortable';
import Droppable from './Droppable';
import Workspace from './Workspace';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import DialogAddWorkspace from '../dialogs/dialog-add-workspace';
import BootstrapTooltip from '../utils/BootstrapTooltip';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  addWorkspace,
  setListWorkspace,
} from '../../store/workspaceManagerSlice';

const Sidebar = () => {
  const listWorkspace: IWorkspace[] = useSelector(
    (state: RootState) => state.workspaceManager.listWorkspace
  );

  const dispatch = useDispatch();

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

    dispatch(setListWorkspace(newListWorkspace));
  };

  const handleAddWorkspace = (workspace: IWorkspace) => {
    dispatch(addWorkspace(workspace));
  };

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

      <DialogAddWorkspace
        open={openDialogAddWorkspace}
        handleClose={() => setOpenDialogAddWorkspace(false)}
        handleAddWorkspace={(workspace: IWorkspace) =>
          handleAddWorkspace(workspace)
        }
        totalWorkspace={listWorkspace.length}
      />
    </Box>
  );
};

export default Sidebar;

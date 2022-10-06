import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Box } from '@mui/material';
import Workspace from './Workspace';
import ContextMenuWorkspace from '../menus/context-menu-workspace';
import { useDispatch } from 'react-redux';
import {
  setWorkspaceActiveId,
  setWorkspaceActiveName,
} from '../../store/workspaceManagerSlice';

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

  const dispatch = useDispatch();

  const workspaceRender = listWorkspace.find(
    (workspace) => workspace.id === workspaceId
  );

  const [anchorEl, setAnchorEL] = useState<null | HTMLElement>(null);

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setAnchorEL(event.currentTarget);
  };

  const handleClick = (workspaceId: string) => {
    dispatch(setWorkspaceActiveId(workspaceId));
    dispatch(setWorkspaceActiveName(workspaceRender!.name));
  };

  return (
    <>
      <Box
        sx={{
          transform: CSS.Transform.toString(transform),
          transition,
          opacity: isDragging ? 0.5 : 1,
        }}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        onContextMenu={(e) => handleContextMenu(e)}
        onClick={(e) => handleClick(workspaceRender!.id)}
      >
        <Workspace workspace={workspaceRender!} />
      </Box>

      <ContextMenuWorkspace
        anchorEl={anchorEl}
        handleClose={() => setAnchorEL(null)}
        workspace={workspaceRender!}
      />
    </>
  );
};

export default SortableWorkspace;

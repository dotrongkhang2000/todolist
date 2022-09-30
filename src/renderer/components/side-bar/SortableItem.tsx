import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Box } from '@mui/material';
import Workspace from './Workspace';
import ContextMenuWorkspace from '../menus/context-menu-workspace';

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

  const [anchorEl, setAnchorEL] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEL(event.currentTarget);
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
        onContextMenu={(e) => handleClick(e)}
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

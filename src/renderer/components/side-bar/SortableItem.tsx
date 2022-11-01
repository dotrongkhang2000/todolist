/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Box } from '@mui/material';
import { Workspace } from '@/renderer/components/side-bar/Workspace';
import { ContextMenuWorkspace } from '@/renderer/components/menus/context-menu-workspace';
import { useWorkspaceManagerStore } from '@/renderer/components/side-bar/index';

interface ISortableItemProps {
  workspaceId: string;
  listWorkspace: IWorkspace[];
}

export const SortableWorkspace = ({
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

  const { updateWorkspaceActiveId, updateWorkspaceActiveName } =
    useWorkspaceManagerStore((state) => ({
      updateWorkspaceActiveId: state.updateWorkspaceActiveId,
      updateWorkspaceActiveName: state.updateWorkspaceActiveName,
    }));

  const workspaceRender = listWorkspace.find(
    (workspace) => workspace.id === workspaceId
  );

  const [anchorEl, setAnchorEL] = useState<null | HTMLElement>(null);

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (window.windowRemote.getFlatform() === 'darwin') {
      window.service.menu.popup();

      return;
    }

    setAnchorEL(event.currentTarget);
  };

  const handleClick = (workspaceId: string) => {
    updateWorkspaceActiveId(workspaceId);
    updateWorkspaceActiveName(workspaceRender!.name);
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

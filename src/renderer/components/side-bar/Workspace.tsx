import { Avatar, Box, Typography } from '@mui/material';

import BootstrapTooltip from '@/renderer/components/utils/BootstrapTooltip';
import React from 'react';
// eslint-disable-next-line no-restricted-imports
import { blue } from '@mui/material/colors';
import { useWorkspaceManagerStore } from '@/renderer/components/side-bar/index';

interface IWorkspaceProps {
  workspace: IWorkspace;
  dragOverlay?: boolean;
}

const Workspace = ({ workspace, dragOverlay }: IWorkspaceProps) => {
  const workspaceActivId = useWorkspaceManagerStore(
    (state) => state.workspaceActiveId
  );

  return (
    <>
      <Box
        className="workspace-box"
        sx={{
          mt: 1,
          borderRadius: 2,
          border:
            workspaceActivId === workspace.id
              ? `3px solid ${blue[500]}`
              : '3px solid transparent',
          '&:hover': {
            border:
              dragOverlay ?? workspaceActivId === workspace.id
                ? `3px solid ${blue[500]}`
                : '3px solid #ccc',
            '& .box-workspace-name': {
              visibility: 'visible',
              width: 'max-content',
              opacity: 1,
            },
          },
          position: 'relative',
          cursor: dragOverlay ? 'grabbing' : 'default',
        }}
      >
        <BootstrapTooltip
          title={<Typography color="white">{workspace.name}</Typography>}
          placement="right"
          arrow
        >
          <Avatar
            variant="rounded"
            sx={{
              m: 0.3,
            }}
            src={workspace.imgUrl}
          >
            {workspace.name[0].toUpperCase()}
          </Avatar>
        </BootstrapTooltip>
      </Box>
    </>
  );
};

export default Workspace;

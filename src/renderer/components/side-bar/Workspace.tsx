import { Avatar, Box, Typography } from "@mui/material";

import { Assignment as AssignmentIcon } from "@mui/icons-material";
import BootstrapTooltip from "../utils/BootstrapTooltip";
import { useState } from "react";
import MenuWorkspace from "../menus/menu-workspace";

interface IWorkspaceProps {
  workspace: IWorkspace;
  dragOverlay?: boolean;
}

const Workspace = ({ workspace, dragOverlay }: IWorkspaceProps) => {
  const [anchorEl, setAnchorEL] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEL(event.currentTarget);
  };

  return (
    <Box
      className="workspace-box"
      sx={{
        mt: 1,
        border: "3px solid transparent",
        "&:hover": {
          border: dragOverlay ? "none" : "3px solid #ccc",
          borderRadius: 2,
          "& .box-workspace-name": {
            visibility: "visible",
            width: "max-content",
            opacity: 1,
          },
        },
        position: "relative",
        cursor: dragOverlay ? "grabbing" : "default",
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
            p: 1,
          }}
          onContextMenu={(e) => handleClick(e)}
        >
          <AssignmentIcon />
        </Avatar>
      </BootstrapTooltip>

      <MenuWorkspace
        anchorEl={anchorEl}
        handleClose={() => setAnchorEL(null)}
        workspace={workspace}
      />
    </Box>
  );
};

export default Workspace;

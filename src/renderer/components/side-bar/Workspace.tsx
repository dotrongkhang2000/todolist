import { Avatar, Box, Typography } from "@mui/material";

import { Assignment as AssignmentIcon } from "@mui/icons-material";
import BootstrapTooltip from "../utils/BootstrapTooltip";

interface IWorkspaceProps {
  workspace: IWorkspace;
  dragOverlay?: boolean;
}

const Workspace = ({ workspace, dragOverlay }: IWorkspaceProps) => {
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
        >
          <AssignmentIcon />
        </Avatar>
      </BootstrapTooltip>
    </Box>
  );
};

export default Workspace;

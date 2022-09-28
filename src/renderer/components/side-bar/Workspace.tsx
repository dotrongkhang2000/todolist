import {
  Avatar,
  Box,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";

import { Assignment as AssignmentIcon } from "@mui/icons-material";

interface IWorkspaceProps {
  workspace: IWorkspace;
  dragOverlay?: boolean;
}

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

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

import {
  SignalCellular0Bar as SignalCellular0BarIcon,
  SignalCellular1Bar as SignalCellular1BarIcon,
  SignalCellular2Bar as SignalCellular2BarIcon,
  SignalCellular3Bar as SignalCellular3BarIcon,
  SignalCellular4Bar as SignalCellular4BarIcon,
  FormatListBulleted as FormatListBulletedIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  PlayCircleFilled as PlayCircleFilledIcon,
  PauseCircleFilled as PauseCircleFilledIcon,
  ChangeCircle as ChangeCircleIcon,
} from "@mui/icons-material";
import { SxProps, Theme } from "@mui/material";

import { yellow } from "@mui/material/colors";

export const PriorityIcon = (
  priority: "No Priority" | "Low" | "Medium" | "High" | "Urgent",
  style?: SxProps<Theme>
) => {
  switch (priority) {
    case "Low":
      return (
        <SignalCellular1BarIcon sx={{ ...{ fontSize: "1rem" }, ...style }} />
      );
    case "Medium":
      return (
        <SignalCellular2BarIcon sx={{ ...{ fontSize: "1rem" }, ...style }} />
      );
    case "High":
      return (
        <SignalCellular3BarIcon sx={{ ...{ fontSize: "1rem" }, ...style }} />
      );
    case "Urgent":
      return (
        <SignalCellular4BarIcon sx={{ ...{ fontSize: "1rem" }, ...style }} />
      );
    default:
      return (
        <SignalCellular0BarIcon sx={{ ...{ fontSize: "1rem" }, ...style }} />
      );
  }
};

export const TitleIcon = (
  priority:
    | "Backlog"
    | "Todo"
    | "In Progress"
    | "In Review"
    | "Done"
    | "Canceled"
) => {
  switch (priority) {
    case "Todo":
      return (
        <PlayCircleFilledIcon sx={{ fontSize: "1.3rem", mr: 1, pb: "1px" }} />
      );
    case "In Progress":
      return (
        <PauseCircleFilledIcon
          sx={{ fontSize: "1.3rem", mr: 1, pb: "1px", color: yellow[300] }}
        />
      );
    case "In Review":
      return (
        <ChangeCircleIcon
          sx={{ fontSize: "1.3rem", mr: 1, pb: "1px" }}
          color="primary"
        />
      );
    case "Done":
      return (
        <CheckCircleIcon
          sx={{ fontSize: "1.3rem", mr: 1, pb: "1px" }}
          color="success"
        />
      );
    case "Canceled":
      return (
        <CancelIcon
          sx={{ fontSize: "1.3rem", mr: 1, pb: "1px" }}
          color="disabled"
        />
      );
    default:
      return (
        <FormatListBulletedIcon
          sx={{ fontSize: "1.3rem", mr: 1, pb: "1px" }}
          color="action"
        />
      );
  }
};

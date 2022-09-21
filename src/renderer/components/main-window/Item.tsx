import {
  Avatar,
  Badge,
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import {
  SignalCellular0Bar as SignalCellular0BarIcon,
  SignalCellular1Bar as SignalCellular1BarIcon,
  SignalCellular2Bar as SignalCellular2BarIcon,
  SignalCellular3Bar as SignalCellular3BarIcon,
  SignalCellular4Bar as SignalCellular4BarIcon,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";

interface IItemProps {
  id?: IJob | null;
  dragOverlay?: boolean;
  items?: IJob[];
}

const UserStatus = () => (
  <Box
    sx={{
      width: 12,
      height: 12,
      border: "2px solid #fff",
      borderRadius: "50%",
      bgcolor: green[500],
    }}
  />
);

const PriorityIcon = (
  priority: "No Priority" | "Low" | "Medium" | "High" | "Urgent"
) => {
  switch (priority) {
    case "Low":
      return <SignalCellular1BarIcon sx={{ fontSize: "1rem" }} />;
    case "Medium":
      return <SignalCellular2BarIcon sx={{ fontSize: "1rem" }} />;
    case "High":
      return <SignalCellular3BarIcon sx={{ fontSize: "1rem" }} />;
    case "Urgent":
      return <SignalCellular4BarIcon sx={{ fontSize: "1rem" }} />;
    default:
      return <SignalCellular0BarIcon sx={{ fontSize: "1rem" }} />;
  }
};

const Item = ({ id, dragOverlay }: IItemProps) => {
  return (
    <Box sx={{ cursor: dragOverlay ? "grabbing" : "grab" }}>
      <Card
        sx={{
          width: 326,
          mb: 1,
          mx: "auto",
        }}
      >
        <CardContent sx={{ padding: "8px 16px 0 16px" }}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="body2" color="darkgrey">
              {id?.title}
            </Typography>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={<UserStatus />}
            >
              <Avatar
                src={id?.assignee.avatarUrl}
                sx={{ width: 24, height: 24 }}
              >
                {!id?.assignee.avatarUrl && id?.assignee.name[0]}
              </Avatar>
            </Badge>
          </Stack>
          <Typography variant="subtitle2" sx={{ marginTop: 0.8 }}>
            {id?.description}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton>
            {/* @ts-expect-error */}
            <PriorityIcon priority={id?.priority} />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Item;

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

import { green } from "@mui/material/colors";
import { useState } from "react";
import DialogDetailTask from "../dialogs/dialog-detail-task";

import { PriorityIcon } from "../utils/renderIcon";

interface IItemProps {
  task: ITask | null;
  dragOverlay?: boolean;
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

const Item = ({ task, dragOverlay }: IItemProps) => {
  const [openDialogDetailTask, setOpenDialogDetailTask] = useState(false);

  const handleClickEvent = () => {
    setOpenDialogDetailTask(true);
  };

  return (
    <Box
      sx={{
        cursor: dragOverlay ? "grabbing" : "default",
      }}
    >
      <Card
        sx={{
          width: 326,
          mb: 1,
          mx: "auto",
          "&:hover": {
            backgroundColor: dragOverlay ? "#fff" : "#eee",
          },
        }}
        onClick={() => handleClickEvent()}
      >
        <CardContent sx={{ padding: "8px 16px 0 16px" }}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="body2" color="darkgrey">
              {task?.id}
            </Typography>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={<UserStatus />}
            >
              <Avatar
                src={task?.assignee?.avatarUrl}
                sx={{ width: 24, height: 24 }}
              >
                {!task?.assignee?.avatarUrl && task?.assignee?.name[0]}
              </Avatar>
            </Badge>
          </Stack>
          <Typography variant="subtitle2" sx={{ marginTop: 0.8 }}>
            {task?.title}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton>{PriorityIcon(task?.priority!)}</IconButton>
        </CardActions>
      </Card>

      <DialogDetailTask
        open={openDialogDetailTask}
        handleClose={() => setOpenDialogDetailTask(false)}
        taskRender={task!}
      />
    </Box>
  );
};

export default Item;

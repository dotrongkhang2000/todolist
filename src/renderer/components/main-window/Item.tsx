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

import { PriorityIcon } from "../utils/renderIcon";

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
            {PriorityIcon(id?.priority)}
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Item;

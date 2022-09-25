import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../../store/taskManagerSlice";
import { PriorityIcon, TitleIcon } from "../utils/renderIcon";

interface IDialogDetailTask {
  open: boolean;
  handleClose: () => void;
  taskRender: ITask;
}

interface ISelectComponentProps {
  selectItemList: string[];
  label: string;
  handleChange: (event: SelectChangeEvent) => void;
  item: string;
}

interface IRenderIconProps {
  label: string;
  iconName: string;
}

const RenderIcon = ({ label, iconName }: IRenderIconProps) => {
  const style: SxProps<Theme> = {
    mr: 1,
  };

  switch (label) {
    case "Priority":
      return PriorityIcon(
        iconName as "No Priority" | "Low" | "Medium" | "High" | "Urgent",
        style
      );
    default:
      return TitleIcon(
        iconName as
          | "Backlog"
          | "Todo"
          | "In Progress"
          | "In Review"
          | "Done"
          | "Canceled"
      );
  }
};

const SelectComponent = ({
  selectItemList,
  label,
  handleChange,
  item,
}: ISelectComponentProps) => (
  <FormControl sx={{ mt: 4, mr: 2, minWidth: 180 }} size="small">
    <InputLabel id="demo-select-small">{label}</InputLabel>
    <Select
      value={item}
      label={label}
      onChange={handleChange}
      sx={{
        "& .MuiSelect-select": {
          display: "flex",
          alignItems: "center",
        },
      }}
    >
      {selectItemList.map((item) => (
        <MenuItem value={item}>
          <RenderIcon label={label} iconName={item} />
          {item}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const DialogDetailTask = ({
  open,
  handleClose,
  taskRender,
}: IDialogDetailTask) => {
  const dispatch = useDispatch();

  const [task, setTask] = useState(taskRender);

  const statusList = [
    "Backlog",
    "Todo",
    "In Progress",
    "In Review",
    "Done",
    "Canceled",
  ];
  const priorityList = ["No Priority", "Low", "Medium", "High", "Urgent"];

  const handleChange = (taskChange: Partial<ITask>) => {
    setTask({ ...task, ...taskChange });
  };

  const handleSaveBtn = () => {
    dispatch(updateTask(task));

    handleClose();
  };

  return (
    <Dialog fullWidth open={open} onClose={() => handleClose()}>
      <DialogTitle id="alert-dialog-title">{task.id}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <TextField
            required
            id="task-title"
            label="Issue title"
            variant="standard"
            fullWidth
            sx={{ mb: 2 }}
            value={task.title}
            onChange={(e) => handleChange({ title: e.target.value })}
          />
          <TextField
            id="task-description"
            label="Add description..."
            multiline
            maxRows={4}
            variant="standard"
            fullWidth
            value={task.description}
            onChange={(e) => handleChange({ description: e.target.value })}
          />
          <Box>
            <SelectComponent
              selectItemList={statusList}
              label="Status"
              item={task.status}
              handleChange={(e) =>
                handleChange({ status: e.target.value as TaskStatus })
              }
            />
            <SelectComponent
              selectItemList={priorityList}
              label="Priority"
              item={task.priority}
              handleChange={(e) =>
                handleChange({ priority: e.target.value as TaskPriority })
              }
            />
          </Box>
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={() => handleSaveBtn()} autoFocus variant="contained">
            Save
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDetailTask;

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
  TextField,
} from "@mui/material";
import { useState } from "react";
import { PriorityIcon, TitleIcon } from "../utils/renderIcon";

interface IDialogCreateJob {
  open: boolean;
  handleClose: () => void;
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
  switch (label) {
    case "Priority":
      return PriorityIcon(
        iconName as "No Priority" | "Low" | "Medium" | "High" | "Urgent"
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

const DialogCreateJob = ({ open, handleClose }: IDialogCreateJob) => {
  const statusList = [
    "Backlog",
    "Todo",
    "In Progress",
    "In Review",
    "Done",
    "Canceled",
  ];
  const priorityList = ["No Priority", "Low", "Medium", "High", "Urgent"];

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const handleChange = (event: SelectChangeEvent, label: string) => {
    if (label === "Status") setStatus(event.target.value);
    if (label === "Priority") setPriority(event.target.value);
  };

  return (
    <Dialog fullWidth open={open}>
      <DialogTitle id="alert-dialog-title">New issue</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <TextField
            required
            id="standard-error-helper-text"
            label="Issue title"
            variant="standard"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            id="filled-multiline-flexible"
            label="Add description..."
            multiline
            maxRows={4}
            variant="standard"
            fullWidth
          />
          <Box>
            <SelectComponent
              selectItemList={statusList}
              label="Status"
              item={status}
              handleChange={(e) => handleChange(e, "Status")}
            />
            <SelectComponent
              selectItemList={priorityList}
              label="Priority"
              item={priority}
              handleChange={(e) => handleChange(e, "Priority")}
            />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleClose} autoFocus variant="contained">
          Create issue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCreateJob;

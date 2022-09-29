import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  TextField,
  Theme,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { createTask } from '../../store/taskManagerSlice';
import { PriorityIcon, TitleIcon } from '../utils/renderIcon';

interface IDialogCreateTask {
  open: boolean;
  handleClose: () => void;
  groupName: string;
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
    case 'Priority':
      return PriorityIcon(
        iconName as 'No Priority' | 'Low' | 'Medium' | 'High' | 'Urgent',
        style
      );
    default:
      return TitleIcon(
        iconName as
          | 'Backlog'
          | 'Todo'
          | 'In Progress'
          | 'In Review'
          | 'Done'
          | 'Canceled'
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
        '& .MuiSelect-select': {
          display: 'flex',
          alignItems: 'center',
        },
      }}
    >
      {selectItemList.map((item) => (
        <MenuItem value={item} key={item}>
          <RenderIcon label={label} iconName={item} />
          {item}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const DialogCreateTask = ({
  open,
  handleClose,
  groupName,
}: IDialogCreateTask) => {
  const dispatch = useDispatch();
  const totalTask = useSelector(
    (state: RootState) => state.taskManager.totalTask
  );

  const [task, setTask] = useState<ITask>({
    id: '',
    title: '',
    status: groupName as TaskStatus,
    priority: 'No Priority',
  });
  const statusList = [
    'Backlog',
    'Todo',
    'In Progress',
    'In Review',
    'Done',
    'Canceled',
  ];
  const priorityList = ['No Priority', 'Low', 'Medium', 'High', 'Urgent'];

  const handleChange = (taskChange: Partial<ITask>) => {
    setTask({ ...task, ...taskChange });
  };

  const handleSubmit = () => {
    const newTask: ITask = {
      id: `TOD-${totalTask + 1}`,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    };

    dispatch(createTask(newTask));
    handleClose();
  };

  return (
    <Dialog fullWidth open={open} onClose={() => handleClose()}>
      <DialogTitle id="alert-dialog-title">New issue</DialogTitle>
      <DialogContent>
        <DialogContent sx={{ p: 0 }}>
          <TextField
            required
            id="standard-error-helper-text"
            label="Issue title"
            variant="standard"
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => handleChange({ title: e.target.value })}
          />
          <TextField
            id="filled-multiline-flexible"
            label="Add description..."
            multiline
            maxRows={4}
            variant="standard"
            fullWidth
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
        </DialogContent>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} autoFocus variant="contained">
          Create issue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCreateTask;

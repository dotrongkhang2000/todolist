import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  TextField,
  Theme,
} from '@mui/material';
import React, { useState } from 'react';
import {
  PriorityIcon,
  TitleIcon,
} from '@/renderer/components/utils/renderIcon';
import { DeleteForever as DeleteForeverIcon } from '@mui/icons-material';
import { setTask as updateTask } from '@/renderer/firebase/services';
import { DialogDelete } from '@/renderer/components/dialogs/dialog-delete';
import { schemaFormTask } from '@/renderer/components/dialogs/schema';
import { useAlearManagerStore } from '@/renderer/components/alert';
import { hasErrors } from '@/renderer/components/utils/hasError';

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

export const DialogDetailTask = ({
  open,
  handleClose,
  taskRender,
}: IDialogDetailTask) => {
  const [task, setTask] = useState(taskRender);

  const [openDialogDeleteTask, setOpenDialogDeleteTask] = useState(false);

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

  const addAlert = useAlearManagerStore((state) => state.addAlert);
  const removeAlert = useAlearManagerStore((state) => state.removeAlert);

  const handleSaveBtn = () => {
    if (
      hasErrors({
        schema: schemaFormTask,
        rawData: task,
        addAlert,
        removeAlert,
      })
    )
      return;

    updateTask(task)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('success');
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));

    handleClose();
  };

  return (
    <Dialog fullWidth open={open} onClose={() => handleClose()}>
      <DialogTitle id="alert-dialog-title">
        {task.id}
        <IconButton
          sx={{ float: 'right', p: 1, top: -5, right: -16 }}
          onClick={() => setOpenDialogDeleteTask(true)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={() => handleSaveBtn()} autoFocus variant="contained">
          Save
        </Button>
      </DialogActions>

      <DialogDelete
        open={openDialogDeleteTask}
        handleClose={() => {
          setOpenDialogDeleteTask(false);
        }}
        task={taskRender}
        dialogName="task"
      />
    </Dialog>
  );
};

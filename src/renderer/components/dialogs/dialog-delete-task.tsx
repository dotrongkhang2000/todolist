import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
// eslint-disable-next-line no-restricted-imports
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IAlertDialogSlideProps {
  open: boolean;
  handleClose: () => void;
  task: ITask;
}

export const DialogDeleteTask = ({
  open,
  handleClose,
  task,
}: IAlertDialogSlideProps) => {
  const handleDeleteTask = () => {
    handleClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleClose()}
    >
      <DialogTitle>Are you sure you want to delete task {task.id}?</DialogTitle>
      <DialogContent>
        <DialogContentText>Task deleted will never revert.</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 1 }}>
        <Button onClick={() => handleClose()} variant="outlined">
          Disagree
        </Button>
        <Button onClick={() => handleDeleteTask()} variant="contained">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

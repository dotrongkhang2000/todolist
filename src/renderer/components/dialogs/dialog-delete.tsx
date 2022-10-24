import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import { deleteTask, deleteWorkspace } from '@/renderer/firebase/services';
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
  task?: ITask;
  dialogName: string;
  workspace?: IWorkspace;
}

const DialogDelete = ({
  open,
  handleClose,
  task,
  dialogName,
  workspace,
}: IAlertDialogSlideProps) => {
  const handleDelete = () => {
    switch (dialogName) {
      case 'task':
        deleteTask(task!.id)
          .then(() => {
            // eslint-disable-next-line no-console
            console.log('alert delete task success');
          })
          // eslint-disable-next-line no-console
          .catch((err) => console.log(err));
        break;
      case 'workspace':
        // dispatch(deleteWorkspace(workspace!));

        deleteWorkspace(workspace!.id)
          .then(() => {
            // eslint-disable-next-line no-console
            console.log('alert delete success');
          })
          .catch((err) =>
            // eslint-disable-next-line no-console
            console.log(err)
          );
        break;
      default:
    }

    handleClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleClose()}
    >
      <DialogTitle>
        Are you sure you want to delete {dialogName}{' '}
        {dialogName === 'task' ? task?.id : workspace?.id}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {dialogName.charAt(0).toUpperCase() + dialogName.slice(1)} deleted
          will never revert.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 1 }}>
        <Button onClick={() => handleClose()} variant="outlined">
          Disagree
        </Button>
        <Button onClick={() => handleDelete()} variant="contained">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogDelete;

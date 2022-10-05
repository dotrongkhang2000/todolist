import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../store/workspaceManagerSlice';
import { deleteWorkspaceInData } from '../../firebase/services';

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
  const dispatch = useDispatch();

  const handleDelete = () => {
    switch (dialogName) {
      case 'task':
        dispatch(deleteTask({ status: task!.status, taskId: task!.id }));
        break;
      case 'workspace':
        // dispatch(deleteWorkspace(workspace!));

        deleteWorkspaceInData(workspace!)
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

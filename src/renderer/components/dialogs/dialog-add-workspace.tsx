import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { setListWorkspace } from '../../firebase/services';

interface IDialogAddWorkspace {
  open: boolean;
  handleClose: () => void;
  handleAddWorkspace: (workspace: IWorkspace) => void;
  totalWorkspace: number;
}

const DialogAddWorkspace = ({
  open,
  handleClose,
  handleAddWorkspace,
  totalWorkspace,
}: IDialogAddWorkspace) => {
  const [workspace, setWorkspace] = useState<IWorkspace>({
    id: '',
    name: '',
    imgUrl: '',
    taskManager: {
      totalTask: 0,
      taskGroups: {
        Backlog: [],
        Todo: [],
        'In Progress': [],
        'In Review': [],
        Done: [],
        Canceled: [],
      },
    },
  });

  const handleChange = (workspaceChange: Partial<IWorkspace>) => {
    setWorkspace({ ...workspace, ...workspaceChange });
  };

  const handleSubmit = () => {
    handleAddWorkspace({
      ...workspace,
      id: `Workspace-${totalWorkspace}`,
    });

    setListWorkspace({
      ...workspace,
      id: `Workspace-${totalWorkspace}`,
    })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('alert add suscessfully');
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));

    handleClose();
  };

  return (
    <Dialog fullWidth open={open} onClose={() => handleClose()}>
      <DialogTitle id="alert-dialog-title">Add Workspace</DialogTitle>
      <DialogContent>
        <DialogContent sx={{ p: 0 }}>
          <TextField
            required
            label="Name"
            variant="standard"
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => handleChange({ name: e.target.value })}
          />
          <TextField
            label="Image Link"
            multiline
            maxRows={4}
            variant="standard"
            fullWidth
            onChange={(e) => handleChange({ imgUrl: e.target.value })}
          />
        </DialogContent>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={() => handleClose()} variant="outlined">
          Cancel
        </Button>
        <Button onClick={() => handleSubmit()} autoFocus variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAddWorkspace;

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

interface IDialogEditWorkspaceProps {
  open: boolean;
  handleClose: () => void;
  workspaceRender: IWorkspace;
}

const DialogEditWorkspace = ({
  open,
  handleClose,
  workspaceRender,
}: IDialogEditWorkspaceProps) => {
  const [workspace, setWorkspace] = useState(workspaceRender);

  const handleChange = (change: Partial<IWorkspace>) => {
    setWorkspace({ ...workspace, ...change });
  };

  const handleSaveBtn = () => {
    setListWorkspace(workspace)
      // eslint-disable-next-line no-console
      .then(() => console.log('alert edit success'))
      // eslint-disable-next-line no-console
      .catch((err: Error) => console.log(err));

    handleClose();
  };

  return (
    <Dialog fullWidth open={open} onClose={() => handleClose()}>
      <DialogTitle id="alert-dialog-title">{workspace.id}</DialogTitle>
      <DialogContent>
        <TextField
          required
          label="Name"
          variant="standard"
          fullWidth
          sx={{ mb: 2 }}
          value={workspace.name}
          onChange={(e) => handleChange({ name: e.target.value })}
        />
        <TextField
          label="Image Url"
          multiline
          maxRows={4}
          variant="standard"
          fullWidth
          value={workspace.imgUrl}
          onChange={(e) => handleChange({ imgUrl: e.target.value })}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={() => handleSaveBtn()} autoFocus variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogEditWorkspace;

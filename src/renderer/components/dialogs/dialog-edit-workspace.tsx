import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import React, { useState } from 'react';
import { storage } from '../../firebase/config';
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
  const [imgWorkspaceUrl, setImgWorkspaceUrl] = useState('');

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

  const getImgUrl = (filePath: string) => {
    const imageRef = ref(storage, filePath);

    getDownloadURL(imageRef)
      .then((url) => {
        setImgWorkspaceUrl(url);

        setWorkspace({ ...workspace, imgUrl: url });
      })
      .catch((err) => new Error(err));
  };

  const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileData = e.target.files![0];

    if (!fileData) return;

    const workspaceImgRef = ref(storage, `workspaceImages/${workspace.id}`);

    uploadBytes(workspaceImgRef, fileData)
      .then((snapShot) => {
        getImgUrl(snapShot.metadata.fullPath);
      })
      .catch((err) => new Error(err));
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
        <Box>
          <Typography variant="subtitle1" fontSize={12} color="text">
            Image
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant="rounded"
              src={imgWorkspaceUrl}
              sx={{
                width: 120,
                height: 120,
              }}
            />

            <Button variant="outlined" sx={{ ml: 2 }}>
              Upload File
              <Box
                component="input"
                type="file"
                onChange={(e) => handleChooseFile(e)}
                accept="image/*"
                sx={{
                  opacity: 0,
                  position: 'absolute',
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                }}
              />
            </Button>
          </Box>
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
    </Dialog>
  );
};

export default DialogEditWorkspace;

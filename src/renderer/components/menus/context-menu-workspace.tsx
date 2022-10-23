import {
  MenuItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Menu,
  Divider,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import React, { useState } from 'react';
import DialogDelete from '../dialogs/dialog-delete';
import DialogActionsWorkspace from '../dialogs/dialog-actions-workspace';

interface IMenuWorkspaceProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  workspace: IWorkspace;
}

interface IMenuItem {
  icon: React.ReactNode;
  name: string;
}

const ContextMenuWorkspace = ({
  anchorEl,
  handleClose,
  workspace,
}: IMenuWorkspaceProps) => {
  const [openDialogDeleteWorkspace, setOpenDialogDeleteWorkspace] =
    useState(false);
  const [openDialogEditWorkspace, setOpenDialogEditWorkspace] = useState(false);

  const listMenuItem: IMenuItem[] = [
    {
      name: 'Edit',
      icon: <Edit fontSize="small" />,
    },
  ];

  const handleDeleteWorkspace = () => {
    handleClose();

    setOpenDialogDeleteWorkspace(true);
  };

  const handleClick = (action: string) => {
    switch (action) {
      case 'Edit':
        handleClose();

        setOpenDialogEditWorkspace(true);
        break;
      default:
    }
  };

  return (
    <>
      <Menu
        sx={{ width: 320, maxWidth: '100%' }}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        {listMenuItem.map((menuItem) => (
          <MenuItem
            key={menuItem.name}
            onClick={() => handleClick(menuItem.name)}
          >
            <ListItemIcon>{menuItem.icon}</ListItemIcon>
            <ListItemText>
              <Typography variant="body2">{menuItem.name}</Typography>
            </ListItemText>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={() => handleDeleteWorkspace()}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2">Delete</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>

      <DialogDelete
        open={openDialogDeleteWorkspace}
        handleClose={() => setOpenDialogDeleteWorkspace(false)}
        dialogName="workspace"
        workspace={workspace}
      />

      <DialogActionsWorkspace
        open={openDialogEditWorkspace}
        handleClose={() => setOpenDialogEditWorkspace(false)}
        initialWorkspace={workspace}
      />
    </>
  );
};

export default ContextMenuWorkspace;

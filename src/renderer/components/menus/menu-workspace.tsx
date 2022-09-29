import React from 'react';
import {
  MenuItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Menu,
  Divider,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
// import { useState } from "react";

interface IMenuWorkspaceProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  workspace: IWorkspace;
}

interface IMenuItem {
  icon: React.ReactNode;
  name: string;
}

const MenuWorkspace = ({
  anchorEl,
  handleClose,
  workspace,
}: IMenuWorkspaceProps) => {
  // const [openDialogDeleteWorkspace, setOpenDialogDeleteWorkspace] =
  //   useState(false);

  const listMenuItem: IMenuItem[] = [
    {
      name: 'Edit',
      icon: <Edit fontSize="small" />,
    },
  ];

  // const handleDeleteWorkspace = () => {
  //   setOpenDialogDeleteWorkspace(true);
  // };

  return (
    <Menu
      sx={{ width: 320, maxWidth: '100%' }}
      open={Boolean(anchorEl)}
      onClose={() => handleClose()}
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    >
      {listMenuItem.map((menuItem) => (
        <MenuItem key={menuItem.name}>
          <ListItemIcon>{menuItem.icon}</ListItemIcon>
          <ListItemText>
            <Typography variant="body2">{menuItem.name}</Typography>
          </ListItemText>
        </MenuItem>
      ))}
      <Divider />
      <MenuItem
      // onClick={() => handleDeleteWorkspace()}
      >
        <ListItemIcon>
          <Delete fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="body2">Delete</Typography>
        </ListItemText>
      </MenuItem>

      {/* <DialogDelete
        open={openDialogDeleteWorkspace}
        handleClose={() => setOpenDialogDeleteWorkspace(false)}
        dialogName="workspace"
        workspace={workspace}
      /> */}
    </Menu>
  );
};

export default MenuWorkspace;

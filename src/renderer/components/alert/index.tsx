import { Box, Fade, List, Alert as AlertMui, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import create from 'zustand';

interface IAlertManagerState {
  listAlert: IAlert[];
  addAlert: (alert: IAlert) => void;
  removeAlert: (indexAlertRemove?: number) => void;
}

export const useAlearManagerStore = create<IAlertManagerState>((set) => ({
  listAlert: [],
  addAlert: (alert) => {
    set((state) => ({
      listAlert: [...state.listAlert, alert],
    }));
  },
  /**
   * remove first alert when indexAlertRemove === null
   */
  removeAlert: (index: number | undefined) => {
    set((state) => {
      const indexAlertRemove = index ?? state.listAlert.length - 1;

      const newListAlert = state.listAlert.filter(
        (_, _index) => _index !== indexAlertRemove
      );

      return {
        listAlert: newListAlert,
      };
    });
  },
}));

export const Alert = () => {
  const listAlert = useAlearManagerStore((state) => state.listAlert);
  const removeAlert = useAlearManagerStore((state) => state.removeAlert);

  const handleRemoveAlert = (index: number) => {
    removeAlert(index);
  };

  return (
    <Box
      id="alert"
      sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}
    >
      <List>
        <TransitionGroup>
          {listAlert.map((alert, index) => (
            <Fade key={index} timeout={1000}>
              <AlertMui
                sx={{ mt: 1 }}
                severity={alert.severity}
                action={
                  <IconButton
                    onClick={() => handleRemoveAlert(index)}
                    size="small"
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {alert.mess}
              </AlertMui>
            </Fade>
          ))}
        </TransitionGroup>
      </List>
    </Box>
  );
};

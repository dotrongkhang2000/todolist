import { Box, Fade, List, Alert as AlertMui, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { removeAlert } from '../../store/alertManagerSlice';

const Alert = () => {
  const dispatch = useDispatch();

  const listAlert = useSelector(
    (state: RootState) => state.alertManager.listAlert
  );

  const handleRemoveAlert = (index: number) => {
    dispatch(removeAlert(index));
  };

  return (
    <Box id="alert" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
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

export default Alert;

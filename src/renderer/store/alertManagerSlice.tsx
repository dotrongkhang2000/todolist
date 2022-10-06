import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAlertManagerState {
  listAlert: IAlertProps[];
}

const initAlertManagerState: IAlertManagerState = {
  listAlert: [],
};

const alertManagerSlice = createSlice({
  name: 'alertManager',
  initialState: initAlertManagerState,
  reducers: {
    addAlert: (state, action: PayloadAction<IAlertProps>) => {
      const alert = action.payload;

      state.listAlert.push(alert);
    },
    /**
     * remove first alert when indexAlertRemove === null
     */
    removeAlert: (state, action: PayloadAction<number | undefined>) => {
      const indexAlertRemove = action.payload
        ? action.payload
        : state.listAlert.length - 1;

      const newListAlert = state.listAlert.filter(
        (_, _index) => _index !== indexAlertRemove
      );

      state.listAlert = newListAlert;
    },
  },
});

export const { addAlert, removeAlert } = alertManagerSlice.actions;

export default alertManagerSlice.reducer;

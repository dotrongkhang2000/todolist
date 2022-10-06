import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IWorkspaceManagerState {
  listWorkspace: IWorkspace[];
  workspaceActiveId: string;
  workspaceActiveName: string;
}

const initWorkspaceManager: IWorkspaceManagerState = {
  listWorkspace: [],
  workspaceActiveId: '',
  workspaceActiveName: '',
};

const workspaceManagerSlice = createSlice({
  name: 'workspaceManager',
  initialState: initWorkspaceManager,
  reducers: {
    setWorkspaceActiveName: (state, action: PayloadAction<string>) => {
      const workspaceActiveName = action.payload;

      state.workspaceActiveName = workspaceActiveName;
    },
    setWorkspaceActiveId: (state, action: PayloadAction<string>) => {
      const workspaceId = action.payload;

      state.workspaceActiveId = workspaceId;
    },
  },
});

export const { setWorkspaceActiveId, setWorkspaceActiveName } =
  workspaceManagerSlice.actions;

export default workspaceManagerSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IWorkspaceManagerState {
  listWorkspace: IWorkspace[];
}

const initWorkspaceManager: IWorkspaceManagerState = {
  listWorkspace: [],
};

const findIndexWorkspace = (listWorkspace: IWorkspace[], workspaceId: string) =>
  listWorkspace.findIndex((workspace) => workspace.id === workspaceId);

const workspaceManagerSlice = createSlice({
  name: 'workspaceManager',
  initialState: initWorkspaceManager,
  reducers: {
    addWorkspace: (state, action: PayloadAction<IWorkspace>) => {
      const workspace = action.payload;

      state.listWorkspace = [...state.listWorkspace, workspace];
    },
    setListWorkspace: (state, action: PayloadAction<IWorkspace[]>) => {
      Object.assign(state.listWorkspace, action.payload);
    },
    deleteWorkspace: (state, action: PayloadAction<IWorkspace>) => {
      const workspaceDel = action.payload;
      const indexWorkspaceDel = findIndexWorkspace(
        state.listWorkspace,
        workspaceDel.id
      );

      state.listWorkspace = state.listWorkspace.filter(
        (_, _index) =>
          state.listWorkspace[_index] !== state.listWorkspace[indexWorkspaceDel]
      );
    },
    updateWorkspace: (state, action: PayloadAction<IWorkspace>) => {
      const workspaceUpdate = action.payload;
      const indexWorkspaceUpdate = findIndexWorkspace(
        state.listWorkspace,
        workspaceUpdate.id
      );

      state.listWorkspace[indexWorkspaceUpdate] = workspaceUpdate;
    },
  },
});

export const {
  addWorkspace,
  setListWorkspace,
  deleteWorkspace,
  updateWorkspace,
} = workspaceManagerSlice.actions;

export default workspaceManagerSlice.reducer;

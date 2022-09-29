import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IWorkspaceManagerState {
  listWorkspace: IWorkspace[];
}

const initWorkspaceManager: IWorkspaceManagerState = {
  listWorkspace: [],
};

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
      const indexWorkspaceDel = state.listWorkspace.findIndex(
        (workspace) => workspace.id === workspaceDel.id
      );

      state.listWorkspace = state.listWorkspace.filter(
        (_, _index) =>
          state.listWorkspace[_index] !== state.listWorkspace[indexWorkspaceDel]
      );
    },
  },
});

export const { addWorkspace, setListWorkspace, deleteWorkspace } =
  workspaceManagerSlice.actions;

export default workspaceManagerSlice.reducer;

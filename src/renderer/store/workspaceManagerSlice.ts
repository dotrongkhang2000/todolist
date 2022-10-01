import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  removeAtIndex,
  updateArrAtIndex,
} from '../components/utils/handleArray';

interface IWorkspaceManagerState {
  listWorkspace: IWorkspace[];
  workspaceActiveId: string;
}

const initWorkspaceManager: IWorkspaceManagerState = {
  listWorkspace: [],
  workspaceActiveId: '',
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

      if (state.listWorkspace.length === 1) {
        state.workspaceActiveId = state.listWorkspace[0].id;
      }
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

      if (state.listWorkspace.length === 0) state.workspaceActiveId = '';
      else {
        const indexWorkspaceNearest =
          indexWorkspaceDel === 0 ? 0 : indexWorkspaceDel - 1;

        state.workspaceActiveId = state.listWorkspace[indexWorkspaceNearest].id;
      }
    },
    updateWorkspace: (state, action: PayloadAction<IWorkspace>) => {
      const workspaceUpdate = action.payload;
      const indexWorkspaceUpdate = findIndexWorkspace(
        state.listWorkspace,
        workspaceUpdate.id
      );

      state.listWorkspace[indexWorkspaceUpdate] = workspaceUpdate;
    },
    setWorkspaceActiveId: (state, action: PayloadAction<string>) => {
      const workspaceId = action.payload;

      state.workspaceActiveId = workspaceId;
    },
    createTask: (state, action: PayloadAction<ITask>) => {
      const indexWorkspaceActive = findIndexWorkspace(
        state.listWorkspace,
        state.workspaceActiveId
      );
      const taskManager = state.listWorkspace[indexWorkspaceActive].taskManager;

      taskManager.taskGroups[action.payload.status].push(action.payload);
      ++taskManager.totalTask;
    },
    setTaskGroup: (
      state,
      action: PayloadAction<Record<TaskGroupTitle, ITask[]>>
    ) => {
      const indexWorkspaceActive = findIndexWorkspace(
        state.listWorkspace,
        state.workspaceActiveId
      );
      const taskManager = state.listWorkspace[indexWorkspaceActive].taskManager;

      Object.assign(taskManager.taskGroups, action.payload);
    },
    deleteTask: (
      state,
      action: PayloadAction<{ status: TaskGroupTitle; taskId: string }>
    ) => {
      const indexWorkspaceActive = findIndexWorkspace(
        state.listWorkspace,
        state.workspaceActiveId
      );
      const taskManager = state.listWorkspace[indexWorkspaceActive].taskManager;

      const { status, taskId } = action.payload;

      const indexTask = taskManager.taskGroups[status].findIndex(
        (t) => t.id === taskId
      );

      taskManager.taskGroups = {
        ...taskManager.taskGroups,
        [status]: removeAtIndex(taskManager.taskGroups[status], indexTask),
      };

      --taskManager.totalTask;
    },
    updateTask: (state, action: PayloadAction<ITask>) => {
      const indexWorkspaceActive = findIndexWorkspace(
        state.listWorkspace,
        state.workspaceActiveId
      );
      const taskManager = state.listWorkspace[indexWorkspaceActive].taskManager;

      const taskGroupTitle = action.payload.status;
      const task = action.payload;

      taskManager.taskGroups = {
        ...taskManager.taskGroups,
        [taskGroupTitle]: updateArrAtIndex(
          taskManager.taskGroups[taskGroupTitle],
          task
        ),
      };
    },
  },
});

export const {
  addWorkspace,
  setListWorkspace,
  deleteWorkspace,
  updateWorkspace,
  setWorkspaceActiveId,
  deleteTask,
  createTask,
  setTaskGroup,
  updateTask,
} = workspaceManagerSlice.actions;

export default workspaceManagerSlice.reducer;

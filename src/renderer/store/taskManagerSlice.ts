import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  removeAtIndex,
  updateArrAtIndex,
} from "../components/utils/handleArray";

interface ITaskManagerState {
  totalTask: number;
  taskGroups: Record<TaskGroupTitle, ITask[]>;
}

const initialTaskManagerState: ITaskManagerState = {
  totalTask: 0,
  taskGroups: {
    Backlog: [],
    Todo: [],
    "In Progress": [],
    "In Review": [],
    Done: [],
    Canceled: [],
  },
};

export const taskManagerSlice = createSlice({
  name: "taskManager",
  initialState: initialTaskManagerState,
  reducers: {
    createTask: (state, action: PayloadAction<ITask>) => {
      state.taskGroups[action.payload.status].push(action.payload);
      ++state.totalTask;
    },
    setTaskGroup: (
      state,
      action: PayloadAction<Record<TaskGroupTitle, ITask[]>>
    ) => {
      Object.assign(state.taskGroups, action.payload);
    },
    deleteTask: (
      state,
      action: PayloadAction<{ status: TaskGroupTitle; index: number }>
    ) => {
      state.taskGroups = {
        ...state.taskGroups,
        [action.payload.status]: removeAtIndex(
          state.taskGroups[action.payload.status],
          action.payload.index
        ),
      };

      --state.totalTask;
    },
    updateTask: (state, action: PayloadAction<ITask>) => {
      const taskGroupTitle = action.payload.status;
      const task = action.payload;

      state.taskGroups = {
        ...state.taskGroups,
        [taskGroupTitle]: updateArrAtIndex(
          state.taskGroups[taskGroupTitle],
          task
        ),
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { deleteTask, createTask, setTaskGroup, updateTask } =
  taskManagerSlice.actions;

export default taskManagerSlice.reducer;

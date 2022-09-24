import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeAtIndex } from "../components/utils/handleArray";

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
  },
});

// Action creators are generated for each case reducer function
export const { deleteTask, createTask, setTaskGroup } =
  taskManagerSlice.actions;

export default taskManagerSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeAtIndex } from "../components/utils/handleArray";

const initialTaskManagerState: Record<TaskGroupTitle, ITask[]> = {
  Backlog: [
    {
      title: "TOD-16",
      description: "Custom layout (with horizontal) the same linear",
      status: "Todo",
      priority: "No Priority",
      assignee: {
        name: "Assignee",
        avatarUrl: "",
        online: false,
      },
    },
  ],
  Todo: [
    {
      title: "TOD-17",
      description: "Custom layout (with horizontal) the same linear",
      status: "Todo",
      priority: "No Priority",
      assignee: {
        name: "Assignee",
        avatarUrl: "",
        online: false,
      },
    },
  ],
  "In Progress": [],
  "In Review": [],
  Done: [],
  Canceled: [],
};

export const taskManagerSlice = createSlice({
  name: "taskManager",
  initialState: initialTaskManagerState,
  reducers: {
    createTask: (state, action: PayloadAction<ITask>) => {
      state[action.payload.status].push(action.payload);
    },
    setTaskGroup: (
      state,
      action: PayloadAction<Record<TaskGroupTitle, ITask[]>>
    ) => {
      Object.assign(state, action.payload);
    },
    deleteTask: (
      state,
      action: PayloadAction<{ status: TaskGroupTitle; index: number }>
    ) => {
      state = {
        ...state,
        [action.payload.status]: removeAtIndex(
          state[action.payload.status],
          action.payload.index
        ),
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { deleteTask, createTask, setTaskGroup } =
  taskManagerSlice.actions;

export default taskManagerSlice.reducer;

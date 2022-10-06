import { configureStore } from '@reduxjs/toolkit';
import alertManagerReducer from './alertManagerSlice';
import workspaceManagerReducer from './workspaceManagerSlice';

export const store = configureStore({
  reducer: {
    workspaceManager: workspaceManagerReducer,
    alertManager: alertManagerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

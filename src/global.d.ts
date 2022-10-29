import { AlertColor } from '@mui/material';

declare global {
  type TaskGroupTitle =
    | 'Backlog'
    | 'Todo'
    | 'In Progress'
    | 'In Review'
    | 'Done'
    | 'Canceled';

  type TaskStatus =
    | 'Backlog'
    | 'Todo'
    | 'In Progress'
    | 'In Review'
    | 'Done'
    | 'Canceled';

  type TaskPriority = 'No Priority' | 'Low' | 'Medium' | 'High' | 'Urgent';
  interface IUserInfo {
    name: string;
    avatarUrl: string;
    online: boolean;
  }

  interface ITask {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    assignee?: IUserInfo;
    workspaceId: string;
  }

  interface ITaskGroupState {
    totalTask: number;
    taskGroups: Record<TaskGroupTitle, ITask[]>;
  }
  interface IWorkspace {
    id: string;
    name: string;
    taskManager: ITaskGroupState;
    imgUrl: string;
  }
  interface ICondition {
    fieldName: string;
    operator: WhereFilterOp;
    compareValue: string;
  }

  interface IAlert {
    severity: AlertColor;
    mess: string;
  }

  type Errors<T> = Partial<Record<keyof T, string>>;
}

export {};

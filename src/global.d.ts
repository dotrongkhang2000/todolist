declare global {
  type TaskGroupTitle =
    | "Backlog"
    | "Todo"
    | "In Progress"
    | "In Review"
    | "Done"
    | "Canceled";

  type TaskStatus =
    | "Backlog"
    | "Todo"
    | "In Progress"
    | "In Review"
    | "Done"
    | "Canceled";

  type TaskPriority = "No Priority" | "Low" | "Medium" | "High" | "Urgent";
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
  }
}

export {};

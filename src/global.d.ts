declare global {
  interface IUserInfo {
    name: string;
    avatarUrl: string;
    online: boolean;
  }

  interface ITask {
    title?: string;
    description?: string;
    status:
      | "Backlog"
      | "Todo"
      | "In Progress"
      | "In Review"
      | "Done"
      | "Canceled";
    priority: "No Priority" | "Low" | "Medium" | "High" | "Urgent";
    assignee: IUserInfo;
  }

  type TaskGroupTitle =
    | "Backlog"
    | "Todo"
    | "In Progress"
    | "In Review"
    | "Done"
    | "Canceled";
}

export {};

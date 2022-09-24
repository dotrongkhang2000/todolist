declare global {
  interface IUserInfo {
    name: string;
    avatarUrl: string;
    online: boolean;
  }

  interface IJob {
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
}

export {};

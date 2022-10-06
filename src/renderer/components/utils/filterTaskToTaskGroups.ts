const filterTaskToTaskGroup = (listTask: ITask[]) => {
  const initTaskGroups: Record<TaskGroupTitle, ITask[]> = {
    Backlog: [],
    Todo: [],
    'In Progress': [],
    'In Review': [],
    Done: [],
    Canceled: [],
  };
  if (listTask.length === 0) return initTaskGroups;

  return listTask.reduce((preVal, curVal) => {
    return {
      ...preVal,
      [curVal.status]: [...preVal[curVal.status], curVal],
    };
  }, initTaskGroups);
};

export default filterTaskToTaskGroup;

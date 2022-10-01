const getWorkspaceWithId = (listWorkspace: IWorkspace[], id: string) => {
  if (!id) return;

  const workspace = listWorkspace.find((workspace) => workspace.id === id);

  return workspace;
};

export default getWorkspaceWithId;

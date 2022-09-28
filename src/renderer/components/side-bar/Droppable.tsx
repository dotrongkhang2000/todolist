import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableWorkspace from "./SortableItem";

interface IDropableProps {
  workspaceId: string;
  listWorkspace: IWorkspace[];
  activeWorkspaceId: string;
}

const Droppable = ({
  workspaceId,
  listWorkspace,
  activeWorkspaceId,
}: IDropableProps) => {
  return (
    <SortableContext id={workspaceId} items={listWorkspace}>
      <SortableWorkspace
        workspaceId={workspaceId}
        listWorkspace={listWorkspace}
      />
    </SortableContext>
  );
};

export default Droppable;

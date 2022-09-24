import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import { useState } from "react";
import Droppable from "./Dropable";
import { removeAtIndex, insertAtIndex, arrayMove } from "../utils/handleArray";
import Item from "./Item";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setTaskGroup } from "../../store/taskManagerSlice";

const MainWindow = () => {
  const taskGroups = useSelector(
    (state: RootState) => state.taskManager.taskGroups
  );

  const dispatch = useDispatch();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeTask, setActiveTask] = useState<ITask | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active?.id);

    const activeIndex = active.data.current?.sortable.index;
    const activeContainer: TaskGroupTitle =
      active.data.current?.sortable.containerId;
    const task = taskGroups[activeContainer][activeIndex];
    setActiveTask(task);
  };

  const handleDragCancel = () => setActiveId(null);
  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    const activeIndex = active.data.current?.sortable.index;
    const overIndex =
      over.id in taskGroups
        ? taskGroups[overContainer as keyof typeof taskGroups].length + 1
        : over.data.current?.sortable.index;
    const task = taskGroups[activeContainer as TaskGroupTitle][activeIndex];
    setActiveTask(task);

    const newTaskGroup = moveBetweenContainers(
      taskGroups,
      activeContainer,
      activeIndex,
      overContainer,
      overIndex,
      task
    );

    if (activeContainer !== overContainer) {
      dispatch(setTaskGroup(newTaskGroup));
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      setActiveId(null);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current?.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current?.sortable.index;
      const overIndex =
        over.id in taskGroups
          ? taskGroups[overContainer as TaskGroupTitle].length + 1
          : over.data.current?.sortable.index;

      let newItems;
      if (activeContainer === overContainer) {
        newItems = {
          ...taskGroups,
          [overContainer]: arrayMove(
            taskGroups[overContainer as TaskGroupTitle],
            activeIndex,
            overIndex
          ),
        };
      } else {
        setActiveTask(activeContainer[active.id]);

        newItems = moveBetweenContainers(
          taskGroups,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          activeContainer[active.id]
        );
      }

      dispatch(setTaskGroup(newItems));
    }

    setActiveId(null);
  };

  const moveBetweenContainers = (
    items: Record<TaskGroupTitle, ITask[]>,
    activeContainer: UniqueIdentifier,
    activeIndex: number,
    overContainer: UniqueIdentifier,
    overIndex: number,
    item: ITask
  ): Record<TaskGroupTitle, ITask[]> => {
    return {
      ...items,
      [activeContainer as TaskGroupTitle]: removeAtIndex(
        items[activeContainer as TaskGroupTitle],
        activeIndex
      ),
      [overContainer as TaskGroupTitle]: insertAtIndex(
        items[overContainer as TaskGroupTitle],
        overIndex,
        item
      ),
    };
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          display: "-webkit-box",
          justifyContent: "space-around",
          p: 1,
          backgroundImage:
            "linear-gradient(to bottom right, #321D81 , #DD499D)",
          height: "100vh",
          overflowX: "scroll",
        }}
      >
        {Object.entries(taskGroups).map(([key, element]) => (
          <Box key={key}>
            <Droppable groupName={key} listTask={element} activeId={activeId} />
          </Box>
        ))}
        <DragOverlay>
          {activeId ? <Item task={activeTask} dragOverlay /> : null}
        </DragOverlay>
      </Box>
    </DndContext>
  );
};

export default MainWindow;

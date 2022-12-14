import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { Droppable } from '@/renderer/components/main-window/Dropable';
import {
  removeAtIndex,
  insertAtIndex,
  arrayMove,
} from '@/renderer/components/utils/handleArray';
import { Item } from '@/renderer/components/main-window/Item';
import {
  Sidebar,
  useWorkspaceManagerStore,
} from '@/renderer/components/side-bar';
import { useFirestoreState, useFirestore } from '@/renderer/hooks/useFirestore';
import { filterTaskToTaskGroup } from '@/renderer/components/utils/filterTaskToTaskGroups';
import { setTask } from '@/renderer/firebase/services';
import { Alert } from '@/renderer/components/alert';

export const MainWindow = () => {
  const workspaceActiveId = useWorkspaceManagerStore(
    (state) => state.workspaceActiveId
  );

  const fetchingDataTask = useFirestoreState((state) => state.loading);

  const [totalTask, setTotalTask] = useState(0);

  const listTaskCondition: ICondition = useMemo(
    () => ({
      fieldName: 'workspaceId',
      operator: '==',
      compareValue: workspaceActiveId,
    }),
    [workspaceActiveId]
  );

  const initListTask = useFirestore({
    collection: 'task',
    condition: listTaskCondition,
  });

  const [taskGroups, setTaskGroups] =
    useState<Record<TaskGroupTitle, ITask[]>>();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeTask, setActiveTask] = useState<ITask | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active?.id);

    if (taskGroups) {
      const activeIndex = active.data.current?.sortable.index;
      const activeContainer: TaskGroupTitle =
        active.data.current?.sortable.containerId;
      const task = taskGroups[activeContainer][activeIndex];

      setActiveTask(task);
    }
  };

  const handleDragCancel = () => setActiveId(null);
  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!taskGroups) return;

    const overId = over?.id;

    if (overId === undefined) {
      return;
    }

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over!.data.current?.sortable.containerId ?? over!.id;

    const activeIndex = active.data.current?.sortable.index;

    const overIndex =
      over!.id in taskGroups
        ? taskGroups[overContainer as keyof typeof taskGroups].length + 1
        : over!.data.current?.sortable.index;
    const task = {
      ...taskGroups[activeContainer as TaskGroupTitle][activeIndex],
    };

    setActiveTask(task);

    // change task status for new group
    task.status = overContainer;

    const newTaskGroup = moveBetweenContainers(
      taskGroups,
      activeContainer,
      activeIndex,
      overContainer,
      overIndex,
      task
    );

    if (activeContainer !== overContainer) {
      setTaskGroups(newTaskGroup);

      setTask(task)
        // eslint-disable-next-line no-console
        .then(() => console.log('sucess'))
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over == null) {
      setActiveId(null);
      return;
    }

    if (active.id !== over.id) {
      if (!taskGroups) return;

      const activeContainer = active.data.current?.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId ?? over.id;
      const activeIndex = active.data.current?.sortable.index;
      const overIndex =
        over.id in taskGroups
          ? taskGroups[overContainer as TaskGroupTitle].length + 1
          : over.data.current?.sortable.index;

      let newItems: Record<TaskGroupTitle, ITask[]>;

      const taskActive = taskGroups[activeContainer as TaskGroupTitle].find(
        (task) => task.id === active.id
      );

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
        setActiveTask(taskActive!);

        newItems = moveBetweenContainers(
          taskGroups,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          taskActive!
        );
      }

      setTaskGroups(newItems);
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

  useEffect(() => {
    setTaskGroups(filterTaskToTaskGroup(initListTask));
    setTotalTask(initListTask.length);
  }, [initListTask]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      {fetchingDataTask ? (
        <Box sx={{ flex: 1, textAlign: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragCancel={handleDragCancel}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <Box
              sx={{
                display: '-webkit-box',
                justifyContent: 'space-around',
                p: 1,
                backgroundColor: '#F4F5F8',
                height: '100vh',
                overflowX: 'scroll',
                width: 1,
              }}
            >
              {taskGroups ? (
                <>
                  {Object.entries(taskGroups).map(([key, listTask]) => (
                    <Box key={key}>
                      <Droppable
                        groupName={key}
                        listTask={listTask}
                        activeId={activeId}
                        totalTask={totalTask}
                      />
                    </Box>
                  ))}
                  <DragOverlay>
                    {activeId !== null ? (
                      <Item task={activeTask} dragOverlay />
                    ) : null}
                  </DragOverlay>
                </>
              ) : null}
            </Box>
          </DndContext>
        </>
      )}
      <Alert />
    </Box>
  );
};

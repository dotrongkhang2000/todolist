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

interface IJob {
  title?: string;
  description?: string;
  status: "Backlog" | "Todo" | "In Progress" | "In Review" | "Done" | "Cancel";
  priority: "No Priority" | "Low" | "Medium" | "High" | "Urgent";
  assignee: IUserInfo;
}
interface IJobGroup {
  [name: string]: IJob[];
}

const MainWindow = () => {
  const [jobGroups, setJobGroups] = useState<IJobGroup>({
    Backlog: [
      {
        title: "TOD-16",
        description: "Custom layout (with horizontal) the same linear",
        status: "Todo",
        priority: "No Priority",
        assignee: {
          name: "Assignee",
          avatarUrl: "",
          online: false,
        },
      },
      {
        title: "TOD-17",
        description: "Custom layout (with horizontal) the same linear 2",
        status: "Todo",
        priority: "No Priority",
        assignee: {
          name: "Assignee",
          avatarUrl: "",
          online: false,
        },
      },
      {
        title: "TOD-18",
        description: "Custom layout (with horizontal) the same linear 2",
        status: "Todo",
        priority: "No Priority",
        assignee: {
          name: "Assignee",
          avatarUrl: "",
          online: false,
        },
      },
      {
        title: "TOD-19",
        description: "Custom layout (with horizontal) the same linear 2",
        status: "Todo",
        priority: "No Priority",
        assignee: {
          name: "Assignee",
          avatarUrl: "",
          online: false,
        },
      },
      {
        title: "TOD-20",
        description: "Custom layout (with horizontal) the same linear 2",
        status: "Todo",
        priority: "No Priority",
        assignee: {
          name: "Assignee",
          avatarUrl: "",
          online: false,
        },
      },
      {
        title: "TOD-21",
        description: "Custom layout (with horizontal) the same linear 2",
        status: "Todo",
        priority: "No Priority",
        assignee: {
          name: "Assignee",
          avatarUrl: "",
          online: false,
        },
      },
    ],
    Todo: [],
    "In Progress": [],
    Done: [],
    Canceled: [],
  });

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeJob, setActiveJob] = useState<IJob | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active?.id);

    const activeIndex = active.data.current?.sortable.index;
    const activeContainer = active.data.current?.sortable.containerId;
    const job = jobGroups[activeContainer][activeIndex];
    setActiveJob(job);
  };

  const handleDragCancel = () => setActiveId(null);
  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer !== overContainer) {
      setJobGroups((jobGroups) => {
        const activeIndex = active.data.current?.sortable.index;
        const overIndex =
          over.id in jobGroups
            ? jobGroups[overContainer as keyof typeof jobGroups].length + 1
            : over.data.current?.sortable.index;
        const job = jobGroups[activeContainer][activeIndex];
        setActiveJob(job);

        return moveBetweenContainers(
          jobGroups,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          job
        );
      });
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
        over.id in jobGroups
          ? jobGroups[overContainer as keyof typeof jobGroups].length + 1
          : over.data.current?.sortable.index;

      setJobGroups((job) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...job,
            [overContainer]: arrayMove(
              job[overContainer as keyof typeof jobGroups],
              activeIndex,
              overIndex
            ),
          };
        } else {
          setActiveJob(activeContainer[active.id]);

          newItems = moveBetweenContainers(
            jobGroups,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            activeContainer[active.id]
          );
        }

        return newItems;
      });
    }

    setActiveId(null);
  };

  const moveBetweenContainers = (
    items: IJobGroup,
    activeContainer: UniqueIdentifier,
    activeIndex: number,
    overContainer: UniqueIdentifier,
    overIndex: number,
    item: IJob
  ): IJobGroup => {
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
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
        {Object.entries(jobGroups).map(([key, element]) => (
          <Box key={key}>
            <Droppable id={key} items={element} activeId={activeId} />
          </Box>
        ))}
        <DragOverlay>
          {activeId ? <Item id={activeJob} dragOverlay /> : null}
        </DragOverlay>
      </Box>
    </DndContext>
  );
};

export default MainWindow;

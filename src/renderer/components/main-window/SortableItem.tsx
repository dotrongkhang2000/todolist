import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Item from '@/renderer/components/main-window/Item';
import { Box } from '@mui/material';
import DialogDetailTask from '@/renderer/components/dialogs/dialog-detail-task';

interface ISortableItemProps {
  idTask: string;
  taskTitle: string;
  listTask: ITask[];
}

const SortableItem = ({ idTask, taskTitle, listTask }: ISortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: idTask });

  const taskRender = listTask.find((task) => task.id === idTask);

  const [openDialogDetailTask, setOpenDialogDetailTask] = useState(false);

  const handleClickEvent = () => {
    setOpenDialogDetailTask(true);
  };

  return (
    <>
      <Box
        sx={{
          transform: CSS.Transform.toString(transform),
          transition,
          opacity: isDragging ? 0.5 : 1,
        }}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        onClick={() => handleClickEvent()}
      >
        <Item task={taskRender!} />
      </Box>

      <DialogDetailTask
        open={openDialogDetailTask}
        handleClose={() => setOpenDialogDetailTask(false)}
        taskRender={taskRender!}
      />
    </>
  );
};

export default SortableItem;

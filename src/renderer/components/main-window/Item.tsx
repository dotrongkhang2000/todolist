import { UniqueIdentifier } from "@dnd-kit/core";
import { Box } from "@mui/material";
import React from "react";

interface IItemProps {
  id: UniqueIdentifier | null;
  dragOverlay?: boolean;
}

const Item = ({ id, dragOverlay }: IItemProps) => {
  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };

  return (
    <Box style={style} className="item">
      Item {id}
    </Box>
  );
};

export default Item;

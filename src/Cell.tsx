import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCircle } from "@fortawesome/free-solid-svg-icons";

type CellProps = {
  id: string;
  value: number;
  victory: boolean;
  playCell?: () => void;
};

const Cell = ({ id, value, victory, playCell }: CellProps) => {
  
  return (
    <div className={`Board-cell${value ? " played" : ""}${victory ? " victory" : ""}`} data-testid={id} onClick={playCell}>
      {!!value && <FontAwesomeIcon size="4x" icon={value === 1 ? faTimes : faCircle} />}
      
    </div>
  );
};

export default Cell;

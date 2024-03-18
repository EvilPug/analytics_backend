import React from 'react';
import { IconButton, TableCell, Tooltip } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

type UtilCellProps = {
  onClick: VoidFunction;
};

const UtilCell: React.FC<UtilCellProps> = ({ onClick }) => {
  return (
    <TableCell>
      <Tooltip title="Редактировать КУГ">
        <IconButton aria-label="edit" onClick={onClick}>
          <EditOutlined />
        </IconButton>
      </Tooltip>
    </TableCell>
  );
};

export default UtilCell;

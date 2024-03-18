import React from 'react';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';

type AddRowButtonProps = {
  onClick: VoidFunction;
};

const AddRowButton: React.FC<AddRowButtonProps> = ({ onClick }) => {
  return (
    <Button startIcon={<Add />} onClick={onClick}>
      Добавить ряд
    </Button>
  );
};

export default AddRowButton;

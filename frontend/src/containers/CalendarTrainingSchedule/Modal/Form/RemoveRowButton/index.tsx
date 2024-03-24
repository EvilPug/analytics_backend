import React from 'react';
import { Button } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

import styles from './style.module.css';

type RemoveRowButtonProps = {
  isDisabled?: boolean;
  onClick: VoidFunction;
};

const RemoveRowButton: React.FC<RemoveRowButtonProps> = ({ isDisabled, onClick }) => {
  return (
    <Button
      startIcon={<DeleteOutline />}
      disabled={isDisabled}
      variant="contained"
      size="large"
      color="error"
      className={styles.delete}
      onClick={onClick}
    />
  );
};

export default RemoveRowButton;

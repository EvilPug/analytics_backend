import React from 'react';
import { Fab, Pagination } from '@mui/material';
import { Add } from '@mui/icons-material';

import styles from './style.module.css';

type CalendarTrainingScheduleFooterProps = {
  page: number;
  totalPageCount: number;
  onPageChange: (page: number) => void;
  onAddButtonClick: VoidFunction;
};

const CalendarTrainingScheduleFooter: React.FC<CalendarTrainingScheduleFooterProps> = ({
  page,
  totalPageCount,
  onPageChange,
  onAddButtonClick,
}) => {
  function handlePageChange(_: unknown, page: number): void {
    onPageChange(page);
  }

  return (
    <footer className={styles.footer}>
      <Pagination page={page} count={totalPageCount} color="primary" onChange={handlePageChange} />
      <Fab color="secondary" aria-label="add" onClick={onAddButtonClick}>
        <Add />
      </Fab>
    </footer>
  );
};

export default CalendarTrainingScheduleFooter;

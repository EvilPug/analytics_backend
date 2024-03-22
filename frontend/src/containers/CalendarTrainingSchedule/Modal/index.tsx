import React from 'react';
import { Dialog, DialogTitle } from '@mui/material';

import type { ICalendarTrainingSchedule } from '../types';

import CreationContent from './CreationContent';
import EditingContent from './EditingContent';

import styles from './style.module.css';

type CalendarTrainingScheduleModalProps = {
  scheduleId: ICalendarTrainingSchedule['id'] | null;
  isOpen: boolean;
  onAfterClose: VoidFunction;
  onClose: VoidFunction;
};

const CalendarTrainingScheduleModal: React.FC<CalendarTrainingScheduleModalProps> = ({
  scheduleId,
  isOpen,
  onAfterClose,
  onClose,
}) => {
  const title = scheduleId ? 'Редактировать КУГ' : 'Создать КУГ';
  const content = scheduleId ? (
    <EditingContent scheduleId={scheduleId} className={styles.content} onClose={onClose} />
  ) : (
    <CreationContent className={styles.content} onClose={onClose} />
  );

  return (
    <Dialog open={isOpen} fullWidth={true} maxWidth="md" TransitionProps={{ onExited: onAfterClose }} onClose={onClose}>
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      {content}
    </Dialog>
  );
};

export default CalendarTrainingScheduleModal;

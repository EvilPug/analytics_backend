import React from 'react';
import { Paper } from '@mui/material';

import CalendarTrainingScheduleHeader from './Header';
import CalendarTrainingScheduleTable from './Table';
import CalendarTrainingScheduleFooter from './Footer';
import CalendarTrainingScheduleModal from './Modal';
import { DEFAULT_PAGE, MIN_PAGE_COUNT, MIN_PAGE_INDEX, PAGINATION_STEP, mockAcademicYears, mockData } from './utils';
import type { IAcademicYearSelectItem, ICalendarTrainingSchedule, ICalendarTrainingScheduleStatistics } from './types';

import styles from './style.module.css';

const CalendarTrainingSchedule: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [academicYears, setAcademicYears] = React.useState<IAcademicYearSelectItem[]>([]);
  const [academicYear, setAcademicYear] = React.useState<IAcademicYearSelectItem['id'] | null>(null);
  const [scheduleId, setScheduleId] = React.useState<ICalendarTrainingSchedule['id'] | null>(null);
  const [page, setPage] = React.useState(DEFAULT_PAGE);

  const records = mockData.filter(({ year }) => year === academicYear);

  const statistics: ICalendarTrainingScheduleStatistics = React.useMemo(() => {
    let bachelor = 0;
    let master = 0;

    records.forEach(({ degree }) => {
      if (degree === 'BACHELOR') {
        bachelor += 1;
      }

      if (degree === 'MASTER') {
        master += 1;
      }
    });

    return { bachelor, master };
  }, [records]);

  const recordCount = records.length;
  const totalPageCount = Math.max(Math.ceil(recordCount / PAGINATION_STEP), MIN_PAGE_COUNT);

  const pageIndex = Math.max(page - 1, MIN_PAGE_INDEX);
  const data = records.slice(pageIndex * PAGINATION_STEP, pageIndex * PAGINATION_STEP + PAGINATION_STEP);

  React.useEffect(() => {
    // TODO: Заменить на fetch
    setAcademicYears(mockAcademicYears);
    setAcademicYear(mockAcademicYears[0]['id']);

    return () => {
      setIsModalOpen(false);
      setAcademicYears([]);
      setAcademicYear(null);
      setScheduleId(null);
      setPage(DEFAULT_PAGE);
    };
  }, []);

  React.useEffect(() => {
    // TODO: Реализовать запрос API
  }, [page]);

  function handleAcademicYearChange(value: IAcademicYearSelectItem['id']): void {
    setAcademicYear(value);
  }

  function handleEditButtonClick(id: ICalendarTrainingSchedule['id']): void {
    setScheduleId(id);
    setIsModalOpen(true);
  }

  function handleAddButtonClick(): void {
    setIsModalOpen(true);
  }

  function handlePageChange(page: number): void {
    setPage(page);
  }

  function handleClose(): void {
    setIsModalOpen(false);
  }

  function handleAfterClose(): void {
    setScheduleId(null);
  }

  return (
    <Paper className={styles.container}>
      <CalendarTrainingScheduleHeader
        statistics={statistics}
        academicYears={academicYears}
        academicYear={academicYear}
        onAcademicYearChange={handleAcademicYearChange}
      />
      <section className={styles.section}>
        <CalendarTrainingScheduleTable data={data} onEditButtonClick={handleEditButtonClick} />
      </section>
      <CalendarTrainingScheduleFooter
        page={page}
        totalPageCount={totalPageCount}
        onPageChange={handlePageChange}
        onAddButtonClick={handleAddButtonClick}
      />
      <CalendarTrainingScheduleModal
        scheduleId={scheduleId}
        isOpen={isModalOpen}
        onClose={handleClose}
        onAfterClose={handleAfterClose}
      />
    </Paper>
  );
};

export default CalendarTrainingSchedule;

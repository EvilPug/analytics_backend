import React from 'react';
import { FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip, Typography } from '@mui/material';
import { Download } from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material';

import type { IAcademicYearSelectItem, ICalendarTrainingScheduleStatistics } from '../types';

import styles from './style.module.css';

type CalendarTrainingScheduleHeaderProps = {
  statistics: ICalendarTrainingScheduleStatistics;
  academicYears: IAcademicYearSelectItem[];
  academicYear: IAcademicYearSelectItem['id'] | null;
  onAcademicYearChange: (id: IAcademicYearSelectItem['id']) => void;
};

const CalendarTrainingScheduleHeader: React.FC<CalendarTrainingScheduleHeaderProps> = ({
  statistics,
  academicYears,
  academicYear,
  onAcademicYearChange,
}) => {
  function handleChange(event: SelectChangeEvent<IAcademicYearSelectItem['id']>): void {
    onAcademicYearChange(event.target.value);
  }

  function handleClick(): void {
    // TODO: Добавить API
    console.log('download for period id:', academicYear);
  }

  return (
    <header className={styles.header}>
      <Typography variant="h4" className={styles.title}>
        Календарный учебный график
      </Typography>
      <section className={styles.statistics}>
        <article className={styles.statistic}>
          <Typography>Всего магистратура:</Typography>
          <Typography fontWeight={600}>{statistics.master.toLocaleString()}</Typography>
        </article>
        <article className={styles.statistic}>
          <Typography>Всего бакалавриат:</Typography>
          <Typography fontWeight={600}>{statistics.bachelor.toLocaleString()}</Typography>
        </article>
      </section>
      <section className={styles.controls}>
        <FormControl className={styles.control}>
          <InputLabel id="academic-year-select">Учебный год</InputLabel>
          <Select
            value={academicYear ?? ''}
            label="Учебный год"
            labelId="academic-year-select"
            size="small"
            variant="outlined"
            className={styles.select}
            onChange={handleChange}
          >
            {academicYears.map(({ id, label }) => (
              <MenuItem key={id} value={id}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip title="Скачать КУГ за выбранный период">
          <IconButton aria-label="download" className={styles.button} onClick={handleClick}>
            <Download />
          </IconButton>
        </Tooltip>
      </section>
    </header>
  );
};

export default CalendarTrainingScheduleHeader;

import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

import useCalendarTrainingScheduleForm from '../useForm';
import type { DateRange } from '../types';

import AddRowButton from './AddRowButton';
import DateRangePicker from './DateRangePicker';
import RemoveRowButton from './RemoveRowButton';

import styles from './style.module.css';

interface ISelectItem {
  id: string;
  label: string;
}

const mockItems: ISelectItem[] = [
  { id: '1', label: 'Aboaba 213.112.31.' },
  { id: '2', label: 'Aboba 21231.5125125.212' },
  { id: '3', label: 'Abobusss 12311.3212.312' },
];

type CalendarTrainingScheduleFormProps = Pick<
  ReturnType<typeof useCalendarTrainingScheduleForm>,
  | 'values'
  | 'errors'
  | 'onPrimaryScheduleIdChange'
  | 'onTheoreticalEducationChange'
  | 'onHolidaysChange'
  | 'onVacationsChange'
  | 'onAddRow'
  | 'onRemoveRow'
>;

const CalendarTrainingScheduleForm: React.FC<CalendarTrainingScheduleFormProps> = ({
  values,
  errors,
  onPrimaryScheduleIdChange,
  onTheoreticalEducationChange,
  onHolidaysChange,
  onVacationsChange,
  onAddRow,
  onRemoveRow,
}) => {
  const primarySchedules: ISelectItem[] = mockItems;

  function handleChange(event: SelectChangeEvent<string | null>): void {
    onPrimaryScheduleIdChange(event.target.value);
  }

  function handleAddTheoreticalEducationRow(): void {
    onAddRow('theoreticalEducation');
  }

  function handleAddHolidayRow(): void {
    onAddRow('holidays');
  }

  function handleAddVacationRow(): void {
    onAddRow('vacations');
  }

  return (
    <form className={styles.form}>
      {values.type === 'secondary' && (
        <FormControl size="small">
          <InputLabel id="primary-schedule-select">Выберите первичный КУГ</InputLabel>
          <Select
            value={values.primaryScheduleId ?? ''}
            label="Выберите первичный КУГ"
            labelId="primary-schedule-select"
            size="small"
            onChange={handleChange}
          >
            {primarySchedules.map(({ id, label }) => (
              <MenuItem key={id} value={id}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <FormControl className={styles.field}>
        <Typography variant="h6">Теоретическое обучение</Typography>
        <ul className={styles.rows}>
          {values.theoreticalEducation.map(({ start, end }, index) => {
            function handleChange(value: DateRange) {
              onTheoreticalEducationChange(value, index);
            }

            function handleClick(): void {
              onRemoveRow('theoreticalEducation', index);
            }

            return (
              <Stack key={index} direction="row" className={styles.row}>
                <DateRangePicker values={{ start, end }} onChange={handleChange} />
                {index > 0 && <RemoveRowButton onClick={handleClick} />}
              </Stack>
            );
          })}
          <AddRowButton onClick={handleAddTheoreticalEducationRow} />
        </ul>
      </FormControl>

      <FormControl className={styles.field}>
        <Typography variant="h6">Нерабочие праздничные дни</Typography>
        <ul className={styles.rows}>
          {values.holidays.map(({ start, end }, index) => {
            function handleChange(value: DateRange) {
              onHolidaysChange(value, index);
            }

            function handleClick(): void {
              onRemoveRow('holidays', index);
            }

            return (
              <Stack key={index} direction="row" className={styles.row}>
                <DateRangePicker values={{ start, end }} onChange={handleChange} />
                {index > 0 && <RemoveRowButton onClick={handleClick} />}
              </Stack>
            );
          })}
          <AddRowButton onClick={handleAddHolidayRow} />
        </ul>
      </FormControl>

      <FormControl className={styles.field}>
        <Typography variant="h6">Каникулы</Typography>
        <ul className={styles.rows}>
          {values.vacations.map(({ start, end }, index) => {
            function handleChange(value: DateRange) {
              onVacationsChange(value, index);
            }

            function handleClick(): void {
              onRemoveRow('vacations', index);
            }

            return (
              <Stack key={index} direction="row" className={styles.row}>
                <DateRangePicker values={{ start, end }} onChange={handleChange} />
                {index > 0 && <RemoveRowButton onClick={handleClick} />}
              </Stack>
            );
          })}
          <AddRowButton onClick={handleAddVacationRow} />
        </ul>
      </FormControl>
    </form>
  );
};

export default CalendarTrainingScheduleForm;

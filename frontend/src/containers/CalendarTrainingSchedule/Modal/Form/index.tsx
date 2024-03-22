import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

import useCalendarTrainingScheduleForm from '../useForm';
import type { DateRange } from '../types';

import AddRowButton from './AddRowButton';
import DateRangePicker from './DateRangePicker';
import RemoveRowButton from './RemoveRowButton';

import { dateRangeFields, FieldLabelMap, mockPrimarySchedules } from './utils';
import type { IPrimaryScheduleSelectItem } from './types';

import styles from './style.module.css';

type CalendarTrainingScheduleFormProps = Pick<
  ReturnType<typeof useCalendarTrainingScheduleForm>,
  'values' | 'errors' | 'onPrimaryScheduleIdChange' | 'onDateRangeChange' | 'onAddRow' | 'onRemoveRow'
>;

const CalendarTrainingScheduleForm: React.FC<CalendarTrainingScheduleFormProps> = ({
  values,
  errors,
  onPrimaryScheduleIdChange,
  onDateRangeChange,
  onAddRow,
  onRemoveRow,
}) => {
  const [primarySchedules, setPrimarySchedules] = React.useState<IPrimaryScheduleSelectItem[]>([]);

  React.useEffect(() => {
    // TODO: Реализовать запрос API
    if (values.type === 'secondary') {
      setPrimarySchedules(mockPrimarySchedules);
    }
  }, [values.type]);

  function handleChange(event: SelectChangeEvent<string | null>): void {
    onPrimaryScheduleIdChange(event.target.value);
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
      {dateRangeFields.map((field) => {
        function handleAddRowButtonClick(): void {
          onAddRow(field);
        }

        return (
          <FormControl className={styles.field}>
            <Typography variant="h6">{FieldLabelMap[field]}</Typography>
            <ul className={styles.rows}>
              {values[field].map(({ start, end }, index) => {
                function handleChange(value: DateRange) {
                  onDateRangeChange(value, field, index);
                }

                function handleRemoveRowButtonClick(): void {
                  onRemoveRow(field, index);
                }

                return (
                  <Stack key={index} direction="row" className={styles.row}>
                    <DateRangePicker values={{ start, end }} onChange={handleChange} />
                    {index > 0 && <RemoveRowButton onClick={handleRemoveRowButtonClick} />}
                  </Stack>
                );
              })}
              <AddRowButton onClick={handleAddRowButtonClick} />
            </ul>
          </FormControl>
        );
      })}
    </form>
  );
};

export default CalendarTrainingScheduleForm;

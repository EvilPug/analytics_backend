import React from 'react';
import moment, { Moment } from 'moment';
import { Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import type { DateRange } from '../../types';

import styles from './style.module.css';

type DateRangePickerProps = {
  values: DateRange;
  error?: string;
  onChange: (value: DateRange) => void;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({ values, error, onChange }) => {
  const minDate = React.useMemo(() => {
    if (values.start) {
      return values.start;
    }
  }, [values.start]);

  function handleStartDateChange(value: Moment | null): void {
    if (value) {
      const date = value.toDate();
      const next = { ...values };

      next.start = date;

      if (values.end && date.getTime() > values.end.getTime()) {
        next.end = date;
      }

      onChange(next);
    }
  }

  function handleEndDateChange(value: Moment | null): void {
    if (value) {
      onChange({ ...values, end: value.toDate() });
    }
  }

  return (
    <div className={styles.container}>
      <Stack direction="row" spacing={1} className={styles.range}>
        <DatePicker
          label="C"
          value={values.start ? moment(values.start) : null}
          slotProps={{ textField: { error: !!error } }}
          className={styles.picker}
          onChange={handleStartDateChange}
        />
        <DatePicker
          label="По"
          value={values.end ? moment(values.end) : null}
          minDate={moment(minDate)}
          slotProps={{ textField: { error: !!error } }}
          className={styles.picker}
          onChange={handleEndDateChange}
        />
      </Stack>
      <Typography variant="caption" sx={(theme) => ({ color: theme.palette.error.light })}>
        {error}
      </Typography>
    </div>
  );
};

export default DateRangePicker;

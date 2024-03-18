import React from 'react';
import moment from 'moment';
import { Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import type { DateRange, DateRangeItem } from '../../types';

import styles from './style.module.css';

type DateRangePickerProps = {
  values: DateRange;
  placeholder?: { start?: string; end?: string };
  onChange: (value: DateRange) => void;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({ values, placeholder, onChange }) => {
  const [range, setRange] = React.useState<DateRange>(values);

  const minDate = React.useMemo(() => {
    if (range.start) {
      return range.start;
    }
  }, [range.start]);

  React.useEffect(() => {
    setRange(values);
  }, [values]);

  React.useEffect(() => {
    if (range.start && range.end && range.start > range.end) {
      setRange((prev) => ({ ...prev, end: range.start }));
    }

    onChange(range);
  }, [range.start, range.end]);

  function handleStartDateChange(value: DateRangeItem): void {
    setRange((prev) => ({ ...prev, start: value }));
  }

  function handleEndDateChange(value: DateRangeItem): void {
    setRange((prev) => ({ ...prev, end: value }));
  }

  return (
    <Stack direction="row" className={styles.range}>
      <DatePicker
        label="C"
        value={moment(range.start) as unknown as Date}
        className={styles.picker}
        onChange={handleStartDateChange}
      />
      <DatePicker
        label="По"
        value={moment(range.end) as unknown as Date}
        minDate={minDate}
        className={styles.picker}
        onChange={handleEndDateChange}
      />
    </Stack>
  );
};

export default DateRangePicker;

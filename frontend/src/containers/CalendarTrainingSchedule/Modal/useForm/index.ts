import React from 'react';

import type {
  CalendarTrainingScheduleFormErrors,
  DateRange,
  DateRangeField,
  ICalendarTrainingScheduleFormValues,
} from '../types';

import { defaultErrors, defaultValues, emptyDateRange } from './utils';

interface IUseCalendarTrainingScheduleFormArgs {
  initialValues?: ICalendarTrainingScheduleFormValues | null;
  onSubmitForm?: () => Promise<void>;
}

interface IUseCalendarTrainingScheduleForm {
  values: ICalendarTrainingScheduleFormValues;
  errors: CalendarTrainingScheduleFormErrors;
  canSubmit: boolean;
  isSubmitting: boolean;
  onTypeChange: (value: ICalendarTrainingScheduleFormValues['type']) => void;
  onPrimaryScheduleIdChange: (value: ICalendarTrainingScheduleFormValues['primaryScheduleId']) => void;
  onTheoreticalEducationChange: (value: DateRange, rowIndex: number) => void;
  onHolidaysChange: (value: DateRange, rowIndex: number) => void;
  onVacationsChange: (value: DateRange, rowIndex: number) => void;
  onAddRow: (field: DateRangeField) => void;
  onRemoveRow: (field: DateRangeField, rowIndex: number) => void;
  onSubmit: () => Promise<void>;
}

function useCalendarTrainingScheduleForm({
  initialValues,
  onSubmitForm,
}: IUseCalendarTrainingScheduleFormArgs): IUseCalendarTrainingScheduleForm {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [values, setValues] = React.useState<ICalendarTrainingScheduleFormValues>(defaultValues);
  const [errors, setErrors] = React.useState<CalendarTrainingScheduleFormErrors>(defaultErrors);

  const canSubmit = !!values.type;

  React.useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [initialValues]);

  React.useEffect(() => {
    return () => {
      setValues(defaultValues);
      setErrors(defaultErrors);
    };
  }, []);

  // TODO: Убрать
  React.useEffect(() => {
    console.log('values=', values);
  }, [values]);

  const onTypeChange: IUseCalendarTrainingScheduleForm['onTypeChange'] = (value) => {
    setValues((prev) => ({ ...prev, type: value }));
  };

  const onPrimaryScheduleIdChange: IUseCalendarTrainingScheduleForm['onPrimaryScheduleIdChange'] = (value) => {
    setValues((prev) => ({ ...prev, primaryScheduleId: value }));
  };

  const onTheoreticalEducationChange: IUseCalendarTrainingScheduleForm['onTheoreticalEducationChange'] = (
    value,
    index
  ) => {
    if (value.start && value.end) {
      setValues((prev) => {
        const next = [...prev.theoreticalEducation.map((value) => ({ ...value }))];

        if (next[index]) {
          next[index] = { start: value.start, end: value.end };
        }

        return { ...prev, theoreticalEducation: next };
      });
    }
  };

  const onHolidaysChange: IUseCalendarTrainingScheduleForm['onHolidaysChange'] = (value, index) => {
    if (value.start && value.end) {
      setValues((prev) => {
        const next = [...prev.holidays.map((value) => ({ ...value }))];

        if (next[index]) {
          next[index] = { start: value.start, end: value.end };
        }

        return { ...prev, holidays: next };
      });
    }
  };

  const onVacationsChange: IUseCalendarTrainingScheduleForm['onVacationsChange'] = (value, index) => {
    if (value.start && value.end) {
      setValues((prev) => {
        const next = [...prev.vacations.map((value) => ({ ...value }))];

        if (next[index]) {
          next[index] = { start: value.start, end: value.end };
        }

        return { ...prev, vacations: next };
      });
    }
  };

  const onAddRow: IUseCalendarTrainingScheduleForm['onAddRow'] = (field) => {
    setValues((prev) => ({ ...prev, [field]: [...prev[field], { ...emptyDateRange }] }));
  };

  const onRemoveRow: IUseCalendarTrainingScheduleForm['onRemoveRow'] = (field, rowIndex) => {
    console.log(rowIndex);
    setValues((prev) => ({ ...prev, [field]: [...prev[field].filter((_, index) => index !== rowIndex)] }));
  };

  const onSubmit: IUseCalendarTrainingScheduleForm['onSubmit'] = async () => {
    setIsSubmitting(true);

    if (onSubmitForm) {
      try {
        await onSubmitForm();
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
        throw new Error('Submitting Form Error: CalendarTrainingScheduleForm');
      }
    }
  };

  return {
    values,
    errors,
    canSubmit,
    isSubmitting,
    onTypeChange,
    onPrimaryScheduleIdChange,
    onTheoreticalEducationChange,
    onHolidaysChange,
    onVacationsChange,
    onAddRow,
    onRemoveRow,
    onSubmit,
  };
}

export default useCalendarTrainingScheduleForm;

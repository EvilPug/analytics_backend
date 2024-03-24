import React from 'react';

import type {
  CalendarTrainingScheduleFormErrors,
  DateRange,
  DateRangeField,
  ICalendarTrainingScheduleFormValues,
} from '../types';

import { checkForm, defaultErrors, defaultValues, emptyDateRange, validateDateRange } from './utils';

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
  onDateRangeChange: (value: DateRange, field: DateRangeField, rowIndex: number) => void;
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

  const { theoreticalEducation, holidays, vacations } = values;

  const hasChanges = values !== initialValues;
  const canSubmit = checkForm(values, errors) && hasChanges;

  // TODO: Убрать
  React.useEffect(() => {
    console.log('values=', values);
  }, [values]);

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

  const onTypeChange: IUseCalendarTrainingScheduleForm['onTypeChange'] = (value) => {
    setValues((prev) => ({ ...prev, type: value }));
  };

  const onPrimaryScheduleIdChange: IUseCalendarTrainingScheduleForm['onPrimaryScheduleIdChange'] = (value) => {
    setValues((prev) => ({ ...prev, primaryScheduleId: value }));
  };

  const onDateRangeChange: IUseCalendarTrainingScheduleForm['onDateRangeChange'] = (value, field, rowIndex) => {
    const errorMessage = validateDateRange(value, { theoreticalEducation, holidays, vacations }, field, rowIndex);

    setErrors((prev) => {
      const next = [...prev[field]];
      next[rowIndex] = errorMessage;

      return { ...prev, [field]: next };
    });

    setValues((prev) => {
      const next = [...prev[field].map((value) => ({ ...value }))];

      if (next[rowIndex]) {
        next[rowIndex] = { start: value.start, end: value.end };
      }

      return { ...prev, [field]: next };
    });
  };

  const onAddRow: IUseCalendarTrainingScheduleForm['onAddRow'] = (field) => {
    setValues((prev) => ({ ...prev, [field]: [...prev[field], { ...emptyDateRange }] }));
  };

  const onRemoveRow: IUseCalendarTrainingScheduleForm['onRemoveRow'] = (field, rowIndex) => {
    setErrors((prev) => ({ ...prev, [field]: [...prev[field].filter((_, index) => index !== rowIndex)] }));
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
    onDateRangeChange,
    onAddRow,
    onRemoveRow,
    onSubmit,
  };
}

export default useCalendarTrainingScheduleForm;

import type { CalendarTrainingScheduleFormErrors, ICalendarTrainingScheduleFormValues } from '../types';

export const emptyDateRange = { start: null, end: null };

export const defaultValues: ICalendarTrainingScheduleFormValues = {
  type: null,
  primaryScheduleId: null,
  theoreticalEducation: [{ ...emptyDateRange }],
  holidays: [{ ...emptyDateRange }],
  vacations: [{ ...emptyDateRange }],
};

export const defaultErrors: CalendarTrainingScheduleFormErrors = {
  type: '',
  theoreticalEducation: '',
  holidays: '',
  vacations: '',
};

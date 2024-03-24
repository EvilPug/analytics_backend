export type CalendarTrainingScheduleType = 'primary' | 'secondary';

export type DateRangeItem = Date | null;
export type DateRange = { start: DateRangeItem; end: DateRangeItem };

export type ErrorMessage = string;

export interface ICalendarTrainingScheduleFormValues {
  type: CalendarTrainingScheduleType | null;
  primaryScheduleId: string | null;
  theoreticalEducation: DateRange[];
  holidays: DateRange[]; // Нерабочие и праздничные дни
  vacations: DateRange[]; // Учебные каникулы
}

export type CalendarTrainingScheduleFormErrors = {
  type: ErrorMessage;
  primaryScheduleId: ErrorMessage;
  theoreticalEducation: ErrorMessage[];
  holidays: ErrorMessage[];
  vacations: ErrorMessage[];
};

export type DateRangeField = keyof Pick<
  ICalendarTrainingScheduleFormValues,
  'theoreticalEducation' | 'holidays' | 'vacations'
>;

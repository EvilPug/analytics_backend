export type CalendarTrainingScheduleType = 'primary' | 'secondary';

export type DateRangeItem = Date | null;
export type DateRange = { start: DateRangeItem; end: DateRangeItem };

export interface ICalendarTrainingScheduleFormValues {
  type: CalendarTrainingScheduleType | null;
  primaryScheduleId: string | null;
  theoreticalEducation: DateRange[];
  holidays: DateRange[]; // Нерабочие и праздничные дни
  vacations: DateRange[]; // Учебные каникулы
}

export type CalendarTrainingScheduleFormErrors = {
  [key in keyof ICalendarTrainingScheduleFormValues]?: string;
};

export type DateRangeField = keyof Pick<
  ICalendarTrainingScheduleFormValues,
  'theoreticalEducation' | 'holidays' | 'vacations'
>;

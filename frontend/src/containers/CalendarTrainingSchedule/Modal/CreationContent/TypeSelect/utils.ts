import type { CalendarTrainingScheduleType } from '../../types';

export const types: CalendarTrainingScheduleType[] = ['primary', 'secondary'];

export const TypeLabelMap: { [key in CalendarTrainingScheduleType]: string } = {
  primary: 'Первичный',
  secondary: 'Вторичный',
};

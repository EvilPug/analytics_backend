import type { Degree, Semester, ICalendarTrainingScheduleTableColumn } from '../types';

export const columns: ICalendarTrainingScheduleTableColumn[] = [
  { key: 'name', label: 'Название КУГ' },
  { key: 'level', label: 'Уровень образования' },
  { key: 'semester', label: 'Семестр' },
  { key: 'year', label: 'Учебный год' },
  { key: 'util', label: '', width: 40 },
];

export const DegreeLabelMap: { [key in Degree]: string } = {
  BACHELOR: 'Бакалавриат',
  MASTER: 'Магистратура',
};

export const SemesterLabelMap: { [key in Semester]: string } = {
  AUTUMN: 'Осень',
  SPRING: 'Весна',
};

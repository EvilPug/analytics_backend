import type { DateRangeField } from '../types';
import type { IPrimaryScheduleSelectItem } from './types';

export const dateRangeFields: DateRangeField[] = ['theoreticalEducation', 'holidays', 'vacations'];

export const FieldLabelMap: { [key in DateRangeField]: string } = {
  theoreticalEducation: 'Теоретическое обучение',
  holidays: 'Нерабочие праздничные дни',
  vacations: 'Каникулы',
};

// TODO: Удалить
export const mockPrimarySchedules: IPrimaryScheduleSelectItem[] = [
  { id: '1', label: 'Aboaba 213.112.31.' },
  { id: '2', label: 'Aboba 21231.5125125.212' },
  { id: '3', label: 'Abobusss 12311.3212.312' },
];

import type { IAcademicYearSelectItem, ICalendarTrainingScheduleTableRow } from './types';

export const PAGINATION_STEP = 20;
export const DEFAULT_PAGE = 1;
export const MIN_PAGE_INDEX = 0;
export const MIN_PAGE_COUNT = 1;

// TEMP
function getMockData(number = 50): ICalendarTrainingScheduleTableRow[] {
  return new Array(number).fill(0).map((_, index) => ({
    key: String(index),
    name: `aboba-${index + 1}`,
    degree: Math.random() > 0.4 ? 'MASTER' : 'BACHELOR',
    semester: Math.random() > 0.4 ? 'AUTUMN' : 'SPRING',
    year: Math.random() > 0.4 ? '2024' : Math.random() > 0.5 ? '2023' : '2022',
  }));
}

export const mockData: ICalendarTrainingScheduleTableRow[] = getMockData(44);

export const mockAcademicYears: IAcademicYearSelectItem[] = [
  { id: '2024', label: '2024-2025' },
  { id: '2023', label: '2023-2024' },
  { id: '2022', label: '2022-2023' },
];

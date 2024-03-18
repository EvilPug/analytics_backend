export type Degree = 'MASTER' | 'BACHELOR';
export type Semester = 'AUTUMN' | 'SPRING';
export type AcademicYearId = string;

// Общая модель
export interface ICalendarTrainingSchedule {
  id: string;
}

export interface ICalendarTrainingScheduleStatistics {
  bachelor: number;
  master: number;
}

// Таблица
export interface ICalendarTrainingScheduleTableColumn {
  key: string;
  label: string;
  width?: number;
}

export interface ICalendarTrainingScheduleTableRow {
  key: string;
  name: string;
  degree: Degree;
  semester: Semester;
  year: AcademicYearId;
}

// Компоненты ввода
export interface IAcademicYearSelectItem {
  id: AcademicYearId;
  label: string;
}

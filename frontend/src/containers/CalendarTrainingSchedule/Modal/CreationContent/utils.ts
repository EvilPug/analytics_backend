import type { IStep } from './types';

export const steps: IStep[] = [
  { key: 'select', label: 'Выберите тип КУГ' },
  { key: 'form', label: 'Заполните форму' },
];

export const maxStepIndex = steps.length - 1;

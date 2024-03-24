import type {
  CalendarTrainingScheduleFormErrors,
  DateRange,
  DateRangeField,
  ErrorMessage,
  ICalendarTrainingScheduleFormValues,
} from '../types';

const RANGE_INTERSECTION_MESSAGE = 'Пересечение диапазонов. Поменяйте дату.';

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
  primaryScheduleId: '',
  theoreticalEducation: [],
  holidays: [],
  vacations: [],
};

export function validateDateRange(
  dateRange: DateRange,
  dateRanges: Pick<ICalendarTrainingScheduleFormValues, DateRangeField>,
  field: DateRangeField,
  index: number
): ErrorMessage {
  let message = '';
  let occupiedRanges: DateRange[] = [];

  if (field === 'theoreticalEducation') {
    occupiedRanges = [
      ...dateRanges.holidays,
      ...dateRanges.vacations,
      ...dateRanges.theoreticalEducation.filter((_, i) => i !== index),
    ];
  }

  if (field === 'holidays') {
    occupiedRanges = [
      ...dateRanges.theoreticalEducation,
      ...dateRanges.vacations,
      ...dateRanges.holidays.filter((_, i) => i !== index),
    ];
  }

  if (field === 'vacations') {
    occupiedRanges = [
      ...dateRanges.theoreticalEducation,
      ...dateRanges.holidays,
      ...dateRanges.vacations.filter((_, i) => i !== index),
    ];
  }

  const processedOccupiedRanges = occupiedRanges
    .filter((occupiedRange) => occupiedRange.start && occupiedRange.end)
    .sort((a, b) => {
      let swap = 0;

      if (a.start && b.start) {
        swap = a.start.getTime() > b.start.getTime() ? 1 : -1;
      }

      return swap;
    });

  processedOccupiedRanges.forEach((occupiedRange) => {
    if (dateRange.start && dateRange.end) {
      const start = dateRange.start.getTime();
      const end = dateRange.end.getTime();

      const min = occupiedRange.start?.getTime() ?? 0;
      const max = occupiedRange.end?.getTime() ?? 0;

      const isInRange = start <= max && end >= min;

      if (isInRange) {
        message = RANGE_INTERSECTION_MESSAGE;
      }
    }
  });

  return message;
}

export function checkForm(
  values: ICalendarTrainingScheduleFormValues,
  errors: CalendarTrainingScheduleFormErrors
): boolean {
  const isTypeValid = !!values.type && !errors.type;
  const isPrimaryScheduleValid = values.type === 'secondary' ? !!values.primaryScheduleId : true;

  // const isTheoreticalEducationValid = !!values.theoreticalEducation.length && !errors.theoreticalEducation.length;
  // const isHolidaysValid = !!values.holidays.length && !errors.holidays.length;
  // const isVacationsValid = !!values.vacations.length && !errors.vacations.length;

  const hasAtLeastOneRecord = [...values.theoreticalEducation, ...values.holidays, ...values.vacations].some(
    (dateRange) => dateRange.start && dateRange.end
  );

  const isFormValid = isTypeValid && isPrimaryScheduleValid && hasAtLeastOneRecord;

  // console.log('isFormValid', isFormValid);
  // console.log('form - isTypeValid', isTypeValid);
  // console.log('form - isPrimaryScheduleValid', isPrimaryScheduleValid);
  // console.log('form - hasAtLeastOneRecord', hasAtLeastOneRecord);

  return isFormValid;
}

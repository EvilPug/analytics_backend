import React from 'react';
import { DialogActions, DialogContent } from '@mui/material';
import CalendarTrainingScheduleForm from '../Form';
import useCalendarTrainingScheduleForm from '../useForm';
import { ICalendarTrainingScheduleFormValues } from '../types';

type EditingContentProps = {
  scheduleId: string;
  className?: string;
};

const EditingContent: React.FC<EditingContentProps> = ({ scheduleId, className }) => {
  const [initialValues, setInitialValues] = React.useState<ICalendarTrainingScheduleFormValues | null>(null);

  React.useEffect(() => {
    if (scheduleId) {
      // TODO: API
      setInitialValues({
        type: 'secondary',
        primaryScheduleId: '1',
        theoreticalEducation: [{ start: new Date('2024-04-24'), end: new Date('2024-04-26') }],
        holidays: [
          { start: new Date('2024-01-01'), end: new Date('2024-01-09') },
          { start: new Date('2024-02-01'), end: new Date('2024-02-09') },
        ],
        vacations: [{ start: null, end: null }],
      });
    }
  }, []);

  const { values, errors, isSubmitting, canSubmit, onSubmit, ...handlers } = useCalendarTrainingScheduleForm({
    initialValues,
  });

  return (
    <>
      <DialogContent className={className}>
        <CalendarTrainingScheduleForm values={values} errors={errors} {...handlers} />
      </DialogContent>
      <DialogActions></DialogActions>
    </>
  );
};

export default EditingContent;

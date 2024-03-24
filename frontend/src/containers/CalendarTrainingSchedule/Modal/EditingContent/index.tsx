import React from 'react';
import { useSnackbar } from 'notistack';
import { Button, CircularProgress, DialogActions, DialogContent } from '@mui/material';

import CalendarTrainingScheduleForm from '../Form';
import useCalendarTrainingScheduleForm from '../useForm';
import { mockApiRequest } from '../utils';
import type { ICalendarTrainingScheduleFormValues } from '../types';

type EditingContentProps = {
  scheduleId: string;
  className?: string;
  onClose: VoidFunction;
};

const EditingContent: React.FC<EditingContentProps> = ({ scheduleId, className, onClose }) => {
  const [initialValues, setInitialValues] = React.useState<ICalendarTrainingScheduleFormValues | null>(null);
  const { enqueueSnackbar } = useSnackbar();

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

  async function onSubmitForm(): Promise<void> {
    try {
      await mockApiRequest('success');
      onClose();
      enqueueSnackbar('КУГ успешно изменен!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Не удалось изменить КУГ. Попробуйте позднее.', { variant: 'error' });
    }
  }

  const { values, errors, isSubmitting, canSubmit, onSubmit, ...handlers } = useCalendarTrainingScheduleForm({
    initialValues,
    onSubmitForm,
  });

  function handleCloseButtonClick(): void {
    onClose();
  }

  function handleFinishButtonClick(): void {
    onSubmit();
  }

  return (
    <>
      <DialogContent className={className}>
        <CalendarTrainingScheduleForm values={values} errors={errors} {...handlers} />
      </DialogContent>
      <DialogActions>
        <Button disabled={isSubmitting} onClick={handleCloseButtonClick}>
          Отмена
        </Button>
        <Button
          variant="contained"
          startIcon={isSubmitting && <CircularProgress size={20} />}
          disabled={!canSubmit || isSubmitting}
          onClick={handleFinishButtonClick}
        >
          Сохранить
        </Button>
      </DialogActions>
    </>
  );
};

export default EditingContent;

import React from 'react';
import { useSnackbar } from 'notistack';
import { Button, CircularProgress, DialogActions, DialogContent } from '@mui/material';

import CalendarTrainingScheduleForm from '../Form';
import useCalendarTrainingScheduleForm from '../useForm';
import { mockApiRequest } from '../utils';
import type { CalendarTrainingScheduleType } from '../types';

import CreationContentHeader from './Header';
import CalendarTrainingScheduleTypeSelect from './TypeSelect';
import { maxStepIndex, steps } from './utils';

type CreationContentProps = {
  className?: string;
  onClose: VoidFunction;
};

const CreationContent: React.FC<CreationContentProps> = ({ className, onClose }) => {
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);
  const { enqueueSnackbar } = useSnackbar();

  async function onSubmitForm(): Promise<void> {
    try {
      await mockApiRequest('success');
      onClose();
      enqueueSnackbar('КУГ успешно создан!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Не удалось создать КУГ. Попробуйте позднее.', { variant: 'error' });
    }
  }

  const { values, errors, canSubmit, isSubmitting, onTypeChange, onSubmit, ...handlers } =
    useCalendarTrainingScheduleForm({ onSubmitForm });

  function handleTypeSelect(type: CalendarTrainingScheduleType): void {
    onTypeChange(type);
    setActiveStepIndex((prev) => Math.min(prev + 1, maxStepIndex));
  }

  function handlePrevButtonClick(): void {
    if (activeStepIndex > 0) {
      onTypeChange(null);
      setActiveStepIndex((prev) => Math.min(prev - 1, 0));
    } else {
      onClose();
    }
  }

  function handleFinishButtonClick(): void {
    onSubmit();
  }

  return (
    <>
      <DialogContent className={className}>
        <CreationContentHeader steps={steps} activeStep={activeStepIndex} />
        <section>
          {activeStepIndex === 0 && <CalendarTrainingScheduleTypeSelect onSelect={handleTypeSelect} />}
          {activeStepIndex === 1 && <CalendarTrainingScheduleForm values={values} errors={errors} {...handlers} />}
        </section>
      </DialogContent>
      <DialogActions>
        <Button disabled={isSubmitting} onClick={handlePrevButtonClick}>
          {activeStepIndex === 0 ? 'Отмена' : 'Назад'}
        </Button>
        <Button
          variant="contained"
          startIcon={isSubmitting && <CircularProgress size={20} />}
          disabled={!canSubmit || isSubmitting}
          onClick={handleFinishButtonClick}
        >
          Создать
        </Button>
      </DialogActions>
    </>
  );
};

export default CreationContent;

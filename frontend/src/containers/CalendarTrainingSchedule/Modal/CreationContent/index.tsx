import React from 'react';
import { Button, CircularProgress, DialogActions, DialogContent, Step, StepLabel, Stepper } from '@mui/material';
import { useSnackbar } from 'notistack';

import CalendarTrainingScheduleTypeSelect from '../TypeSelect';
import CalendarTrainingScheduleForm from '../Form';
import useCalendarTrainingScheduleForm from '../useForm';
import type { CalendarTrainingScheduleType } from '../types';

import { maxStepIndex, steps } from './utils';

import styles from './style.module.css';

function mockApiRequest(result: 'success' | 'error' = 'success'): Promise<unknown> {
  return new Promise((resolve, reject) => setTimeout(result === 'success' ? resolve : reject, 3000));
}

type CreationContentProps = {
  className?: string;
  onClose: VoidFunction;
};

const CreationContent: React.FC<CreationContentProps> = ({ className, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);
  const { values, errors, canSubmit, isSubmitting, onTypeChange, onSubmit, ...handlers } =
    useCalendarTrainingScheduleForm({ onSubmitForm });

  async function onSubmitForm(): Promise<void> {
    try {
      await mockApiRequest('success');
      onClose();
      enqueueSnackbar('КУГ успешно создан!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Не удалось создать КУГ. Попробуйте позднее.', { variant: 'error' });
    }
  }

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
        <header className={styles.header}>
          <Stepper activeStep={activeStepIndex} className={styles.stepper}>
            {steps.map(({ key, label }) => (
              <Step key={key}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </header>
        <section className={styles.main}>
          {activeStepIndex === 0 && <CalendarTrainingScheduleTypeSelect onSelect={handleTypeSelect} />}
          {activeStepIndex === 1 && <CalendarTrainingScheduleForm values={values} errors={errors} {...handlers} />}
        </section>
      </DialogContent>
      <DialogActions className={styles.footer}>
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

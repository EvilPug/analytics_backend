import React from 'react';
import { Step, StepLabel, Stepper } from '@mui/material';

import type { IStep } from '../types';

import styles from './style.module.css';

type CreationContentHeaderProps = {
  steps: IStep[];
  activeStep: number;
};

const CreationContentHeader: React.FC<CreationContentHeaderProps> = ({ activeStep, steps }) => {
  return (
    <header className={styles.header}>
      <Stepper activeStep={activeStep} className={styles.stepper}>
        {steps.map(({ key, label }) => (
          <Step key={key}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </header>
  );
};

export default CreationContentHeader;

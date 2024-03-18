import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

import type { CalendarTrainingScheduleType } from '../types';

import styles from './style.module.css';

const types: CalendarTrainingScheduleType[] = ['primary', 'secondary'];

const TypeLabelMap: { [key in CalendarTrainingScheduleType]: string } = {
  primary: 'Первичный',
  secondary: 'Вторичный',
};

type CalendarTrainingScheduleTypeSelectProps = {
  onSelect: (type: CalendarTrainingScheduleType) => void;
};

const CalendarTrainingScheduleTypeSelect: React.FC<CalendarTrainingScheduleTypeSelectProps> = ({ onSelect }) => {
  return (
    <ul className={styles.cards}>
      {types.map((type) => {
        function handleClick(): void {
          onSelect(type);
        }

        return (
          <li key={type}>
            <Card variant="outlined">
              <CardActionArea onClick={handleClick}>
                <CardContent>
                  <Typography fontSize={24} textTransform="capitalize">
                    {TypeLabelMap[type]}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </li>
        );
      })}
    </ul>
  );
};

export default CalendarTrainingScheduleTypeSelect;

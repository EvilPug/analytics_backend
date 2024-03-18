import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import type { ICalendarTrainingScheduleTableRow } from '../types';

import UtilCell from './UtilCell';
import { columns, DegreeLabelMap, SemesterLabelMap } from './utils';

import styles from './style.module.css';

type CalendarTrainingScheduleTableProps = {
  data: ICalendarTrainingScheduleTableRow[];
  onEditButtonClick: (id: ICalendarTrainingScheduleTableRow['key']) => void;
};

const CalendarTrainingScheduleTable: React.FC<CalendarTrainingScheduleTableProps> = ({ data, onEditButtonClick }) => {
  const rows: ICalendarTrainingScheduleTableRow[] = data;

  return (
    <TableContainer>
      <Scrollbars>
        <Table stickyHeader={true}>
          <TableHead>
            <TableRow>
              {columns.map(({ key, label, width }) => (
                <TableCell
                  sx={(theme) => ({ background: theme.palette.primary.main, color: 'white' })}
                  width={width}
                  key={key}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles.body}>
            {rows.map(({ key, name, degree, semester, year }) => {
              function handleClick(): void {
                onEditButtonClick(key);
              }

              return (
                <TableRow key={key}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{DegreeLabelMap[degree]}</TableCell>
                  <TableCell>{SemesterLabelMap[semester]}</TableCell>
                  <TableCell>{`${year}-${Number(year) + 1}`}</TableCell>
                  <UtilCell onClick={handleClick} />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbars>
    </TableContainer>
  );
};

export default CalendarTrainingScheduleTable;

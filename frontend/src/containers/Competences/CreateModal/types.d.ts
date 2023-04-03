import {WithStyles} from '@mui/styles';
import {CompetenceActions} from '../types';

import styles from "./CreateModal.styles";

export interface CourseCreateModalProps extends WithStyles<typeof styles> {
    actions: CompetenceActions;
    isOpen: boolean;
    competence: any;
}

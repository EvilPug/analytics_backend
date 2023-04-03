import {WithStyles} from '@mui/styles';

import styles from "./TrainingModuleCreateModal.styles";
import {mapDispatchToProps, mapStateToProps} from "./TrainingModuleCreateModal.connect";

export interface TrainingModuleCreateModalProps extends PropsFromRedux, ActionsFromRedux, WithStyles<typeof styles> {}

export type PropsFromRedux = ReturnType<mapStateToProps>;
export type ActionsFromRedux = ReturnType<mapDispatchToProps>;

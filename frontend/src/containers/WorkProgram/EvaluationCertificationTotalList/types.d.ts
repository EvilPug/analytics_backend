import {WithStyles} from "@mui/material";
import styles from "./EvaluationCertificationTotalList.styles";
import {EvaluationToolType} from "../types";

export interface EvaluationCertificationTotalListProps extends WithStyles<typeof styles>{
    extraPoints: number;
    semesterCount: number;
    intermediateCertificationList: Array<EvaluationToolType>
    evaluationToolsList: Array<EvaluationToolType>
}
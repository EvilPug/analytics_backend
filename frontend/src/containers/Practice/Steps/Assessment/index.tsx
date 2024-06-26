import React from "react";
import {PracticeFields, PracticeSteps} from "../../enum";
import connect from "./connect";
import {WithStyles} from "@mui/styles";
import styles from "../styles";
import {withStyles} from '@mui/styles'; import {Typography} from "@mui/material";
import {PracticeActions, PracticeState} from "../../types";
import Input from "../../components/Input";

interface AssessmentProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fields: PracticeState;
}

class Assessment extends React.Component<AssessmentProps> {

    render() {

        const {classes} = this.props;

        return (
            <div>
                <Typography variant='h5'>
                    {PracticeSteps.EVALUATION_METHODS}
                </Typography>
                <Input fieldName={PracticeFields.FORM_OF_CERTIFICATION_TOOLS}/>
                <div className={classes.columns}>
                    <div className={classes.leftColumn}>
                        <Input
                            fieldName={PracticeFields.PASSED_GREAT_MARK}
                            multiline
                            rows={10}/>
                        <Input
                            fieldName={PracticeFields.PASSED_GOOD_MARK}
                            multiline
                            rows={10}/>
                    </div>
                    <div className={classes.rightColumn}>
                        <Input
                            fieldName={PracticeFields.PASSED_SATISFACTORILY_MARK}
                            multiline
                            rows={10}/>
                        <Input
                            fieldName={PracticeFields.NOT_PASSED_MARK}
                            multiline
                            rows={10}/>
                    </div>
                </div>
            </div>
        );
    }
}

// @ts-ignore
export default connect(withStyles(styles)(Assessment));

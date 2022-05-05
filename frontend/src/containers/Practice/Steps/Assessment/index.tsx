import React from "react";
import {PracticeFields, PracticeStepsRussian} from "../../enum";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles";
import {Typography, WithStyles} from "@material-ui/core";
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
            <div className={classes.content}>
                <Typography variant='h5'>
                    {PracticeStepsRussian.ASSESSMENT}
                </Typography>
                <Input label='Форма аттестации' fieldName={PracticeFields.FORM_OF_CERTIFICATION_TOOLS}/>
                <div className={classes.columns}>
                    <div className={classes.leftColumn}>
                        <Input label='Критерий оценки "отлично"'
                               fieldName={PracticeFields.PASSED_GREAT_MARK}
                               multiline
                               rows={10}/>
                        <Input label='Критерий оценки "хорошо"'
                               fieldName={PracticeFields.PASSED_GOOD_MARK}
                               multiline
                               rows={10}/>
                    </div>
                    <div className={classes.rightColumn}>
                        <Input label='Критерий оценки "удовлетворительно"'
                               fieldName={PracticeFields.PASSED_SATISFACTORILY_MARK}
                               multiline
                               rows={10}/>
                        <Input label='Критерий оценки "неудовлетворительно"'
                               fieldName={PracticeFields.NOT_PASSED_MARK}
                               multiline
                               rows={10}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Assessment));

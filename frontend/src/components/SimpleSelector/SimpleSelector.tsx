import React from 'react';
import get from "lodash/get";
import classNames from "classnames";

import withStyles from '@material-ui/core/styles/withStyles';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import {QualificationSelectorProps} from './types';

import styles from './SimpleSelector.styles';
import {FormHelperText} from "@material-ui/core";

const Selector = ({classes, label, value, onChange, noMargin, wrapClass, metaList, errorMessage}: QualificationSelectorProps) => {
    const handleChange = (e: React.ChangeEvent<any>) => {
        onChange(get(e, 'target.value'))
    }

    return (
        <FormControl className={classNames(wrapClass, {[classes.marginBottom30]: !noMargin})}
                     error={!!errorMessage}>
            <InputLabel shrink id="section-label">
                {label}
            </InputLabel>
            <Select
                variant="outlined"
                onChange={handleChange}
                value={value}
                fullWidth
                displayEmpty
                input={
                    <OutlinedInput
                        notched
                        labelWidth={100}
                        id="section-label"
                    />
                }
            >
                {metaList.map(item =>
                    <MenuItem value={item.value} key={item.value}>
                        {item.label}
                    </MenuItem>
                )}
            </Select>
            {
                errorMessage && <FormHelperText>{errorMessage}</FormHelperText>
            }
        </FormControl>
    );
}

export default withStyles(styles)(Selector);
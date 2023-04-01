import React from 'react';
import {Link} from "react-router-dom";

import {withStyles} from '@mui/styles';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {NotFoundProps} from './types';

import {appRouter} from "../../service/router-service";

import img from './404-error.svg';

import styles from './NotFound.styles';

const NotFoundPage = ({classes}: NotFoundProps) => {
    return (
        <div className={classes.wrap}>
            <div className={classes.block}>
                <img className={classes.image} src={img} alt="" />
                <Typography className={classes.title}>
                    Страница не найдена
                </Typography>
                <Typography className={classes.description}>
                    Возможно, запрашиваемая вами страница была <br/> перенесена или удалена.
                </Typography>
                <Button variant="contained"
                        color="primary"
                        className={classes.button}
                ><Link to={appRouter.getEducationPlanRoute()}> Перейти на главную </Link> </Button>
            </div>
        </div>
    );
}

export default withStyles(styles)(NotFoundPage);

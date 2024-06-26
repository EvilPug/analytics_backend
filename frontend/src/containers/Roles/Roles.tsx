import React from 'react';
import {Link} from "react-router-dom";

import Scrollbars from "react-custom-scrollbars-2";

import classNames from 'classnames';

import Paper from '@mui/material/Paper';
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

import {withStyles} from '@mui/styles';

import AddIcon from "@mui/icons-material/Add";
import Pagination from "@mui/lab/Pagination";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import EyeIcon from '@mui/icons-material/VisibilityOutlined';

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import TrainingEntitiesCreateModal from "./CreateModal";
import {SortingType} from "../../components/SortingButton/types";

import {RolesProps, RoleType} from './types';
import {RolesFields} from './enum';

import {appRouter} from "../../service/router-service";

import connect from './Roles.connect';
import styles from './Roles.styles';

class Roles extends React.Component<RolesProps> {
    state = {
        deleteConfirmId: null
    }

    componentDidMount() {
        this.props.actions.getRolesList();
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteRole(deleteConfirmId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    handleClickEdit = (item: RoleType) => () => {
        this.props.actions.openDialog(item);
    }

    handleCreate = () => {
        this.props.actions.openDialog();
    }

    handleChangePage = (event: React.ChangeEvent, page: number) => {
        this.props.actions.changeCurrentPage(page);
        this.props.actions.getRolesList();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getRolesList();
    }

    render() {
        //@ts-ignore
        const {classes} = this.props;
        const {rolesList, allCount, currentPage, sortingField, sortingMode} = this.props;
        const {deleteConfirmId} = this.state;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Роли
                </Typography>

                <div className={classes.tableWrap}>
                    <div className={classNames(classes.listItem, classes.header)}>
                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                            Название
                            <SortingButton changeMode={this.changeSorting(RolesFields.TITLE)}
                                           mode={sortingField === RolesFields.TITLE ? sortingMode : ''}
                            />
                        </Typography>
                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {rolesList.map(item =>
                                <div className={classes.listItem} key={item[RolesFields.ID]}>
                                    <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                                        {item[RolesFields.TITLE]}
                                    </Typography>
                                    <div className={classes.actions}>
                                        <IconButton>
                                            <Link style={{textDecoration: 'none', height: '23px', color: 'rgba(0, 0, 0, 0.54)'}}
                                                  to={appRouter.getRoleSkillsRouteLink(item[RolesFields.ID])}>
                                                <EyeIcon />
                                            </Link>
                                        </IconButton>
                                        <IconButton onClick={this.handleClickDelete(item[RolesFields.ID])}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={this.handleClickEdit(item)}>
                                            <EditIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            )}
                        </Scrollbars>
                    </div>
                </div>

                <div className={classes.footer}>
                    <Pagination count={Math.ceil(allCount / 10)}
                                page={currentPage}
                                //@ts-ignore
                                onChange={this.handleChangePage}
                                color="primary"
                    />

                    <Fab color="secondary"
                         classes={{
                             root: classes.addIcon
                         }}
                         onClick={this.handleCreate}
                    >
                        <AddIcon/>
                    </Fab>
                </div>

                <TrainingEntitiesCreateModal />

                <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить роль?'}
                               isOpen={Boolean(deleteConfirmId)}
                               dialogTitle={'Удалить роль'}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        );
    }
}

// @ts-ignore
export default connect(withStyles(styles)(Roles));

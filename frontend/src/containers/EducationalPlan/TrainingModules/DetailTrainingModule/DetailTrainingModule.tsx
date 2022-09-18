import React from 'react';
import get from 'lodash/get';
import {withRouter} from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";

import Typography from '@material-ui/core/Typography';

import {BlocksOfWorkProgramsFields, ModuleFields} from "../../enum";
import {DetailTrainingModuleProps} from './types';

import connect from './DetailTrainingModule.connect';
import WPBlockCreateModal from "../../Detail/WPBlockCreateModal";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import withStyles from '@material-ui/core/styles/withStyles';
import TableBody from "@material-ui/core/TableBody";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import Paper from "@material-ui/core/Paper";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';

import ConfirmDialog from "../../../../components/ConfirmDialog/ConfirmDialog";

import {WorkProgramGeneralFields} from "../../../WorkProgram/enum";
import {typeOfWorkProgramInPlan} from "../../data";
import {appRouter} from "../../../../service/router-service";
import {BlocksOfWorkProgramsType} from "../../types";

import styles from './DetailTrainingModule.styles';
import LikeButton from "../../../../components/LikeButton/LikeButton";
import {FavoriteType} from "../../../Profile/Folders/enum";
import Chip from "@material-ui/core/Chip";
import {getUserFullName} from "../../../../common/utils";
import AddIcon from "@material-ui/icons/Add";
import {UserType} from "../../../../layout/types";
import UserSelector from "../../../Profile/UserSelector/UserSelector";
import Dialog from "@material-ui/core/Dialog";
import {StepsEnum, TrainingModuleFields} from "../enum";
import {steps} from "../constants";
import StepButton from "@material-ui/core/StepButton";

class DetailTrainingModule extends React.Component<DetailTrainingModuleProps> {
  state = {
    deleteBlockConfirmId: null,
    deletedWorkProgramsLength: 0,
    addEditorsMode: false,
    activeStep: StepsEnum.GENERAL,
  }

  componentDidMount() {
    this.props.actions.getTrainingModule(this.getModuleId());
  }

  handleCreateNewWPBlock = () => {
    this.props.educationPlansActions.createBlockOfWorkPrograms(this.getModuleId());
  }

  getModuleId = () => get(this.props.match.params, 'id');

  goToWorkProgramPage = (id: number) => () => {
    // @ts-ignore
    const {history} = this.props;

    history.push(appRouter.getWorkProgramLink(id));
  }

  handleConfirmBlockDeleteDialog = () => {
    const {deleteBlockConfirmId} = this.state;

    this.props.educationPlansActions.deleteBlockOfWorkPrograms(deleteBlockConfirmId);
    this.closeConfirmDeleteDialog();
  }

  closeConfirmDeleteDialog = () => {
    this.setState({
      deleteBlockConfirmId: null,
      deletedWorkProgramsLength: 0,
    });
  }

  handleClickBlockDelete = (id: number, length: number) => () => {
    this.setState({
      deleteBlockConfirmId: id,
      deletedWorkProgramsLength: length
    });
  }

  handleOpenDetailModal = (block: BlocksOfWorkProgramsType | {}) => () => {
    this.props.educationPlansActions.openDetailDialog({
      ...block,
      moduleId: this.getModuleId()
    });
  }
  handleClickLike = () => {
    const {moduleRating, moduleRatingId} = this.props;
    const moduleId = this.getModuleId();

    if (moduleRating) {
      this.props.foldersActions.removeFromFolder({
        id: moduleRatingId,
        callback: this.props.actions.getTrainingModule,
        type: FavoriteType.MODULES,
        relationId: moduleId
      });
    } else {
      this.props.foldersActions.openAddToFolderDialog({
        relationId: moduleId,
        type: FavoriteType.MODULES,
        callback: this.props.actions.getTrainingModule,
      });
    }
  }

  handleAddingEditor = (userId: number) => {
    const module = this.props.module;
    const newEditorIds = module[TrainingModuleFields.EDITORS].map((editor: UserType) => editor.id).concat(userId);

    this.props.actions.changeEditorList({
      data: {
        [TrainingModuleFields.ID]: module[TrainingModuleFields.ID],
        [TrainingModuleFields.EDITORS]: newEditorIds,
      }
    });

    this.setState({
      addEditorsMode: false
    });
  }

  handleDeletingEditor = (userId: number) => () => {
    const module = this.props.module;
    const newEditorIds = module[TrainingModuleFields.EDITORS]
      .map((editor: UserType) => editor.id)
      .filter((editorId: number) => editorId !== userId);

    this.props.actions.changeEditorList({
      data: {
        [TrainingModuleFields.ID]: module[TrainingModuleFields.ID],
        [TrainingModuleFields.EDITORS]: newEditorIds,
      }
    });
  }

  renderModule = (item: any, level: number): any => {
    const {classes, canEdit} = this.props
    const blockOfWorkPrograms = item?.change_blocks_of_work_programs_in_modules
    const child = item?.childs?.[0] ? this.renderModule(item?.childs?.[0], level + 1) : <></>

    return(
      <>
        {blockOfWorkPrograms?.map((blockOfWorkProgram: any) => {
          const semesterHours = get(blockOfWorkProgram, BlocksOfWorkProgramsFields.SEMESTER_UNIT);
          const workPrograms = get(blockOfWorkProgram, BlocksOfWorkProgramsFields.WORK_PROGRAMS);

          const mappedSemesterHours = semesterHours && semesterHours.split ? semesterHours.split(',') : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          const semesterHour = mappedSemesterHours.slice(0, 10);

          return <TableRow key={blockOfWorkProgram[BlocksOfWorkProgramsFields.ID]}>
            <TableCell>
              {workPrograms.map((workProgram: any) =>
                <div className={classes.displayFlex} style={{ paddingLeft: 10 + level * 5 }}>
                  <Typography className={classes.workProgramLink}
                              onClick={this.goToWorkProgramPage(workProgram[WorkProgramGeneralFields.ID])}>
                    {workProgram[WorkProgramGeneralFields.TITLE]}
                  </Typography>
                </div>
              )}
            </TableCell>
            {semesterHour.map((semesterHour: string) =>
              <TableCell align="center" className={classes.hourCell}> {semesterHour} </TableCell>
            )}
            <TableCell>
              {get(typeOfWorkProgramInPlan.find(item =>
                item.value === blockOfWorkProgram[BlocksOfWorkProgramsFields.TYPE]
              ), 'label', '')}
            </TableCell>

            {canEdit &&
              <TableCell className={classes.actions}>
                <Tooltip
                  title={`Удалить ${get(workPrograms, 'length', 0) > 1 ? 'комплект рабочих программ' : 'рабочую программу'}`}>
                  <DeleteIcon className={classes.deleteIcon}
                              onClick={this.handleClickBlockDelete(blockOfWorkProgram[BlocksOfWorkProgramsFields.ID], get(workPrograms, 'length', 0))}
                  />
                </Tooltip>
                <Tooltip
                  title={`Изменить ${get(workPrograms, 'length', 0) > 1 ? 'комплект рабочих программ' : 'рабочую программу'}`}>
                  <EditIcon
                    onClick={this.handleOpenDetailModal(blockOfWorkProgram)}/>
                </Tooltip>
              </TableCell>
            }
          </TableRow>;
        })}
        {child}
      </>
    )
  }

  renderModules = () => {
    const {classes, module, canEdit} = this.props
    return (
      <>
        <Typography className={classes.subTitle}>
          {steps[StepsEnum.MODULES]}

          <Button onClick={this.handleCreateNewWPBlock} color="secondary">
            <AddIcon/> Создать блок рабочих программ
          </Button>
        </Typography>
        <Scrollbars style={{height: 'calc(100vh - 400px)'}}>
          <div className={classes.tableWrap}>
            <Table stickyHeader size='small'>
              <TableHead className={classes.header}>
                <TableRow>
                  <TableCell rowSpan={2}>
                    РПД
                  </TableCell>
                  <TableCell colSpan={10} className={classes.headerTextHoursCount}>
                    Количество зачетных единиц в семестрах
                  </TableCell>
                  <TableCell rowSpan={2}> Тип </TableCell>
                  {canEdit && <TableCell rowSpan={2}/>}
                </TableRow>

                <TableRow>
                  <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">1</TableCell>
                  <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">2</TableCell>
                  <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">3</TableCell>
                  <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">4</TableCell>
                  <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">5</TableCell>
                  <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">6</TableCell>
                  <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">7</TableCell>
                  <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">8</TableCell>
                  <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">9</TableCell>
                  <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">10</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {module?.childs?.map((item: any) => this.renderModule(item, 0))}
              </TableBody>
            </Table>
          </div>
        </Scrollbars>
      </>
    )
  }

  renderGeneral = () => {
    const {module, classes, canEdit} = this.props

    return (
      <>
        <Typography className={classes.subTitle}>
          {steps[StepsEnum.GENERAL]}
        </Typography>
        {Boolean(module.editors && module.editors.length) ? (
          <div className={classes.editors}>
            <Typography className={classes.editorsTitle}>
              Редакторы:
            </Typography>

            {module.editors.map((editor: UserType) =>
              <Chip
                key={editor.id}
                label={getUserFullName(editor)}
                onDelete={canEdit ? this.handleDeletingEditor(editor.id) : undefined}
                className={classes.editorsItem}
              />
            )}
          </div>
        ) : <></>}

        {canEdit && (
          <Button
            onClick={() => this.setState({addEditorsMode: true})}
            variant="text"
            className={classes.editorsAdd}
            size="small"
          >
            <AddIcon/> Добавить редактора
          </Button>
        )}

        <>
          <Typography className={classes.textItem}>
            <b>Описание:</b> {module.description}
          </Typography>
          <Typography className={classes.textItem}>
            <b>ISU id:</b> {module.module_isu_id}
          </Typography>
          <Typography className={classes.textItem}>
            <b>Правило выбора:</b> {module.selection_rule}
          </Typography>
        </>
      </>
    )
  }

  renderPlans = () => {
    const {classes, module} = this.props

    return (
      <>
        <Typography className={classes.subTitle}>
          {steps[StepsEnum.PLANS]}
        </Typography>
        <Scrollbars style={{height: 'calc(100vh - 400px)'}}>
          <Table stickyHeader>
            <TableHead style={{height: 45}}>
              <TableRow>
                <TableCell className={classes.header}>Образовательная программа</TableCell>
                <TableCell className={classes.header}>Направление</TableCell>
                <TableCell className={classes.header}>Год набора</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {module?.educational_programs_to_access?.map((plan: any) => (
                <TableRow>
                  <TableCell>
                    {get(plan, 'title')}
                  </TableCell>
                  <TableCell>
                    {get(plan, 'field_of_study.0.title')}
                  </TableCell>
                  <TableCell>
                    {get(plan, 'year')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbars>
      </>
    )
  }

  renderContent = () => {
    const {activeStep} = this.state

    switch (activeStep) {
      case StepsEnum.GENERAL:
        return this.renderGeneral()
      case StepsEnum.MODULES:
        return this.renderModules()
      case StepsEnum.PLANS:
        return this.renderPlans()
    }
  }

  render() {
    const {module, classes, moduleRating} = this.props;
    const {deleteBlockConfirmId, deletedWorkProgramsLength, addEditorsMode, activeStep} = this.state;

    return (
      <div className={classes.wrap}>
        <Paper className={classes.root}>
          <Stepper activeStep={activeStep}
                   orientation="vertical"
                   nonLinear
                   className={classes.stepper}
          >
            {Object.keys(steps).map((key) => (
              <Step key={key} onClick={() => this.setState({activeStep: parseInt(key)})}>
                <StepButton completed={false}
                            style={{textAlign: 'left',}}
                            key={key}
                >{/*
                                                // @ts-ignore*/}
                  {steps[parseInt(key)]}
                </StepButton>
              </Step>
            ))}
          </Stepper>

          <div className={classes.content}>
            <div className={classes.title}>
              <Typography> {get(module, ModuleFields.NAME, '')} </Typography>
              <LikeButton onClick={this.handleClickLike}
                          isLiked={moduleRating}
              />
            </div>
            {this.renderContent()}
          </div>

          <ConfirmDialog onConfirm={this.handleConfirmBlockDeleteDialog}
                         onDismiss={this.closeConfirmDeleteDialog}
                         confirmText={`Вы точно уверены, что хотите ${deletedWorkProgramsLength > 1 ? 'комлект рабочих программ' : 'рабочую программу'}?`}
                         isOpen={Boolean(deleteBlockConfirmId)}
                         dialogTitle={`Удалить ${deletedWorkProgramsLength > 1 ? 'комлект рабочих программ' : 'рабочую программу'}`}
                         confirmButtonText={'Удалить'}
          />

          <WPBlockCreateModal disableZUN
                              moduleId={this.getModuleId()}
          />

          {addEditorsMode && (
            <Dialog
              open
              fullWidth
              maxWidth="sm"
              classes={{
                paper: classes.dialog,
              }}
              onClose={() => this.setState({addEditorsMode: false})}
            >
              <UserSelector
                handleChange={this.handleAddingEditor}
                selectorLabel="Выберите редактора"
                label="Выберите редактора"
                noMargin
              />
            </Dialog>
          )}
        </Paper>
      </div>
    );
  }
}

export default connect(withStyles(styles)(withRouter(DetailTrainingModule)));

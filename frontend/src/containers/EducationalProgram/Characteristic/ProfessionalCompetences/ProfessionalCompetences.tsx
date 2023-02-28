import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import get from 'lodash/get';

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import AddIcon from "@material-ui/icons/Add";

import actions from '../../actions';

import {CompetenceTableProps} from './types';

import {CompetenceTableType} from "../../enum";
import EditableText from "../../../../components/EditableText/EditableText";

import AddCompetenceModal from "../../../../components/AddCompetenceModal";
import AddIndicatorsModal from "../../../../components/AddIndicatorsModal";
import AddProfStandardsModal from "../../../../components/AddProfStandardsModal";

import useStyles from './ProfessionalCompetences.style';
import useStylesReusable  from '../CompetencesTable/CompetencesTable.style';
import AddLaborFunctionModal from "../../../ProfessionalStandards/AddLaborFunctionModal";
import {appRouter} from "../../../../service/router-service";
import {Link} from "react-router-dom";

export const ProfessionalCompetences: React.FC<CompetenceTableProps> = ({tableData}) => {
    const dispatch = useDispatch();
    const classes = {
        ...useStylesReusable(),
        ...useStyles()
    };

    const competenceTableType = CompetenceTableType.PROFESSIONAL_COMPETENCES;

    const [competenceModalData, changeCompetenceOpenModal] = useState({isOpen: false, groupId: 0});
    const [indicatorModalData, changeIndicatorOpenModal] = useState({isOpen: false, competenceId: 0, competenceIdRelation: 0});
    const [professionalStandardModalData, changeProfessionalStandardOpenModal] = useState({isOpen: false, competenceId: 0, competenceIdRelation: 0});
    const [laborFunctionModalData, changeLaborFunctionModalData] = useState({isOpen: false, competenceId: 0, competenceIdRelation: 0, laborFunctions: []});
    const [editGroupTitleData, changeEditGroupTitle] = useState({isEdit: false, groupId: 0});
    const [editCompetenceLaborFunctionData, changeEditCompetenceLaborFunction] = useState({isEdit: false, competenceId: 0});

    const createNewGroup = (): void => {
        dispatch(actions.characteristicCreateGroup({name: 'Новая категория', type: competenceTableType, subType: 'prof'}));
    };

    const saveCompetence = ({value}: { value: number, label: string }): void => {
        dispatch(actions.characteristicSaveCompetence({
            competenceId: value,
            type: competenceTableType,
            groupId: competenceModalData.groupId
        }));
    }

    const deleteCompetence = (competenceId: number) => () => {
        dispatch(actions.characteristicDeleteCompetence({
            competenceId,
            type: competenceTableType,
        }));
    }

    const saveIndicator = (indicators: Array<{value: number}>): void => {
        dispatch(actions.characteristicSaveIndicator({
            indicatorId: indicators.map(item => item.value),
            competenceId: indicatorModalData.competenceIdRelation,
            type: competenceTableType,
        }));
    }

    const deleteIndicator = (indicatorId: number) => () => {
        dispatch(actions.characteristicDeleteIndicator({
            indicatorId,
            type: competenceTableType,
        }));
    }

    const saveProfessionalStandard = ({value}: { value: number, label: string }): void => {
        dispatch(actions.characteristicSaveProfessionalStandard({
            professionalStandardId: value,
            competenceId: professionalStandardModalData.competenceIdRelation,
            type: competenceTableType,
        }));
    }

    const saveLaborFunction = (laborFunction: any): void => {
        dispatch(actions.characteristicSaveProfessionalStandardLaborFunction({
            laborFunction: [
              ...laborFunctionModalData.laborFunctions.map((item: any) => item.id),
              laborFunction
            ],
            competenceId: laborFunctionModalData.competenceIdRelation,
            type: competenceTableType,
        }));
    }

    const deleteProfessionalStandard = (competenceIdRelation: number) => () => {
        dispatch(actions.characteristicDeleteProfessionalStandard({
            competenceId: competenceIdRelation,
            type: competenceTableType,
        }));
    }

    const deleteLaborFunction = ({ id, competenceIdRelation, laborFunctions }: any) => () => {
        dispatch(actions.characteristicSaveProfessionalStandardLaborFunction({
            laborFunction:  laborFunctions.map((item: any) => item.id).filter((item: any) => item !== id),
            competenceId: competenceIdRelation,
            type: competenceTableType,
        }));
    }

    const saveGroupTitle = (title: string): void => {
        dispatch(actions.characteristicSaveGroupTitle({
            title,
            type: competenceTableType,
            groupId: editGroupTitleData.groupId
        }));

        changeEditGroupTitle({isEdit: false, groupId: 0})
    };

    const saveGroupLaborFunctions = (laborFunction: string): void => {
        dispatch(actions.characteristicSaveCompetenceLaborFunction({
            laborFunction,
            type: competenceTableType,
            competenceId: editCompetenceLaborFunctionData.competenceId
        }));

        changeEditCompetenceLaborFunction({isEdit: false, competenceId: 0})
    };

    const deleteGroup = (groupId: number) => (): void => {
        dispatch(actions.characteristicDeleteGroup({groupId, type: competenceTableType}));
    };

    return (
        <div className={classes.root}>
            <Table stickyHeader size='small'>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell className={classes.competenceCell}>
                            Код и название компетенции
                        </TableCell>
                        <TableCell className={classes.indicatorCell}>
                            Код и наименование индикатора достижения компетенции
                        </TableCell>
                        <TableCell className={classes.standardCell}>
                            Наименование сопряженного профессионального стандарта
                        </TableCell>
                        <TableCell className={classes.functionsCell}>
                            Выбранные обобщенные трудовые функции
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((item: any) => {
                        const competences = get(item, 'competence_in_group_of_pk_competences', []);
                        const groupRow = (
                            <TableRow className={classes.groupRowWrap}>
                                <TableCell colSpan={5}
                                           align="center"
                                >
                                    <div className={classes.groupRow}>
                                        <div className={classes.editableGroupTitleWrap}>
                                            <EditableText value={get(item, 'name')}
                                                          isEditMode={editGroupTitleData.isEdit && editGroupTitleData.groupId === item.id}
                                                          onClickDone={saveGroupTitle}
                                                          onClickCancel={() => changeEditGroupTitle({isEdit: false, groupId: 0})}
                                                          onValueClick={() => changeEditGroupTitle({isEdit: true, groupId: item.id})}
                                                          fullWidth
                                            />
                                        </div>

                                        <Tooltip title="Удалить группу">
                                            <IconButton onClick={deleteGroup(item.id)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );

                        const addCompetenceRow = (
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <Button color="primary"
                                            variant="text"
                                            size="small"
                                            onClick={() => changeCompetenceOpenModal({isOpen: true, groupId: item.id})}
                                    >
                                        <AddIcon/> Добавить компетенцию
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );

                        if (competences.length === 0) {
                            return (
                                <>
                                    {groupRow}
                                    {addCompetenceRow}
                                </>
                            );
                        }

                        return (
                            <>
                                {groupRow}
                                {competences.map((competenceItem: any) => (
                                    <TableRow key={`competence-${get(competenceItem, 'competence.id')}`}>
                                        <TableCell className={classes.competenceCell}>
                                            <Link
                                              to={appRouter.getCompetenceIndicatorsRouteLink(get(competenceItem, 'competence.id'))}
                                              target="_blank"
                                              className={classes.link}
                                            >
                                                {get(competenceItem, 'competence.number')} {get(competenceItem, 'competence.name')}
                                            </Link>
                                            <Tooltip title="Удалить компетенцию">
                                                <DeleteIcon className={classes.deleteIcon} onClick={deleteCompetence(competenceItem.id)} />
                                            </Tooltip>
                                            <br/>
                                        </TableCell>
                                        <TableCell>
                                            {get(competenceItem, 'indicator_of_competence_in_group_of_pk_competences').map((indicatorItem: any) => (
                                                <>
                                                    {get(indicatorItem, 'indicator.number')} {get(indicatorItem, 'indicator.name')}
                                                    <Tooltip title="Удалить индикатор" onClick={deleteIndicator(indicatorItem.id)}>
                                                        <DeleteIcon className={classes.deleteIcon}/>
                                                    </Tooltip>
                                                    <br/>
                                                </>
                                            ))}
                                            <Button color="primary"
                                                    variant="text"
                                                    size="small"
                                                    className={classes.addSmallButton}
                                                    onClick={() => changeIndicatorOpenModal({
                                                        isOpen: true,
                                                        competenceId: get(competenceItem, 'competence.id'),
                                                        competenceIdRelation: competenceItem.id,
                                                    })}
                                            >
                                                <AddIcon/> Добавить индикатор
                                            </Button>
                                        </TableCell>
                                        <TableCell className={classes.standardCell}>
                                            {competenceItem.professional_standard ?
                                                <>
                                                    {get(competenceItem, 'professional_standard.code')} {get(competenceItem, 'professional_standard.title')}
                                                    <Tooltip title="Удалить профессиональный стандарт" onClick={deleteProfessionalStandard(competenceItem.id)}>
                                                        <DeleteIcon className={classes.deleteIcon}/>
                                                    </Tooltip>
                                                </>
                                                :
                                                <Button color="primary"
                                                        variant="text"
                                                        size="small"
                                                        className={classes.addSmallButton}
                                                        onClick={() => changeProfessionalStandardOpenModal({
                                                            isOpen: true,
                                                            competenceId: get(competenceItem, 'competence.id'),
                                                            competenceIdRelation: competenceItem.id,
                                                        })}
                                                >
                                                    <AddIcon/> Добавить профессиональный стандарт
                                                </Button>
                                            }
                                        </TableCell>
                                        <TableCell className={classes.functionsCell}>
                                              <>
                                                  {competenceItem.generalized_labor_functions?.map((item: any) => (
                                                    <div style={{ display: 'flex', alignItems: "center" }}>
                                                        {item?.code} {item?.name}
                                                        <Tooltip title="Удалить трудовую функцию"
                                                                 onClick={deleteLaborFunction({
                                                                     id: item.id,
                                                                     competenceId: get(competenceItem, 'competence.id'),
                                                                     competenceIdRelation: competenceItem.id,
                                                                     laborFunctions: competenceItem.generalized_labor_functions,
                                                                 })}>
                                                            <DeleteIcon style={{ top: '0px' }} className={classes.deleteIcon}/>
                                                        </Tooltip>
                                                    </div>
                                                  ))}
                                                  <Button color="primary"
                                                          variant="text"
                                                          size="small"
                                                          className={classes.addSmallButton}
                                                          onClick={() => changeLaborFunctionModalData({
                                                              isOpen: true,
                                                              competenceId: get(competenceItem, 'competence.id'),
                                                              competenceIdRelation: competenceItem.id,
                                                              laborFunctions: competenceItem.generalized_labor_functions,
                                                          })}
                                                  >
                                                      <AddIcon/> Добавить трудовую функцию
                                                  </Button>
                                              </>
                                            {/*<EditableText value={get(competenceItem, 'labor_functions') || 'трудовая функция'}*/}
                                            {/*              isEditMode={editCompetenceLaborFunctionData.isEdit*/}
                                            {/*                    && editCompetenceLaborFunctionData.competenceId === competenceItem.id*/}
                                            {/*              }*/}
                                            {/*              onClickDone={saveGroupLaborFunctions}*/}
                                            {/*              onClickCancel={() => changeEditCompetenceLaborFunction({isEdit: false, competenceId: 0})}*/}
                                            {/*              onValueClick={() => changeEditCompetenceLaborFunction({isEdit: true, competenceId: competenceItem.id})}*/}
                                            {/*              fullWidth*/}
                                            {/*/>*/}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {addCompetenceRow}
                            </>
                        );
                    })}
                </TableBody>
            </Table>

            <Button className={classes.addButton}
                    onClick={createNewGroup}
                    variant="outlined"
                    size="small"
            >
                Добавить новую категорию
            </Button>


            <AddCompetenceModal closeDialog={() => changeCompetenceOpenModal({isOpen: false, groupId: 0})}
                                isOpen={competenceModalData.isOpen}
                                saveDialog={saveCompetence}
            />
            <AddIndicatorsModal closeDialog={() => changeIndicatorOpenModal({isOpen: false, competenceId: 0, competenceIdRelation: 0})}
                                isOpen={indicatorModalData.isOpen}
                                saveDialog={saveIndicator}
                                competenceId={indicatorModalData.competenceId}
            />
            <AddProfStandardsModal closeDialog={() => changeProfessionalStandardOpenModal({isOpen: false, competenceId: 0, competenceIdRelation: 0})}
                                   isOpen={professionalStandardModalData.isOpen}
                                   saveDialog={saveProfessionalStandard}
            />
            <AddLaborFunctionModal closeDialog={() => changeLaborFunctionModalData({isOpen: false, competenceId: 0, competenceIdRelation: 0, laborFunctions: []})}
                                   isOpen={laborFunctionModalData.isOpen}
                                   saveDialog={saveLaborFunction}
            />
        </div>
    )
};

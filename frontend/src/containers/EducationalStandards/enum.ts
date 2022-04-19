export enum fields {
    EDUCATIONAL_STANDARD_LIST = 'EDUCATIONAL_STANDARD_LIST',
    EDUCATIONAL_STANDARD_DIALOG = 'EDUCATIONAL_STANDARD_DIALOG',
    IS_OPEN_DIALOG = 'IS_OPEN_DIALOG',
    DIALOG_DATA = 'DIALOG_DATA',
    SEARCH_QUERY = 'SEARCH_QUERY',
    CURRENT_PAGE = 'CURRENT_PAGE',
    ALL_COUNT = 'ALL_COUNT',
    SORTING = 'SORTING',
    SORTING_FIELD = 'SORTING_FIELD',
    SORTING_MODE = 'SORTING_MODE',
    EDUCATIONAL_STANDARD = 'EDUCATIONAL_STANDARD',
}

export enum fetchingTypes {
    GET_EDUCATIONAL_STANDARDS = 'GET_EDUCATIONAL_STANDARDS',
    GET_EDUCATIONAL_STANDARD = 'GET_EDUCATIONAL_STANDARD',
    DELETE_EDUCATIONAL_STANDARD = 'DELETE_EDUCATIONAL_STANDARD',
    UPDATE_EDUCATIONAL_STANDARD = 'UPDATE_EDUCATIONAL_STANDARD',
    CREATE_EDUCATIONAL_STANDARD = 'CREATE_EDUCATIONAL_STANDARD',

    EDUCATIONAL_STANDARD_CREATE_COMPETENCE_GROUP = 'EDUCATIONAL_STANDARD_CREATE_COMPETENCE_GROUP',
    EDUCATIONAL_STANDARD_DELETE_COMPETENCE_GROUP = 'EDUCATIONAL_STANDARD_DELETE_COMPETENCE_GROUP',
    EDUCATIONAL_STANDARD_SAVE_COMPETENCE = 'EDUCATIONAL_STANDARD_SAVE_COMPETENCE',
    EDUCATIONAL_STANDARD_DELETE_COMPETENCE = 'EDUCATIONAL_STANDARD_DELETE_COMPETENCE',
    EDUCATIONAL_STANDARD_SAVE_INDICATOR = 'EDUCATIONAL_STANDARD_SAVE_INDICATOR',
    EDUCATIONAL_STANDARD_DELETE_INDICATOR = 'EDUCATIONAL_STANDARD_DELETE_INDICATOR',
    EDUCATIONAL_STANDARD_SAVE_GROUP_TITLE = 'EDUCATIONAL_STANDARD_SAVE_GROUP_TITLE',

    EDUCATIONAL_STANDARD_ADD_TASK = 'EDUCATIONAL_STANDARD_ADD_TASK',
    EDUCATIONAL_STANDARD_UPDATE_TASK = 'EDUCATIONAL_STANDARD_UPDATE_TASK',
    EDUCATIONAL_STANDARD_DELETE_TASK = 'EDUCATIONAL_STANDARD_DELETE_TASK',
}

export enum EducationalStandardFields {
    ID = 'id',
    TITLE = 'name',
    YEAR = 'standard_date',
    GENERAL_PROFESSIONAL_COMPETENCES = 'group_of_general_prof_competences',
    SUPRA_PROFESSIONAL_COMPETENCES = 'group_of_over_prof_competences',
    KEY_COMPETENCES = 'group_of_key_competences',
    TASKS = 'tasks_prof_standard',
}


export enum CompetenceTableType {
    KEY_COMPETENCES = 'KEY_COMPETENCES',
    SUPRA_PROFESSIONAL_COMPETENCES = 'SUPRA_PROFESSIONAL_COMPETENCES',
    GENERAL_PROFESSIONAL_COMPETENCES = 'GENERAL_PROFESSIONAL_COMPETENCES',
}
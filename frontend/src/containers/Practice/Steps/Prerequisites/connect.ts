import {connect} from 'react-redux';

import {rootState} from "../../../../store/reducers";
import {getPermissionsInfo, getPractice, getTemplateText} from "../../getters";
import {bindActionCreators} from "redux";
import actions from "../../actions";

const mapStateToProps = (state: rootState) => {
    return {
        fields: getPractice(state),
        templateText: getTemplateText(state),
        prerequisitesList: getPractice(state).prerequisites,
        permissionsInfo: getPermissionsInfo(state),
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);

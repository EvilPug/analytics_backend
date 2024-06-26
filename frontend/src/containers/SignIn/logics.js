import {createLogic} from "redux-logic";
import get from 'lodash/get';

import * as C from './constants';
import actions from '../../layout/actions';

import Service from './service';
import UserService from '../../service/user-service';

import {getFieldValue} from "./getters";
import * as Enum from "./enum";

const service = new Service();
const userService = new UserService();

const signIn = createLogic({
    type: C.SIGN_IN,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();

        const password = getFieldValue(state, Enum.PASSWORD_FIELD);
        const username = getFieldValue(state, Enum.USERNAME_FIELD);

        dispatch(actions.fetchingTrue({destination: Enum.SIGN_IN_FETCHING}));

        service.signIn(password, username)
            .then((res) => {
                const token = get(res, 'data.access', null);
                const refreshToken = get(res, 'data.refresh', null);

                userService.setToken(token);
                userService.setRefreshToken(refreshToken);

                dispatch(actions.fetchingSuccess(['Вы успешно авторизировались!']));
                dispatch(actions.setAuthTrue());
                dispatch(actions.getUserGroups());
                dispatch(actions.getUserData());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(['Неверный логин или пароль']));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.SIGN_IN_FETCHING}));
                return done();
            });
    }
});

export default [
    signIn,
];

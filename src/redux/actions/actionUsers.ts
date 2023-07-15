import { Action, Dispatch } from '@reduxjs/toolkit';
import { User } from 'src/config/types/types';

function login(newUser: User) {
    return {
        type: 'LOG_USER',
        payload: newUser,
    };
}

function logoff() {
    return {
        type: 'LOGOFF_USER',
        payload: { logged: false },
    };
}

export default function mapDispatchToProps(dispatch: Dispatch<Action>) {
    const dispatchUser = {
        logoffRedux() {
            const action = logoff();
            dispatch(action);
        },
        loginRedux(newValue: User) {
            const action = login(newValue);
            dispatch(action);
        },
    };
    return { dispatchUser };
}

import { AnyAction } from '@reduxjs/toolkit';
import { User } from 'src/config/types/types';

const initialState: User = {
    _id: '',
    name: '',
    pg: '',
    section: '',
    level: '',
    logged: false,
};

export default function userReducer(state = initialState, action: AnyAction): User {
    switch (action.type) {
        case 'LOG_USER':
            return (state = action.payload);
        case 'LOGOFF_USER':
            return (state = initialState);
        default:
            return state;
    }
}

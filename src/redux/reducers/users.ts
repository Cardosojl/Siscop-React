import { AnyAction } from '@reduxjs/toolkit';
import { Section, User } from 'src/config/types/types';

const initialState: User<string, Section> = {
    _id: '',
    name: '',
    section: { _id: '', name: '', level: '' },
    level: '',
    logged: false,
};

export default function userReducer(state = initialState, action: AnyAction): User<string, Section> {
    switch (action.type) {
        case 'LOG_USER':
            return (state = action.payload);
        case 'LOGOFF_USER':
            return (state = initialState);
        default:
            return state;
    }
}

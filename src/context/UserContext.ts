import React from 'react';
import { SectionTypes, UserTypes } from 'src/apis/types';
import { DefineUserTypes } from './types';

export const initialUser = {
    _id: '',
    name: '',
    section: { _id: '', name: '', level: '' },
    level: '',
    logged: false,
};

export const dataUser: { user: UserTypes<string, SectionTypes>; setUser: DefineUserTypes } = {
    user: initialUser,
    setUser: () => {},
};

const UserContext = React.createContext(dataUser);

export default UserContext;

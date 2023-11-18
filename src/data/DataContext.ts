import React from 'react';
import { DispatchUser, Section, User } from 'src/config/types/types';

export const initialUser = {
    _id: '',
    name: '',
    section: { _id: '', name: '', level: '' },
    level: '',
    logged: false,
};

export const dataUser: { user: User<string, Section>; setUser: DispatchUser } = {
    user: initialUser,
    setUser: () => {},
};

const DataContext = React.createContext(dataUser);

export default DataContext;

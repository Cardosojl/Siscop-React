import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserContext from 'src/context/UserContext';
import Login from '../pages/Login';
import RegisterUser from '../pages/ADM/RegisterUser';
import ChangeUser from '../pages/ADM/ChangeUser';

export function ADMRoutes(): JSX.Element {
    const { user } = useContext(UserContext);
    const login = <Login />;
    const registerUser = <RegisterUser />;
    const changeUser = <ChangeUser />;

    return (
        <Routes>
            <Route path="/cadastrarUsuario" element={user.logged ? registerUser : login} />
            <Route path="/alterarUsuario" element={user.logged ? changeUser : login} />
        </Routes>
    );
}

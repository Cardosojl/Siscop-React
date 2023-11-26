import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserContext from 'src/context/UserContext';
import Login from '../pages/Login';
import EditProfile from '../pages/Profile/EditProfile';

export function ProfileRoutes(): JSX.Element {
    const { user } = useContext(UserContext);
    const login = <Login />;
    const editProfile = <EditProfile />;

    return (
        <Routes>
            <Route path="/editProfile" element={user.logged ? editProfile : login} />
        </Routes>
    );
}

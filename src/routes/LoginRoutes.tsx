import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';

export function LoginRoutes(): JSX.Element {
    const login = <Login />;

    return (
        <Routes>
            <Route path="/" element={login} />
        </Routes>
    );
}

import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserContext from 'src/context/UserContext';
import Login from '../pages/Login';
import ProcessManager from '../pages/ProcessManager/ProcessManager';
import DocumentManager from '../pages/ProcessManager/DocumentManager';

export function ProcessManagerRoutes(): JSX.Element {
    const { user } = useContext(UserContext);
    const login = <Login />;
    const processManager = <ProcessManager />;
    const documentManager = <DocumentManager />;

    return (
        <Routes>
            <Route path="/acompanharProcessos/:number" element={user.logged ? processManager : login} />
            <Route path="/acompanharProcessos/processo/:id" element={user.logged ? documentManager : login} />
        </Routes>
    );
}

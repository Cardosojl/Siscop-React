import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserContext from 'src/context/UserContext';
import Login from '../pages/Login';
import ProcessBox from '../pages/Process/ProcessBox';
import DocumentBox from '../pages/Process/DocumentBox';
import EditProcess from '../pages/Process/EditProcess';
import ProcessStatus from '../pages/Process/ProcessStatus';
import ProcessCreator from '../pages/Process/ProcessCreator';

export function ProcessRoutes(): JSX.Element {
    const { user } = useContext(UserContext);
    const login = <Login />;
    const myProcess = <ProcessBox path="myProcess" title="Meus Processos" />;
    const receivedProcess = <ProcessBox path="receivedProcess" title="Processos Recebidos" />;
    const myFiles = <DocumentBox path="myProcess" />;
    const receivedFiles = <DocumentBox path="receivedProcess" />;
    const editMyProcess = <EditProcess path="myProcess" />;
    const editReceivedProcess = <EditProcess path="receivedProcess" />;
    const stateMyProcess = <ProcessStatus path="myProcess" />;
    const stateReceivedProcess = <ProcessStatus path="receivedProcess" />;
    const processCreator = <ProcessCreator />;

    return (
        <Routes>
            <Route path="/meusProcessos/:number" element={user.logged ? myProcess : login} />
            <Route path="/processosRecebidos/:number" element={user.logged ? receivedProcess : login} />
            <Route path="/meusProcessos/processo/:id" element={user.logged ? myFiles : login} />
            <Route path="/processosRecebidos/processo/:id" element={user.logged ? receivedFiles : login} />
            <Route path="/meusProcessos/processo/editar/:id" element={user.logged ? editMyProcess : login} />
            <Route path="/processosRecebidos/processo/editar/:id" element={user.logged ? editReceivedProcess : login} />
            <Route path="/meusProcessos/processo/anotar/:id" element={user.logged ? stateMyProcess : login} />
            <Route path="/processosRecebidos/processo/anotar/:id" element={user.logged ? stateReceivedProcess : login} />
            <Route path="/novoProcesso" element={user.logged ? processCreator : login} />
        </Routes>
    );
}

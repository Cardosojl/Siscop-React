import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserContext from 'src/context/UserContext';
import Login from '../pages/Login';
import MessageBox from '../pages/Message/MessageBox';
import MessageReader from '../pages/Message/MessageReader';
import MessageSender from '../pages/Message/MessageSender';

export function MessageRoutes(): JSX.Element {
    const { user } = useContext(UserContext);
    const login = <Login />;
    const messages = <MessageBox title={'Menssagens Recebidas'} path="messages" />;
    const messagesSent = <MessageBox title="Menssagens Enviadas" path="messageSents" />;
    const messagesArchived = <MessageBox title="Menssagens Arquivadas" path="messageArchiveds" />;
    const messagesReaderR = <MessageReader path="messages" />;
    const messagesReaderS = <MessageReader path="messageSents" />;
    const messagesReaderA = <MessageReader path="messageArchiveds" />;
    const messageSender = <MessageSender />;

    return (
        <Routes>
            <Route path="/minhasMensagensRecebidas/:id" element={user.logged ? messagesReaderR : login} />
            <Route path="/minhasMensagensEnviadas/:id" element={user.logged ? messagesReaderS : login} />
            <Route path="/minhasMensagensArquivadas/:id" element={user.logged ? messagesReaderA : login} />
            <Route path="/caixaDeEntrada/:number" element={user.logged ? messages : login} />
            <Route path="/enviadas/:number" element={user.logged ? messagesSent : login} />
            <Route path="/arquivadas/:number" element={user.logged ? messagesArchived : login} />
            <Route path="/novaMensagem/:id" element={user.logged ? messageSender : login} />
        </Routes>
    );
}

import React, { useContext } from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Login from 'src/views/login/Login';
import MessageReader from 'src/views/messageReader/MessageReader';
import MessageList from 'src/views/messageList/MessageList';
import ProcessList from 'src/views/processList/ProcessList';
import DocumentList from 'src/views/documentList/DocumentList';
import EditProcess from 'src/views/editProcess/EditProcess';
import ProcessStatus from 'src/views/processStatus/ProcessStatus';
import MessageSender from 'src/views/messageSender/MessageSender';
import ProcessCreator from 'src/views/processCreator/ProcessCreator';
import ProcessManager from 'src/views/processManager/ProcessManager';
import DocumentManager from 'src/views/documentManager/DocumentManager';
import EditProfile from 'src/views/editProfile/EditProfile';
import RegisterUser from 'src/views/registerUser/RegisterUser';
import ChangeUser from 'src/views/changeUser/ChangeUser';
import DataContext from 'src/data/DataContext';

function Content(): JSX.Element {
    const { user } = useContext(DataContext);
    const login = <Login />;
    const messages = <MessageList title={'Menssagens Recebidas'} path="messages" />;
    const messagesSent = <MessageList title="Menssagens Enviadas" path="messageSents" />;
    const messagesArchived = <MessageList title="Menssagens Arquivadas" path="messageArchiveds" />;
    const messagesReaderR = <MessageReader path="messages" />;
    const messagesReaderS = <MessageReader path="messageSents" />;
    const messagesReaderA = <MessageReader path="messageArchiveds" />;
    const myProcess = <ProcessList path="myProcess" title="Meus Processos" />;
    const receivedProcess = <ProcessList path="receivedProcess" title="Processos Recebidos" />;
    const myFiles = <DocumentList path="myProcess" />;
    const receivedFiles = <DocumentList path="receivedProcess" />;
    const editMyProcess = <EditProcess path="myProcess" />;
    const editReceivedProcess = <EditProcess path="receivedProcess" />;
    const stateMyProcess = <ProcessStatus path="myProcess" />;
    const stateReceivedProcess = <ProcessStatus path="receivedProcess" />;
    const messageSender = <MessageSender />;
    const processCreator = <ProcessCreator />;
    const processManager = <ProcessManager />;
    const documentManager = <DocumentManager />;
    const editProfile = <EditProfile />;
    const registerUser = <RegisterUser />;
    const changeUser = <ChangeUser />;

    return (
        <div>
            <Routes>
                <Route path="/" element={login} />
                <Route path="/minhasMensagensRecebidas/:id" element={user.logged ? messagesReaderR : login} />
                <Route path="/minhasMensagensEnviadas/:id" element={user.logged ? messagesReaderS : login} />
                <Route path="/minhasMensagensArquivadas/:id" element={user.logged ? messagesReaderA : login} />
                <Route path="/caixaDeEntrada/:number" element={user.logged ? messages : login} />
                <Route path="/enviadas/:number" element={user.logged ? messagesSent : login} />
                <Route path="/arquivadas/:number" element={user.logged ? messagesArchived : login} />
                <Route path="/meusProcessos/:number" element={user.logged ? myProcess : login} />
                <Route path="/processosRecebidos/:number" element={user.logged ? receivedProcess : login} />
                <Route path="/meusProcessos/processo/:id" element={user.logged ? myFiles : login} />
                <Route path="/processosRecebidos/processo/:id" element={user.logged ? receivedFiles : login} />
                <Route path="/meusProcessos/processo/editar/:id" element={user.logged ? editMyProcess : login} />
                <Route path="/processosRecebidos/processo/editar/:id" element={user.logged ? editReceivedProcess : login} />
                <Route path="/meusProcessos/processo/anotar/:id" element={user.logged ? stateMyProcess : login} />
                <Route path="/processosRecebidos/processo/anotar/:id" element={user.logged ? stateReceivedProcess : login} />
                <Route path="/novaMensagem/:id" element={user.logged ? messageSender : login} />
                <Route path="/novoProcesso" element={user.logged ? processCreator : login} />
                <Route path="/acompanharProcessos/:number" element={user.logged ? processManager : login} />
                <Route path="/acompanharProcessos/processo/:id" element={user.logged ? documentManager : login} />
                <Route path="/editProfile" element={user.logged ? editProfile : login} />
                <Route path="/cadastrarUsuario" element={user.logged ? registerUser : login} />
                <Route path="/alterarUsuario" element={user.logged ? changeUser : login} />
            </Routes>
        </div>
    );
}

export default Content;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from 'src/views/login/Login';
import { UserRedux } from 'src/config/types/types';
import MessageReader from 'src/views/messageReader/MessageReader';
import './Content.css';
import MessageBox from 'src/views/messageBox/MessageBox';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import ProcessList from 'src/views/processList/ProcessList';
import DocumentList from 'src/views/documentList/DocumentList';
import EditProcess from 'src/views/editProcess/EditProcess';
import ProcessStatus from 'src/views/processStatus/ProcessStatus';

function Content({ user }: UserRedux): JSX.Element {
    const login = <Login />;
    const messages = <MessageBox title={'Recebidas T'} path="messages" />;
    const messagesSent = <MessageBox title="Menssagens Enviadas" path="messageSents" />;
    const messagesArchived = <MessageBox title="Menssagens Arquivadas" path="messageArchiveds" />;
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
    return (
        <main className="Content">
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
            </Routes>
        </main>
    );
}

export default connect(mapStateToProps)(Content);

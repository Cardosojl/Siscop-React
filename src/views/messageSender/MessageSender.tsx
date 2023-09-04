import React, { ReactNode, useEffect, useRef, useState } from 'react';
import WindowTitle from 'src/components/windowTitle/WindowTitle';
import './MessageSender.css';
import './jodit/jodit.css';
import { SimpleView } from 'src/config/types/types';
import { generateProcessSelect, generateSectionSelect, generateUserSelect, handleProcesses, handleSections, handleUsers } from './MessageSenderFunction';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { connect } from 'react-redux';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import { useLocation } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import joditConfig from './jodit/joditConfig';

function MessageSender({ user, dispatchUser }: SimpleView): JSX.Element {
    const [urlId] = useLocation().pathname.split('/').reverse();
    const processId = urlId !== '0' ? urlId : null;
    const [destination, setDestination] = useState<string>('');
    const [selectDestination, setSelectDestination] = useState<ReactNode>('');
    const [selectProcess, setSelectProcess] = useState<ReactNode>('');
    const [content, setContent] = useState('');
    const editor = useRef(null);

    const throwError = useAsyncError();

    useEffect(() => {
        console.log(processId);
        handleProcesses(user, processId)
            .then((data) => {
                setSelectProcess(generateProcessSelect(data, processId));
            })
            .catch((error) => {
                handleErros(error as Error, dispatchUser, throwError);
            });
    }, []);

    useEffect(() => {
        if (destination === 'user') {
            handleUsers(user)
                .then((data) => {
                    setSelectDestination(generateUserSelect(data));
                })
                .catch((error) => {
                    handleErros(error as Error, dispatchUser, throwError);
                });
        }
        if (destination === 'section') {
            handleSections()
                .then((data) => {
                    setSelectDestination(generateSectionSelect(data));
                })
                .catch((error) => {
                    handleErros(error as Error, dispatchUser, throwError);
                });
        } else setSelectDestination('');
    }, [destination]);

    return (
        <div className="MainWindow container">
            <div className="Window">
                <WindowTitle title="Nova Mensagem" className="dark" />
                <div className="MessageSender__labelField">
                    <label className="MessageSender__labels">Titulo:</label>
                    <input type="text" />
                    <label className="MessageSender__labels">Destinatário:</label>
                    <select name="receiver" onChange={(e) => setDestination(e.target.value)}>
                        <option value=""></option>
                        <option value="section">Seção</option>
                        <option value="user">Usuário</option>
                    </select>
                    {selectDestination}
                </div>
                <div className="MessageSender__sendFild">
                    <span>
                        <label className="MessageSender__labels">Processo:</label>
                        {selectProcess}
                    </span>
                    <span className="MessageSender__sender">
                        <button className="Button--blue Button--Message">Enviar</button>
                    </span>
                </div>
                <br></br>
                <JoditEditor ref={editor} value={content} config={joditConfig} onChange={(e) => setContent(e)} />
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageSender);

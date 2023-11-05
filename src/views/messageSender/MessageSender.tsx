import React, { ChangeEvent, FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import WindowTitle from 'src/components/windowTitle/WindowTitle';
import './MessageSender.css';
import './jodit/jodit.css';
import { Message, Process, SimpleView } from 'src/config/types/types';
import { generateProcessSelect, generateSectionSelect, generateUserSelect, handleForm, handleProcesses, handleSections, handleUsers } from './MessageSenderFunction';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { connect } from 'react-redux';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import { useLocation, useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import joditConfig from './jodit/joditConfig';
import { setInputs } from '../elementsCreator';

function MessageSender({ user, dispatchUser }: SimpleView): JSX.Element {
    const [urlId] = useLocation().pathname.split('/').reverse();
    const processId = urlId !== '0' ? urlId : null;
    const [form, setForm] = useState<Partial<Message> & Partial<Process>>({ title: undefined, sender: undefined, content: undefined });
    const [destination, setDestination] = useState<string>('');
    const [selectDestination, setSelectDestination] = useState<ReactNode>('');
    const [selectProcess, setSelectProcess] = useState<ReactNode>('');
    const [errorMessage, setErrorMessage] = useState<ReactNode>();
    const editor = useRef(null);
    const navigate = useNavigate();
    const throwError = useAsyncError();
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);
    const send = async (e: FormEvent) => {
        try {
            await handleForm(e, form, navigate, setErrorMessage);
        } catch (error) {
            handleErros(error as Error, dispatchUser, throwError, setErrorMessage);
        }
    };

    useEffect(() => {
        setForm((curr) => ({ ...curr, sender: user._id, process: processId ? processId : undefined }));
        handleProcesses(user, processId)
            .then((data) => {
                setSelectProcess(generateProcessSelect(data, processId, setForm));
            })
            .catch((error) => {
                handleErros(error as Error, dispatchUser, throwError);
            });
    }, []);

    useEffect(() => {
        if (destination === 'user') {
            handleUsers(user)
                .then((data) => {
                    setSelectDestination(generateUserSelect(data, setForm));
                })
                .catch((error) => {
                    handleErros(error as Error, dispatchUser, throwError);
                });
        }
        if (destination === 'section') {
            handleSections()
                .then((data) => {
                    setSelectDestination(generateSectionSelect(data, setForm));
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
                {errorMessage}
                <div className="MessageSender__labelField">
                    <label className="MessageSender__labels">Titulo:</label>
                    <input type="text" name="title" value={form?.title || ''} onChange={handleInput} />
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
                    <form className="MessageSender__sender" onSubmit={send}>
                        <button className="Button--blue Button--Message">Enviar</button>
                    </form>
                </div>
                <br></br>
                <JoditEditor ref={editor} value={form?.content || ''} config={joditConfig} onChange={(e) => setForm((curr) => ({ ...curr, content: e }))} />
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageSender);

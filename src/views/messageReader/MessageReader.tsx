import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Message, MessageReaderType } from 'src/config/types/types';
import { useLocation, useNavigate } from 'react-router-dom';
import './MessageReader.css';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { handleApiMessage, handleErros, handleIcons, handleResponsible } from './MessageReaderFunction';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import WindowTitle from 'src/components/windowTitle/WindowTitle';

function MessageReader({ user, dispatchUser, path }: MessageReaderType): JSX.Element {
    const url = useLocation().pathname.split('/');
    const [messageID] = [...url].reverse();
    const [message, setMessage] = useState<Message | null>(null);
    const navigate = useNavigate();
    const throwError = useAsyncError();

    useEffect(() => {
        handleApiMessage(`${path}/message`, user, messageID)
            .then((data) => setMessage(data))
            .catch((error) => handleErros(error as Error, dispatchUser, throwError));
    }, []);

    if (message)
        return (
            <div className="MainWindow container">
                <div className="Window">
                    <WindowTitle title={message.title}>
                        <small className="Title__date">{message.date}</small>
                    </WindowTitle>
                    <hr />
                    <div className="MessageReader__content">
                        <p className="MessageReader__text">{message?.content}</p>
                    </div>
                    {handleResponsible(path, message)}
                    <div className="MessageReader__footer">
                        <p className="MessageReader__text">
                            Processo: <u>{message.process_title}</u>
                        </p>
                        {handleIcons(path, message._id, navigate, dispatchUser, throwError)}
                    </div>
                </div>
            </div>
        );
    else return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageReader);

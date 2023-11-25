import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { MessageType } from 'src/config/types/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleApiMessage, handleIcons, handleResponsible } from './MessageReaderFunction';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { Window } from 'src/components/Wrapper/Window/index';
import { Title } from 'src/components/Title/index';
import { MessageContent } from 'src/components/MessageContent/index';
import { Wrapper } from 'src/components/Wrapper/Wrapper/index';
import DataContext from 'src/data/DataContext';

function MessageReader({ path }: { path: string }): JSX.Element {
    const { user, setUser } = useContext(DataContext);
    const url = useLocation().pathname.split('/');
    const [messageID] = url.reverse();
    const [message, setMessage] = useState<MessageType | null>(null);
    const navigate = useNavigate();
    const throwError = useAsyncError();

    useEffect(() => {
        handleApiMessage(`${path}/message`, user, messageID)
            .then((data) => setMessage(data))
            .catch((error) => handleErros(error as Error, setUser, throwError));
    }, []);

    if (message)
        return (
            <Window $large>
                <Title title={message.title}>
                    <small>{message.date}</small>
                </Title>
                <hr />
                <MessageContent content={message.content} />
                {handleResponsible(path, message)}
                <Wrapper $displayFlex="space-between">
                    <Wrapper $paddingLeft="10px" $paddingTop="10px">
                        <p>
                            Processo: <u>{message.process_title}</u>
                        </p>
                    </Wrapper>
                    {handleIcons(user, path, message, navigate, setUser, throwError)}
                </Wrapper>
            </Window>
        );
    else return <></>;
}

export default MessageReader;

import React from 'react';
import { handleErros, siscopCreate, siscopDelete, siscopShow } from 'src/apis/siscopDB';
import { DispatchUser, Message, Section, User } from 'src/config/types/types';
import archived from './images/archive.png';
import trash from './images/trash.png';
import { NavigateFunction } from 'react-router-dom';

async function handleApiDeleteMessage(path: string, element: Message, user: User<string, Section>): Promise<void> {
    if (!(await validationEvents(element, path, user))) {
        await siscopDelete(path, { _id: element._id });
    }
}

async function handleApiArchiveMessage(path: string, element: Message, user: User<string, Section>): Promise<void> {
    if (!(await validationEvents(element, path, user))) {
        await siscopCreate('messageArchiveds', { message: element._id });
    }
}

async function validationEvents(element: Message, path: string, user: User<string, Section>): Promise<boolean> {
    let error = false;
    if (path === 'messages' || path === 'messageArchiveds') {
        const message = (await siscopShow(path, 0, { _id: element._id, receiver: user._id })).data.response;
        if (!message) error = true;
    }
    if (path === 'messageSents') {
        const message = (await siscopShow(path, 0, { _id: element._id, sender: user._id })).data.response;
        if (!message) error = true;
    }
    return error;
}

export async function handleApiMessage(path: string, user: User<string, Section>, messageID: string): Promise<Message | null> {
    if (path === 'messageSents/message') {
        const message = (await siscopShow(path, ['receiver', 'section_receiver', 'process'], { sender: user._id, _id: messageID })).data.response;
        if (message) return message;
    }
    if (path === 'messages/message' || path === 'messageArchiveds/message') {
        const message = (await siscopShow(path, ['sender', 'process'], { receiver: user._id, section: user.section._id, _id: messageID })).data.response;
        if (message) return message;
    }
    throw { statusCode: 404, message: '404 Não Encontrado' };
}

export function handleResponsible(path: string, message: Message): JSX.Element {
    if (path === 'messageSents') {
        const sectionName = message.section_receiver ? (message.section_receiver as Section).name : null;
        const receiverString = message.receiver ? `${(message.receiver as User).pg} ${(message.receiver as User).name}` : null;
        return (
            <small className="MessageReader__text">
                Destinatário: {receiverString} {sectionName}
            </small>
        );
    }
    if (path === 'messages' || path === 'messageArchiveds') {
        const senderString = message.sender ? `${(message.sender as User).pg} ${(message.sender as User).name}` : '';
        return <small className="MessageReader__text">Remetente: {senderString}</small>;
    } else return <></>;
}

export function handleIcons(user: User<string, Section>, path: string, element: Message, navigate: NavigateFunction, dispatchUser: DispatchUser, throwError: CallableFunction): JSX.Element {
    const handleDelete = async () => {
        try {
            await handleApiDeleteMessage(path, element, user);
            navigate(-1);
        } catch (error) {
            handleErros(error as Error, dispatchUser, throwError);
        }
    };

    const handleApiArchive = async () => {
        try {
            await handleApiArchiveMessage(path, element, user);
            navigate(-1);
        } catch (error) {
            handleErros(error as Error, dispatchUser, throwError);
        }
    };
    const archive =
        path === 'messages' ? (
            <>
                <img className="MessageRader__icon Button--yellow" src={archived} onClick={handleApiArchive} />
                <small>Arquivar</small>
            </>
        ) : (
            <></>
        );

    const trashDelete = (
        <>
            <img className="MessageRader__icon Button--red" src={trash} onClick={handleDelete} /> <small>Apagar</small>
        </>
    );
    return (
        <small className="MessageReader__icons">
            {archive}
            {trashDelete}
        </small>
    );
}

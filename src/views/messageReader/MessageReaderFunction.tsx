import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { siscopCreate, siscopDelete, siscopShow } from 'src/apis/siscopDB';
import { DispatchUser, Message, Section, User } from 'src/config/types/types';
import archived from './images/archive.png';
import trash from './images/trash.png';
import { NavigateFunction } from 'react-router-dom';

async function handleApiDeleteMessage(path: string, id: string): Promise<void> {
    !id || id === '' || id === null ? 0 : await siscopDelete(path, { _id: id });
}

async function handleApiArchiveMessage(path: string, id: string): Promise<void> {
    !id || id === '' || id === null ? 0 : await siscopCreate(path, { message: id });
}

export async function handleApiMessage(path: string, user: User, messageID: string): Promise<Message | null> {
    let message: AxiosResponse;
    if (path === 'messageSents/message') {
        message = await siscopShow(path, ['receiver', 'section_receiver', 'process'], { sender: user._id, _id: messageID });
    } else if (path === 'messages/message' || path === 'messageArchiveds/message') {
        message = await siscopShow(path, ['sender', 'process'], { receiver: user._id, section: user.section, _id: messageID });
    } else return null;
    const { response }: { response: Message | null } = message.data;
    return response;
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

// eslint-disable-next-line prettier/prettier
export function handleIcons(path: string, id: string, navigate: NavigateFunction, dispatchUser: DispatchUser, throwError: CallableFunction): JSX.Element {
    const handleDelete = async () => {
        try {
            await handleApiDeleteMessage(path, id);
            navigate(-1);
        } catch (error) {
            handleErros(error as Error, dispatchUser, throwError);
        }
    };

    const handleApiArchive = async () => {
        try {
            await handleApiArchiveMessage('messageArchiveds', id);
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

export function handleErros(error: Error, dispatchUser: DispatchUser, throwError: CallableFunction): void {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) dispatchUser.logoffRedux();
        else throwError(new Error((error as Error).message));
    } else throwError(new Error((error as Error).message));
}

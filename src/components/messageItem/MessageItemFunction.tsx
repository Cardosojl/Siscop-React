import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { MessageType, Process, Section, User } from 'src/config/types/types';
import { siscopCreate, siscopDelete, siscopShow } from 'src/apis/siscopDB';
import archived from '../../assets/archive.png';
import trash from '../../assets/trash.png';
import { Td, Tr } from '../Table';
import { ImageIcon } from '../ImageIcon';
import { LinkStyled } from '../LinkStyled';

async function validationEvents(element: MessageType, path: string, user: User<string, Section>): Promise<boolean> {
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

function generateContent(element: MessageType, setListener: CallableFunction, path: string) {
    if (path === 'messages' || path === 'messageArchiveds') return generateMyMessages(element, path, setListener);
    else if (path === 'messageSents') return generateSentMessages(element, setListener);
    else return <></>;
}

function generateMyMessages(element: MessageType | null, path: string, listener: CallableFunction): ReactNode {
    const href = setHref(path);
    const body = element ? (
        <Tr>
            <Td $size={3}>
                <LinkStyled to={`${href}${element._id}`}>
                    <p className="Table__textP">{element.title}</p>
                </LinkStyled>
            </Td>
            <Td $size={3}>{element.process ? `${(element.process as Process).title}` : <i>(Sem Processo)</i>}</Td>
            <Td $size={3}>{`${(element.sender as User).name}`}</Td>
            <Td $size={3}>{element.date}</Td>
            {path === 'messages' ? archiveButton(listener) : ''}
            {deleteButton(listener)}
        </Tr>
    ) : null;
    return body;
}

function archiveButton(listener: CallableFunction) {
    const handleArchive = () => listener('archive');
    return (
        <Td>
            <ImageIcon $yellow src={archived} onClick={() => handleArchive()} />
        </Td>
    );
}

function deleteButton(listener: CallableFunction) {
    const handleDelete = () => listener('deleteItem');
    return (
        <Td>
            <ImageIcon $red src={trash} onClick={() => handleDelete()} />
        </Td>
    );
}

function generateSentMessages(element: MessageType | null, listener: CallableFunction): ReactNode {
    const href = '/minhasMensagensEnviadas/';
    const body = element ? (
        <Tr>
            <Td $size={3}>
                <LinkStyled to={`${href}${element._id}`}>
                    <p className="Table__textP">{element.title}</p>
                </LinkStyled>
            </Td>
            <Td $size={3}>{element.process ? `${(element.process as Process).title}` : <i>(Sem Processo)</i>}</Td>
            <Td $size={3}>{element.section_receiver ? `${(element.section_receiver as Section).name}` : `${(element.receiver as User).name}`}</Td>
            <Td $size={3}>{element.date}</Td>
            {deleteButton(listener)}
        </Tr>
    ) : null;
    return body;
}

function generateLoading() {
    return (
        <tr className="Table__tr--load">
            <td colSpan={6}>
                <div className="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </td>
        </tr>
    );
}

async function handleArchiveMessage(path: string, element: MessageType, user: User<string, Section>) {
    if (!(await validationEvents(element, path, user))) {
        await siscopCreate('messageArchiveds', { message: element._id });
    }
}

function setHref(path: string): string {
    if (path === 'messages') return `/minhasMensagensRecebidas/`;
    else if (path === 'messageArchiveds') return `/minhasMensagensArquivadas/`;
    else if (path === 'messageSents') return '/minhasMensagensEnviadas/';
    else return '/null/';
}

async function handleDeleteMessage(path: string, element: MessageType, user: User<string, Section>): Promise<void> {
    if (!(await validationEvents(element, path, user))) {
        await siscopDelete(path, { _id: element._id });
    }
}

export async function handleEvents(listenerState: [string, Dispatch<SetStateAction<string>>], setRefresh: CallableFunction, element: MessageType, user: User<string, Section>, path: string) {
    const [listener, setListener] = listenerState;

    if (listener === 'archive') {
        try {
            await handleArchiveMessage(path, element, user);
            setListener('');
            setRefresh(true);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    } else if (listener === 'deleteItem') {
        try {
            await handleDeleteMessage(path, element, user);
            setListener('');
            setRefresh(true);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}

export function generateBody(listenerState: [string, Dispatch<SetStateAction<string>>], element: MessageType, path: string) {
    const [listener, setListener] = listenerState;
    if (listener === '' && !element) return '';
    else if (listener === '') return generateContent(element, setListener, path);
    else return generateLoading();
}

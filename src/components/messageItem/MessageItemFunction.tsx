import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { Message, Process, Section, User } from 'src/config/types/types';
import { siscopCreate, siscopDelete, siscopShow } from 'src/apis/siscopDB';
import archived from './images/archive.png';
import trash from './images/trash.png';
import { Link } from 'react-router-dom';

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

function generateContent(element: Message, setListener: CallableFunction, path: string) {
    if (path === 'messages' || path === 'messageArchiveds') return generateMyMessages(element, path, setListener);
    else if (path === 'messageSents') return generateSentMessages(element, setListener);
    else return <></>;
}

function generateMyMessages(element: Message | null, path: string, listener: CallableFunction): ReactNode {
    const href = setHref(path);
    const body = element ? (
        <tr>
            <td className="col-3">
                <Link to={`${href}${element._id}`} className="Table__link">
                    <p className="Table__textP">{element.title}</p>
                </Link>
            </td>
            <td className="col-3">{element.process ? `${(element.process as Process).title}` : <i>(Sem Processo)</i>}</td>
            <td className="col-3">{`${(element.sender as User).pg} ${(element.sender as User).name}`}</td>
            <td className="col-3">{element.date}</td>
            {path === 'messages' ? archiveButton(listener) : ''}
            {deleteButton(listener)}
        </tr>
    ) : null;
    return body;
}

function archiveButton(listener: CallableFunction) {
    const archiveEvent = () => listener('archive');
    return (
        <td>
            <img className="Table__icon Button--yellow" src={archived} onClick={() => archiveEvent()} />
        </td>
    );
}

function deleteButton(listener: CallableFunction) {
    const deleteEvent = () => listener('deleteItem');
    return (
        <td>
            <img className="Table__icon Button--red" src={trash} onClick={() => deleteEvent()} />
        </td>
    );
}

function generateSentMessages(element: Message | null, listener: CallableFunction): ReactNode {
    const href = '/minhasMensagensEnviadas/';
    const body = element ? (
        <tr>
            <td className="col-3">
                <Link to={`${href}${element._id}`} className="Table__link">
                    <p className="Table__textP">{element.title}</p>
                </Link>
            </td>
            <td className="col-3">{element.process ? `${(element.process as Process).title}` : <i>(Sem Processo)</i>}</td>
            <td className="col-3">
                {element.section_receiver
                    ? `${(element.section_receiver as Section).name}`
                    : `${(element.receiver as User).pg} ${(element.receiver as User).name}`}
            </td>
            <td className="col-3">{element.date}</td>
            {deleteButton(listener)}
        </tr>
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

async function handleArchiveMessage(path: string, element: Message, user: User<string, Section>) {
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

async function handleDeleteMessage(path: string, element: Message, user: User<string, Section>): Promise<void> {
    if (!(await validationEvents(element, path, user))) {
        await siscopDelete(path, { _id: element._id });
    }
}

export async function handleEvents(
    listenerState: [string, Dispatch<SetStateAction<string>>],
    setRefresh: CallableFunction,
    element: Message,
    user: User<string, Section>,
    path: string
) {
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

export function generateBody(listenerState: [string, Dispatch<SetStateAction<string>>], element: Message, path: string) {
    const [listener, setListener] = listenerState;
    if (listener === '' && !element) return '';
    else if (listener === '') return generateContent(element, setListener, path);
    else return generateLoading();
}

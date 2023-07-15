import axios from 'axios';
import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { siscopCreate, siscopDelete, siscopIndex } from 'src/apis/siscopDB';
import { DispatchUser, Message, ObjFilter, Process, Section, User } from 'src/config/types/types';
import archived from './images/archive.png';
import trash from './images/trash.png';

export function thMessage(path: string): JSX.Element {
    return (
        <tr>
            <th className="col-3">Mensagem:</th>
            <th className="col-3">Processo:</th>
            <th className="col-3">{path === 'messageSents' ? 'Destinatário:' : 'Remetente:'}</th>
            <th className="col-3">Data:</th>
            {path === 'messages' ? <th className="MessageTable__table--th_archived">Arquivar:</th> : ''}
            <th>Apagar:</th>
        </tr>
    );
}

function messageTreatment(messages: Message[], path: string): Partial<Message>[] {
    const array: Partial<Message>[] = [];
    if (path === 'messageSents')
        messages.forEach((element) => {
            array.push({
                _id: element._id,
                title: element.title,
                process: element.process ? (element.process as Process).title : undefined,
                receiver: element.receiver
                    ? `${(element.receiver as User).pg} ${(element.receiver as User).name}`
                    : `${(element.section_receiver as Section).name}`,
                date: element.date,
            });
        });

    if (path === 'messages' || path === 'messageArchiveds')
        messages.forEach((element) => {
            array.push({
                _id: element._id,
                title: element.title,
                process: element.process ? (element.process as Process).title : undefined,
                sender: `${(element.sender as User).pg} ${(element.sender as User).name}`,
                date: element.date,
            });
        });
    return array;
}

function tdLink(path: string, element: Partial<Message>): JSX.Element {
    if (path === 'messages') {
        return (
            <Link to={`/minhasMensagensRecebidas/${element._id}`} className="Link--default MessageTable__link">
                {element.title}
            </Link>
        );
    }
    if (path === 'messageSents') {
        return (
            <Link to={`/minhasMensagensEnviadas/${element._id}`} className="Link--default MessageTable__link">
                {element.title}
            </Link>
        );
    }
    if (path === 'messageArchiveds') {
        return (
            <Link to={`/minhasMensagensArquivadas/${element._id}`} className="Link--default MessageTable__link">
                {element.title}
            </Link>
        );
    } else return <></>;
}

// eslint-disable-next-line prettier/prettier
function tdButtons(path: string, element: Partial<Message>, setCounter: Dispatch<SetStateAction<number>>, dispatchUser: DispatchUser, throwError: CallableFunction): JSX.Element {
    const handleDelete = async () => {
        try {
            await handleApiDeleteMessage(path, element._id as string);
            setCounter((curr) => curr + 1);
        } catch (error) {
            handleErros(error as Error, dispatchUser, throwError);
        }
    };

    const handleArchive = async () => {
        try {
            await handleApiArchiveMessage('messageArchiveds', element._id as string);
            setCounter((curr) => curr + 1);
        } catch (error) {
            handleErros(error as Error, dispatchUser, throwError);
        }
    };
    return (
        <>
            {path === 'messages' ? (
                <td>
                    <img className="MessageTable__icon Button--yellow" src={archived} onClick={handleArchive} />
                </td>
            ) : null}
            <td>
                <img className="MessageTable__icon Button--red" src={trash} onClick={handleDelete} />
            </td>
        </>
    );
}

// eslint-disable-next-line prettier/prettier
export function handleTableBody(messages: Message[], path: string, setCounter: Dispatch<SetStateAction<number>>, dispatchUser: DispatchUser, throwError: CallableFunction): JSX.Element[] {
    const message = messageTreatment(messages, path);
    return message.map((element, index) => (
        <tr key={index}>
            <td className="col-3">{tdLink(path, element)}</td>
            <td className="col-3">{`${element.process || '(Sem Processo)'}`}</td>
            <td className="col-3">{`${element.receiver || element.sender}`}</td>
            <td className="col-3">{element.date}</td>
            {tdButtons(path, element, setCounter, dispatchUser, throwError)}
        </tr>
    ));
}

export async function handleApiMessages(path: string, limit: number, index: number, user: User, filter: ObjFilter | null): Promise<Message[]> {
    const response: Message[] = [];
    if (path === 'messages')
        response.push(...((await siscopIndex(path, limit, index, ['sender', 'process'], { receiver: user._id, section: user.section }, filter)) as Message[]));
    if (path === 'messageArchiveds')
        response.push(...((await siscopIndex(path, limit, index, ['sender', 'process'], { receiver: user._id, section: user.section }, filter)) as Message[]));
    if (path === 'messageSents')
        response.push(...((await siscopIndex(path, limit, index, ['receiver', 'process', 'section_receiver'], { sender: user._id }, filter)) as Message[]));
    return response;
}

async function handleApiDeleteMessage(path: string, id: string): Promise<void> {
    !id || id === '' || id === null ? 0 : await siscopDelete(path, { _id: id });
}

async function handleApiArchiveMessage(path: string, id: string): Promise<void> {
    !id || id === '' || id === null ? 0 : await siscopCreate(path, { message: id });
}

// eslint-disable-next-line prettier/prettier
export function handleErros(error: Error, dispatchUser: DispatchUser, throwError: CallableFunction, setMessages?: Dispatch<SetStateAction<Message[] | null>>): void {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) dispatchUser.logoffRedux();
        if (error.response?.status === 404 && setMessages) setMessages(null);
        else throwError(new Error((error as Error).message));
    } else throwError(new Error((error as Error).message));
}

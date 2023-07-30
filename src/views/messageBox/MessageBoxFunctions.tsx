import axios, { AxiosResponse } from 'axios';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { siscopCreate, siscopDelete, siscopIndex } from 'src/apis/siscopDB';
import { DispatchUser, Message, ObjFilter, Process, Section, TableType, User } from 'src/config/types/types';
import archived from './images/archive.png';
import trash from './images/trash.png';

async function indexMessages(path: string, limit: number, index: number, user: User, filter: ObjFilter | null): Promise<Message[] | null> {
    let messages: AxiosResponse | null = null;
    if (path === 'messages') messages = await siscopIndex(path, limit, index, ['sender', 'process'], { receiver: user._id, section: user.section }, filter);
    else if (path === 'messageArchiveds')
        messages = await siscopIndex(path, limit, index, ['sender', 'process'], { receiver: user._id, section: user.section }, filter);
    else if (path === 'messageSents')
        messages = await siscopIndex(path, limit, index, ['receiver', 'process', 'section_receiver'], { sender: user._id }, filter);
    else return null;
    const { response }: { response: Message[] | null } = messages.data;
    return response;
}

function thMessage(path: string): JSX.Element {
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

function generateMyMessages(messages: Message[] | null, path: string, listener: CallableFunction): ReactNode {
    const href = (path: string) => {
        if (path === 'messages') return `/minhasMensagensRecebidas/`;
        if (path === 'messageArchiveds') return `/minhasMensagensArquivadas/`;
        else return '/null/';
    };
    const body = messages
        ? messages.map((element, index) => (
              <tr key={index}>
                  <td className="col-3">
                      <Link to={`${href(path)}${element._id}`} className="Table__link">
                          <p className="Table__textP">{element.title}</p>
                      </Link>
                  </td>
                  <td className="col-3">{`${element.process || '(Sem Processo)'}`}</td>
                  <td className="col-3">{`${(element.sender as User).pg} ${(element.sender as User).name}`}</td>
                  <td className="col-3">{element.date}</td>
                  {tdButtons(path, listener, element)}
              </tr>
          ))
        : null;
    return <tbody>{body}</tbody>;
}

function tdButtons(path: string, listener: CallableFunction, message: Message): JSX.Element {
    const archiveEvent = (itemId: string) => listener({ action: 'archive', itemId: itemId });
    const deleteEvent = (itemId: string) => listener({ action: 'delete', itemId: itemId });
    return (
        <>
            {path === 'messages' ? (
                <td>
                    <img className="Table__icon Button--yellow" src={archived} onClick={() => archiveEvent(message._id)} />
                </td>
            ) : null}
            <td>
                <img className="Table__icon Button--red" src={trash} onClick={() => deleteEvent(message._id)} />
            </td>
        </>
    );
}

function generateSentMessages(messages: Message[] | null, listener: CallableFunction): ReactNode {
    const href = '/minhasMensagensEnviadas/';
    const body = messages
        ? messages.map((element, index) => (
              <tr key={index}>
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
                  {tdButtons('messageSents', listener, element)}
              </tr>
          ))
        : null;
    return <tbody>{body}</tbody>;
}

export async function handleMessages(path: string, limit: number, index: number, user: User, filter: ObjFilter | null): Promise<Message[] | null> {
    const messages = (await indexMessages(path, limit, index, user, filter)) as Message[] | null;
    return messages;
}

export function handleMessageTable(path: string, messages: Message[] | null, listener: CallableFunction): TableType {
    const head = thMessage(path);
    let body: ReactNode | null = null;
    if (path === 'messages' || path === 'messageArchiveds') body = generateMyMessages(messages, path, listener);
    else if (path === 'messageSents') body = generateSentMessages(messages, listener);
    else body = <></>;
    return { head, body };
}

export async function handleApiDeleteMessage(path: string, id: string): Promise<void> {
    !id || id === '' || id === null ? 0 : await siscopDelete(path, { _id: id });
}

export async function handleApiArchiveMessage(path: string, id: string): Promise<void> {
    !id || id === '' || id === null ? 0 : await siscopCreate(path, { message: id });
}

export function handleErros(error: Error, dispatchUser: DispatchUser, throwError: CallableFunction): void {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) dispatchUser.logoffRedux();
        else throwError(new Error((error as Error).message));
    } else throwError(new Error((error as Error).message));
}

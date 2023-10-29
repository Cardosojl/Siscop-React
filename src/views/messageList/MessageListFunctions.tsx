import React, { ReactNode } from 'react';
import { siscopIndex } from 'src/apis/siscopDB';
import { Message, ObjFilter, Section, TableType, User } from 'src/config/types/types';
import MessageItem from 'src/components/messageItem/MessageItem';

async function indexMessages(path: string, limit: number, index: number, user: User<string, Section>, filter: ObjFilter | null): Promise<Message[] | null> {
    if (path === 'messages') {
        const messages = (await siscopIndex(path, limit, index, ['sender', 'process'], { receiver: user._id, section: user.section._id }, filter)).data.response;
        if (messages) return messages;
    } else if (path === 'messageArchiveds') {
        const messages = (await siscopIndex(path, limit, index, ['sender', 'process'], { receiver: user._id, section: user.section._id }, filter)).data.response;
        if (messages) return messages;
    } else if (path === 'messageSents') {
        const messages = (await siscopIndex(path, limit, index, ['receiver', 'process', 'section_receiver'], { sender: user._id }, filter)).data.response;
        if (messages) return messages;
    }
    return null;
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

export async function handleMessages(path: string, limit: number, index: number, user: User<string, Section>, filter: ObjFilter | null): Promise<Message[] | null> {
    const messages = (await indexMessages(path, limit, index, user, filter)) as Message[] | null;
    return messages;
}

export function handleMessageTable(path: string, messages: Message[] | null, listener: CallableFunction): TableType {
    const head = thMessage(path);
    const body: ReactNode = <tbody>{messages ? messages.map((element, index) => <MessageItem key={index} path={path} setRefresh={listener} element={element} />) : <tr></tr>}</tbody>;
    return { head, body };
}

export function handleUrl(path: string): string {
    if (path === 'messages') return `caixaDeEntrada`;
    else if (path === 'messageArchiveds') return `arquivadas`;
    else if (path === 'messageSents') return 'enviadas';
    else return '/null/';
}

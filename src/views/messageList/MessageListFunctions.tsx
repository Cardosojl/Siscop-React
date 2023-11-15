import React, { ReactNode } from 'react';
import { siscopIndex } from 'src/apis/siscopDB';
import { MessageType, ObjFilter, Section, TableType, User } from 'src/config/types/types';
import MessageItem from 'src/components/messageItem/MessageItem';
import { Th, Tr } from 'src/components/Table';

async function indexMessages(path: string, limit: number, index: number, user: User<string, Section>, filter: ObjFilter | null): Promise<MessageType[] | null> {
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
        <Tr>
            <Th $size={3}>Mensagem:</Th>
            <Th $size={3}>Processo:</Th>
            <Th $size={3}>{path === 'messageSents' ? 'Destinatário:' : 'Remetente:'}</Th>
            <Th $size={3}>Data:</Th>
            {path === 'messages' ? <Th>Arquivar:</Th> : ''}
            <Th>Apagar:</Th>
        </Tr>
    );
}

export async function handleMessages(path: string, limit: number, index: number, user: User<string, Section>, filter: ObjFilter | null): Promise<MessageType[] | null> {
    const messages = (await indexMessages(path, limit, index, user, filter)) as MessageType[] | null;
    return messages;
}

export function handleMessageTable(path: string, messages: MessageType[] | null, listener: CallableFunction): TableType {
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

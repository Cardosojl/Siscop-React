import React, { ReactNode } from 'react';
import { siscopIndex } from 'src/apis/siscopDB';
import { MessageTypes, FilterTypes, SectionTypes, TableTypes, UserTypes } from 'src/apis/types';
import { MessageItem } from '../components/Table/MessageItem';
import { Tr } from 'src/components/Table/Tr';
import { Th } from 'src/components/Table/Th';

async function indexMessages(path: string, limit: number, index: number, user: UserTypes<string, SectionTypes>, filter: FilterTypes | null): Promise<MessageTypes[] | null> {
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

export async function handleMessages(path: string, limit: number, index: number, user: UserTypes<string, SectionTypes>, filter: FilterTypes | null): Promise<MessageTypes[] | null> {
    const messages = (await indexMessages(path, limit, index, user, filter)) as MessageTypes[] | null;
    return messages;
}

export function handleMessageTable(path: string, messages: MessageTypes[] | null, listener: CallableFunction): TableTypes {
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

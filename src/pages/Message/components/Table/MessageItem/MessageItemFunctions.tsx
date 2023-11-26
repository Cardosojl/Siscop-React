import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { MessageTypes, ProcessTypes, SectionTypes, UserTypes } from 'src/apis/types';
import { siscopCreate, siscopDelete, siscopShow } from 'src/apis/siscopDB';
import archived from 'src/assets/archive.png';
import trash from 'src/assets/trash.png';
import { Tr } from 'src/components/Table/Tr';
import { Td } from 'src/components/Table/Td';
import { MessageListButton } from 'src/components/Button/MessageListButton';
import { LinkStyled } from 'src/components/Link/LinkStyled';
import { Loading } from 'src/components/Load';

async function validationEvents(element: MessageTypes, path: string, user: UserTypes<string, SectionTypes>): Promise<boolean> {
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

function generateContent(element: MessageTypes, setListener: CallableFunction, path: string) {
    if (path === 'messages' || path === 'messageArchiveds') return generateMyMessages(element, path, setListener);
    else if (path === 'messageSents') return generateSentMessages(element, setListener);
    else return <></>;
}

function generateMyMessages(element: MessageTypes | null, path: string, listener: CallableFunction): ReactNode {
    const href = setHref(path);
    const body = element ? (
        <Tr>
            <Td $size={3}>
                <LinkStyled to={`${href}${element._id}`}>
                    <p className="Table__textP">{element.title}</p>
                </LinkStyled>
            </Td>
            <Td $size={3}>{element.process ? `${(element.process as ProcessTypes).title}` : <i>(Sem Processo)</i>}</Td>
            <Td $size={3}>{`${(element.sender as UserTypes).name}`}</Td>
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
            <MessageListButton $width="28px" $yellow src={archived} onClick={handleArchive} />
        </Td>
    );
}

function deleteButton(listener: CallableFunction) {
    const handleDelete = () => listener('deleteItem');
    return (
        <Td>
            <MessageListButton $width="28px" $red src={trash} onClick={() => handleDelete()} />
        </Td>
    );
}

function generateSentMessages(element: MessageTypes | null, listener: CallableFunction): ReactNode {
    const href = '/minhasMensagensEnviadas/';
    const body = element ? (
        <Tr>
            <Td $size={3}>
                <LinkStyled to={`${href}${element._id}`}>
                    <p className="Table__textP">{element.title}</p>
                </LinkStyled>
            </Td>
            <Td $size={3}>{element.process ? `${(element.process as ProcessTypes).title}` : <i>(Sem Processo)</i>}</Td>
            <Td $size={3}>{element.section_receiver ? `${(element.section_receiver as SectionTypes).name}` : `${(element.receiver as UserTypes).name}`}</Td>
            <Td $size={3}>{element.date}</Td>
            {deleteButton(listener)}
        </Tr>
    ) : null;
    return body;
}

function generateLoading() {
    return (
        <Tr>
            <Td $size={12} colSpan={12}>
                <Loading />
            </Td>
        </Tr>
    );
}

async function handleArchiveMessage(path: string, element: MessageTypes, user: UserTypes<string, SectionTypes>) {
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

async function handleDeleteMessage(path: string, element: MessageTypes, user: UserTypes<string, SectionTypes>): Promise<void> {
    if (!(await validationEvents(element, path, user))) {
        await siscopDelete(path, { _id: element._id });
    }
}

export async function handleEvents(
    listenerState: [string, Dispatch<SetStateAction<string>>],
    setRefresh: CallableFunction,
    element: MessageTypes,
    user: UserTypes<string, SectionTypes>,
    path: string
) {
    const [listener, setListener] = listenerState;

    if (listener === 'archive') {
        try {
            await handleArchiveMessage(path, element, user);
            setRefresh(true);
            setListener('');
        } catch (error) {
            throw new Error((error as Error).message);
        }
    } else if (listener === 'deleteItem') {
        try {
            await handleDeleteMessage(path, element, user);
            setRefresh(true);
            setListener('');
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}

export function generateBody(listenerState: [string, Dispatch<SetStateAction<string>>], element: MessageTypes, path: string) {
    const [listener, setListener] = listenerState;
    if (listener === '' && !element) return '';
    else if (listener === '') return generateContent(element, setListener, path);
    else return generateLoading();
}

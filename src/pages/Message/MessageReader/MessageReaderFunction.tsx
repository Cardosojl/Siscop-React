import React from 'react';
import { handleErros, siscopCreate, siscopDelete, siscopShow } from 'src/apis/siscopDB';
import { MessageTypes, SectionTypes, UserTypes } from 'src/apis/types';
import { DefineUserTypes } from 'src/context/types';
import archived from 'src/assets/archive.png';
import trash from 'src//assets/trash.png';
import { NavigateFunction } from 'react-router-dom';
import { MessageListButton } from 'src/components/Button/MessageListButton/index';
import { Wrapper } from 'src/components/Wrapper/Wrapper/index';

async function handleApiDeleteMessage(path: string, element: MessageTypes, user: UserTypes<string, SectionTypes>): Promise<void> {
    if (!(await validationEvents(element, path, user))) {
        await siscopDelete(path, { _id: element._id });
    }
}

async function handleApiArchiveMessage(path: string, element: MessageTypes, user: UserTypes<string, SectionTypes>): Promise<void> {
    if (!(await validationEvents(element, path, user))) {
        await siscopCreate('messageArchiveds', { message: element._id });
    }
}

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

export async function handleApiMessage(path: string, user: UserTypes<string, SectionTypes>, messageID: string): Promise<MessageTypes | null> {
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

export function handleResponsible(path: string, message: MessageTypes): JSX.Element {
    if (path === 'messageSents') {
        const sectionName = message.section_receiver ? (message.section_receiver as SectionTypes).name : null;
        const receiverString = message.receiver ? `${(message.receiver as UserTypes).name}` : null;
        return (
            <Wrapper $paddingLeft="10px">
                <small>
                    Destinatário: {receiverString} {sectionName}
                </small>
            </Wrapper>
        );
    }
    if (path === 'messages' || path === 'messageArchiveds') {
        const senderString = message.sender ? `${(message.sender as UserTypes).name}` : '';
        return (
            <Wrapper $paddingLeft="10px">
                <small>Remetente: {senderString}</small>
            </Wrapper>
        );
    } else return <></>;
}

export function handleIcons(
    user: UserTypes<string, SectionTypes>,
    path: string,
    element: MessageTypes,
    navigate: NavigateFunction,
    defineUser: DefineUserTypes,
    throwError: CallableFunction
): JSX.Element {
    const handleDelete = async () => {
        try {
            await handleApiDeleteMessage(path, element, user);
            navigate(-1);
        } catch (error) {
            handleErros(error as Error, defineUser, throwError);
        }
    };

    const handleArchive = async () => {
        try {
            await handleApiArchiveMessage(path, element, user);
            navigate(-1);
        } catch (error) {
            handleErros(error as Error, defineUser, throwError);
        }
    };
    const archive =
        path === 'messages' ? (
            <Wrapper $displayFlex="flex-start" $aling="center">
                <MessageListButton $width="28px" $yellow src={archived} onClick={handleArchive} />
                <small>Arquivar</small>
            </Wrapper>
        ) : (
            <></>
        );

    const trashDelete = (
        <Wrapper $displayFlex="flex-start" $aling="center">
            <MessageListButton $width="28px" $red src={trash} onClick={handleDelete} />
            <small>Apagar</small>
        </Wrapper>
    );
    return (
        <Wrapper $paddingRight="15px">
            {archive}
            {trashDelete}
        </Wrapper>
    );
}

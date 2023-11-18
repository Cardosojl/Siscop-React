import React from 'react';
import { handleErros, siscopCreate, siscopDelete, siscopShow } from 'src/apis/siscopDB';
import { DispatchUser, MessageType, Section, User } from 'src/config/types/types';
import archived from '../../assets/archive.png';
import trash from '../../assets/trash.png';
import { NavigateFunction } from 'react-router-dom';
import { ImageIcon } from 'src/components/ImageIcon';
import { Wrapper } from 'src/components/Wrapper';

async function handleApiDeleteMessage(path: string, element: MessageType, user: User<string, Section>): Promise<void> {
    if (!(await validationEvents(element, path, user))) {
        await siscopDelete(path, { _id: element._id });
    }
}

async function handleApiArchiveMessage(path: string, element: MessageType, user: User<string, Section>): Promise<void> {
    if (!(await validationEvents(element, path, user))) {
        await siscopCreate('messageArchiveds', { message: element._id });
    }
}

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

export async function handleApiMessage(path: string, user: User<string, Section>, messageID: string): Promise<MessageType | null> {
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

export function handleResponsible(path: string, message: MessageType): JSX.Element {
    if (path === 'messageSents') {
        const sectionName = message.section_receiver ? (message.section_receiver as Section).name : null;
        const receiverString = message.receiver ? `${(message.receiver as User).name}` : null;
        return (
            <Wrapper $paddingLeft="10px">
                <small>
                    Destinatário: {receiverString} {sectionName}
                </small>
            </Wrapper>
        );
    }
    if (path === 'messages' || path === 'messageArchiveds') {
        const senderString = message.sender ? `${(message.sender as User).name}` : '';
        return (
            <Wrapper $paddingLeft="10px">
                <small>Remetente: {senderString}</small>
            </Wrapper>
        );
    } else return <></>;
}

export function handleIcons(user: User<string, Section>, path: string, element: MessageType, navigate: NavigateFunction, dispatchUser: DispatchUser, throwError: CallableFunction): JSX.Element {
    const handleDelete = async () => {
        try {
            await handleApiDeleteMessage(path, element, user);
            navigate(-1);
        } catch (error) {
            handleErros(error as Error, dispatchUser, throwError);
        }
    };

    const handleArchive = async () => {
        try {
            await handleApiArchiveMessage(path, element, user);
            navigate(-1);
        } catch (error) {
            handleErros(error as Error, dispatchUser, throwError);
        }
    };
    const archive =
        path === 'messages' ? (
            <Wrapper $displayFlex="flex-start" $aling="center">
                <ImageIcon $width="28px" $yellow src={archived} onClick={handleArchive} />
                <small>Arquivar</small>
            </Wrapper>
        ) : (
            <></>
        );

    const trashDelete = (
        <Wrapper $displayFlex="flex-start" $aling="center">
            <ImageIcon $width="28px" $red src={trash} onClick={handleDelete} />
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

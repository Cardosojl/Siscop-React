import React, { ChangeEvent, FormEvent, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import './jodit/jodit.css';
import { MessageType, Process } from 'src/config/types/types';
import { generateProcessSelect, generateSectionSelect, generateUserSelect, handleForm, handleProcesses, handleSections, handleUsers } from './MessageSenderFunction';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { useLocation, useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import joditConfig from './jodit/joditConfig';
import { setInputs } from '../../elementsCreator';
import { Window } from 'src/components/Wrapper/Window/index';
import { Title } from 'src/components/Title/index';
import { InputForm } from 'src/components/Form/InputForm/index';
import { Select } from 'src/components/Select/index';
import { Wrapper } from 'src/components/Wrapper/Wrapper/index';
import { FormField } from 'src/components/Form/FormField/index';
import { FormMessageButton } from 'src/components/Button/FormMessageButton/index';
import DataContext from 'src/data/DataContext';

function MessageSender(): JSX.Element {
    const { user, setUser } = useContext(DataContext);
    const [urlId] = useLocation().pathname.split('/').reverse();
    const processId = urlId !== '0' ? urlId : null;
    const [form, setForm] = useState<Partial<MessageType> & Partial<Process>>({ title: undefined, sender: undefined, content: undefined });
    const [destination, setDestination] = useState<string>('');
    const [selectDestination, setSelectDestination] = useState<ReactNode>('');
    const [selectProcess, setSelectProcess] = useState<ReactNode>('');
    const [errorMessage, setErrorMessage] = useState<ReactNode>();
    const destinationArrayValue = ['', 'section', 'user'];
    const destinationArray = ['', 'Seção', 'Usuário'];
    const editor = useRef(null);
    const handleSelect = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setDestination(e.target.value);
    const navigate = useNavigate();
    const throwError = useAsyncError();
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);
    const send = async (e: FormEvent) => {
        try {
            await handleForm(e, form, navigate, setErrorMessage);
        } catch (error) {
            handleErros(error as Error, setUser, throwError, setErrorMessage);
        }
    };

    useEffect(() => {
        setForm((curr) => ({ ...curr, sender: user._id, process: processId ? processId : undefined }));
        handleProcesses(user, processId)
            .then((data) => {
                setSelectProcess(generateProcessSelect(data, processId, setForm));
            })
            .catch((error) => {
                handleErros(error as Error, setUser, throwError);
            });
    }, []);

    useEffect(() => {
        if (destination === 'user') {
            handleUsers(user)
                .then((data) => {
                    setSelectDestination(generateUserSelect(data, setForm));
                })
                .catch((error) => {
                    handleErros(error as Error, setUser, throwError);
                });
        }
        if (destination === 'section') {
            handleSections()
                .then((data) => {
                    setSelectDestination(generateSectionSelect(data, setForm));
                })
                .catch((error) => {
                    handleErros(error as Error, setUser, throwError);
                });
        } else setSelectDestination('');
    }, [destination]);

    return (
        <Window $large>
            <Title title="Nova Mensagem" $dark />
            {errorMessage}
            <Wrapper $displayFlex="space-between">
                <Wrapper>
                    <Wrapper $paddingLeft="15px" $paddingTop="20px" $displayFlex="flex-start">
                        <FormField label="Título:">
                            <InputForm type="text" name="title" value={form?.title || ''} onChange={handleInput} />
                        </FormField>
                        <FormField label="Destinatário:">
                            <Select name="receiver" onChange={handleSelect} optionValues={destinationArray} elementValue="" alternativeValues={destinationArrayValue} sort={false} />
                        </FormField>
                        {selectDestination}
                    </Wrapper>
                    <Wrapper $paddingLeft="15px" $paddingTop="5px" $displayFlex="space-between" $paddingRight="50px">
                        <FormField label="Processo:">{selectProcess}</FormField>
                    </Wrapper>
                </Wrapper>
                <FormMessageButton onSubmit={send} />
            </Wrapper>
            <JoditEditor ref={editor} value={form?.content || ''} config={joditConfig} onChange={(e) => setForm((curr) => ({ ...curr, content: e }))} />
        </Window>
    );
}

export default MessageSender;

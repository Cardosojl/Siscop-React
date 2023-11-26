import React, { ChangeEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AcquisitionWayTypes, ProcessTypes, SectionTypes } from 'src/apis/types';
import { handleAcquisitionWays, handleForm, handleSections } from './processCreatorFunction';
import { handleErros } from 'src/apis/siscopDB';
import useAsyncError from 'src/hooks/useAsyncError';
import { Window } from 'src/components/Wrapper/Window/index';
import { FormField } from 'src/components/Form/FormField/index';
import { Select } from 'src/components/Select/index';
import { setInputs } from 'src/pages/PagesFunctions';
import { Button } from 'src/components/Button/index';
import { Title } from 'src/components/Title/index';
import { InputForm } from 'src/components/Form/InputForm/index';
import UserContext from 'src/context/UserContext';
import { LayoutDefault } from 'src/components/Layout/LayoutDefault';

function ProcessCreator(): JSX.Element {
    const { user, setUser } = useContext(UserContext);
    const [sections, setSections] = useState<SectionTypes[]>([]);
    const [acquisitionWays, setAcquisition] = useState<AcquisitionWayTypes[]>([]);
    const [form, setForm] = useState<Partial<ProcessTypes>>({});
    const [message, setMessage] = useState<ReactNode>('');
    const sectionArray = sections.map((element) => element.name);
    const sectionArrayID = sections.map((element) => element._id);
    const acquisitionArray = acquisitionWays.map((element) => element.name);
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);
    const navigate = useNavigate();
    const throwError = useAsyncError();

    const sendForm = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            await handleForm(e, form, sections, acquisitionWays, setMessage, navigate);
        } catch (error) {
            handleErros(error as Error, setUser, throwError, setMessage);
        }
    };

    useEffect(() => {
        setForm((current) => ({ ...current, user: user._id }));
        handleSections()
            .then((data) => {
                if (data) setSections(data);
            })
            .catch((error) => {
                handleErros(error as Error, setUser, throwError);
            });
        handleAcquisitionWays()
            .then((data) => {
                if (data) setAcquisition(data);
            })
            .catch((error) => {
                handleErros(error as Error, setUser, throwError);
            });
    }, []);

    return (
        <LayoutDefault>
            <Window $medium>
                <Title title="Novo Processo" />
                <hr />
                <form onSubmit={sendForm}>
                    {message}
                    <FormField label="Nome:">
                        <InputForm $medium name="title" type="text" value={form.title || ''} onChange={handleInput} />
                    </FormField>
                    <FormField label="Nup:">
                        <InputForm $medium name="nup" type="text" value={form.nup || ''} onChange={handleInput} />
                        <small>(número de protocolo)</small>
                    </FormField>
                    <FormField label="Origem:">
                        <Select name="origin" sort={true} optionValues={sectionArray} elementValue="" alternativeValues={sectionArrayID} onChange={handleInput} />
                    </FormField>
                    <FormField label="Forma de Aquisição:">
                        <Select name="category" sort={false} optionValues={acquisitionArray} elementValue="" onChange={handleInput} />
                    </FormField>
                    <FormField label="Descrição:">
                        <textarea name="description" value={form.description || ''} onChange={handleInput} />
                    </FormField>
                    <Button $green>Enviar</Button>
                </form>
            </Window>
        </LayoutDefault>
    );
}

export default ProcessCreator;

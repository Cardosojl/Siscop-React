import React, { ChangeEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { AcquisitionWayTypes, ProcessTypes, SectionTypes } from 'src/apis/types';
import { handleAcquisitionWays, handleForm, handleProcess, handleSections } from './EditProcessFunction';
import useAsyncError from 'src/hooks/useAsyncError';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleErros } from 'src/apis/siscopDB';
import { Window } from 'src/components/Wrapper/Window/index';
import { FormField } from 'src/components/Form/FormField/index';
import { setInputs } from 'src/pages/PagesFunctions';
import { Select } from 'src/components/Select/index';
import { Button } from 'src/components/Button/index';
import { Title } from 'src/components/Title/index';
import { InputForm } from 'src/components/Form/InputForm/index';
import UserContext from 'src/context/UserContext';
import { EditProcessProps } from './types';
import { LayoutDefault } from 'src/components/Layout/LayoutDefault';

function EditProcess({ path }: EditProcessProps): JSX.Element {
    const { user, setUser } = useContext(UserContext);
    const [url] = useLocation().pathname.split('/').reverse();
    const [sections, setSections] = useState<SectionTypes[]>([]);
    const [process, setProcess] = useState<Partial<ProcessTypes>>({});
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
            await handleForm(e, process, form, sections, acquisitionWays, setMessage, navigate);
        } catch (error) {
            handleErros(error as Error, setUser, throwError, setMessage);
        }
    };

    useEffect(() => {
        handleProcess(path as string, user, url)
            .then((data) => {
                setProcess(data);
                setForm({
                    title: data.title,
                    origin: (data.origin as SectionTypes)._id || undefined,
                    nup: data.nup || undefined,
                    category: data.category || undefined,
                    description: data.description || undefined,
                });
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
        handleSections()
            .then((data) => {
                if (data) setSections(data);
            })
            .catch((error) => {
                handleErros(error as Error, setUser, throwError);
            });
    }, []);

    return (
        <LayoutDefault>
            <Window $medium>
                <Title title={process.title || ''} />
                <hr />
                <form onSubmit={sendForm}>
                    {message}
                    <FormField label="Nome:">
                        <InputForm $medium name="title" type="text" value={form.title || ''} onChange={handleInput} />
                    </FormField>
                    <FormField label="Nup:">
                        <InputForm name="nup" type="text" value={form.nup || ''} onChange={handleInput} />
                        <small>(número de protocolo)</small>
                    </FormField>
                    <FormField label="Origem:">
                        <Select
                            sort={true}
                            name="origin"
                            optionValues={sectionArray}
                            elementValue={(process.origin as SectionTypes)?.name || ''}
                            alternativeValues={sectionArrayID}
                            onChange={handleInput}
                        />
                    </FormField>
                    <FormField label="Forma de Aquisição:">
                        <Select sort={false} name="category" optionValues={acquisitionArray} elementValue={process.category || ''} onChange={handleInput} />
                    </FormField>
                    <FormField label="Descrição">
                        <textarea name="description" value={form.description} onChange={handleInput} />
                    </FormField>
                    <Button $green>Enviar</Button>
                </form>
            </Window>
        </LayoutDefault>
    );
}

export default EditProcess;

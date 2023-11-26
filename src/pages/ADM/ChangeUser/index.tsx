import React, { ChangeEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { SectionTypes, UserTypes } from 'src/apis/types';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { handleFind, handleForm, handleSections } from './ChangeUserFunction';
import { Button } from 'src/components/Button/index';
import { Window } from 'src/components/Wrapper/Window/index';
import { FormField } from 'src/components/Form/FormField/index';
import { Select } from 'src/components/Select/index';
import { setInputs } from 'src/pages/PagesFunctions';
import { Title } from 'src/components/Title/index';
import { InputForm } from 'src/components/Form/InputForm/index';
import UserContext from 'src/context/UserContext';
import { LayoutDefault } from 'src/components/Layout/LayoutDefault';

function ChangeUser(): JSX.Element {
    const { setUser } = useContext(UserContext);
    const [profile, setProfile] = useState<UserTypes<string, SectionTypes> | null>(null);
    const [sections, setSections] = useState<SectionTypes[] | null>(null);
    const [name, setName] = useState<Partial<UserTypes>>({});
    const [form, setForm] = useState<Partial<UserTypes>>({});
    const [message, setMessage] = useState<ReactNode>('');
    const sectionArray = sections ? sections.map((element) => element.name) : [];
    const sectionArrayID = sections ? sections.map((element) => element._id) : [];
    const level = Array.from({ length: 10 }, (_, index) => `${index + 1}`);
    const handleSearch = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setName);
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);
    const throwError = useAsyncError();

    const findUser = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            handleFind(e, name, setMessage, setProfile, setForm);
        } catch (error) {
            handleErros(error as Error, setUser, throwError);
        }
    };

    const sendForm = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            if (profile) await handleForm(e, form, setMessage, sections, profile);
        } catch (error) {
            handleErros(error as Error, setUser, throwError, setMessage);
        }
    };

    useEffect(() => {
        handleSections()
            .then((data) => {
                setSections(data);
            })
            .catch((error) => {
                handleErros(error as Error, setUser, throwError);
            });
    }, []);

    return (
        <LayoutDefault>
            <Window $small>
                <Title title="Alterar Usuário" />
                <hr />
                <form onSubmit={findUser}>
                    <FormField label="Nome do Usuário:">
                        <InputForm name="name" type="text" value={name.name} onChange={handleSearch} />
                        <Button $green>Procurar</Button>
                    </FormField>
                </form>
                {profile ? (
                    <form onSubmit={sendForm}>
                        {message}
                        <hr />
                        <FormField label="Nome:">
                            <InputForm name="name" type="text" value={form.name || ''} onChange={handleInput} />
                        </FormField>
                        <FormField label="Senha:">
                            <InputForm name="password" type="password" value={form.password || ''} onChange={handleInput} />
                        </FormField>
                        <FormField label="Seção:">
                            <Select
                                name="section"
                                sort={true}
                                optionValues={sectionArray}
                                elementValue={(profile.section as SectionTypes).name}
                                alternativeValues={sectionArrayID}
                                onChange={handleInput}
                            />
                        </FormField>
                        <FormField label="Level:">
                            <Select name="level" sort={false} optionValues={level} elementValue="1" onChange={handleInput} />
                        </FormField>
                        <Button $green>Alterar</Button>
                    </form>
                ) : (
                    ''
                )}
            </Window>
        </LayoutDefault>
    );
}

export default ChangeUser;

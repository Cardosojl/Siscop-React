import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { Section, SimpleView, User } from 'src/config/types/types';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { connect } from 'react-redux';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import { handleFind, handleForm, handleSections } from './ChangeUserFunction';
import { Button } from 'src/components/Button';
import { Window } from 'src/components/Window';
import { FormField } from 'src/components/FormField';
import { Select } from 'src/components/Select';
import { setInputs } from '../elementsCreator';
import Title from 'src/components/Title';
import { InputForm } from 'src/components/InputForm';

function ChangeUser({ dispatchUser }: SimpleView): JSX.Element {
    const [user, setUser] = useState<User<string, Section> | null>(null);
    const [sections, setSections] = useState<Section[] | null>(null);
    const [name, setName] = useState<string>('');
    const [form, setForm] = useState<Partial<User>>({});
    const [message, setMessage] = useState<ReactNode>('');
    const sectionArray = sections ? sections.map((element) => element.name) : [];
    const sectionArrayID = sections ? sections.map((element) => element._id) : [];
    const level = Array.from({ length: 10 }, (_, index) => `${index + 1}`);
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);
    const throwError = useAsyncError();

    const findUser = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            handleFind(e, name, setMessage, setUser, setForm);
        } catch (error) {
            handleErros(error as Error, dispatchUser, throwError);
        }
    };

    const sendForm = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            if (user) await handleForm(e, form, setMessage, sections, user);
        } catch (error) {
            handleErros(error as Error, dispatchUser, throwError, setMessage);
        }
    };

    useEffect(() => {
        handleSections()
            .then((data) => {
                setSections(data);
            })
            .catch((error) => {
                handleErros(error as Error, dispatchUser, throwError);
            });
    }, []);

    return (
        <Window $small>
            <Title title="Alterar Usuário" />
            <hr />
            <form onSubmit={findUser}>
                <FormField label="Nome do Usuário:">
                    <InputForm type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <Button $green>Procurar</Button>
                </FormField>
            </form>
            {user ? (
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
                        <Select name="section" sort={true} optionValues={sectionArray} elementValue={(user.section as Section).name} alternativeValues={sectionArrayID} onChange={handleInput} />
                    </FormField>
                    <FormField label="Level:">
                        <Select name="level" sort={false} optionValues={level} elementValue="" onChange={handleInput} />
                    </FormField>
                    <Button $green>Alterar</Button>
                </form>
            ) : (
                ''
            )}
        </Window>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeUser);

import React, { ChangeEvent, useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Section, User } from 'src/config/types/types';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleInputs, handleSession } from './LoginFunction';
import { Button } from 'src/components/Button/index';
import { Window } from 'src/components/Wrapper/Window/index';
import { FormField } from 'src/components/Form/FormField/index';
import { Title } from 'src/components/Title/index';
import { InputForm } from 'src/components/Form/InputForm/index';
import DataContext from 'src/data/DataContext';

function Login(): JSX.Element {
    const { user, setUser } = useContext(DataContext);
    const [form, setForm] = useState<Partial<User<string, Section>>>({ name: '', password: '' });
    const [message, setMessage] = useState<string>('');
    const throwError = useAsyncError();
    const navigate = useNavigate();
    const sendForm = (e: ChangeEvent<HTMLFormElement>) => handleSession(e, navigate, setUser, form, throwError, setMessage);
    const userValues = (e: ChangeEvent<HTMLInputElement>) => handleInputs(e, setForm, form);

    if (user.logged) {
        return <Navigate to={'/caixaDeEntrada/0'} />;
    }

    return (
        <Window $login>
            <Title title="Login">{message}</Title>
            <hr />
            <form onSubmit={sendForm}>
                <FormField label="Nome:">
                    <InputForm name="name" type="text" value={form.name} onChange={userValues} />
                </FormField>
                <FormField label="Senha:">
                    <InputForm name="password" type="password" value={form.password} onChange={userValues} />
                </FormField>
                <Button $green>Login</Button>
            </form>
        </Window>
    );
}

export default Login;

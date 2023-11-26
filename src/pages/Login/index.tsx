import React, { ChangeEvent, useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { SectionTypes, UserTypes } from 'src/apis/types';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleInputs, handleSession } from './LoginFunction';
import { Button } from 'src/components/Button/index';
import { Window } from 'src/components/Wrapper/Window/index';
import { FormField } from 'src/components/Form/FormField/index';
import { Title } from 'src/components/Title/index';
import { InputForm } from 'src/components/Form/InputForm/index';
import UserContext from 'src/context/UserContext';
import { LayoutLogin } from 'src/components/Layout/LayoutLogin';

function Login(): JSX.Element {
    const { user, setUser } = useContext(UserContext);
    const [form, setForm] = useState<Partial<UserTypes<string, SectionTypes>>>({ name: '', password: '' });
    const [message, setMessage] = useState<string>('');
    const throwError = useAsyncError();
    const navigate = useNavigate();
    const sendForm = (e: ChangeEvent<HTMLFormElement>) => handleSession(e, navigate, setUser, form, throwError, setMessage);
    const userValues = (e: ChangeEvent<HTMLInputElement>) => handleInputs(e, setForm, form);

    if (user.logged) {
        return <Navigate to={'/caixaDeEntrada/0'} />;
    }

    return (
        <LayoutLogin>
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
        </LayoutLogin>
    );
}

export default Login;

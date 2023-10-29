import React, { ChangeEvent, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { ReduxUser, Section, User } from 'src/config/types/types';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import './Login.css';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import WindowTitle from 'src/components/windowTitle/WindowTitle';
import { handleInputs, handleUser } from './LoginFunction';

function Login({ user, dispatchUser }: ReduxUser): JSX.Element {
    const [form, setForm] = useState<Partial<User<string, Section>>>({ name: '', password: '' });
    const [errorMessage, setErrorMessage] = useState<string>('');
    const throwError = useAsyncError();
    const navigate = useNavigate();
    const sendForm = (e: ChangeEvent<HTMLFormElement>) => handleUser(e, navigate, dispatchUser, form, throwError, setErrorMessage);
    const userValues = (e: ChangeEvent<HTMLInputElement>) => handleInputs(e, setForm, form);

    if (user.logged) {
        return <Navigate to={'/caixaDeEntrada/0'} />;
    }

    return (
        <div className="Login--size container">
            <form className="Login" onSubmit={sendForm}>
                <WindowTitle title="Login">
                    <label className="Login__error">{errorMessage}</label>
                </WindowTitle>
                <hr />
                <div className="Login__fields">
                    <label>Nome:</label>
                    <input type="text" name="name" value={form.name} onChange={userValues} />
                </div>
                <div className="Login__fields">
                    <label>Senha:</label>
                    <input type="password" name="password" value={form.password} onChange={userValues} />
                </div>
                <input className="Login__button Button--green" type="submit" value="Login" />
            </form>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

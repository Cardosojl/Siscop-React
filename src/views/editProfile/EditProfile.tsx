import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Profile, SimpleView } from 'src/config/types/types';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { generateChangeData, generateChangePassword, handleForm } from './EditProfileFunction';
import './EditProfile.css';
import { handleErros } from 'src/apis/siscopDB';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import { useNavigate } from 'react-router-dom';

function EditProfile({ user, dispatchUser }: SimpleView): JSX.Element {
    const [passwordAction, setPasswordAction] = useState<boolean>(false);
    const [dataAction, setDataAction] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<ReactNode>('');
    const [form, setForm] = useState<Partial<Profile>>({});
    const navigate = useNavigate();
    const throwError = useAsyncError();
    const sendForm = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            await handleForm(e, form, user, setErrorMessage, navigate, dispatchUser);
        } catch (error) {
            handleErros(error as Error, dispatchUser, throwError, setErrorMessage);
        }
    };

    return (
        <div className="SmallWindow container">
            <div className="Window--small">
                <form className="Form" onSubmit={sendForm}>
                    {generateChangeData(user, setDataAction, dataAction, setForm)}
                </form>
                <form className="Form" onSubmit={sendForm}>
                    <div className="EditProfile__error">{errorMessage}</div>
                    {generateChangePassword(setPasswordAction, passwordAction, setForm, form)}
                </form>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

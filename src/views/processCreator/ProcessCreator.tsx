import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WindowTitle from 'src/components/windowTitle/WindowTitle';
import { AcquisitionWay, Process, Section, SimpleView } from 'src/config/types/types';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { generateForm, handleAcquisitionWays, handleForm, handleSections } from './processCreatorFunction';
import { handleErros } from 'src/apis/siscopDB';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';

function ProcessCreator({ user, dispatchUser }: SimpleView): JSX.Element {
    const [sections, setSections] = useState<Section[]>([]);
    const [acquisitionWays, setAcquisition] = useState<AcquisitionWay[]>([]);
    const [form, setForm] = useState<Partial<Process>>({});
    const [errorMessage, setErrorMessage] = useState<ReactNode>('');
    const navigate = useNavigate();
    const throwError = useAsyncError();

    const sendForm = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            await handleForm(e, form, sections, acquisitionWays, setErrorMessage, navigate);
        } catch (error) {
            handleErros(error as Error, dispatchUser, throwError, setErrorMessage);
        }
    };

    useEffect(() => {
        setForm((current) => ({ ...current, user: user._id }));
        handleSections()
            .then((data) => {
                if (data) setSections(data);
            })
            .catch((error) => {
                handleErros(error as Error, dispatchUser, throwError);
            });
        handleAcquisitionWays()
            .then((data) => {
                if (data) setAcquisition(data);
            })
            .catch((error) => {
                handleErros(error as Error, dispatchUser, throwError);
            });
    }, []);

    return (
        <div className="MainWindow container">
            <div className="Window">
                <WindowTitle title="Novo Processo" />
                <hr />
                <form className="Form" onSubmit={sendForm}>
                    <div>{errorMessage}</div>
                    {generateForm(acquisitionWays, sections, form, setForm)}
                </form>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessCreator);

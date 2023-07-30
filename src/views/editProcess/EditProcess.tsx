import React, { ChangeEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import WindowTitle from 'src/components/windowTitle/WindowTitle';
import { AcquisitionWay, Process, Section, SimpleView } from 'src/config/types/types';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { generateForm, handleAcquisitionWays, handleErros, handleForm, handleProcess, handleSections } from './EditProcessFunction';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import { useLocation, useNavigate } from 'react-router-dom';

function EditProcess({ user, dispatchUser, path }: SimpleView): JSX.Element {
    const url = useLocation().pathname.split('/');
    const [sections, setSections] = useState<Section[]>([]);
    const [process, setProcess] = useState<Partial<Process>>({});
    const [acquisitionWays, setAcquisition] = useState<AcquisitionWay[]>([]);
    const [form, setForm] = useState<Partial<Process>>({});
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();
    const throwError = useAsyncError();

    const sendForm = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            await handleForm(e, process, form, sections, acquisitionWays, setErrorMessage, navigate);
        } catch (error) {
            handleErros(error as Error, dispatchUser, throwError, setErrorMessage);
        }
    };

    useEffect(() => {
        handleProcess(path as string, user, url[url.length - 1])
            .then((data) => {
                setProcess(data);
                setForm({
                    title: data.title,
                    origin: (data.origin as Section)._id || undefined,
                    nup: data.nup || undefined,
                    category: data.category || undefined,
                    description: data.description || undefined,
                });
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
        handleSections()
            .then((data) => {
                if (data) setSections(data);
            })
            .catch((error) => {
                handleErros(error as Error, dispatchUser, throwError);
            });
    }, []);
    return (
        <div className="MainWindow container">
            <div className="Window">
                <WindowTitle title={process?.title || ''} />
                <hr />
                <form className="Form" onSubmit={sendForm}>
                    <div>{errorMessage}</div>
                    {generateForm(acquisitionWays, sections, process, form, setForm)}
                </form>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProcess);

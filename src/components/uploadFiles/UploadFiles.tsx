import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { handleFileForm, handleFilename, setFiles } from './UploadFilesFunction';
import { useLocation } from 'react-router-dom';
import { SimpleView } from 'src/config/types/types';
import useAsyncError from 'src/hooks/useAsyncError';
import { Wrapper } from '../Wrapper';
import { Button } from '../Button';

const LabelButtonStyle = styled.label`
    padding: 5px;
    background-color: ${({ theme }) => theme.colors.green};
    border: 0px;
    border-radius: 3px;
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 12.5px;
    margin: 10px;
    width: fit-content;
    height: fit-content;
    text-decoration: none;

    &:hover {
        background-color: ${({ theme }) => theme.colors.lightGreen};
    }
`;

const SpanInputStyle = styled.span`
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
    background-color: ${({ theme }) => theme.colors.inputBackground};
    min-width: 250px;
    padding: 4px 4px 20px 4px;
    height: 21px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.inputText};
`;

const InputStyle = styled.input`
    display: none;
`;

function UploadFiles({ dispatchUser, setRefresh }: SimpleView & { setRefresh: CallableFunction }): JSX.Element {
    const [process] = useLocation().pathname.split('/').reverse();
    const [filename, setFilename] = useState<string>('');
    const [sendComponent, setSendComponent] = useState<ReactNode>('');
    const formStates = useState({ process });
    const [form, setForm] = formStates;
    const [load, setLoad] = useState<ReactNode>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const throwError = useAsyncError();

    const sendForm = (e: ChangeEvent<HTMLFormElement>) => {
        handleFileForm(e, setLoad, setRefresh, dispatchUser, formStates, throwError, setErrorMessage);
    };

    useEffect(() => {
        if (filename) setSendComponent(<Button $blue>Enviar</Button>);
        if (!filename) setSendComponent('');
    }, [filename]);

    useEffect(() => {
        if (!form) {
            setForm({ process });
            setFilename('');
            setErrorMessage('');
        }
    }, [form]);

    return (
        <form onSubmit={sendForm}>
            <Wrapper $displayFlex="flex-start" $aling="center">
                <LabelButtonStyle htmlFor="file">Upload</LabelButtonStyle>
                <SpanInputStyle>{filename}</SpanInputStyle>
                <InputStyle
                    type="file"
                    id="file"
                    onChange={(e) => {
                        setFilename(handleFilename(e.target.value, e.target.files?.length));
                        setForm((current) => ({ ...current, file: setFiles(e.target.files) }));
                    }}
                    multiple
                />
                {load}
            </Wrapper>
            <Wrapper $paddingLeft="15px">
                <p>{errorMessage}</p>
            </Wrapper>
            {sendComponent}
        </form>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadFiles);

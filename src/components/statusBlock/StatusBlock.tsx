import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { ProcessState, SimpleView, User } from 'src/config/types/types';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { handleEvents } from './StatusBlockFunction';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import { handleErros } from 'src/apis/siscopDB';

type StatusBlockProps = {
    $small?: boolean;
};

const DivStatusStyle = styled.div<StatusBlockProps>`
    background-color: rgb(174, 240, 107);
    margin-left: 20px;
    margin-top: 20px;
    padding: 20px;
    width: 330px;
    min-height: 180px;
    border-radius: 5px;
    color: rgb(114, 114, 114);

    ${(props) =>
        props.$small &&
        css`
            width: 330px;
            background-color: rgb(174, 240, 107);
            padding: 4px;
            height: 100px;
        `}
`;

const LabelStatusStyle = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
`;

const ButtonStatusStyle = styled.div`
    text-align: center;
    button {
        background: none;
        border: none;
        color: rgb(114, 114, 114);
        &:hover {
            color: rgb(134, 134, 134);
        }
    }
`;

function StatusBlock({ $small, processState, user, dispatchUser }: { $small?: boolean; processState: ProcessState } & SimpleView): JSX.Element {
    const [state, setState] = useState<ProcessState>(processState);
    const [listenerState, setListenerState] = useState<string>('');
    const throwError = useAsyncError();

    useEffect(() => {
        handleEvents([listenerState, setListenerState], [state, setState]).catch((error) => handleErros(error as Error, dispatchUser, throwError));
    }, [listenerState[0]]);

    return (
        <DivStatusStyle $small={$small || false}>
            <LabelStatusStyle>
                <small>
                    <b>Status:</b>
                </small>
                <label>&nbsp;{state.state}</label>
            </LabelStatusStyle>
            <LabelStatusStyle>
                <small>
                    <b>OBS:</b>
                </small>
                <label>&nbsp;{state.anotation}</label>
            </LabelStatusStyle>
            <LabelStatusStyle>
                <small>
                    <b>De:</b> {state.user ? `${(state as ProcessState<string, User>).user.name}` : 'Sistema'}
                    {' - '}
                    {state.date}
                </small>
            </LabelStatusStyle>
            <ButtonStatusStyle>
                {state.user ? (state as ProcessState<string, User>).user._id === user._id ? <button onClick={() => setListenerState('Delete')}>Apagar</button> : '' : ''}
            </ButtonStatusStyle>
        </DivStatusStyle>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusBlock);

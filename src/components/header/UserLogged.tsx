import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ReduxUser, Section } from 'src/config/types/types';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import useAsyncError from 'src/hooks/useAsyncError';
import { siscopLogoffDelete } from 'src/apis/siscopDB';
import { Wrapper } from 'src/components/Wrapper';

const LinkStyle = styled(Link)`
    text-decoration: none;
`;

const TextStyle = styled.p`
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.secondaryText};
    margin-left: 7px;
    font-size: 12px;
`;

function UserLogged({ user, dispatchUser }: ReduxUser): JSX.Element {
    const [userOn, setUserOn] = useState(user);
    const throwError = useAsyncError();
    const navigate = useNavigate();

    useEffect(() => {
        setUserOn(user);
    }, [user]);

    const handleLogoff = async (): Promise<void> => {
        try {
            dispatchUser.logoffRedux();
            await siscopLogoffDelete();
            navigate('/');
            setUserOn(user);
        } catch (error) {
            throwError(new Error((error as Error).message));
        }
    };

    return (
        <Wrapper $displayFlex="flex-start" $paddingRight="35px" $paddingTop="45px">
            <LinkStyle to="/editProfile">
                <TextStyle>{`${userOn.name} - ${(userOn.section as Section).name}`}</TextStyle>
            </LinkStyle>
            <TextStyle>|</TextStyle>
            <LinkStyle to="/">
                <TextStyle onClick={handleLogoff}>Sair</TextStyle>
            </LinkStyle>
        </Wrapper>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogged);

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Section } from 'src/config/types/types';
import useAsyncError from 'src/hooks/useAsyncError';
import { siscopLogoffDelete } from 'src/apis/siscopDB';
import { Wrapper } from 'src/components/common/Wrapper';
import DataContext, { initialUser } from 'src/data/DataContext';

const LinkStyle = styled(Link)`
    text-decoration: none;
`;

const TextStyle = styled.p`
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.secondaryText};
    margin-left: 7px;
    font-size: 12px;

    &:hover {
        color: ${({ theme }) => theme.colors.lightGrayText};
    }
`;

function UserLogged(): JSX.Element {
    const { user, setUser } = useContext(DataContext);
    const [userOn, setUserOn] = useState(user);
    const throwError = useAsyncError();
    const navigate = useNavigate();

    useEffect(() => {
        setUserOn(user);
    }, [user]);

    const handleLogoff = async (): Promise<void> => {
        try {
            setUser(initialUser);
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

export default UserLogged;

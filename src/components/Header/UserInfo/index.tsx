import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from 'src/components/Wrapper/Wrapper/index';
import DataContext, { initialUser } from 'src/data/DataContext';
import { LinkStyle, TextStyle } from './UserInfo.styles';
import { Section } from 'src/config/types/types';

export function UserInfo(): JSX.Element {
    const { user, setUser } = useContext(DataContext);
    const [userOn, setUserOn] = useState(user);
    const navigate = useNavigate();

    useEffect(() => {
        setUserOn(user);
    }, [user]);

    const handleLogoff = async (): Promise<void> => {
        localStorage.clear();
        setUser(initialUser);
        navigate('/');
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

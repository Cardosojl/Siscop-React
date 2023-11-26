import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from 'src/components/Wrapper/Wrapper/index';
import UserContext, { initialUser } from 'src/context/UserContext';
import { LinkStyle, TextStyle } from './UserInfo.styles';
import { SectionTypes } from 'src/apis/types';

export function UserInfo(): JSX.Element {
    const { user, setUser } = useContext(UserContext);
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
                <TextStyle>{`${userOn.name} - ${(userOn.section as SectionTypes).name}`}</TextStyle>
            </LinkStyle>
            <TextStyle>|</TextStyle>
            <LinkStyle to="/">
                <TextStyle onClick={handleLogoff}>Sair</TextStyle>
            </LinkStyle>
        </Wrapper>
    );
}

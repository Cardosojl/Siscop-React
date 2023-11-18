import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

type TitleProps = {
    $dark?: boolean;
};

const DivStyle = styled.div<TitleProps>`
    width: auto;
    border-radius: 2px 2px 0px 0px;
    padding: 20px 0px 0px 0px;
    display: flex;
    justify-content: space-between;
    background-color: ${({ theme, $dark }) => ($dark ? theme.colors.secondary : '')};
`;

const TitleStyle = styled.h4<TitleProps>`
    margin-left: 15px;
    ${(props) =>
        props.$dark &&
        css`
            color: ${({ theme }) => theme.colors.secondaryText};
        `}
`;

const ChildrenStyle = styled.span<TitleProps>`
    margin-right: 15px;
    h3 {
        ${(props) =>
            props.$dark &&
            css`
                color: ${({ theme }) => theme.colors.secondaryText};
            `}
    }
    small {
        color: ${({ theme }) => theme.colors.lightGrayText};
        font-size: 11.5px;
    }
`;

function Title({ $dark, title, children }: { $dark?: boolean; title: string; children?: ReactNode }): JSX.Element {
    return (
        <DivStyle $dark={$dark || false}>
            <TitleStyle $dark={$dark || false}>{title}</TitleStyle>
            <ChildrenStyle $dark={$dark || false}>{children}</ChildrenStyle>
        </DivStyle>
    );
}

export default Title;

import React from 'react';
import { LoadingWrapper, Spinner } from './Load.styles';

export const Loading = () => {
    return (
        <LoadingWrapper>
            <Spinner />
        </LoadingWrapper>
    );
};

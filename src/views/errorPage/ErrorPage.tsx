import React from 'react';
import ErrorComponent from 'src/components/errorBoundary/ErrorComponent';

export default function ErrorPage({ error }: { error: Error }): JSX.Element {
    return <ErrorComponent error={error} />;
}

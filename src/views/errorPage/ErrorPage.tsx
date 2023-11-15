import React from 'react';
import ErrorComponent from 'src/components/ErrorComponent';

export default function ErrorPage({ error }: { error: Error }): JSX.Element {
    return <ErrorComponent error={error} />;
}

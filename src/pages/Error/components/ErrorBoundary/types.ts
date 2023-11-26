import { ReactNode } from 'react';

export type ErrorBoundaryProps = {
    children: ReactNode;
};

export type ErrorBoundaryState = {
    hasError: boolean;
    errorInfo: React.ErrorInfo | null;
    error: Error | null;
};

import React, { Component, ErrorInfo } from 'react';
import axios from 'axios';
import { ErrorBoundaryProps, ErrorBoundaryState } from 'src/config/types/types';
import ErrorPage from 'src/views/ErrorPage/index';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, errorInfo: null, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return {
            hasError: true,
            error: error,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        if (axios.isAxiosError(error) && error.response?.status === 400) return console.log(error.message);
        if (axios.isAxiosError(error) && error.response?.status === 404) return console.log(error.message);
        else {
            console.error('Error:', error);
            console.error('Error Info:', errorInfo);
            this.setState({
                error: error,
                errorInfo: errorInfo,
            });
        }
    }

    render() {
        if (this.state.hasError) {
            return <ErrorPage error={this.state.error as Error} />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

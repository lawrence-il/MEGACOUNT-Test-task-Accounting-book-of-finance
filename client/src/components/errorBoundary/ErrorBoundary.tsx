import { Component, ErrorInfo } from "react";

import { ErrorBoundaryProps } from "../../types/types";

import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component<ErrorBoundaryProps> {

    state = {
        error: false
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        //eslint-disable-next-line
        console.log(error, errorInfo);
        this.setState({
            error: true
        });
    }
    render() {
        if (this.state.error) {
            return <ErrorMessage/>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
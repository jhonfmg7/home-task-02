import React from 'react';
import styles from '../../css-modules/error.module.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    
    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo })
    }
    
    render() {
        const { hasError, error, errorInfo } = this.state;
        if (hasError) {
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <details style={ styles.error }>
                        { error && error?.toString() }
                        <br />
                        { errorInfo.componentStack }
                    </details>
                </div>
            );
        }
        return this.props.children;
    }  
}

export default ErrorBoundary;
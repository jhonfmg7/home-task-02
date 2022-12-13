import * as React from "react";
import styles from "../../css-modules/error.module.css";

interface Props {
    children?: React.ReactNode;
}

type State = {
    hasError: boolean,
    error: object,
    errorInfo: React.ErrorInfo
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    if (hasError) {
      return (
        <div className={styles.errorContainer}>
          <h2>Something went wrong.</h2>
          <details className={styles.error}>
            { error?.toString() }
            { errorInfo?.componentStack }
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

import { Heading } from 'grommet';
import React from 'react';

interface ErrorBoundaryProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, {hasError: boolean}> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static defaultProps = {
    fallback: () => <Heading level={3} as="span">Something went wrong.</Heading>
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

//   componentDidCatch(error, info) {
//     // Example "componentStack":
//     //   in ComponentThatThrows (created by App)
//     //   in ErrorBoundary (created by App)
//     //   in div (created by App)
//     //   in App
//   }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

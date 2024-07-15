'use client';
import React, { useState, ReactNode, useEffect } from 'react';
import ErrorComponent from 'src/app/error';

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const resetErrorBoundary = () => {
    setHasError(false);
    setError(null);
  };

  const getDerivedStateFromError = (error: Error) => {
    setHasError(true);
    setError(error);
  };

  useEffect(() => {
    if (hasError && error) {
      console.error('Uncaught error:', error);
      // You can log error details to a service here
    }
  }, [hasError, error]);

  if (hasError && error) {
    return <ErrorComponent error={error} reset={resetErrorBoundary} />;
  }

  return children;
};

export default ErrorBoundary;

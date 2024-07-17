import React, { ReactNode, useState, useEffect, ComponentType } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ComponentType<{ error: Error; reset: () => void }>;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback: FallbackComponent,
}) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (hasError && error) {
      console.error('Uncaught error:', error);
    }
  }, [hasError, error]);

  const resetError = () => {
    setHasError(false);
    setError(null);
  };

  const handleError = (error: Error) => {
    setHasError(true);
    setError(error);
  };

  if (hasError && error) {
    return <FallbackComponent error={error} reset={resetError} />;
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement<any>, {
          onError: handleError,
        });
      })}
    </React.Suspense>
  );
};

export default ErrorBoundary;
